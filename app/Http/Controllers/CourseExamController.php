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
        $course = Course::findOrFail($id);

        $questions = DB::table('exam_questions')
            ->where('course_id', $id)
            ->select('id', 'question_text', 'marks')
            ->get()
            ->map(function ($question) {
                $question->options = DB::table('question_options')
                    ->where('question_id', $question->id)
                    ->select('id', 'option_text', 'is_correct')
                    ->get();
                return $question;
            });

        return Inertia::render('MakeExam', [
            'course' => $course,
            'questions' => $questions
        ]);
    }



    public function storeQuestion(Request $request, $id)
    {
        $request->validate([
            'question' => 'required|string|min:5|max:250',
            'options' => 'required|array|min:4',
            'options.*' => 'required|string|min:1|max:250',
            'correctAnswerIndex' => 'required|integer|min:0|max:3',
        ]);

        $question = DB::table('exam_questions')->insertGetId([
            'course_id' => $id,
            'question_text' => $request->question,
            'marks' => 1,
            'created_at' => now(),
        ]);

        if (!$question) {
            return back()->with('error', 'Failed to insert question.');
        }

        foreach ($request->options as $index => $optionText) {
            DB::table('question_options')->insert([
                'question_id' => $question,
                'option_text' => $optionText,
                'is_correct' => $index == $request->correctAnswerIndex,
                'created_at' => now(),
            ]);
        }

        return back()->with('success', 'Question added successfully!');
    }



    public function updateQuestion(Request $request, $id)
    {
        $request->validate([
            'question_text' => 'required|string|min:5|max:250',
            'options' => 'required|array|min:2',
            'correctAnswerIndex' => 'required|integer',
        ]);

        DB::table('exam_questions')
            ->where('id', $id)
            ->update(['question_text' => $request->question_text]);

        $existingOptions = DB::table('question_options')
            ->where('question_id', $id)
            ->orderBy('id')
            ->get();

        foreach ($existingOptions as $index => $option) {
            DB::table('question_options')
                ->where('id', $option->id)
                ->update([
                    'option_text' => $request->options[$index],
                    'is_correct' => ($index == $request->correctAnswerIndex) ? 1 : 0,
                ]);
        }

        return back()->with('success', 'Question updated successfully!');
    }
}
