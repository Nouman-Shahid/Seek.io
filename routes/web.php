<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home Route
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');




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
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});




require __DIR__ . '/auth.php';
