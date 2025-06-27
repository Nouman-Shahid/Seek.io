<?php

use App\Http\Controllers\AdminController;
use App\Http\Middleware\AdminMiddleWare;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', AdminMiddleWare::class])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'getDashboard'])->name('adminDashboard');
    Route::get('/courses', [AdminController::class, 'getCourses']);
    Route::get('/students', [AdminController::class, 'getStudents']);
    Route::get('/teachers', [AdminController::class, 'getTeachers']);
    Route::post('/courses/{id}/status', [AdminController::class, 'changePublishStatus']);
    Route::get('/quiz', [AdminController::class, 'getQuiz']);
    Route::post('/store/daily-quiz', [AdminController::class, 'storeQuiz']);
    Route::get('/remove-quiz/{id}', [AdminController::class, 'removeQuiz']);
});
