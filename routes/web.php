<?php

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('{page?}', function (string $page = 'index'): Response {
    if (! file_exists(resource_path("js/Pages/$page.jsx"))) {
        App::abort(404);
    }

    return Inertia::render($page);
});
