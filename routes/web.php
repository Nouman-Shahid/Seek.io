<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\ChapterCompletionController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseExamController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\BasicInfoMiddleware;
use App\Http\Middleware\TeacherMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [CourseController::class, 'getAllCourse'])->name('home');
Route::get('/about', fn() => Inertia::render('About'))->name('about');
Route::get('/faq', fn() => Inertia::render('FAQ'))->name('faq');

Route::get('/search/results', [SearchController::class, 'showResults'])->name('search.results');
Route::post('/search', [SearchController::class, 'search'])->name('search');

Route::get('/daily-challenge', [ChallengeController::class, 'getDailyChallenge'])->name('daily-challenge');
Route::match(['get', 'post'], '/daily-challenge/check', [ChallengeController::class, 'checkAnswer'])->name('daily-challenge.check');

/*
|--------------------------------------------------------------------------
| Course Routes
|--------------------------------------------------------------------------
*/
Route::get('/course/id/{id}', [CourseController::class, 'getSingleCourse']);
Route::post('publish_course/id/{id}', [CourseController::class, 'publishCourse'])->name('publish_course');
Route::get('/remove_course/id/{id}', [CourseController::class, 'removeCourse']);
Route::post('/submit-course', [CourseController::class, 'submitCourse'])->name('submit_course')->middleware('auth');
Route::middleware(TeacherMiddleware::class)->get('/makecourse', fn() => Inertia::render('MakeCourse'))->name('makecourse');

Route::post('/feedbacks', [CourseController::class, 'storeFeedback'])->middleware('auth');
Route::get('/remove_feedback/{id}', [CourseController::class, 'removeFeedback'])->middleware('auth');



/*
|--------------------------------------------------------------------------
| Chapter Routes
|--------------------------------------------------------------------------
*/
Route::post('/course/{id}/chapter', [ChapterController::class, 'addOrUpdateChapter'])->name('submit_course_chapter');
Route::get('/remove_chapter/id/{id}', [ChapterController::class, 'removeChapter']);
Route::patch('/update_chapter/id/{id}', [ChapterController::class, 'updateChapter']);
Route::get('chapter_complete/id/{id}', [ChapterCompletionController::class, 'markComplete'])->name('chapter_complete');

/*
|--------------------------------------------------------------------------
| Exam Routes
|--------------------------------------------------------------------------
*/
Route::get('/course_exam/id/{id}', [CourseExamController::class, 'getExamPage']);
Route::post('/exam_question/store/{id}', [CourseExamController::class, 'storeQuestion']);
Route::post('/exam_question/update/{id}', [CourseExamController::class, 'updateQuestion']);
Route::get('/exam_question/delete/{id}', [CourseExamController::class, 'deleteQuestion']);
Route::get('/save_exam/id/{id}', [CourseExamController::class, 'saveExam']);
Route::get('/exam_instructions/{id}', [CourseExamController::class, 'getExamInfo']);
Route::get('/exam/id/{id}', [CourseExamController::class, 'exam']);
Route::post('/courses/{id}/exam/submit', [CourseExamController::class, 'submit'])->name('exams.submit')->middleware('auth');
Route::match(['post', 'get'], '/courses/exam/results/{id}', [CourseExamController::class, 'results'])->name('exam_results')->middleware('auth');

/*
|--------------------------------------------------------------------------
| Cart & Checkout Routes
|--------------------------------------------------------------------------
*/
Route::get('/add_to_cart/id/{id}', [CartController::class, 'addToCart'])->name('add_to_cart')->middleware('auth');
Route::get('/cart', [CartController::class, 'getCart'])->name('cart')->middleware('auth');
Route::get('/remove_course/id/{id}', [CartController::class, 'removeCourse'])->name('remove_course');
Route::post('/coupon_code', [CartController::class, 'validateCoupon'])->name('coupon_code');
Route::get('/remove_coupon', [CartController::class, 'removeCoupon'])->name('remove_coupon');
Route::get('/checkout', [StripeController::class, 'checkout'])->name('checkout');
Route::get('/checkout/success', [StripeController::class, 'success'])->name('success');

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/
Route::get('/user_details', fn() => Inertia::render('UserDetails'))->name('user_details');
Route::post('/set_user_details', [UserController::class, 'storeUserDetails'])->name('set_user_details');
Route::patch('/user_details_update', [UserController::class, 'updateUserDetails'])->name('user_details_update');
Route::get('/user_dashboard', [UserController::class, 'getUserDetails'])->name('user_dashboard')->middleware('auth');
Route::get('/user/{id}', [UserController::class, 'showUserProfile'])->name('showUserProfile');

/*
|--------------------------------------------------------------------------
| Teacher Routes
|--------------------------------------------------------------------------
*/
Route::get('/payout_&_earnings/id/{id}', [TeacherController::class, 'teacherWithdrawl'])->name('teacherWithdrawl');

/*
|--------------------------------------------------------------------------
| Authenticated User Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/
require __DIR__ . '/auth.php';
/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
require __DIR__ . '/admin.php';
