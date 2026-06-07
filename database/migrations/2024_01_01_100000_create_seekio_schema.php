<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Reverse-engineered Seek.io (e-learning platform) schema.
 *
 * Reconstructed from Eloquent models, controllers, Form Request validation
 * rules and React/Inertia forms after the original PostgreSQL database was
 * lost. Converted to MySQL 8.x. Table names intentionally match the
 * `protected $table` values declared on each model (mostly singular, legacy
 * naming) so the existing application code keeps working unchanged.
 */
return new class extends Migration
{
    public function up(): void
    {
        /*
        |----------------------------------------------------------------------
        | users — extra profile columns added to the base Breeze users table
        |----------------------------------------------------------------------
        | The base table (id, name, email, password, …) is created by
        | 0001_01_01_000000_create_users_table.php. Here we add the columns the
        | application reads/writes: role, preference, profile fields and the
        | cheating ban timestamp (read by CheatingBanMiddleware).
        */
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['Student', 'Teacher', 'Admin'])->nullable()->after('password');
            $table->enum('preference', ['It', 'Business', 'Science', 'Engineering', 'Humanities', 'Other'])->nullable()->after('role');
            $table->string('profile_image', 2048)->nullable()->after('preference');
            $table->string('profile_headline', 400)->nullable()->after('profile_image');
            $table->text('profile_about')->nullable()->after('profile_headline');
            $table->string('address', 500)->nullable()->after('profile_about');
            $table->timestamp('cheating_ban_until')->nullable()->after('address');

            $table->index('role');
            $table->index('preference');
        });

        /*
        |----------------------------------------------------------------------
        | course
        |----------------------------------------------------------------------
        */
        Schema::create('course', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_teacher')->constrained('users')->cascadeOnDelete();
            $table->string('course_title');
            $table->text('course_desc');
            $table->enum('course_category', ['It', 'Business', 'Science', 'Engineering', 'Humanities', 'Other']);
            $table->integer('course_hours');
            $table->enum('course_level', ['Easy', 'Medium', 'Hard']);
            $table->string('course_image', 2048);
            $table->decimal('course_amount', 10, 2);
            $table->enum('publish', ['Draft', 'Pending', 'Published'])->default('Draft');
            $table->decimal('course_rating', 2, 1)->nullable();
            $table->timestamps();

            $table->index('publish');
            $table->index('course_category');
        });

        /*
        |----------------------------------------------------------------------
        | chapter  (sections / lessons)
        |----------------------------------------------------------------------
        */
        Schema::create('chapter', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('course')->cascadeOnDelete();
            $table->string('title');
            $table->string('desc', 300);
            $table->string('video', 2048);
            $table->boolean('preview')->default(false);
            // No timestamps (model: public $timestamps = false)
        });

        /*
        |----------------------------------------------------------------------
        | chapter_completions  (per-student progress tracking)
        |----------------------------------------------------------------------
        */
        Schema::create('chapter_completions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('course_id')->constrained('course')->cascadeOnDelete();
            $table->foreignId('chapter_id')->constrained('chapter')->cascadeOnDelete();
            $table->enum('status', ['Completed', 'Incomplete'])->default('Completed');

            $table->unique(['student_id', 'chapter_id']);
        });

        /*
        |----------------------------------------------------------------------
        | enrollments
        |----------------------------------------------------------------------
        */
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('course_id')->constrained('course')->cascadeOnDelete();

            $table->unique(['student_id', 'course_id']);
        });

        /*
        |----------------------------------------------------------------------
        | cart
        |----------------------------------------------------------------------
        */
        Schema::create('cart', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('course_id')->constrained('course')->cascadeOnDelete();

            $table->unique(['student_id', 'course_id']);
        });

        /*
        |----------------------------------------------------------------------
        | course_exam  (one exam per course)
        |----------------------------------------------------------------------
        */
        Schema::create('course_exam', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('course')->cascadeOnDelete();
            $table->integer('exam_time')->default(0); // stores the question count
            $table->enum('isPublished', ['Draft', 'Published'])->default('Draft');
            $table->timestamp('created_at')->nullable();

            $table->unique('course_id');
        });

        /*
        |----------------------------------------------------------------------
        | exam_questions  (accessed via DB::table in CourseExamController)
        |----------------------------------------------------------------------
        */
        Schema::create('exam_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('course')->cascadeOnDelete();
            $table->string('question_text'); // validated max 250
            $table->integer('marks')->default(1);
            $table->timestamp('created_at')->nullable();
        });

        /*
        |----------------------------------------------------------------------
        | question_options
        |----------------------------------------------------------------------
        */
        Schema::create('question_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id')->constrained('exam_questions')->cascadeOnDelete();
            $table->string('option_text');
            $table->boolean('is_correct')->default(false);
            $table->timestamp('created_at')->nullable();
        });

        /*
        |----------------------------------------------------------------------
        | exam_results
        |----------------------------------------------------------------------
        */
        Schema::create('exam_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('course_id')->constrained('course')->cascadeOnDelete();
            $table->integer('score')->default(0);
            $table->decimal('percentage', 5, 2)->nullable();
            $table->timestamp('created_at')->nullable();

            $table->index(['user_id', 'course_id']);
        });

        /*
        |----------------------------------------------------------------------
        | feedback  (reviews & ratings)
        |----------------------------------------------------------------------
        */
        Schema::create('feedback', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('course')->cascadeOnDelete();
            $table->string('user_name');
            $table->tinyInteger('rating'); // validated in:1,3,5
            $table->text('comment');
            $table->timestamp('created_at')->nullable();
        });

        /*
        |----------------------------------------------------------------------
        | daily_quizzes  (admin-authored streak quizzes)
        |----------------------------------------------------------------------
        | `options` actually stores the single correct answer string that the
        | student's answer is compared against in ChallengeController.
        */
        Schema::create('daily_quizzes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('question', 500);
            $table->string('options'); // the correct answer text
            $table->enum('category', ['It', 'Business', 'Science', 'Engineering', 'Humanities', 'Other']);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            $table->index('category');
        });

        /*
        |----------------------------------------------------------------------
        | student_daily_quizzes  (streak system — one row per user per day)
        |----------------------------------------------------------------------
        */
        Schema::create('student_daily_quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->date('quiz_date');
            $table->string('preference')->nullable();
            $table->string('question', 500)->nullable();
            $table->string('selected_answer')->nullable();
            $table->string('correct_answer')->nullable();
            $table->boolean('is_correct')->default(false);
            $table->integer('streak_count')->default(0);

            $table->unique(['user_id', 'quiz_date']);
        });

        /*
        |----------------------------------------------------------------------
        | cheating_detections  (anti-cheating / proctoring)
        |----------------------------------------------------------------------
        */
        Schema::create('cheating_detections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('course_id')->constrained('course')->cascadeOnDelete();
            $table->boolean('is_detected')->default(false);
            $table->timestamp('cheating_ban_until')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            $table->index(['user_id', 'course_id']);
        });

        /*
        |----------------------------------------------------------------------
        | payment
        |----------------------------------------------------------------------
        */
        Schema::create('payment', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->decimal('amount', 10, 2);
            $table->text('details')->nullable();
            $table->timestamp('created_at')->nullable();
        });

        /*
        |----------------------------------------------------------------------
        | transaction  (coupon-applied pending purchase)
        |----------------------------------------------------------------------
        */
        Schema::create('transaction', function (Blueprint $table) {
            $table->id();
            $table->decimal('payment', 10, 2); // amount after discount
            $table->enum('status', ['Pending', 'Completed', 'Failed'])->default('Pending');
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->string('code', 50)->nullable(); // applied coupon code
            $table->timestamp('created_at')->nullable();
        });

        /*
        |----------------------------------------------------------------------
        | coupon_code  (accessed via DB::table in CartController)
        |----------------------------------------------------------------------
        */
        Schema::create('coupon_code', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique();
            $table->decimal('discount', 5, 2); // percentage discount
            $table->timestamp('created_at')->nullable();
        });

        /*
        |----------------------------------------------------------------------
        | teacherwallet  (one wallet per teacher)
        |----------------------------------------------------------------------
        */
        Schema::create('teacherwallet', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->decimal('total_amount', 12, 2)->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teacherwallet');
        Schema::dropIfExists('coupon_code');
        Schema::dropIfExists('transaction');
        Schema::dropIfExists('payment');
        Schema::dropIfExists('cheating_detections');
        Schema::dropIfExists('student_daily_quizzes');
        Schema::dropIfExists('daily_quizzes');
        Schema::dropIfExists('feedback');
        Schema::dropIfExists('exam_results');
        Schema::dropIfExists('question_options');
        Schema::dropIfExists('exam_questions');
        Schema::dropIfExists('course_exam');
        Schema::dropIfExists('cart');
        Schema::dropIfExists('enrollments');
        Schema::dropIfExists('chapter_completions');
        Schema::dropIfExists('chapter');
        Schema::dropIfExists('course');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role', 'preference', 'profile_image', 'profile_headline',
                'profile_about', 'address', 'cheating_ban_until',
            ]);
        });
    }
};
