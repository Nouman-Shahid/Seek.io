<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function storeUserRole(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'role' => 'required|in:Student,Teacher',
        ]);


        $request->user()->update([
            'role' => $request->role,
        ]);

        if ($user->preference === NULL) {
            return redirect()->route('preferences');
        }

        return Inertia::render('Home', [
            'message' => 'Role updated successfully!',
        ]);
    }
    public function storePreferences(Request $request)
    {
        $request->validate([
            'course' => 'required|string',
        ]);


        $request->user()->update([
            'preference' => $request->course,
        ]);
        return redirect()->route('home');
    }
}
