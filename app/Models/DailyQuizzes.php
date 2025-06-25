<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyQuizzes extends Model
{
    protected $table = 'daily_quizzes';

    protected $guarded = [];

    public $timestamps = false;
}
