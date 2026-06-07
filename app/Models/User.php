<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'cheating_ban_until' => 'datetime',
        ];
    }

    /**
     * Courses authored by this user (as a Teacher).
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'course_teacher');
    }

    /**
     * Courses this user is enrolled in (as a Student).
     */
    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollments::class, 'student_id');
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(Cart::class, 'student_id');
    }

    public function chapterCompletions(): HasMany
    {
        return $this->hasMany(ChapterCompletion::class, 'student_id');
    }

    public function examResults(): HasMany
    {
        return $this->hasMany(ExamResults::class, 'user_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'student_id');
    }

    public function wallet(): HasOne
    {
        return $this->hasOne(TeacherWallet::class, 'teacher_id');
    }

    public function dailyQuizAttempts(): HasMany
    {
        return $this->hasMany(StudentDailyQuiz::class, 'user_id');
    }
}
