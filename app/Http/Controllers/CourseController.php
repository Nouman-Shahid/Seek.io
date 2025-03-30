<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\Enrollments;
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

        $chapters = Chapter::where('course_id', $id)->get();

        $isEnrolled = $user ? Enrollments::where('student_id', $user->id)
            ->where('course_id', $id)
            ->first() : null;

        return Inertia::render('CourseDescription', [
            'courses' => $courses,
            'singleCourse' => $data,
            'chapters' => $chapters,
            'isEnrolled' => $isEnrolled
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
            'course_title' => 'required|string|min:10|max:255',
            'course_desc' => 'required|string|min:20|max:500',
            'course_category' => 'required|string|in:It,Business,Science,Engineering,Humanities,Other',
            'course_hours' => 'required|integer',
            'course_level' => 'required|string|in:Easy,Hard,Medium',
            'course_amount' => 'required|string',
            'course_image' => 'required|string|max:51200',
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
        Course::where('id', $id)->update([
            'publish' => 'Published'
        ]);

        return back();
    }
}
