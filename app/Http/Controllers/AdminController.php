<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\DailyQuizzes;
use App\Models\Enrollments;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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
        $courses = Course::orderBy('publish')->paginate(8);

        return Inertia::render('Admin/AdminCourses', [
            'courses' => $courses,

        ]);
    }
    public function changePublishStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Published,Pending,Draft',
        ]);

        Course::where('id', $id)->update([
            'publish' => $request->status,
        ]);

        return back();
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

    public function getQuiz()
    {
        $quizzes = DailyQuizzes::all();

        return Inertia::render('Admin/AdminQuiz', ['quizzes' => $quizzes]);
    }
    public function storeQuiz(Request $request)
    {
        $request->validate([
            'title' => 'required|string|min:3',
            'question' => 'required|string|min:3',
            'option' => 'required|string|min:3',
            'category' => 'required|string'
        ]);

        DailyQuizzes::create([
            'title' => $request->title,
            'question' => $request->question,
            'options' => $request->option,
            'category' => $request->category,
            'created_at' => now(),
            'updated_at' => now(),
        ]);


        return Redirect::back();
    }


    public function removeQuiz($id)
    {
        DailyQuizzes::where('id', $id)->delete();

        return Redirect::back();
    }
}
