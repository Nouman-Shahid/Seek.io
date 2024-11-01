<?php

namespace App\Http\Controllers;

use App\Models\CheatingDetection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheatingDetectionController extends Controller
{

    public function ExamCancel($id)
    {
        $user = Auth::user();

        CheatingDetection::create([
            'user_id' => $user->id,
            'course_id' => $id,
            'is_detected' => 'true',
            'created_at' => now(),
            'updated_at' => now(),
            'cheating_ban_until' => now()->addDays(2)

        ]);


        return Inertia::render('ExamCancel');
    }
}
