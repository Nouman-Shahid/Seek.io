<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $validated = $request->validate([
            'searchdata' => 'required|string|max:100',
        ]);

        return redirect()->route('search.results', ['query' => $validated['searchdata']]);
    }

    public function showResults(Request $request)
    {
        $search = trim($request->query('query', ''));

        if (empty($search)) {
            return Inertia::render('SearchedResults', [
                'results' => [],
                'count' => 0,
                'query' => '',
            ]);
        }

        $searchTerms = array_filter(explode(' ', $search), function ($term) {
            return !empty(trim($term));
        });

        // Enhanced Course Query
        $courseQuery = DB::table('course')
            ->select(
                'id',
                'course_title as name',
                'course_amount as price',
                'course_level',
                'course_image as image',
                'course_category',
                'course_rating',
                'course_desc as description',
                DB::raw("NULL as profile_image"),
                DB::raw("NULL as profile_headline"),
                DB::raw("NULL as email"),
                DB::raw("'course' as type"),
                DB::raw("(publish = 'Published')::integer as is_published") // Cast to integer
            )
            ->where('publish', 'Published')
            ->where(function ($query) use ($search, $searchTerms) {
                $query->where('course_title', 'LIKE', "%{$search}%")
                    ->orWhere('course_category', 'LIKE', "%{$search}%");

                foreach ($searchTerms as $term) {
                    $query->orWhere('course_title', 'LIKE', "%{$term}%")
                        ->orWhere('course_category', 'LIKE', "%{$term}%")
                        ->orWhere('course_desc', 'LIKE', "%{$term}%")
                        ->orWhere('course_level', 'LIKE', "%{$term}%");
                }

                if (is_numeric($search)) {
                    $query->orWhere('course_amount', '=', (float)$search)
                        ->orWhere('course_rating', '=', (float)$search);
                }
            });

        // Enhanced User Query
        $userQuery = DB::table('users')
            ->select(
                'id',
                'name',
                DB::raw("NULL as price"),
                DB::raw("NULL as course_level"),
                'profile_image as image',
                DB::raw("NULL as course_category"),
                DB::raw("NULL as course_rating"),
                'profile_headline as description',
                'profile_image',
                'profile_headline',
                'email',
                DB::raw("'user' as type"),
                DB::raw("1 as is_published") // Already integer
            )
            ->where(function ($query) use ($search, $searchTerms) {
                $query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('profile_headline', 'LIKE', "%{$search}%");

                foreach ($searchTerms as $term) {
                    $query->orWhere('name', 'LIKE', "%{$term}%")
                        ->orWhere('profile_headline', 'LIKE', "%{$term}%")
                        ->orWhere('email', 'LIKE', "%{$term}%");
                }
            });

        // Combine queries with proper scoring
        $results = DB::query()
            ->fromSub($courseQuery->unionAll($userQuery), 'combined')
            ->orderByRaw("
                CASE 
                    WHEN type = 'course' AND name LIKE ? THEN 1
                    WHEN type = 'course' AND name LIKE ? THEN 2
                    WHEN type = 'course' AND description LIKE ? THEN 3
                    WHEN type = 'user' AND name LIKE ? THEN 4
                    WHEN type = 'user' AND email LIKE ? THEN 5
                    ELSE 6
                END
            ", [
                $search . '%',
                '%' . $search . '%',
                '%' . $search . '%',
                $search . '%',
                $search . '%'
            ])
            ->get();

        return Inertia::render('SearchedResults', [
            'results' => $results,
            'count' => $results->count(),
            'query' => $search,
        ]);
    }
}
