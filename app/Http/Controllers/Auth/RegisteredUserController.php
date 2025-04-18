<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => [
                'required',
                'confirmed',
                'min:8', // minimum length of 8 characters
                // 'regex:/[A-Z]/', // at least one uppercase letter
                // 'regex:/[a-z]/', // at least one lowercase letter
                // 'regex:/[0-9]/', // at least one number
                // 'regex:/[\W_]/', // at least one special character (e.g. !@#$%^&*)
                Rules\Password::defaults() // default password rules (if needed)
            ],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);
        $user = Auth::user();

        if ($user->email_verified_at === NULL) {
            return redirect()->route('verification.notice');
        }

        return redirect(route('home', absolute: false));
    }
}
