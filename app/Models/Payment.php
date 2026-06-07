<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $table = 'payment';
    protected $guarded = [];
    public $timestamps = false;

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
