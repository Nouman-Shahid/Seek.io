<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CartController extends Controller
{
    public function addToCart($id)
    {
        $user = Auth::user();

        // Add course to cart 
        $cartItem = Cart::firstOrCreate([
            'student_id' => $user->id,
            'course_id' => $id,
        ]);

        return Redirect::route('cart');
    }

    public function getCart()
    {
        $user = Auth::user();

        // Retrieve all courses in the cart 
        $cartCourses = Cart::where('student_id', $user->id)->pluck('course_id');
        // Fetch full course details for the courses in the cart
        $course = Course::whereIn('id', $cartCourses)->get();

        $allcourses = Course::all();


        return Inertia::render('Cart', [
            'courses' => $course,
            'user' => $user,
            'data' => $allcourses
        ]);
    }

    public function removeCourse($id)
    {
        Cart::where('course_id', $id)->delete();
        return Redirect::route('cart');
    }
}
