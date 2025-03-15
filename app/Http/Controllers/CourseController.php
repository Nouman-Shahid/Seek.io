<?php

namespace App\Http\Controllers;

use App\Models\Course;
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
        $courses = Course::all();

        return Inertia::render('Welcome', [
            'data' => $courses,
        ]);
    }


    public function getSingleCourse(string $id)
    {

        $courses = Course::all();

        $data = DB::table('course')
            ->join('users', 'course.course_teacher', '=', 'users.id')
            ->where('course.id', $id)
            ->select('users.*', 'course.*')
            ->first();

        return Inertia::render('CourseDescription', [
            'courses' => $courses,
            'data' => $data
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
            'course_title' => 'required|string|max:255',
            'course_desc' => 'required|string|max:255',
            'course_category' => 'required|string',
            'course_hours' => 'required|integer',
            'course_level' => 'required|string',
            'course_amount' => 'required|string',
            'course_image' => 'required|string|max:51200',
            'content_media' => 'required|string|max:1048576',
            'content_desc' => 'required|string',
            'module_name' => 'required|string',
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
            'content_media' => $request->content_media,
            'content_desc' => $request->content_desc,
            'course_amount' => $request->course_amount,
            'module_name' => $request->module_name,
        ]);

        return Redirect::to('/teacherdashboard');
    }
}
