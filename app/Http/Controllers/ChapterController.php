<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;

class ChapterController extends Controller
{
    public function addOrUpdateChapter(Request $request, $courseId)
    {
        $validated = $request->validate([
            'chapterTitle' => 'required|string|min:3|max:255',
            'chapterDesc' => 'required|string|min:20|max:300',
            'chapterVideo' => 'required|url',
            'isPreview' => 'boolean',
            'chapterId' => 'nullable|exists:chapters,id', // Optional for updates
        ]);

        // If chapterId is passed, we're updating; otherwise, we're creating
        if (!empty($validated['chapterId'])) {
            $chapter = Chapter::where('id', $validated['chapterId'])
                ->where('course_id', $courseId)
                ->firstOrFail();

            $chapter->update([
                'title' => $validated['chapterTitle'],
                'desc' => $validated['chapterDesc'],
                'video' => $validated['chapterVideo'],
                'preview' => $validated['isPreview'] ?? false,
            ]);

            $message = 'Chapter updated successfully!';
        } else {
            Chapter::create([
                'course_id' => $courseId,
                'title' => $validated['chapterTitle'],
                'desc' => $validated['chapterDesc'],
                'video' => $validated['chapterVideo'],
                'preview' => $validated['isPreview'],
            ]);

            $message = 'Chapter created successfully!';
        }

        return back()->with('success', $message);
    }




    public function removeChapter($id)
    {
        Chapter::where('id', '=', $id)->delete();

        return back();
    }
}
