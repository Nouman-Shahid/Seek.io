<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chapter extends Model
{
    protected $table = 'chapter';
    protected $guarded = [];
    public $timestamps = false;

    // Serialized as "0"/"1" strings to match the React frontend's
    // strict comparisons (e.g. `chapter.preview === "0"`).
    protected $casts = [
        'preview' => 'string',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function completions(): HasMany
    {
        return $this->hasMany(ChapterCompletion::class, 'chapter_id');
    }
}
