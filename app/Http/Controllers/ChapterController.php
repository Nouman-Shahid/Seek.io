<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;

class ChapterController extends Controller
{
    public function addChapter(Request $request, $id)
    {
        $validated = $request->validate([
            'chapterTitle' => 'required|string|min:3|max:255',
            'chapterDesc' => 'required|string|min:20|max:300',
            'chapterVideo' => 'required|url',
            'isPreview' => 'boolean',
        ]);

        Chapter::create([
            'course_id' => $id,
            'title' => $validated['chapterTitle'],
            'desc' => $validated['chapterDesc'],
            'video' => $validated['chapterVideo'],
            'preview' => $validated['isPreview'],
        ]);

        return back()->with('success', 'Chapter added successfully!');
    }
}
