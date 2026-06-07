<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * Seeds a realistic, fully navigable Seek.io demo dataset.
 *
 * Login for every seeded account: password = "password"
 *   Admin    : admin@seekio.test
 *   Teacher  : sarah.kim@seekio.test (and others, see output)
 *   Student  : student1@seekio.test ... student20@seekio.test
 */
class SeekioDemoSeeder extends Seeder
{
    private array $categories = ['It', 'Business', 'Science', 'Engineering', 'Humanities', 'Other'];
    private array $levels = ['Easy', 'Medium', 'Hard'];

    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $faker->seed(2024);

        $now = Carbon::now();
        $password = Hash::make('password');

        /* ----------------------------------------------------------------
         | 1. Admin
         * --------------------------------------------------------------*/
        $adminId = DB::table('users')->insertGetId([
            'name' => 'Seekio Admin',
            'email' => 'admin@seekio.test',
            'email_verified_at' => $now,
            'password' => $password,
            'role' => 'Admin',
            'preference' => 'It',
            'profile_image' => 'https://i.pravatar.cc/300?img=68',
            'profile_headline' => 'Platform Administrator',
            'profile_about' => 'Keeping Seek.io running smoothly for learners and instructors worldwide.',
            'address' => 'Seekio HQ, Karachi',
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        /* ----------------------------------------------------------------
         | 2. Teachers (12)
         * --------------------------------------------------------------*/
        $teacherNames = [
            'Sarah Kim', 'David Okonkwo', 'Aisha Rahman', 'Marco Bianchi',
            'Elena Petrova', 'James Carter', 'Fatima Noor', 'Liam Murphy',
            'Priya Sharma', 'Hiroshi Tanaka', 'Sofia Garcia', 'Omar Haddad',
        ];
        $teachers = [];
        foreach ($teacherNames as $i => $name) {
            $pref = $this->categories[$i % count($this->categories)];
            $email = strtolower(str_replace(' ', '.', $name)) . '@seekio.test';
            $teachers[] = [
                'id' => DB::table('users')->insertGetId([
                    'name' => $name,
                    'email' => $email,
                    'email_verified_at' => $now,
                    'password' => $password,
                    'role' => 'Teacher',
                    'preference' => $pref,
                    'profile_image' => 'https://i.pravatar.cc/300?img=' . ($i + 11),
                    'profile_headline' => $faker->jobTitle . ' & Online Educator',
                    'profile_about' => $faker->paragraph(5),
                    'address' => $faker->city . ', ' . $faker->country,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]),
                'pref' => $pref,
            ];
        }

        /* ----------------------------------------------------------------
         | 3. Students (20)
         * --------------------------------------------------------------*/
        $students = [];
        for ($i = 1; $i <= 20; $i++) {
            $pref = $this->categories[($i - 1) % count($this->categories)];
            $students[] = [
                'id' => DB::table('users')->insertGetId([
                    'name' => $faker->name,
                    'email' => "student{$i}@seekio.test",
                    'email_verified_at' => $now,
                    'password' => $password,
                    'role' => 'Student',
                    'preference' => $pref,
                    'profile_image' => 'https://i.pravatar.cc/300?img=' . (($i % 70) + 1),
                    'profile_headline' => 'Lifelong learner exploring ' . $pref,
                    'profile_about' => $faker->paragraph(3),
                    'address' => $faker->city . ', ' . $faker->country,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]),
                'pref' => $pref,
            ];
        }

        /* ----------------------------------------------------------------
         | 4. Courses (per teacher 2-3) + chapters + exams + feedback
         * --------------------------------------------------------------*/
        $courseTitles = [
            'It' => ['Modern Web Development with React', 'Python for Data Science', 'Mastering SQL & Databases', 'Cybersecurity Fundamentals', 'DevOps with Docker & Kubernetes'],
            'Business' => ['Digital Marketing Masterclass', 'Financial Accounting 101', 'Entrepreneurship Bootcamp', 'Project Management with Agile', 'Business Analytics Essentials'],
            'Science' => ['Introduction to Astrophysics', 'Organic Chemistry Made Easy', 'Genetics and Molecular Biology', 'Climate Science Explained', 'Quantum Physics for Beginners'],
            'Engineering' => ['Electrical Circuit Design', 'Mechanical Engineering Basics', 'Civil Structures & CAD', 'Robotics and Automation', 'Renewable Energy Systems'],
            'Humanities' => ['World History: A Survey', 'Philosophy of the Mind', 'Creative Writing Workshop', 'Introduction to Psychology', 'Modern Art and Culture'],
            'Other' => ['Photography for Everyone', 'Personal Finance & Investing', 'Public Speaking Confidence', 'Productivity & Time Management', 'Music Theory Foundations'],
        ];

        $courses = [];

        // Real, course-relevant, embeddable YouTube videos per category
        // (CrashCourse / freeCodeCamp / Fireship / Programming with Mosh —
        // all allow iframe embedding). Stored as /embed/ URLs.
        $videosByCategory = [
            'It'          => ['tpIctyqH29Q', '_uQrJ0TkZlc', 'Tn6-PIqc4UM', 'HXV3zeQKqGY', 'W6NZfCO5SIk'],
            'Business'    => ['3ez10ADR_gM', 'PHe0bXAIuk0', '3ez10ADR_gM'],
            'Science'     => ['FSyAehMdpyI', 'b240PGCMwV0', 'QnQe0xW_JY4'],
            'Engineering' => ['tpIctyqH29Q', 'b240PGCMwV0', 'FSyAehMdpyI'],
            'Humanities'  => ['Yocja_N5s1I', 'vo4pMVb0R6M', 'Yocja_N5s1I'],
            'Other'       => ['vo4pMVb0R6M', 'Yocja_N5s1I', 'tpIctyqH29Q'],
        ];

        foreach ($teachers as $t) {
            $pref = $t['pref'];
            $titles = $courseTitles[$pref];
            $numCourses = rand(2, 3);
            for ($c = 0; $c < $numCourses; $c++) {
                $title = $titles[($c) % count($titles)] . ($c >= count($titles) ? ' II' : '');
                // mostly published, some pending/draft
                $publish = $faker->randomElement(['Published', 'Published', 'Published', 'Pending', 'Draft']);
                $courseId = DB::table('course')->insertGetId([
                    'course_teacher' => $t['id'],
                    'course_title' => $title,
                    'course_desc' => $faker->paragraph(8),
                    'course_category' => $pref,
                    'course_hours' => rand(4, 40),
                    'course_level' => $faker->randomElement($this->levels),
                    'course_image' => 'https://picsum.photos/seed/seekio' . ($courseId ?? rand(1, 9999)) . '/400/250',
                    'course_amount' => $faker->randomElement([0, 1500, 2500, 3500, 4999, 6500, 9999]),
                    'publish' => $publish,
                    'course_rating' => null,
                    'created_at' => $now->copy()->subDays(rand(10, 200)),
                    'updated_at' => $now,
                ]);
                // fix image seed to actual id
                DB::table('course')->where('id', $courseId)->update([
                    'course_image' => 'https://picsum.photos/seed/seekio' . $courseId . '/400/250',
                ]);

                // Preview policy: vary which courses offer free previews so
                // some courses are fully locked (paid-only) for realism.
                //   'first'     -> chapter 1 is a free preview
                //   'first-two' -> chapters 1 & 2 are free previews
                //   'locked'    -> no free preview (enroll to unlock)
                $previewPolicy = $faker->randomElement(['first', 'first', 'first-two', 'locked']);
                $catVideos = $videosByCategory[$pref];

                // Chapters (4-7)
                $numCh = rand(4, 7);
                $chapterIds = [];
                for ($ch = 1; $ch <= $numCh; $ch++) {
                    $isPreview = match ($previewPolicy) {
                        'first' => $ch === 1,
                        'first-two' => $ch <= 2,
                        default => false, // 'locked'
                    };
                    $videoId = $catVideos[($ch - 1) % count($catVideos)];
                    $chapterIds[] = DB::table('chapter')->insertGetId([
                        'course_id' => $courseId,
                        'title' => "Chapter {$ch}: " . $faker->sentence(4),
                        'desc' => $faker->text(180),
                        'video' => 'https://www.youtube.com/embed/' . $videoId,
                        'preview' => $isPreview ? 1 : 0,
                    ]);
                }

                // Exam questions (5) + options (4 each)
                $numQ = 5;
                for ($q = 1; $q <= $numQ; $q++) {
                    $questionId = DB::table('exam_questions')->insertGetId([
                        'course_id' => $courseId,
                        'question_text' => $faker->sentence(8) . '?',
                        'marks' => 1,
                        'created_at' => $now,
                    ]);
                    $correct = rand(0, 3);
                    for ($o = 0; $o < 4; $o++) {
                        DB::table('question_options')->insert([
                            'question_id' => $questionId,
                            'option_text' => ucfirst($faker->words(3, true)),
                            'is_correct' => $o === $correct,
                            'created_at' => $now,
                        ]);
                    }
                }

                // One exam record
                DB::table('course_exam')->insert([
                    'course_id' => $courseId,
                    'exam_time' => $numQ,
                    'isPublished' => 'Published',
                    'created_at' => $now,
                ]);

                $courses[] = [
                    'id' => $courseId,
                    'teacher_id' => $t['id'],
                    'amount' => DB::table('course')->where('id', $courseId)->value('course_amount'),
                    'publish' => $publish,
                    'chapters' => $chapterIds,
                ];
            }
        }

        /* ----------------------------------------------------------------
         | 5. Enrollments + progress + exam results + payments + wallets
         * --------------------------------------------------------------*/
        $publishedCourses = array_values(array_filter($courses, fn ($c) => $c['publish'] === 'Published'));
        $walletTotals = [];

        foreach ($students as $s) {
            // enroll in 2-5 distinct published courses
            $picks = collect($publishedCourses)->shuffle()->take(rand(2, 5));
            foreach ($picks as $course) {
                DB::table('enrollments')->insertOrIgnore([
                    'student_id' => $s['id'],
                    'course_id' => $course['id'],
                ]);

                // teacher earnings
                $walletTotals[$course['teacher_id']] = ($walletTotals[$course['teacher_id']] ?? 0) + (float) $course['amount'];

                // payment record
                DB::table('payment')->insert([
                    'student_id' => $s['id'],
                    'amount' => $course['amount'],
                    'details' => $s['id'] . " paid for course #" . $course['id'],
                    'created_at' => $now->copy()->subDays(rand(1, 60)),
                ]);

                // chapter completions (complete a random prefix of chapters)
                $completeCount = rand(0, count($course['chapters']));
                foreach (array_slice($course['chapters'], 0, $completeCount) as $chId) {
                    DB::table('chapter_completions')->insertOrIgnore([
                        'student_id' => $s['id'],
                        'course_id' => $course['id'],
                        'chapter_id' => $chId,
                        'status' => 'Completed',
                    ]);
                }

                // exam result for some enrollments
                if ($faker->boolean(55)) {
                    $score = rand(0, 5);
                    DB::table('exam_results')->insert([
                        'user_id' => $s['id'],
                        'course_id' => $course['id'],
                        'score' => $score,
                        'percentage' => round($score / 5 * 100, 2),
                        'created_at' => $now->copy()->subDays(rand(1, 30)),
                    ]);
                }
            }

            // cart: 0-2 courses they are NOT enrolled in
            $cartPicks = collect($publishedCourses)->shuffle()->take(rand(0, 2));
            foreach ($cartPicks as $course) {
                DB::table('cart')->insertOrIgnore([
                    'student_id' => $s['id'],
                    'course_id' => $course['id'],
                ]);
            }
        }

        /* ----------------------------------------------------------------
         | 6. Feedback / reviews (recompute course_rating)
         * --------------------------------------------------------------*/
        foreach ($publishedCourses as $course) {
            $enrolled = DB::table('enrollments')->where('course_id', $course['id'])->pluck('student_id')->all();
            $reviewers = collect($enrolled)->shuffle()->take(rand(1, min(5, max(1, count($enrolled)))));
            foreach ($reviewers as $studentId) {
                $name = DB::table('users')->where('id', $studentId)->value('name');
                DB::table('feedback')->insert([
                    'course_id' => $course['id'],
                    'user_name' => $name,
                    'rating' => $faker->randomElement([1, 3, 5, 5, 5, 3]),
                    'comment' => $faker->sentence(rand(6, 18)),
                    'created_at' => $now->copy()->subDays(rand(1, 40)),
                ]);
            }
            $avg = DB::table('feedback')->where('course_id', $course['id'])->avg('rating');
            if ($avg !== null) {
                DB::table('course')->where('id', $course['id'])->update(['course_rating' => round($avg, 1)]);
            }
        }

        /* ----------------------------------------------------------------
         | 7. Teacher wallets
         * --------------------------------------------------------------*/
        foreach ($teachers as $t) {
            DB::table('teacherwallet')->insert([
                'teacher_id' => $t['id'],
                'total_amount' => round($walletTotals[$t['id']] ?? 0, 2),
            ]);
        }

        /* ----------------------------------------------------------------
         | 8. Daily quizzes (admin authored) — 2 per category
         * --------------------------------------------------------------*/
        $quizBank = [
            'It' => [['What does HTML stand for?', 'HyperText Markup Language'], ['Which keyword declares a constant in JS?', 'const']],
            'Business' => [['What does ROI stand for?', 'Return On Investment'], ['A document listing assets and liabilities is a?', 'Balance Sheet']],
            'Science' => [['What planet is known as the Red Planet?', 'Mars'], ['What gas do plants absorb?', 'Carbon Dioxide']],
            'Engineering' => [['Unit of electrical resistance?', 'Ohm'], ['What does CAD stand for?', 'Computer Aided Design']],
            'Humanities' => [['Who wrote Hamlet?', 'Shakespeare'], ['The study of the mind is called?', 'Psychology']],
            'Other' => [['What does ISO measure in photography?', 'Sensitivity'], ['How many strings does a standard guitar have?', '6']],
        ];
        foreach ($quizBank as $cat => $items) {
            foreach ($items as $item) {
                DB::table('daily_quizzes')->insert([
                    'title' => "Daily {$cat} Challenge",
                    'question' => $item[0],
                    'options' => $item[1],
                    'category' => $cat,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }

        /* ----------------------------------------------------------------
         | 9. Student daily quiz attempts (streak system)
         * --------------------------------------------------------------*/
        foreach (array_slice($students, 0, 12) as $s) {
            $streak = 0;
            $days = rand(1, 7);
            for ($d = $days; $d >= 1; $d--) {
                $correct = $faker->boolean(70);
                $streak = $correct ? $streak + 1 : 0;
                $quiz = DB::table('daily_quizzes')->where('category', $s['pref'])->first();
                DB::table('student_daily_quizzes')->insertOrIgnore([
                    'user_id' => $s['id'],
                    'quiz_date' => $now->copy()->subDays($d)->toDateString(),
                    'preference' => $s['pref'],
                    'question' => $quiz->question ?? 'Sample question',
                    'selected_answer' => $correct ? ($quiz->options ?? 'answer') : 'wrong answer',
                    'correct_answer' => $quiz->options ?? 'answer',
                    'is_correct' => $correct,
                    'streak_count' => $streak,
                ]);
            }
        }

        /* ----------------------------------------------------------------
         | 10. Cheating detections (a few banned attempts)
         * --------------------------------------------------------------*/
        foreach (collect($students)->take(3) as $s) {
            $course = $faker->randomElement($publishedCourses);
            DB::table('cheating_detections')->insert([
                'user_id' => $s['id'],
                'course_id' => $course['id'],
                'is_detected' => true,
                'cheating_ban_until' => $now->copy()->addDays(2),
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        /* ----------------------------------------------------------------
         | 11. Coupon codes
         * --------------------------------------------------------------*/
        foreach ([['WELCOME10', 10], ['SAVE20', 20], ['SEEKIO25', 25], ['EID50', 50], ['STUDENT15', 15]] as $cp) {
            DB::table('coupon_code')->insert([
                'code' => $cp[0],
                'discount' => $cp[1],
                'created_at' => $now,
            ]);
        }

        /* ----------------------------------------------------------------
         | 12. Transactions (pending coupon-applied checkouts)
         * --------------------------------------------------------------*/
        foreach (collect($students)->take(6) as $s) {
            DB::table('transaction')->insert([
                'payment' => $faker->randomElement([1350, 2000, 3749, 4500]),
                'status' => $faker->randomElement(['Pending', 'Completed']),
                'student_id' => $s['id'],
                'code' => $faker->randomElement(['WELCOME10', 'SAVE20', 'SEEKIO25']),
                'created_at' => $now,
            ]);
        }

        $this->command->info('Seekio demo data seeded. Login with any seeded email and password "password".');
        $this->command->info('Admin: admin@seekio.test  |  Teacher: sarah.kim@seekio.test  |  Student: student1@seekio.test');
    }
}
