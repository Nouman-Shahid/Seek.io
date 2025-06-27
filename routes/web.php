<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\ChapterCompletionController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CheatingDetectionController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseExamController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleWare;
use App\Http\Middleware\TeacherMiddleware;
use App\Http\Middleware\StudentMiddleWare;
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


Route::get('/course/id/{id}', [CourseController::class, 'getSingleCourse']); // shared between roles

Route::get('/user/{id}', [UserController::class, 'showUserProfile'])->name('showUserProfile');

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/user_dashboard', [UserController::class, 'getUserDetails'])->name('user_dashboard');
    Route::get('/user_details', fn() => Inertia::render('UserDetails'))->name('user_details');
    Route::post('/set_user_details', [UserController::class, 'storeUserDetails'])->name('set_user_details');
    Route::patch('/user_details_update', [UserController::class, 'updateUserDetails'])->name('user_details_update');
});

/*
|--------------------------------------------------------------------------
| Authenticated General Routes
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

/*
|--------------------------------------------------------------------------
| Teacher Routes
|--------------------------------------------------------------------------
*/
require __DIR__ . '/teacher.php';

/*
|--------------------------------------------------------------------------
| Students Routes
|--------------------------------------------------------------------------
*/
require __DIR__ . '/student.php';
