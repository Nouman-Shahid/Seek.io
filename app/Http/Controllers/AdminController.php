<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollments;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function getDashboard()
    {
        $studentCount = User::where('role', '=', 'Student')->count();
        $teacherCount = User::where('role', '=', 'Teacher')->count();
        $courseCount = Course::where('publish', '=', 'Published')->count();
        $enrollmentCount =  Enrollments::count();

        return Inertia::render('Admin/AdminDashboard', [
            'studentCount' => $studentCount,
            'teacherCount' => $teacherCount,
            'courseCount' => $courseCount,
            'enrollmentCount' => $enrollmentCount
        ]);
    }

    public function getCourses()
    {
        $courses = Course::all();

        return Inertia::render('Admin/AdminCourses', [
            'courses' => $courses,

        ]);
    }

    public function getStudents()
    {
        $students = User::where('role', '=', 'Student')->get();

        return Inertia::render('Admin/AdminStudent', [
            'students' => $students,

        ]);
    }
    public function getTeachers()
    {
        $teachers = User::where('role', '=', 'Teacher')->get();

        return Inertia::render('Admin/AdminTeacher', [
            'teachers' => $teachers,

        ]);
    }
}
