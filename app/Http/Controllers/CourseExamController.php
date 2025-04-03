<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CourseExamController extends Controller
{
    public function getExamPage($id)
    {
        // Get the course data
        $course = Course::find($id);

        if (!$course) {
            return abort(404, 'Course not found.');
        }

        // Get the questions associated with the course/exam
        $questions = DB::table('exam_questions')
            ->join('question_options', 'exam_questions.id', '=', 'question_options.question_id')
            ->where('course_id', $id)
            ->select('question_options.*', 'exam_questions.*')
            ->get();

        // Return the MakeExam page with the questions data
        return Inertia::render('MakeExam', [
            'course' => $course, // Passing course data
            'exam_questions' => $questions, // Passing questions data
        ]);
    }

    public function getQuestions($id)
    {
        $questions = DB::table('exam_questions')
            ->where('exam_id', $id)
            ->get();

        return response()->json(['questions' => $questions]);
    }

    public function storeQuestions(Request $request, $id)
    {
        $request->validate([
            'question' => 'required|string|min:10|max:250',
            'options' => 'required|array|min:4|max:4',
            'correctAnswer' => 'required|string|max:250',
            'marks' => 'required|integer|min:1|max:10',
        ]);

        $question_id = DB::table('exam_questions')->insertGetId([
            'course_id' => $id,
            'question_text' => $request->question,
            'marks' => $request->marks,
            'created_at' => now()
        ]);

        foreach ($request->options as $option) {
            DB::table('question_options')->insert([
                'question_id' => $question_id,
                'option_text' => $option,
                'is_correct' => ($option == $request->correctAnswer) ? 1 : 0,
                'created_at' => now()
            ]);
        }

        return back();
    }
}
