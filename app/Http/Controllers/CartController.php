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
        $courses = Course::find($id)->first();
        $user_detail = User::find($id)->first();

        $cartItems = Cart::create([

            'student_id' => $user->id,
            'course_id' => $id,

        ]);

        return Inertia::render('Cart.jsx', [
            'courses' => $courses,
            'data' => $user_detail
        ]);
    }
}
