<?php

/**
 * Shared-hosting front controller for Seek.io (InfinityFree / cPanel etc.).
 *
 * Layout expected on the server (everything lives under your web root `htdocs/`):
 *
 *   htdocs/
 *   ├── index.php              <-- THIS file
 *   ├── .htaccess              <-- copied from the project's public/.htaccess
 *   ├── build/                 <-- copied from public/build  (Vite assets)
 *   ├── favicon.ico, robots.txt, images, ...  (rest of public/)
 *   └── laravel/               <-- the whole Laravel app EXCEPT public/
 *       ├── app/ bootstrap/ config/ database/ routes/ storage/ vendor/
 *       ├── .env               <-- your production env (see .env.production)
 *       └── .htaccess          <-- "Require all denied" (blocks direct access)
 *
 * Because the framework is in ./laravel and the web root (this folder) holds the
 * built assets, we tell Laravel to use THIS directory as the public path.
 */

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

$base = __DIR__ . '/laravel';

// Maintenance mode short-circuit.
if (file_exists($maintenance = $base . '/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Composer autoloader + bootstrap the framework from ./laravel.
require $base . '/vendor/autoload.php';

/** @var \Illuminate\Foundation\Application $app */
$app = require_once $base . '/bootstrap/app.php';

// Built assets (build/, images, ...) live next to this index.php.
$app->usePublicPath(__DIR__);

$app->handleRequest(Request::capture());
