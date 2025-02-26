<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name("home");

Route::get('/user_roles', function () {
    return Inertia::render('UserRole');
})->middleware(['auth', 'verified'])->name('user_roles');

Route::post('/set_user_role', action: [UserController::class, 'storeUserRole'])->middleware(['auth']);


Route::get('/preferences', function () {
    return Inertia::render('Preferences');
})->middleware(['auth', 'verified'])->name('preferences');

Route::post('/set_preferences', action: [UserController::class, 'storePreferences'])->middleware(['auth', 'verified'])->name('set_preferences');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(middleware: ['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
