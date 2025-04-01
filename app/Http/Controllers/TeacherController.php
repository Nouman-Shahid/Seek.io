<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\TeacherWallet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TeacherController extends Controller
{


    public function teacherWithdrawl($id)
    {
        $teacher = TeacherWallet::where('teacher_id', '=', $id)->first();



        return Inertia::render('TeacherEarning', ['data' => $teacher]);
    }
}
