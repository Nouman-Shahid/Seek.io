# Seek.io — Reconstructed Database Schema (MySQL 8.x)

This database was **reverse-engineered from the source code** after the original
PostgreSQL database was lost. Sources analyzed: Eloquent models, all controllers
(including raw `DB::table()` queries), Form Request / inline validation rules,
middleware, routes, and the React/Inertia pages.

- **Engine:** InnoDB · **Charset:** utf8mb4 · **Collation:** utf8mb4_unicode_ci
- **Database name:** `seekio`
- Table names intentionally match each model's `protected $table` (legacy singular
  names like `course`, `payment`, `transaction`) so existing app code runs unchanged.

Generated artifacts:
| File | Purpose |
|------|---------|
| `migrations/2024_01_01_100000_create_seekio_schema.php` | Laravel migration for all domain tables |
| `seeders/SeekioDemoSeeder.php` | Realistic demo data (33 users, 32 courses, …) |
| `seekio_schema_mysql.sql` | Raw MySQL `CREATE TABLE` DDL (no data) |
| `seekio_full_dump.sql` | Full dump (schema + seeded data) |

---

## Entity Overview

```
users ──< course (course_teacher)
  │         ├──< chapter ──< chapter_completions >── users (student_id)
  │         ├──< course_exam
  │         ├──< exam_questions ──< question_options
  │         ├──< exam_results >── users (user_id)
  │         ├──< feedback
  │         ├──< enrollments >── users (student_id)
  │         ├──< cart >── users (student_id)
  │         └──< cheating_detections >── users (user_id)
  ├──1 teacherwallet (teacher_id)
  ├──< payment (student_id)
  ├──< transaction (student_id)   ··· code → coupon_code.code (logical, not FK)
  └──< student_daily_quizzes (user_id)   ··· category → daily_quizzes.category

daily_quizzes  (standalone, keyed by category = user.preference)
coupon_code    (standalone lookup)
```

Roles live on `users.role` (single-table inheritance): **Student**, **Teacher**, **Admin**.

---

## Table Reference

### users  *(base Breeze table + reverse-engineered profile columns)*
| Column | Type | Null | Notes |
|--------|------|------|-------|
| id | bigint unsigned PK | no | |
| name | varchar(255) | no | |
| email | varchar(255) UNIQUE | no | |
| email_verified_at | timestamp | yes | MustVerifyEmail |
| password | varchar(255) | no | hashed |
| role | enum(Student,Teacher,Admin) | yes | null until onboarding (`BasicInfoMiddleware`) |
| preference | enum(It,Business,Science,Engineering,Humanities,Other) | yes | drives daily challenge category |
| profile_image | varchar(2048) | yes | URL string |
| profile_headline | varchar(400) | yes | validation `max:400` |
| profile_about | text | yes | |
| address | varchar(500) | yes | form field `location`, column `address` |
| cheating_ban_until | timestamp | yes | read by `CheatingBanMiddleware` |
| remember_token, timestamps | — | yes | |

Indexes: `email` (unique), `role`, `preference`.

### course
| Column | Type | Null | Notes |
|--------|------|------|-------|
| id | bigint PK | no | |
| course_teacher | bigint FK→users.id | no | cascade delete |
| course_title | varchar(255) | no | `min:10` |
| course_desc | text | no | `min:20` |
| course_category | enum(6 cats) | no | |
| course_hours | int | no | |
| course_level | enum(Easy,Medium,Hard) | no | |
| course_image | varchar(2048) | no | URL |
| course_amount | decimal(10,2) | no | see *uncertain fields* |
| publish | enum(Draft,Pending,Published) | no, default Draft | workflow below |
| course_rating | decimal(2,1) | yes | recomputed avg of feedback |
| created_at/updated_at | timestamp | yes | |

Indexes: `course_teacher`, `publish`, `course_category`.
**Approval workflow:** new course → `Draft`; on publish, becomes `Published` if the
teacher already has ≥3 published courses, otherwise `Pending` (admin can override to any).

### chapter  *(sections / lessons, no timestamps)*
| id PK · course_id FK→course (cascade) · title varchar(255) · `desc` varchar(300) · video varchar(2048) URL · preview boolean default 0 |

### chapter_completions  *(progress tracking, no timestamps)*
| id PK · student_id FK→users · course_id FK→course · chapter_id FK→chapter · status enum(Completed,Incomplete) default Completed |
Unique(`student_id`,`chapter_id`).

### enrollments  *(no timestamps)*
| id PK · student_id FK→users · course_id FK→course · Unique(student_id,course_id) |

### cart  *(no timestamps)*
| id PK · student_id FK→users · course_id FK→course · Unique(student_id,course_id) |

### course_exam  *(one per course)*
| id PK · course_id FK→course UNIQUE · exam_time int (stores question count) · isPublished enum(Draft,Published) · created_at |

### exam_questions  *(raw `DB::table`)*
| id PK · course_id FK→course (cascade) · question_text varchar(255) · marks int default 1 · created_at |

### question_options
| id PK · question_id FK→exam_questions (cascade) · option_text varchar(255) · is_correct boolean default 0 · created_at |

### exam_results
| id PK · user_id FK→users · course_id FK→course · score int · percentage decimal(5,2) null · created_at |
Index(`user_id`,`course_id`).

### feedback  *(reviews & ratings)*
| id PK · course_id FK→course (cascade) · user_name varchar(255) · rating tinyint (values 1/3/5) · comment text · created_at |

### daily_quizzes  *(admin authored)*
| id PK · title · question varchar(500) · **options** varchar(255) = *the correct answer* · category enum(6) · created_at/updated_at |
> `options` is the single correct-answer string the learner's input is compared to (`ChallengeController::checkAnswer`), **not** a list of choices.

### student_daily_quizzes  *(streak system)*
| id PK · user_id FK→users · quiz_date date · preference · question · selected_answer · correct_answer · is_correct boolean · streak_count int |
Unique(`user_id`,`quiz_date`) — one attempt per day (`updateOrCreate`).

### cheating_detections  *(proctoring)*
| id PK · user_id FK→users · course_id FK→course · is_detected boolean · cheating_ban_until timestamp · created_at/updated_at |

### payment
| id PK · student_id FK→users · amount decimal(10,2) · details text · created_at |

### transaction  *(coupon-applied pending checkout)*
| id PK · payment decimal(10,2) (amount after discount) · status enum(Pending,Completed,Failed) · student_id FK→users · code varchar(50) · created_at |

### coupon_code  *(raw `DB::table`)*
| id PK · code varchar(10) UNIQUE · discount decimal(5,2) (percent) · created_at |

### teacherwallet  *(one per teacher)*
| id PK · teacher_id FK→users UNIQUE · total_amount decimal(12,2) default 0 |

---

## Uncertain Fields & Reasoning

1. **`course_amount` — stored as `DECIMAL(10,2)`** though validated as `string`. The
   code casts it numerically everywhere (`(int)$course->course_amount * 100` in Stripe,
   `(float)$search` comparisons). Decimal is the correct enterprise choice; numeric
   strings still bind fine.
2. **`feedback.rating` — `TINYINT`.** Validation restricts to `in:1,3,5` and the code
   averages it. Original Postgres code cast it (`CAST(rating AS INTEGER)`), implying it
   *may* have been stored as text; `TINYINT` is cleaner and averages natively. (The
   Postgres cast was updated to `CAST(... AS UNSIGNED)` for MySQL.)
3. **`publish` default = `Draft`.** No default is set at creation in `submitCourse`;
   `getAllCourse` only shows `Published`. `Draft` is the safe pre-publish state. Admin
   enum confirmed as `Published|Pending|Draft`.
4. **`course_exam.exam_time`** is populated with the *question count* (`saveExam`), so it
   doubles as both a question counter and an implied timer — kept as `int`.
5. **`daily_quizzes.options`** holds the *correct answer* (singular), not choices — named
   per the column the controller writes/reads.
6. **`status` / `isPublished` enums** were inferred from the only literal values written
   (`Completed`, `Published`, `Pending`); extra members (`Incomplete`, `Failed`) added
   for completeness.
7. **`transaction.code` → `coupon_code.code`** is a logical relationship only; the code
   never enforces it as a FK, so no constraint was added (coupons can be deleted
   independently).
8. **Timestamps:** several models set `public $timestamps = false` yet write `created_at`
   manually — those columns are included as **nullable** rather than auto-managed.

---

## PostgreSQL → MySQL Conversion Notes (code changes applied)

The original code contained two Postgres-only SQL fragments that would error on MySQL.
Both were fixed so the app runs on MySQL 8:

| File | Before (Postgres) | After (MySQL) |
|------|-------------------|---------------|
| `SearchController.php` | `(publish = 'Published')::integer` | `CASE WHEN publish='Published' THEN 1 ELSE 0 END` |
| `CourseController.php` | `AVG(CAST(rating AS INTEGER))` | `AVG(CAST(rating AS UNSIGNED))` |

`.env` was switched from `pgsql:5432` to `mysql:3306`, database `seekio`.

---

## How to run

```bash
# DB is already created & seeded. To rebuild from scratch:
php artisan migrate:fresh --seed

# Run the app:
npm install && npm run dev      # Vite + React/Inertia front-end
php artisan serve               # http://127.0.0.1:8000
```

**Demo logins (password = `password`):**
- Admin: `admin@seekio.test`
- Teacher: `sarah.kim@seekio.test`
- Student: `student1@seekio.test` … `student20@seekio.test`
