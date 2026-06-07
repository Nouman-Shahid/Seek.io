# Deploying Seek.io for free (InfinityFree)

A step-by-step guide to publish the full app **+ database** for free, forever,
on [InfinityFree](https://infinityfree.com) (free PHP 8.2 + MySQL + SSL, no card).

> Works the same on most cPanel shared hosts (AwardSpace, etc.).

---

## 0. What's already prepared for you

Running locally, I've generated everything you need:

- ✅ **Production assets built** → `public/build/` (from `npm run build`)
- ✅ **Database dump** → `database/seekio_full_dump.sql` (schema + demo data)
- ✅ **Shared-hosting front controller** → `deploy/index.php`
- ✅ **Production env template** → `deploy/.env.production` (APP_KEY already set)
- ✅ **App-folder protection** → `deploy/protect-app.htaccess`

You still need to: install production PHP deps, create the free account, upload,
and import the DB. ~30–45 minutes, one time.

---

## 1. Build the production vendor folder (on your PC)

Open a terminal in the project root and run:

```bash
composer install --no-dev --optimize-autoloader
```

This trims dev-only packages so the upload is smaller and production-safe.
(To go back to developing locally later, just run `composer install` again.)

---

## 2. Create the InfinityFree account + database

1. Sign up at <https://infinityfree.com> → **Create Account** → pick a free
   subdomain, e.g. `seekio.infinityfreeapp.com` (or connect your own domain).
2. In the control panel open **MySQL Databases** → create a database.
   Note the four values it shows you:
   - **DB Host** (e.g. `sql309.infinityfree.com`)
   - **DB Name** (e.g. `if0_12345678_seekio`)
   - **DB User** (e.g. `if0_12345678`)
   - **DB Password**

---

## 3. Import the database

1. Control panel → **phpMyAdmin** → select your new database.
2. **Import** tab → choose `database/seekio_full_dump.sql` → **Go**.
3. You should see all tables (`users`, `course`, `chapter`, …) filled with the
   demo data. Logins: `admin@seekio.test`, `sarah.kim@seekio.test`,
   `student1@seekio.test` — password `password`.

---

## 4. Arrange the files for upload

On shared hosting the served folder is **`htdocs/`**. Lay it out like this:

```
htdocs/
├── index.php          ← use deploy/index.php  (NOT the one from public/)
├── .htaccess          ← copy from public/.htaccess
├── build/             ← copy the whole public/build/ folder
├── favicon.ico, robots.txt, images, hot ...   ← everything else from public/
└── laravel/
    ├── app/  bootstrap/  config/  database/  resources/  routes/  storage/  vendor/
    ├── artisan, composer.json, ...   ← everything from the project root EXCEPT public/
    ├── .htaccess      ← use deploy/protect-app.htaccess (rename to .htaccess)
    └── .env           ← use deploy/.env.production (rename to .env, fill DB_*)
```

Concretely:

1. Put the **whole project EXCEPT the `public/` folder** inside `htdocs/laravel/`.
2. Put the **contents of `public/`** directly into `htdocs/` …
3. …then **replace** `htdocs/index.php` with `deploy/index.php`.
4. Copy `deploy/protect-app.htaccess` → `htdocs/laravel/.htaccess`.
5. Copy `deploy/.env.production` → `htdocs/laravel/.env` and edit it (next step).

> ⚠️ **Do NOT upload `public/hot`.** That file is created by `npm run dev` and
> forces Vite into local-dev mode — it will break the live site. Delete it before
> copying `public/` (it's safe to delete; it regenerates next time you run the
> dev server). Only the **built** `public/build/` belongs on the server.

> Tip: zip the `laravel/` folder locally, upload the single zip via the file
> manager, and extract it on the server — far faster than uploading thousands of
> `vendor/` files one by one.

---

## 5. Configure `.env` (at `htdocs/laravel/.env`)

Edit these values with what InfinityFree gave you in step 2:

```ini
APP_URL=https://seekio.infinityfreeapp.com   # your real URL (https!)
DB_HOST=sql309.infinityfree.com
DB_DATABASE=if0_12345678_seekio
DB_USERNAME=if0_12345678
DB_PASSWORD=••••••••
```

`APP_KEY`, `APP_ENV=production`, `APP_DEBUG=false` are already set.

---

## 6. Go live

Visit `https://your-subdomain.infinityfreeapp.com`.

- New SSL certs can take a few minutes to activate — if you see a cert warning,
  wait ~15 min and retry.
- HTTPS is required for the **exam camera/proctoring** to work — InfinityFree's
  free SSL covers that.

---

## Notes & limitations (fine for a school project)

| Topic | Status |
|-------|--------|
| Browse, courses, enroll (demo), chapters, exams, quizzes, dashboards, streaks | ✅ Work out of the box |
| File uploads | ✅ N/A — images are stored as URLs, not uploaded files (no `storage:link` needed) |
| Email (verification, password reset) | ⚠️ Logged, not sent (`MAIL_MAILER=log`). Users in the DB are already verified. |
| Stripe checkout | ⚠️ Needs `STRIPE_SK`/`STRIPE_PK` (use **test** keys). Everything else works without them. |
| Background jobs / cron | ⚠️ Not available on free tier; app uses DB queue so nothing breaks. |

### If a page errors
Temporarily set `APP_DEBUG=true` in `.env` to see the message, then set it back
to `false`. Most issues are a wrong `DB_*` value or `APP_URL`.

---

## Want it always-on without your PC, still free?
This setup already is — InfinityFree runs 24/7 independent of your computer.
If you later outgrow the free limits, an **Oracle Cloud Always Free** VM gives a
full Linux server (real Composer/SSH/MySQL) free forever; ask me and I'll write
that guide too.
