<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeacherController extends Controller
{

    public function getTeacherDetails()
    {
        $user = Auth::user();
        $data = User::where('id', $user->id)->first();
        $courses = Course::where('course_teacher', $user->id)->get();

        // Debugging: Dump data and stop execution
        dd([
            'data' => $data,
            'course' => $courses
        ]);

        return Inertia::render('TeacherDashboard', [
            'data' => $data,
            'course' => $courses
        ]);
    }
}
