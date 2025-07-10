<?php

use App\Support\Markdown;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('{page?}', function ($page = 'index') {
    if ($page === '.md') {
        $page = 'index.md';
    }

    $template = str($page)->before('.md')->toString();
    $templatePath = resource_path("js/Pages/$template.jsx");

    abort_if(! str_ends_with($templatePath, '.jsx'), 404);

    if (str_ends_with($page, '.md')) {
        return response(Markdown::fromJsx(
            file_get_contents($templatePath)
        ), 200, [
            'Content-Type' => 'text/markdown',
        ]);
    }

    return Inertia::render($page);
});
