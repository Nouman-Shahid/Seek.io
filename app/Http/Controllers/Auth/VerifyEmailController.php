<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        $user = Auth::user();

        if ($request->user()->hasVerifiedEmail()) {
            if ($user->role === NULL) {
                return redirect()->route('user_roles');
            }
            if ($user->preference === NULL) {
                return redirect()->route('preferences');
            }
            return redirect()->intended(route('home', absolute: false) . '?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        if ($user->role === NULL) {
            return redirect()->route('user_roles');
        }
        if ($user->preference === NULL) {
            return redirect()->route('preferences');
        }

        return redirect()->intended(route('home', absolute: false) . '?verified=1');
    }
}
