<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function storeUserDetails(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'role' => 'required|in:Student,Teacher',
            'course' => 'required|in:It,Business,Science,Engineering,Humanities,Other',
            'profile_image' => 'required|string|max:500',
            'location' => 'required|string|max:500',
            'profile_about' => 'required|string|max:500',
            'profile_headline' => 'required|string|max:500',
        ]);


        $request->user()->update([
            'role' => $request->role,
            'preference' => $request->course,
            'profile_image' => $request->profile_image,
            'address' => $request->location,
            'profile_about' => $request->profile_about,
            'profile_headline' => $request->profile_headline,
        ]);

        // if ($user->preference === NULL) {
        //     return redirect()->route('user_details');
        // }

        return Redirect::to('/');
    }
}
