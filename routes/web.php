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




// Authenticated and verified routes
Route::middleware(['auth', 'verified'])->group(function () {

    // User Role Routes 
    Route::prefix('user_roles')->name('user_roles.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('UserRole');
        })->name('index');

        Route::post('/set', [UserController::class, 'storeUserRole'])->name('set');
    });

    // Preferences Routes
    Route::prefix('preferences')->name('preferences.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Preferences');
        })->name('index');

        Route::post('/set', [UserController::class, 'storePreferences'])->name('set');
    });

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
