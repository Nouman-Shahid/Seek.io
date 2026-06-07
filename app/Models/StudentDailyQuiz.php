<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentDailyQuiz extends Model
{
    protected $table = 'student_daily_quizzes';
    protected $guarded = [];

    public $timestamps = false;

    protected $casts = [
        'quiz_date' => 'date',
        'is_correct' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
