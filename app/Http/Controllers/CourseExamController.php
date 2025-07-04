<?php

namespace App\Http\Controllers;

use App\Models\CheatingDetection;
use App\Models\Course;
use App\Models\CourseExam;
use App\Models\ExamResults;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use phpDocumentor\Reflection\DocBlock\Tags\Example;

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

    public function deleteQuestion($id)
    {
        DB::table('exam_questions')->where('id', $id)->delete();

        return back();
    }


    public function saveExam($id)
    {
        $questionCount = DB::table('exam_questions')->where('course_id', $id)->count();

        $exam = CourseExam::where('course_id', $id)->first();

        if ($exam) {
            $exam->update([
                'exam_time' => $questionCount,
            ]);
        } else {
            CourseExam::create([
                'course_id' => $id,
                'exam_time' => $questionCount,
                'isPublished' => 'Published',
                'created_at' => now()
            ]);
        }

        return back()->with('message', 'Exam saved successfully!');
    }



    public function getExamInfo($id)
    {
        $user = Auth::user();

        $exam = CourseExam::where('course_id', "=", $id)->first();

        $course = Course::find($id);



        $cheatingRecord = CheatingDetection::where('course_id', $id)
            ->where('user_id', $user?->id)
            ->where('is_detected', true)
            ->orderBy('created_at', 'desc')
            ->first();

        $cheatingBanUntil = $cheatingRecord?->cheating_ban_until;

        // dd($exam, $course); 

        return Inertia::render('ExamInstructions', [
            'exam' => $exam,
            'course' => $course,
            'cheatingBanUntil' => $cheatingBanUntil
        ]);
    }

    public function exam($id)
    {
        $user = Auth::user();

        $course = Course::find($id);

        // Fetch all questions related to this course
        $questions = DB::table('exam_questions')
            ->where('course_id', $id)
            ->get();

        // Fetch options for each question
        $questionsWithOptions = $questions->map(function ($question) {
            $options = DB::table('question_options')
                ->where('question_id', $question->id)
                ->get();

            $question->options = $options;
            return $question;
        });

        $cheatingRecord = CheatingDetection::where('course_id', $id)
            ->where('user_id', $user?->id)
            ->where('is_detected', true)
            ->orderBy('created_at', 'desc')
            ->first();

        $cheatingBanUntil = $cheatingRecord?->cheating_ban_until;

        return Inertia::render('CourseExam', [
            'course' => $course,
            'questions' => $questionsWithOptions,
            'cheatingBanUntil' => $cheatingBanUntil
        ]);
    }


    public function submit(Request $request, $courseId)
    {
        $user = Auth::user();
        $answers = $request->input('answers');

        if (!is_array($answers)) {
            return back()->with('error', 'Invalid answers format.');
        }

        $score = 0;

        foreach ($answers as $answer) {
            $questionId = $answer['questionId'];
            $selectedOptionId = $answer['selectedOption'];

            if (!$selectedOptionId) continue;

            $isCorrect = DB::table('question_options')
                ->where('question_id', $questionId)
                ->where('id', $selectedOptionId)
                ->where('is_correct', true)
                ->exists();

            if ($isCorrect) {
                $score++;
            }
        }

        ExamResults::create([
            'user_id' => $user->id,
            'course_id' => $courseId,
            'score' => $score,
            'created_at' => now(),
        ]);


        return redirect()->route('exam_results', ['id' => $courseId]);
    }


    public function results($courseId)
    {
        $user = Auth::user();

        // Fetch the latest result for the user and course
        $results = DB::table('exam_results')
            ->join('course', 'course.id', '=', 'exam_results.course_id')
            ->where('exam_results.user_id', '=', $user->id)
            ->where('exam_results.course_id', '=', $courseId)
            ->orderBy('exam_results.created_at', 'desc') // Get the latest result
            ->select('course.*', 'exam_results.*')
            ->first();

        if (!$results) {
            abort(404, 'Result not found');
        }

        $total_questions = DB::table('exam_questions')
            ->where('course_id', '=', $courseId)
            ->count();

        $percentage = $results->score / $total_questions * 100;

        ExamResults::where('course_id', $courseId)
            ->update(['percentage' => $percentage]);

        return Inertia::render('ExamResults', [
            'results' => $results,
            'total_questions' => $total_questions,
            'percentage' => $percentage,
        ]);
    }
}
