<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Course extends Model
{
    protected $table = 'course';
    protected $guarded = [];

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'course_teacher');
    }

    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class, 'course_id');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollments::class, 'course_id');
    }

    public function feedbacks(): HasMany
    {
        return $this->hasMany(Feedback::class, 'course_id');
    }

    public function exam(): HasOne
    {
        return $this->hasOne(CourseExam::class, 'course_id');
    }

    public function examResults(): HasMany
    {
        return $this->hasMany(ExamResults::class, 'course_id');
    }
}
