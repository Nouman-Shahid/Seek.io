<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function addToCart($id)
    {
        $user = Auth::user();

        $course = Course::find($id);
        $user_detail = User::find($user->id);

        // if (!$course) {
        //     return response()->json(['error' => 'Course not found'], 404);
        // }

        // if (!$user_detail) {
        //     return response()->json(['error' => 'User not found'], 404);
        // }

        // Add course to cart
        $cartItems = Cart::create([
            'student_id' => $user->id,
            'course_id' => $id,

        ]);

        return Inertia::render('Cart', [
            'courses' => $course,
            'data' => $user_detail
        ]);
    }
}
