<?php

namespace App\Http\Middleware;

use App\Models\Enrollments;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                // Course IDs the current user is enrolled in — used to show
                // an "Enrolled" badge on course cards across the app.
                'enrolledCourseIds' => $user
                    ? Enrollments::where('student_id', $user->id)
                        ->pluck('course_id')
                        ->map(fn ($id) => (int) $id)
                        ->values()
                    : [],
            ],
        ];
    }
}
