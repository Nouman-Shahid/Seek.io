# Seek.io — Project & Deployment Vault 🔐

> ⚠️ **CONTAINS LIVE CREDENTIALS. KEEP THIS REPOSITORY PRIVATE.**
> InfinityFree reuses the **same password** for the control panel, FTP, and MySQL.
> If it ever leaks, change it in the InfinityFree panel (and it cascades to all three).

Last updated: 2026-06-07

---

## 1. What this project is

**Seek.io** — a Laravel 11 + React/Inertia e-learning platform (Udemy/Coursera-style):
students, instructors, admin, courses, chapters, enrollments, payments (Stripe),
quizzes, assignments, progress tracking, streaks, certificates, reviews, and an
AI-proctored (camera/MediaPipe) exam system.

**Stack:** PHP 8.2 · Laravel 11 · Inertia.js · React + Vite · Tailwind · MySQL 8.

---

## 2. What we did (summary)

1. **Reverse-engineered the entire database** from models/controllers/validation/
   React forms (the original PostgreSQL DB was lost) into a Laravel migration —
   18 domain tables + relationships + seeders. Converted Postgres → **MySQL 8**.
2. Added Eloquent relationships, realistic demo seeders (33 users, 32 courses, …).
3. Fixed Postgres-only SQL (`::integer`, `CAST(... AS INTEGER)`) for MySQL.
4. Fixed chapter **preview locking**, **enrolled-course badges**, and **embeddable
   YouTube videos**.
5. Fixed the **proctored exam** (single camera stream, non-fatal camera errors,
   real exam duration) — it was instantly cancelling/banning before.
6. **Deployed free** to InfinityFree (PHP + MySQL + SSL), uploaded via FTP.

Git branch with all changes: **`feature/mysql-database-reconstruction`** (commit `4dfacd6`).

---

## 3. Live site

| | |
|---|---|
| **URL** | https://seekio.freedev.app |
| Host | InfinityFree (free plan, lifetime) |
| Web root | `htdocs/` → app in `htdocs/laravel/`, public assets at `htdocs/` |

---

## 4. InfinityFree account (control panel)

| Field | Value |
|-------|-------|
| Login URL | https://dash.infinityfree.com |
| Account username | `if0_42121376` |
| Account password | `Hw0lWl8iwW24` |
| Subdomain | `seekio.freedev.app` |

---

## 5. FTP (file uploads)

| Field | Value |
|-------|-------|
| Host | `ftpupload.net` |
| Port | `21` |
| Username | `if0_42121376` |
| Password | `Hw0lWl8iwW24` |
| Mode | Passive (PASV) |

> Note: InfinityFree's free plan **auto-deletes large/zip files**, so the site was
> uploaded as individual files (6 parallel FTP workers), not as a zip.

---

## 6. MySQL (production database)

| Field | Value |
|-------|-------|
| Host | `sql300.infinityfree.com` |
| Port | `3306` |
| Database | `if0_42121376_seekio` |
| Username | `if0_42121376` |
| Password | `Hw0lWl8iwW24` |
| Admin | phpMyAdmin (via InfinityFree control panel) |
| Import file | `database/seekio_full_dump.sql` (schema + demo data) |

> Remote MySQL from outside InfinityFree is **not** allowed — only the app server
> connects. Manage data via the panel's phpMyAdmin.

---

## 7. Production `.env` (full, as deployed at `htdocs/laravel/.env`)

```ini
APP_NAME=Seek.io
APP_ENV=production
APP_KEY=base64:Wha71uhmdHB8ZxBHYM8wxE9qX7BMgRkTftZ00jr4JA0=
APP_DEBUG=false
APP_TIMEZONE=UTC
APP_URL=https://seekio.freedev.app

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=sql300.infinityfree.com
DB_PORT=3306
DB_DATABASE=if0_42121376_seekio
DB_USERNAME=if0_42121376
DB_PASSWORD=Hw0lWl8iwW24

SESSION_DRIVER=database
SESSION_LIFETIME=120
QUEUE_CONNECTION=database
CACHE_STORE=database

MAIL_MAILER=log
MAIL_FROM_ADDRESS="hello@seekio.test"
MAIL_FROM_NAME="${APP_NAME}"

STRIPE_PK=
STRIPE_SK=

VITE_APP_NAME="${APP_NAME}"
```

---

## 8. Local development (XAMPP)

| Field | Value |
|-------|-------|
| DB engine | MySQL (XAMPP), `localhost:3306` |
| Database | `seekio` |
| DB user | `root` |
| DB password | *(empty)* |
| Run backend | `php artisan serve` → http://127.0.0.1:8000 |
| Run frontend | `npm run dev` (Vite) |
| Rebuild DB | `php artisan migrate:fresh --seed` |
| Restore dev deps | `composer install` (after a `--no-dev` install) |

---

## 9. Demo accounts (all environments) — password: `password`

| Role | Email |
|------|-------|
| Admin | `admin@seekio.test` |
| Teacher | `sarah.kim@seekio.test` (+ david.okonkwo, aisha.rahman, marco.bianchi, elena.petrova, james.carter, fatima.noor, liam.murphy, priya.sharma, hiroshi.tanaka, sofia.garcia, omar.haddad — all `…@seekio.test`) |
| Student | `student1@seekio.test` … `student20@seekio.test` |

---

## 10. How to redeploy / update the live site

1. Make changes locally; if frontend changed: `npm run build`.
2. If PHP deps changed: `composer install --no-dev --optimize-autoloader`.
3. Upload changed files over FTP (see §5) to:
   - app/source → `htdocs/laravel/...`
   - built assets/public → `htdocs/...`
   - keep `htdocs/index.php` = the shared-hosting front controller (in `deploy/index.php`)
4. Don't upload `public/hot` (dev-only) or large `.zip` files.

---

## 11. Known limitations on the free host (fine for a school project)

- **Stripe checkout**: needs `STRIPE_PK`/`STRIPE_SK` (use **test** keys). Everything
  else works without them.
- **Email**: logged, not sent (`MAIL_MAILER=log`). Seeded users are pre-verified.
- **No SSH / Composer / cron** on the host (DB-backed queue covers background needs).
- **Camera proctoring** requires HTTPS — provided by InfinityFree's free SSL.
