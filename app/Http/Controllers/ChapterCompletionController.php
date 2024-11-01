<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\ChapterCompletion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChapterCompletionController extends Controller
{
    public function markComplete($id)
    {
        $user = Auth::user();

        $chapter = Chapter::find($id);

        // Checking if record already exists or not
        $completion = ChapterCompletion::where('student_id', $user->id)
            ->where('chapter_id', $id)
            ->first();

        // Updating status if already exists
        if ($completion) {
            $completion->update([
                'status' => 'Completed',
            ]);
        } else {
            ChapterCompletion::create([
                'student_id' => $user->id,
                'course_id' => $chapter->course_id,
                'chapter_id' => $id,
                'status' => 'Completed',
            ]);
        }


        return back();
    }
}
