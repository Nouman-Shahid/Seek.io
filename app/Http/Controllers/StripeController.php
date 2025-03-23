<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Course;
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
                            'description' => $course->course_desc ?? '',
                            'images' => [$course->course_image ?? 'https://via.placeholder.com/150'],
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
        // $product = HotelDeals::find($productId);
        // $user = Auth::user();

        // // Create a new booked hotel record
        // $bookedhotel = BookedHotels::create([
        //     'user_id' => $user->id,
        //     'hotel_id' => $productId,
        // ]);

        return Inertia::render('PaymentSuccess');
    }
}
