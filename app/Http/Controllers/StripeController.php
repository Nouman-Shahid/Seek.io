<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Course;
use App\Models\Enrollments;
use App\Models\Payment;
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
                        'unit_amount' => $course->course_amount * 100, // Convert to cents
                    ],
                    'quantity' => 1,
                ];
            }
        }

        // Create Stripe checkout session with correct success URL
        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('success') . '?session_id={CHECKOUT_SESSION_ID}', // Ensure session_id is included
            'cancel_url' => route('cart'),
        ]);

        return redirect($session->url);
    }

    public function success(Request $request)
    {
        Stripe::setApiKey(config('stripe.sk'));

        $sessionId = $request->query('session_id');
        Log::info('Received session ID:', ['session_id' => $sessionId]);

        if (!$sessionId) {
            Log::error('Missing session ID');
            return redirect()->route('user_dashboard')->with('error', 'Invalid payment session.');
        }

        // Retrieve session details
        $session = Session::retrieve($sessionId);
        Log::info('Stripe session details:', ['session' => $session]);

        // Ensure payment is successful
        if ($session->payment_status !== 'paid') {
            Log::error('Payment verification failed', ['status' => $session->payment_status]);
            return redirect()->route('home')->with('error', 'Payment verification failed.');
        }

        $user = Auth::user();
        $cartItems = Cart::where('student_id', $user->id)->get();

        $courses = Course::whereIn('id', $cartItems->pluck('course_id'))->get();


        if ($cartItems->isEmpty()) {
            Log::warning('Cart is empty after payment');
            return redirect()->route('dashboard')->with('error', 'Your cart is empty.');
        }

        foreach ($cartItems as $cartItem) {
            Enrollments::create([
                'student_id' => $user->id,
                'course_id' => $cartItem->course_id,
            ]);
        }

        $totalAmount = $cartItems->sum(fn($item) => Course::find($item->course_id)->course_amount);

        Payment::create([
            'student_id' => $user->id,
            'amount' => $totalAmount,
            'details' => "{$user->name} paid for courses: " . $courses->pluck('course_title')->implode(', '),
        ]);

        Cart::where('student_id', $user->id)->delete();

        Log::info('Payment and enrollment successful, redirecting to success page');

        // Redirect properly
        return redirect()->route('success')->with('totalAmount', $totalAmount);
    }
}
