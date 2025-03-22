<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\User;
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
            'profile_headline' => 'required|string|max:500',
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

    public function getTeacherDetails()
    {
        $user = Auth::user();
        $data = User::where('id', $user->id)->first();
        $courses = Course::where('course_teacher', $user->id)->get(); // Fix applied

        return Inertia::render('UserDashboard', [
            'user' => $data,
            'course' => $courses
        ]);
    }
}
