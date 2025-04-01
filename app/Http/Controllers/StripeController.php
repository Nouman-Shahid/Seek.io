<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Course;
use App\Models\Enrollments;
use App\Models\Payment;
use App\Models\TeacherWallet;
use Illuminate\Support\Facades\DB;
use Stripe\Stripe;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Stripe\Checkout\Session;
use Illuminate\Http\Request;

class StripeController extends Controller
{
    public function checkout(Request $request)
    {
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
                        ],
                        'unit_amount' => $course->course_amount * 100,
                    ],
                    'quantity' => 1,
                ];
            }
        }

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('success') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('cart'),
        ]);

        return redirect($session->url);
    }


    public function success(Request $request)
    {
        Stripe::setApiKey(config('stripe.sk'));

        $sessionId = $request->query('session_id');

        if (!$sessionId) {
            return redirect()->route('user_dashboard')->with('error', 'Invalid payment session.');
        }

        // Retrieve session details
        $session = Session::retrieve($sessionId);

        if ($session->payment_status !== 'paid') {
            return redirect()->route('home')->with('error', 'Payment verification failed.');
        }

        $user = Auth::user();
        $cartItems = Cart::where('student_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('dashboard')->with('error', 'Your cart is empty.');
        }

        // Enroll students and get total amount per teacher
        $teacherEarnings = [];

        foreach ($cartItems as $cartItem) {
            $course = Course::find($cartItem->course_id);
            if ($course) {
                // Store teacher earnings
                if (!isset($teacherEarnings[$course->course_teacher])) {
                    $teacherEarnings[$course->course_teacher] = 0;
                }
                $teacherEarnings[$course->course_teacher] += (float) $course->course_amount;

                // Enroll student
                Enrollments::create([
                    'student_id' => $user->id,
                    'course_id' => $cartItem->course_id,
                ]);
            }
        }

        // Store payment record
        $totalAmount = array_sum($teacherEarnings);

        Payment::create([
            'student_id' => $user->id,
            'amount' => $totalAmount,
            'details' => "{$user->name} paid for courses: " . $cartItems->pluck('course_id')->implode(', '),
        ]);

        // Update teacher wallets
        foreach ($teacherEarnings as $teacherId => $amount) {
            $wallet = TeacherWallet::firstOrCreate(
                ['teacher_id' => $teacherId],
                ['total_amount' => 0] // Default value if new record
            );

            $wallet->increment('total_amount', $amount);
        }

        // Clear the cart
        Cart::where('student_id', $user->id)->delete();

        return redirect()->route('success')->with('totalAmount', $totalAmount);
    }


    public function TeacherWithdrawl($teacher_id)
    {
        $teacher = TeacherWallet::find($teacher_id);

        $earning = $teacher->total_amount;
    }
}
