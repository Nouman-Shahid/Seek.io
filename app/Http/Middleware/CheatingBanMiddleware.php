<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\Response;

class CheatingBanMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // Check if user is logged in and has an active ban
        if ($user && $user->cheating_ban_until && Carbon::parse($user->cheating_ban_until)->isFuture()) {
            return redirect()->route('home')->with('error', 'You are temporarily banned until ' . Carbon::parse($user->cheating_ban_until)->format('d-m-Y') . '.');
        }

        return $next($request);
    }
}
