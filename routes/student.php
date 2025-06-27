<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\ChapterCompletionController;
use App\Http\Controllers\CheatingDetectionController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseExamController;
use App\Http\Controllers\StripeController;
use App\Http\Middleware\CheatingBanMiddleware;
use App\Http\Middleware\StudentMiddleWare;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', StudentMiddleWare::class])->group(function () {
    Route::get('/daily-challenge', [ChallengeController::class, 'getDailyChallenge'])->name('daily-challenge');
    Route::match(['get', 'post'], '/daily-challenge/check', [ChallengeController::class, 'checkAnswer'])->name('daily-challenge.check');

    // Exam access
    Route::match(['get', 'post'], '/courses/{id}/exam/cancel', [CheatingDetectionController::class, 'ExamCancel']);
    Route::get('/exam_instructions/{id}', [CourseExamController::class, 'getExamInfo']);
    Route::get('/exam/id/{id}', [CourseExamController::class, 'exam']);
    Route::post('/courses/{id}/exam/submit', [CourseExamController::class, 'submit'])->name('exams.submit');
    Route::match(['post', 'get'], '/courses/exam/results/{id}', [CourseExamController::class, 'results'])->name('exam_results');

    // Cart & Checkout
    Route::get('/add_to_cart/id/{id}', [CartController::class, 'addToCart'])->name('add_to_cart');
    Route::get('/cart', [CartController::class, 'getCart'])->name('cart');
    Route::get('/remove_course/id/{id}', [CartController::class, 'removeCourse'])->name('remove_course');
    Route::post('/coupon_code', [CartController::class, 'validateCoupon'])->name('coupon_code');
    Route::get('/remove_coupon', [CartController::class, 'removeCoupon'])->name('remove_coupon');
    Route::get('/checkout', [StripeController::class, 'checkout'])->name('checkout');
    Route::get('/checkout/success', [StripeController::class, 'success'])->name('success');

    // Feedback
    Route::post('/feedbacks', [CourseController::class, 'storeFeedback']);
    Route::get('/remove_feedback/{id}', [CourseController::class, 'removeFeedback']);

    // Chapter completion
    Route::get('chapter_complete/id/{id}', [ChapterCompletionController::class, 'markComplete'])->name('chapter_complete');
});
