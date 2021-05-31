<?php

use Inertia\Inertia;
use Illuminate\Support\Collection;
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

Route::get('/releases', function() {
    return Inertia::render('releases', [
        'releases' => Collection::make(glob(resource_path('js/Pages/releases').'/*.js'))
            ->map(function ($path) {
                $slug = substr(basename($path), 0, -3);
                $parts = explode('-', $slug);

                if (count($parts) === 6) {
                    $parts[1] = $parts[0].'-'.$parts[1];
                    $parts = array_splice($parts, 1);
                }

                return [
                    'slug' => $slug,
                    'library' => $parts[0],
                    'version' => $parts[1],
                    'date' => Date::createFromDate($parts[2], $parts[3], $parts[4])->format('F j, Y'),
                ];
            })->sortByDesc('version')->values()
    ]);
});

Route::get('{page?}', function($page = 'index') {
    if (!file_exists(resource_path("js/Pages/$page.js"))) {
        App::abort(404);
    }

    return Inertia::render($page);
})->where('page', '.*');

