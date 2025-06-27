<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CheatingDetection extends Model
{
    protected $table = 'cheating_detections';
    protected $guarded = [];

    public $timestamps = false;
}
