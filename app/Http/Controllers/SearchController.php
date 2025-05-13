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

        // Course query
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
                DB::raw("'course' as type")
            )
            ->where(function ($query) use ($search, $searchTerms) {
                $query->where('course_title', 'LIKE', "%{$search}%")
                    ->orWhere('course_category', 'LIKE', "%{$search}%");

                foreach ($searchTerms as $term) {
                    $query->orWhere('course_title', 'LIKE', "%{$term}%")
                        ->orWhere('course_category', 'LIKE', "%{$term}%")
                        ->orWhere('course_desc', 'LIKE', "%{$term}%");
                }

                if (is_numeric($search)) {
                    $query->orWhere('course_amount', '=', (float)$search)
                        ->orWhere('course_rating', '=', (float)$search);
                }
            });

        // User query
        $userQuery = DB::table('users')
            ->select(
                'id',
                'name',
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
            ->where(function ($query) use ($search, $searchTerms) {
                $query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");

                foreach ($searchTerms as $term) {
                    $query->orWhere('name', 'LIKE', "%{$term}%")
                        ->orWhere('profile_headline', 'LIKE', "%{$term}%")
                        ->orWhere('email', 'LIKE', "%{$term}%");
                }
            });

        $combinedQuery = $courseQuery->union($userQuery);

        $results = collect(DB::table(DB::raw("({$combinedQuery->toSql()}) as combined"))
            ->mergeBindings($combinedQuery)
            ->get());

        $results = $results->sortBy(function ($item) use ($search) {
            $value = strtolower($item->name ?? '');
            return strpos($value, strtolower($search)) ?: PHP_INT_MAX;
        })->values();

        return Inertia::render('SearchedResults', [
            'results' => $results,
            'count' => $results->count(),
            'query' => $search,
        ]);
    }
}
