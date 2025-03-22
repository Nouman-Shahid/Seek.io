<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseExamController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\BasicInfoMiddleware;
use App\Http\Middleware\TeacherMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Home Route
Route::get('/', [CourseController::class, 'getAllCourse'])->name('home');
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');
Route::get('/explore', function () {
    return Inertia::render('Explore');
})->name('explore');
Route::get('/faq', function () {
    return Inertia::render('FAQ');
})->name('faq');




Route::get('/course/id/{id}', action: [CourseController::class, 'getSingleCourse']);

Route::get('/course_exam/id/{id}', action: [CourseExamController::class, 'getExamPage']);



Route::middleware(['auth', 'verified'])->group(function () {



    // // user_details Routes
    // Route::get('/user_details', function () {
    //     return Inertia::render('UserDetails');
    // })->name('user_details');

    // Route::post('/set_user_details', [UserController::class, 'storeuser_details'])->name('set_user_details');

    // Dashboard Route
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Profile Routes 
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});



Route::middleware(TeacherMiddleware::class)->group(
    function () {

        // Dashboard Route
        Route::get('/makecourse', function () {
            return Inertia::render('MakeCourse');
        })->name('makecourse');

        Route::post('/submit-course', [CourseController::class, 'submitCourse'])
            ->name('submit_course')
            ->middleware('auth');
    }
);


Route::post('search', [SearchController::class, 'search'])->name('search');



Route::get('/user_details', function () {
    return Inertia::render('UserDetails');
})->name('user_details');
Route::post('/set_user_details', [UserController::class, 'storeUserDetails'])->name('set_user_details');


Route::patch('/user_details_update', [UserController::class, 'updateUserDetails'])->name('user_details_update');

Route::get('/user_dashboard',  [UserController::class, 'getTeacherDetails'])->name('user_dashboard')->middleware('auth');


require __DIR__ . '/auth.php';
