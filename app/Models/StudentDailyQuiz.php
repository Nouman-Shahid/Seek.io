<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentDailyQuiz extends Model
{
    protected $table = 'student_daily_quizzes';
    protected $guarded = [];

    public $timestamps = false;
}
