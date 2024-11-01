# Learning Platform SaaS

A full-stack multi-role learning platform built with Laravel 11 and React (Inertia.js). Supports student enrolment, teacher course creation, Stripe payments, and an admin control panel.

## Repository Structure

| Directory | Stack | Role |
|---|---|---|
| `app/Http/Controllers/` | Laravel 11 | API and web controllers |
| `app/Models/` | Eloquent ORM | Data models |
| `app/Services/` | PHP | External service integrations |
| `resources/js/Pages/` | React + Inertia | Frontend page components |
| `resources/js/Components/` | React | Shared UI components |
| `resources/js/Layouts/` | React | Page layout wrappers |
| `routes/` | Laravel | Role-scoped route files |
| `database/migrations/` | Laravel | Schema migrations |

## Features

- **Multi-role Auth** — student, teacher, and admin roles with middleware-guarded route groups
- **Course Management** — teachers create, publish, and price courses with chapter-level video content
- **Chapter Completion Tracking** — per-student progress with percentage completion per course
- **Exam Module** — teacher-authored exams with auto-grading, results, and pass/fail tracking
- **Stripe Payments** — cart checkout with Stripe payment intents and webhook-driven enrolment
- **Teacher Wallet** — per-teacher revenue tracking with withdrawal flow
- **Daily Challenges** — daily quiz with timer, cheat detection via tab-switch events, and WebPurify content moderation
- **Admin Panel** — platform-wide dashboard with course approval, user management, and quiz oversight
- **Search** — full-text course and chapter search

## Tech Stack

### Backend (Laravel 11)
- Eloquent ORM with MySQL
- Laravel Breeze (Inertia stack) for authentication scaffolding
- Stripe PHP SDK for payment processing
- WebPurify API for content moderation

### Frontend (React + Inertia.js)
- React 18 with JSX
- Inertia.js for SPA-style navigation without a separate API
- Tailwind CSS for utility-first styling
- Vite for asset bundling

## Getting Started

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

```bash
npm install
npm run dev
```

## User Roles

| Role | Capabilities |
|---|---|
| Student | Enrol in courses, complete chapters, sit exams, take daily challenges |
| Teacher | Create courses, upload chapters, set exams, view earnings |
| Admin | Approve courses, manage users, oversee platform activity |
