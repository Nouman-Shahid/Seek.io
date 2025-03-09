<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseExamController extends Controller
{
    public function getExamPage($id)
    {
        $data = Course::find($id);

        if (!$data) {
            return abort(404, 'Course not found.');
        }

        return Inertia::render('MakeExam', ['data' => $data]);
    }
}
