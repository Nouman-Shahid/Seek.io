<?php

use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseExamController;
use App\Http\Controllers\TeacherController;
use App\Http\Middleware\TeacherMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', TeacherMiddleware::class])->group(function () {
    Route::get('/makecourse', fn() => Inertia::render('MakeCourse'))->name('makecourse');
    Route::post('/submit-course', [CourseController::class, 'submitCourse'])->name('submit_course');
    Route::post('publish_course/id/{id}', [CourseController::class, 'publishCourse'])->name('publish_course');
    Route::get('/remove_course/id/{id}', [CourseController::class, 'removeCourse']);

    // Chapter routes
    Route::post('/course/{id}/chapter', [ChapterController::class, 'addOrUpdateChapter'])->name('submit_course_chapter');
    Route::get('/remove_chapter/id/{id}', [ChapterController::class, 'removeChapter']);
    Route::patch('/update_chapter/id/{id}', [ChapterController::class, 'updateChapter']);

    // Exam questions
    Route::post('/exam_question/store/{id}', [CourseExamController::class, 'storeQuestion']);
    Route::post('/exam_question/update/{id}', [CourseExamController::class, 'updateQuestion']);
    Route::get('/exam_question/delete/{id}', [CourseExamController::class, 'deleteQuestion']);
    Route::get('/save_exam/id/{id}', [CourseExamController::class, 'saveExam']);
    Route::get('/course_exam/id/{id}', [CourseExamController::class, 'getExamPage']);

    // Earnings
    Route::get('/payout_&_earnings/id/{id}', [TeacherController::class, 'teacherWithdrawl'])->name('teacherWithdrawl');
});
