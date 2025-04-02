<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function storeUserDetails(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'role' => 'required|in:Student,Teacher',
            'course' => 'required|in:It,Business,Science,Engineering,Humanities,Other',
            'profile_image' => 'required|string|max:500',
            'location' => 'required|string|max:500',
            'profile_about' => 'required|string|max:500',
            'profile_headline' => 'required|string|max:400',
        ]);


        $request->user()->update([
            'role' => $request->role,
            'preference' => $request->course,
            'profile_image' => $request->profile_image,
            'address' => $request->location,
            'profile_about' => $request->profile_about,
            'profile_headline' => $request->profile_headline,
        ]);

        // if ($user->preference === NULL) {
        //     return redirect()->route('user_details');
        // }

        return Redirect::to('/');
    }

    public function updateUserDetails(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|min:3|max:40',
            'profile_image' => 'required|string',
            'address' => 'required|string|min:5|max:100',
            'profile_about' => 'required|string|min:100|max:1500',
            'profile_headline' => 'required|string|max:400',
        ]);


        $request->user()->update([
            'name' => $request->name,
            'profile_image' => $request->profile_image,
            'address' => $request->address,
            'profile_about' => $request->profile_about,
            'profile_headline' => $request->profile_headline,
        ]);
        return Redirect::to('/user_dashboard');
    }

    public function getUserDetails()
    {
        $user = Auth::user();

        // Fetch user details
        $data = User::find($user->id);

        // Fetch courses if user is a teacher
        $courses = Course::where('course_teacher', $user->id)->get();

        // Fetch enrolled courses if user is a student
        $enrolledCourses = DB::table('enrollments')
            ->join('course', 'enrollments.course_id', '=', 'course.id')
            ->where('enrollments.student_id', $user->id)
            ->select('course.*')
            ->get();

        return Inertia::render('UserDashboard', [
            'user' => $data,
            'coursesAsTeacher' => $courses,
            'coursesAsStudent' => $enrolledCourses
        ]);
    }
    public function showUserProfile($id)
    {
        $user =  User::find($id);
        $courses = Course::where('course_teacher', '=', $id)->get();

        return Inertia::render('MemberProfile', [
            'user' => $user,
            'data' => $courses
        ]);
    }
}
