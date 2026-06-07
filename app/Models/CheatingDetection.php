<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CheatingDetection extends Model
{
    protected $table = 'cheating_detections';
    protected $guarded = [];

    public $timestamps = false;

    protected $casts = [
        'is_detected' => 'boolean',
        'cheating_ban_until' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
