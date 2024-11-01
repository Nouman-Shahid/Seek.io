<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Course;
use App\Models\Enrollments;
use App\Models\Transaction;
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

        // Checkinguser shoulnt be already enroll in same course
        $isEnrolled = Enrollments::where('student_id', $user->id)
            ->where('course_id', $id)
            ->exists();

        if ($isEnrolled) {
            return Redirect::route('cart')->with('error', 'You are already enrolled in this course.');
        }

        Cart::firstOrCreate([
            'student_id' => $user->id,
            'course_id' => $id,
        ]);

        return Redirect::back();
    }


    public function getCart()
    {

        $user = Auth::user();

        $cartCourses = DB::table('cart')
            ->join('course', 'cart.course_id', '=', 'course.id')
            ->join('users', 'course.course_teacher', '=', 'users.id')
            ->where('cart.student_id', '=', $user->id)
            ->select('users.*', 'course.*')
            ->get();



        $courses = Course::where('publish', 'Published')->get();


        return Inertia::render('Cart', [
            'courses' => $cartCourses,
            'allcourses' => $courses
        ]);
    }

    public function removeCourse($id)
    {
        Cart::where('course_id', $id)->delete();
        return Redirect::route('cart');
    }

    public function validateCoupon(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'coupon_code' => 'required|string|max:10',
            'payment' => 'required|numeric|min:0',
        ]);

        $coupon = DB::table('coupon_code')->where('code', $validated['coupon_code'])->first();

        if (!$coupon) {
            return back()->withErrors(['coupon_code' => 'Invalid coupon code. Please try again.']);
        }

        // Store coupon details in session
        Session::put('coupon', [
            'code' => $coupon->code,
            'discount' => $coupon->discount
        ]);

        // Store transaction details in database
        Transaction::create([
            'payment' => $validated['payment'], // totalAfterDiscount
            'status' => 'Pending',
            'student_id' => $user->id,
            'code' => $coupon->code, // Store coupon code
        ]);

        return back()->with('success', 'Coupon applied successfully.');
    }


    public function removeCoupon()
    {
        $user = Auth::user();

        Session::forget('coupon');

        Transaction::where('student_id', $user->id)->delete();


        return back();
    }
}
