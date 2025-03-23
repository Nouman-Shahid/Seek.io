<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    // Step 2.1: Process Search Input and Redirect to Results Page
    public function search(Request $request)
    {
        $validated = $request->validate([
            'searchdata' => 'required|string|max:100',
        ]);

        return redirect()->route('search.results', ['query' => $validated['searchdata']]);
    }

    // Step 2.2: Fetch Results and Show Page
    public function showResults(Request $request)
    {
        $search = $request->query('query', '');

        if (!$search) {
            return Inertia::render('SearchedResults', [
                'results' => [],
                'count' => 0,
            ]);
        }

        // Query courses
        $courseQuery = DB::table('course')
            ->select(
                'id',
                'course_title as name',
                'module_name',
                'course_amount as price',
                'course_level',
                'course_image as image',
                'course_category',
                'course_rating',
                'course_desc as description',
                DB::raw("NULL as profile_image"),
                DB::raw("NULL as profile_headline"),
                DB::raw("NULL as email"),
                DB::raw("'course' as type")
            )
            ->where(function ($query) use ($search) {
                $query->where('course_title', 'like', "%{$search}%")
                    ->orWhere('module_name', 'like', "%{$search}%")
                    ->orWhere('course_category', 'like', "%{$search}%");
            });

        // Query users
        $userQuery = DB::table('users')
            ->select(
                'id',
                'name',
                DB::raw("NULL as module_name"),
                DB::raw("NULL as price"),
                DB::raw("NULL as course_level"),
                DB::raw("NULL as image"),
                DB::raw("NULL as course_category"),
                DB::raw("NULL as course_rating"),
                DB::raw("NULL as description"),
                'profile_image',
                'profile_headline',
                'email',
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
            'query' => $search, // Pass search query for UI use
        ]);
    }
}
