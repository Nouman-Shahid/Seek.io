<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Home Route
Route::get('/', [CourseController::class, 'getAllCourse'])->name('home');

Route::get('/course/id/{id}', action: [CourseController::class, 'getSingleCourse']);




Route::middleware(['auth', 'verified'])->group(function () {

    // User Role Routes 
    Route::get('/user_roles', function () {
        return Inertia::render('UserRole');
    })->name('user_roles');

    Route::post('/set_user_roles', [UserController::class, 'storeUserRole'])->name('set_user_roles');

    // Preferences Routes
    Route::get('/preferences', function () {
        return Inertia::render('Preferences');
    })->name('preferences');

    Route::post('/set_preferences', [UserController::class, 'storePreferences'])->name('set_preferences');

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




Route::get('/teacherdashboard',  [TeacherController::class, 'getTeacherDetails'])->name('teacherdashboard')->middleware('auth');
// Dashboard Route
Route::get('/makecourse', function () {
    return Inertia::render('MakeCourse');
})->name('makecourse');

Route::post('/submit-course', [CourseController::class, 'submitCourse'])
    ->name('submit_course')
    ->middleware('auth');

require __DIR__ . '/auth.php';
