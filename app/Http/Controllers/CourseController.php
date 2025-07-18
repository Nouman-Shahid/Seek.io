<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\ChapterCompletion;
use App\Models\CheatingDetection;
use App\Models\Course;
use App\Models\CourseExam;
use App\Models\Enrollments;
use App\Models\ExamResults;
use App\Models\Feedback;
use App\Services\WebPurifyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function getAllCourse()
    {
        $courses = Course::where('publish', 'Published')->get();

        return Inertia::render('Welcome', [
            'data' => $courses,
        ]);
    }


    public function getSingleCourse(string $id)
    {
        $user = Auth::user();

        $courses = Course::where('publish', 'Published')->get();

        $data = DB::table('course')
            ->join('users', 'course.course_teacher', '=', 'users.id')
            ->where('course.id', $id)
            ->select('users.*', 'course.*')
            ->first();

        $chapters = Chapter::where('course_id', $id)->orderBy('id')->get();

        $isEnrolled = $user ? Enrollments::where('student_id', $user->id)
            ->where('course_id', $id)
            ->first() : null;

        $completedChapters = [];
        if ($user) {
            $completedChapters = ChapterCompletion::where('student_id', $user->id)
                ->whereIn('chapter_id', $chapters->pluck('id'))
                ->where('status', 'Completed')
                ->orderBy('id', 'desc')
                ->pluck('chapter_id')
                ->toArray();
        }

        $feedbacks = DB::table('feedback')
            ->where('course_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();


        $courseExam = CourseExam::where('course_id', '=', $id)->get();

        $cheatingRecord = CheatingDetection::where('course_id', $id)
            ->where('user_id', $user?->id)
            ->where('is_detected', true)
            ->orderBy('created_at', 'desc')
            ->first();

        $cheatingBanUntil = $cheatingRecord?->cheating_ban_until;

        $course_percentage = ExamResults::where('course_id', $id)
            ->where('user_id', $user?->id)
            ->value('percentage');


        return Inertia::render('CourseDescription', [
            'courses' => $courses,
            'singleCourse' => $data,
            'chapters' => $chapters,
            'isEnrolled' => $isEnrolled,
            'completedChapters' => $completedChapters,
            'feedbacks' => $feedbacks,
            'courseExam' => $courseExam,
            'cheatingBanUntil' => $cheatingBanUntil,
            'course_percentage' => $course_percentage
        ]);
    }


    // protected $webPurifyService;

    // public function __construct(WebPurifyService $webPurifyService)
    // {
    //     $this->webPurifyService = $webPurifyService;
    // }


    public function submitCourse(Request $request)
    {
        $request->validate([
            'course_title' => 'required|string|min:10',
            'course_desc' => 'required|string|min:20',
            'course_category' => 'required|string|in:It,Business,Science,Engineering,Humanities,Other',
            'course_hours' => 'required|integer',
            'course_level' => 'required|string|in:Easy,Hard,Medium',
            'course_amount' => 'required|string',
            'course_image' => 'required|string',
        ]);

        $user = Auth::user();



        // Create Course
        $course = Course::create([
            'course_teacher' => $user->id,
            'course_title' => $request->course_title,
            'course_desc' => $request->course_desc,
            'course_category' => $request->course_category,
            'course_hours' => $request->course_hours,
            'course_level' => $request->course_level,
            'course_image' => $request->course_image,
            'course_amount' => $request->course_amount,
        ]);



        return Redirect::to('/user_dashboard');
    }


    public function publishCourse($id)
    {
        $user = Auth::user();

        $publishedCount = Course::where('course_teacher', $user->id)
            ->where('publish', 'Published')
            ->count();

        $status = $publishedCount >= 3 ? 'Published' : 'Pending';

        Course::where('id', $id)->update([
            'publish' => $status
        ]);

        return back();
    }



    public function removeCourse($id)
    {
        Course::where('id', '=', $id)->delete();

        return back();
    }



    public function storeFeedback(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'course_id' => 'required|exists:course,id',
            'rating' => 'required|in:1,3,5',
            'comment' => 'required|string|min:3',
        ]);

        Feedback::create([
            'course_id' => $validated['course_id'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'user_name' => $user->name,
            'created_at' => now(),
        ]);

        // Calculate the average rating and round to 1 decimal place
        $avgRating = Feedback::where('course_id', $validated['course_id'])
            ->selectRaw('AVG(CAST(rating AS INTEGER)) as avg_rating')
            ->value('avg_rating');

        $avgRating = round($avgRating, 1); // round to 1 decimal place

        Course::where('id', $validated['course_id'])
            ->update(['course_rating' => $avgRating]);

        return back()->with('success', 'Feedback submitted.');
    }

    public function removeFeedback($id)
    {
        $feedback = Feedback::findOrFail($id);
        $courseId = $feedback->course_id;

        $feedback->delete();

        $avgRating = Feedback::where('course_id', $courseId)
            ->selectRaw('AVG(CAST(rating AS INTEGER)) as avg_rating')
            ->value('avg_rating');

        $avgRating = $avgRating ? round($avgRating, 1) : null;

        // Update course rating
        Course::where('id', $courseId)
            ->update(['course_rating' => $avgRating]);

        return back()->with('success', 'Feedback deleted and rating updated.');
    }
}
