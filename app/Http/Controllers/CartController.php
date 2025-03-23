<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
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


        $cartCourses = DB::table('cart')
            ->join('course', 'cart.course_id', '=', 'course.id')
            ->join('users', 'course.course_teacher', '=', 'users.id')
            ->select('users.*', 'course.*')
            ->get();



        $allcourses = Course::all();


        return Inertia::render('Cart', [
            'courses' => $cartCourses,
            'allcourses' => $allcourses
        ]);
    }

    public function removeCourse($id)
    {
        Cart::where('course_id', $id)->delete();
        return Redirect::route('cart');
    }

    public function validateCoupon(Request $request)
    {
        $validated = $request->validate([
            'coupon_code' => 'required|string|max:10'
        ]);

        $coupon = DB::table('coupon_code')->where('code', $validated['coupon_code'])->first();

        if (!$coupon) {
            return back()->withErrors(['coupon_code' => 'Invalid coupon code. Please try again.']);
        }

        // Storing data in session 
        Session::put('coupon', [
            'code' => $coupon->code,
            'discount' => $coupon->discount
        ]);

        return back();
    }

    public function removeCoupon(Request $request)
    {
        Session::forget('coupon');
        return back();
    }
}
