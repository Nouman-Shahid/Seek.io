<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Course;
use App\Models\Enrollments;
use App\Models\Payment;
use Stripe\Stripe;
use Inertia\Inertia;
use Inertia\Controller;
use Illuminate\Support\Facades\Auth;
use Stripe\Checkout\Session;
use Illuminate\Http\Request;

class StripeController extends Controller
{
    public function checkout(Request $request)
    {
        // $validatedData = $request->validate([
        //     'total_after_discount' => 'required|numeric|min:1',
        // ]);

        Stripe::setApiKey(config('stripe.sk'));

        $cartItems = Cart::where('student_id', Auth::id())->get();

        if ($cartItems->isEmpty()) {
            return back()->with('error', 'Your cart is empty.');
        }

        $lineItems = [];

        foreach ($cartItems as $cartItem) {
            $course = Course::find($cartItem->course_id);
            if ($course) {
                $lineItems[] = [
                    'price_data' => [
                        'currency' => 'pkr',
                        'product_data' => [
                            'name' => $course->course_title,
                            'description' => $course->course_desc,
                            // 'images' => [$course->course_image],
                        ],
                        'unit_amount' => $course->course_amount * 100,
                    ],
                    'quantity' => 1,
                ];
            }
        }

        // Get the total after discount from the frontend
        // $totalAfterDiscount = $validatedData['total_after_discount'] * 100; // Convert to cents

        // Create Stripe checkout session
        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('success'),
        ]);

        return redirect($session->url);
    }


    public function success()
    {
        $user = Auth::user();

        $cartItems = Cart::where('student_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('dashboard')->with('error', 'Your cart is empty.');
        }

        $courses = Course::whereIn('id', $cartItems->pluck('course_id'))->get();

        // Calculating total courses amount
        $totalAmount = $courses->sum('course_amount');

        // Enrolling the student 
        foreach ($cartItems as $cartItem) {
            Enrollments::create([
                'student_id' => $user->id,
                'course_id' => $cartItem->course_id,
            ]);
        }

        // Get all course names
        $courseNames = $courses->pluck('course_title')->implode(', ');

        // Storing payment record
        Payment::create([
            'student_id' => $user->id,
            'amount' => $totalAmount,
            'details' => "{$user->name} paid for courses: {$courseNames}",
        ]);


        Cart::where('student_id', $user->id)->delete();

        return Inertia::render('PaymentSuccess', ['totalAmount' => $totalAmount]);
    }
}
