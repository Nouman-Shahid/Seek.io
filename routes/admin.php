<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;


Route::get('/admin/dashboard', [AdminController::class, 'getDashboard'])->name('adminDashboard');
Route::get('/admin/courses', [AdminController::class, 'getCourses']);
Route::get('/admin/students', [AdminController::class, 'getStudents']);
Route::get('/admin/teachers', [AdminController::class, 'getTeachers']);
Route::post('/admin/courses/{id}/status', [AdminController::class, 'changePublishStatus']);
