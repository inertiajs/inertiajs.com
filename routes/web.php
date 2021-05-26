<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

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

Route::get('{page?}', function($page = 'index') {
    if (!file_exists(resource_path("js/Pages/$page.js"))) {
        App::abort(404);
    }

    return Inertia::render($page);
});
