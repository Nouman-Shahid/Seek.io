<?php

namespace App\Http\Controllers;

use App\Models\DailyQuizzes;
use App\Models\StudentDailyQuiz;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChallengeController extends Controller
{
    public function getDailyChallenge()
    {
        $user = Auth::user();

        $dailyquiz = DailyQuizzes::where('category', $user->preference)->first();

        $latestAttempt = StudentDailyQuiz::where('user_id', $user->id)
            ->whereDate('quiz_date', now()->toDateString())
            ->latest()
            ->first();

        $streak = $latestAttempt ? $latestAttempt->streak_count : 0;
        $isCorrect = $latestAttempt ? $latestAttempt->is_correct : null;

        return Inertia::render('DailyChallenge', [
            'dailyquiz'   => $dailyquiz,
            'streakCount' => $streak,
            'isCorrect'   => $isCorrect,
        ]);
    }


    public function checkAnswer(Request $request)
    {
        $request->validate([
            'answer' => 'required|string',
            'quiz_id' => 'required|exists:daily_quizzes,id',
        ]);

        $user = Auth::user();
        $quiz = DailyQuizzes::find($request->quiz_id);
        $today = now()->toDateString();

        // Case-insensitive comparison
        $isCorrect = trim(strtolower($request->answer)) === trim(strtolower($quiz->options));

        $lastAttempt = StudentDailyQuiz::where('user_id', $user->id)
            ->whereDate('quiz_date', '<', $today)
            ->latest('quiz_date')
            ->first();

        $yesterday = now()->subDay()->toDateString();
        $previousStreak = ($lastAttempt && $lastAttempt->is_correct && $lastAttempt->quiz_date === $yesterday)
            ? $lastAttempt->streak_count
            : 0;

        $currentStreak = $isCorrect ? ($previousStreak + 1) : 0;

        // Save attempt
        StudentDailyQuiz::updateOrCreate(
            ['user_id' => $user->id, 'quiz_date' => $today],
            [
                'preference'      => $quiz->category,
                'question'        => $quiz->question,
                'selected_answer' => $request->answer,
                'correct_answer'  => $quiz->options,
                'is_correct'      => $isCorrect,
                'streak_count'    => $currentStreak,
            ]
        );

        return back();
    }
}
