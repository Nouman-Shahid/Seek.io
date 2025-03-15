<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $validated = $request->validate([
            'searchdata' => 'required|string|max:100',
        ]);

        $search = $validated['searchdata'];

        // Search for courses
        $courseQuery = DB::table('course')
            ->select(
                'id',
                'course_title as name',
                'module_name',
                'course_amount as price',
                'course_level',
                'course_image as image',
                'course_category',
                'course_desc as description',
                DB::raw("'course' as type")
            )
            ->where(function ($query) use ($search) {
                $query->where('course_title', 'like', "%{$search}%")
                    ->orWhere('module_name', 'like', "%{$search}%")
                    ->orWhere('course_amount', 'like', "%{$search}%")
                    ->orWhere('course_level', 'like', "%{$search}%")
                    ->orWhere('course_category', 'like', "%{$search}%")
                    ->orWhere('course_desc', 'like', "%{$search}%");
            });

        // Search for users
        $userQuery = DB::table('users')
            ->select(
                'id',
                'name',
                DB::raw("NULL as module_name"),
                DB::raw("NULL as price"),
                DB::raw("NULL as course_level"),
                DB::raw("NULL as course_category"),
                DB::raw("NULL as description"),
                DB::raw("NULL as image"),
                DB::raw("'user' as type")
            )
            ->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });

        // Merge results using UNION
        $results = $courseQuery->union($userQuery)->get();
        $count = $results->count();

        return Inertia::render('SearchedResults', [
            'results' => $results,
            'count' => $count,
        ]);
    }
}
