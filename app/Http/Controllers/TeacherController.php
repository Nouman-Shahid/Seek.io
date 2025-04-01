<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\TeacherWallet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TeacherController extends Controller
{


    public function teacherWithdrawl($id)
    {
        $teacher = TeacherWallet::where('teacher_id', '=', $id)->first();

        $course_Enrollments = DB::table('enrollments')->join('course', 'enrollments.course_id', '=', 'course.id')
            ->where('course.course_teacher', '=', $id)
            ->select('enrollments.*', 'course.*')->get();

        return Inertia::render('TeacherEarning', ['TeacherWallet' => $teacher, 'Enrollments' => $course_Enrollments]);
    }
}
