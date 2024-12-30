<?php

use App\Http\Controllers\DiscordConnectionController;
use App\Http\Controllers\GithubAuthController;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Redirect;
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

Route::middleware('auth')->get('auth/logout', function () {
    Auth::logout();

    return redirect()->to('/');
});

Route::prefix('auth/github')->group(function () {
    Route::get('/', [GithubAuthController::class, 'show']);
    Route::get('/callback', [GithubAuthController::class, 'store']);
});

Route::middleware('auth')->prefix('/connections/discord/authorize')->group(function () {
    Route::get('/', [DiscordConnectionController::class, 'show']);
    Route::get('/callback', [DiscordConnectionController::class, 'store']);
});

Route::get('/releases', function () {
    return Inertia::render('releases', [
        'all' => Request::boolean('all'),
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
            })
            ->sortByDesc('version', SORT_NATURAL)
            ->groupBy('library')
            ->map(function ($releases, $library) {
                return Request::boolean('all')
                    ? $releases
                    : $releases->take(5);
            }),
    ]);
});

Route::get('/releases/{slug}', function ($slug) {
    $page = "releases/$slug";

    function oldReleaseRedirect($page)
    {
        $oldReleases = [
            'releases/inertia-0.1.0' => '/releases/inertia-0.1.0-2019-08-13',
            'releases/inertia-0.1.1' => '/releases/inertia-0.1.1-2019-08-13',
            'releases/inertia-0.1.2' => '/releases/inertia-0.1.2-2019-08-14',
            'releases/inertia-0.1.3' => '/releases/inertia-0.1.3-2019-08-14',
            'releases/inertia-0.1.4' => '/releases/inertia-0.1.4-2019-09-26',
            'releases/inertia-0.1.5' => '/releases/inertia-0.1.5-2019-09-28',
            'releases/inertia-0.1.6' => '/releases/inertia-0.1.6-2019-09-28',
            'releases/inertia-0.1.7' => '/releases/inertia-0.1.7-2019-10-15',
            'releases/inertia-0.1.8' => '/releases/inertia-0.1.8-2020-04-30',
            'releases/inertia-0.1.9' => '/releases/inertia-0.1.9-2020-04-30',
            'releases/inertia-0.2.0' => '/releases/inertia-0.2.0-2020-08-20',
            'releases/inertia-0.2.1' => '/releases/inertia-0.2.1-2020-08-20',
            'releases/inertia-0.2.2' => '/releases/inertia-0.2.2-2020-09-08',
            'releases/inertia-0.2.3' => '/releases/inertia-0.2.3-2020-09-08',
            'releases/inertia-0.3.0' => '/releases/inertia-0.3.0-2020-09-24',
            'releases/inertia-0.3.2' => '/releases/inertia-0.3.2-2020-09-24',
            'releases/inertia-0.3.3' => '/releases/inertia-0.3.3-2020-09-24',
            'releases/inertia-0.3.4' => '/releases/inertia-0.3.4-2020-09-24',
            'releases/inertia-0.3.5' => '/releases/inertia-0.3.5-2020-09-30',
            'releases/inertia-0.3.6' => '/releases/inertia-0.3.6-2020-09-30',
            'releases/inertia-0.4.0' => '/releases/inertia-0.4.0-2020-10-09',
            'releases/inertia-0.4.1' => '/releases/inertia-0.4.1-2020-10-13',
            'releases/inertia-0.4.2' => '/releases/inertia-0.4.2-2020-10-16',
            'releases/inertia-0.4.3' => '/releases/inertia-0.4.3-2020-10-16',
            'releases/inertia-0.5.0' => '/releases/inertia-0.5.0-2020-10-20',
            'releases/inertia-0.5.1' => '/releases/inertia-0.5.1-2020-10-26',
            'releases/inertia-0.5.2' => '/releases/inertia-0.5.2-2020-10-27',
            'releases/inertia-0.6.0' => '/releases/inertia-0.6.0-2020-10-27',
            'releases/inertia-0.6.1' => '/releases/inertia-0.6.1-2020-10-29',
            'releases/inertia-0.6.2' => '/releases/inertia-0.6.2-2020-11-13',
            'releases/inertia-0.6.3' => '/releases/inertia-0.6.3-2020-11-18',
            'releases/inertia-0.7.0' => '/releases/inertia-0.7.0-2020-12-03',
            'releases/inertia-0.8.0' => '/releases/inertia-0.8.0-2020-12-23',
            'releases/inertia-0.8.1' => '/releases/inertia-0.8.1-2020-12-29',
            'releases/inertia-0.8.2' => '/releases/inertia-0.8.2-2020-12-29',
            'releases/inertia-0.8.3' => '/releases/inertia-0.8.3-2021-01-21',
            'releases/inertia-0.8.4' => '/releases/inertia-0.8.4-2021-01-21',
            'releases/inertia-0.8.5' => '/releases/inertia-0.8.5-2021-02-24',
            'releases/inertia-0.8.6' => '/releases/inertia-0.8.6-2021-03-26',
            'releases/inertia-0.8.7' => '/releases/inertia-0.8.7-2021-04-14',
            'releases/inertia-laravel-0.1.0' => '/releases/inertia-laravel-0.1.0-2019-08-13',
            'releases/inertia-laravel-0.1.1' => '/releases/inertia-laravel-0.1.1-2019-08-26',
            'releases/inertia-laravel-0.1.2' => '/releases/inertia-laravel-0.1.2-2019-08-27',
            'releases/inertia-laravel-0.1.3' => '/releases/inertia-laravel-0.1.3-2019-09-09',
            'releases/inertia-laravel-0.2.0' => '/releases/inertia-laravel-0.2.0-2020-01-02',
            'releases/inertia-laravel-0.2.1' => '/releases/inertia-laravel-0.2.1-2020-01-02',
            'releases/inertia-laravel-0.2.2' => '/releases/inertia-laravel-0.2.2-2020-01-02',
            'releases/inertia-laravel-0.2.3' => '/releases/inertia-laravel-0.2.3-2020-01-02',
            'releases/inertia-laravel-0.2.4' => '/releases/inertia-laravel-0.2.4-2020-01-04',
            'releases/inertia-laravel-0.2.5' => '/releases/inertia-laravel-0.2.5-2020-02-28',
            'releases/inertia-laravel-0.2.6' => '/releases/inertia-laravel-0.2.6-2020-08-20',
            'releases/inertia-laravel-0.2.7' => '/releases/inertia-laravel-0.2.7-2020-08-21',
            'releases/inertia-laravel-0.2.8' => '/releases/inertia-laravel-0.2.8-2020-08-24',
            'releases/inertia-laravel-0.2.9' => '/releases/inertia-laravel-0.2.9-2020-09-05',
            'releases/inertia-laravel-0.2.10' => '/releases/inertia-laravel-0.2.10-2020-09-09',
            'releases/inertia-laravel-0.2.11' => '/releases/inertia-laravel-0.2.11-2020-09-09',
            'releases/inertia-laravel-0.2.12' => '/releases/inertia-laravel-0.2.12-2020-09-17',
            'releases/inertia-laravel-0.2.13' => '/releases/inertia-laravel-0.2.13-2020-09-30',
            'releases/inertia-laravel-0.2.14' => '/releases/inertia-laravel-0.2.14-2020-09-30',
            'releases/inertia-laravel-0.2.15' => '/releases/inertia-laravel-0.2.15-2020-10-02',
            'releases/inertia-laravel-0.3.0' => '/releases/inertia-laravel-0.3.0-2020-10-14',
            'releases/inertia-laravel-0.3.1' => '/releases/inertia-laravel-0.3.1-2020-10-14',
            'releases/inertia-laravel-0.3.2' => '/releases/inertia-laravel-0.3.2-2020-10-21',
            'releases/inertia-laravel-0.3.3' => '/releases/inertia-laravel-0.3.3-2020-10-29',
            'releases/inertia-laravel-0.3.4' => '/releases/inertia-laravel-0.3.4-2020-12-03',
            'releases/inertia-laravel-0.3.5' => '/releases/inertia-laravel-0.3.5-2020-12-23',
            'releases/inertia-laravel-0.3.6' => '/releases/inertia-laravel-0.3.6-2021-01-08',
            'releases/inertia-laravel-0.4.0' => '/releases/inertia-laravel-0.4.0-2021-03-02',
            'releases/inertia-laravel-0.4.1' => '/releases/inertia-laravel-0.4.1-2021-04-02',
            'releases/inertia-laravel-0.4.2' => '/releases/inertia-laravel-0.4.2-2021-05-10',
            'releases/inertia-react-0.1.0' => '/releases/inertia-react-0.1.0-2019-08-13',
            'releases/inertia-react-0.1.1' => '/releases/inertia-react-0.1.1-2019-08-13',
            'releases/inertia-react-0.1.2' => '/releases/inertia-react-0.1.2-2019-08-14',
            'releases/inertia-react-0.1.3' => '/releases/inertia-react-0.1.3-2019-09-26',
            'releases/inertia-react-0.1.4' => '/releases/inertia-react-0.1.4-2019-12-16',
            'releases/inertia-react-0.1.5' => '/releases/inertia-react-0.1.5-2020-04-30',
            'releases/inertia-react-0.1.6' => '/releases/inertia-react-0.1.6-2020-05-07',
            'releases/inertia-react-0.2.1' => '/releases/inertia-react-0.2.1-2020-09-09',
            'releases/inertia-react-0.2.2' => '/releases/inertia-react-0.2.2-2020-09-24',
            'releases/inertia-react-0.3.0' => '/releases/inertia-react-0.3.0-2020-10-09',
            'releases/inertia-react-0.3.2' => '/releases/inertia-react-0.3.2-2020-10-13',
            'releases/inertia-react-0.4.0' => '/releases/inertia-react-0.4.0-2020-10-20',
            'releases/inertia-react-0.4.1' => '/releases/inertia-react-0.4.1-2020-10-27',
            'releases/inertia-react-0.4.2' => '/releases/inertia-react-0.4.2-2020-11-13',
            'releases/inertia-react-0.4.3' => '/releases/inertia-react-0.4.3-2020-11-13',
            'releases/inertia-react-0.4.4' => '/releases/inertia-react-0.4.4-2020-12-15',
            'releases/inertia-react-0.4.5' => '/releases/inertia-react-0.4.5-2020-12-15',
            'releases/inertia-react-0.5.0' => '/releases/inertia-react-0.5.0-2020-12-23',
            'releases/inertia-react-0.5.1' => '/releases/inertia-react-0.5.1-2021-01-04',
            'releases/inertia-react-0.5.2' => '/releases/inertia-react-0.5.2-2021-01-21',
            'releases/inertia-react-0.5.3' => '/releases/inertia-react-0.5.3-2021-02-25',
            'releases/inertia-react-0.5.4' => '/releases/inertia-react-0.5.4-2021-02-25',
            'releases/inertia-react-0.5.5' => '/releases/inertia-react-0.5.5-2021-03-26',
            'releases/inertia-react-0.5.6' => '/releases/inertia-react-0.5.6-2021-04-02',
            'releases/inertia-react-0.5.7' => '/releases/inertia-react-0.5.7-2021-04-03',
            'releases/inertia-react-0.5.8' => '/releases/inertia-react-0.5.8-2021-04-03',
            'releases/inertia-react-0.5.9' => '/releases/inertia-react-0.5.9-2021-04-05',
            'releases/inertia-react-0.5.10' => '/releases/inertia-react-0.5.10-2021-04-07',
            'releases/inertia-react-0.5.11' => '/releases/inertia-react-0.5.11-2021-04-08',
            'releases/inertia-react-0.5.12' => '/releases/inertia-react-0.5.12-2021-04-19',
            'releases/inertia-svelte-0.1.0' => '/releases/inertia-svelte-0.1.0-2019-08-15',
            'releases/inertia-svelte-0.1.1' => '/releases/inertia-svelte-0.1.1-2020-05-07',
            'releases/inertia-svelte-0.1.2' => '/releases/inertia-svelte-0.1.2-2020-05-08',
            'releases/inertia-svelte-0.3.0' => '/releases/inertia-svelte-0.3.0-2020-09-09',
            'releases/inertia-svelte-0.3.1' => '/releases/inertia-svelte-0.3.1-2020-09-24',
            'releases/inertia-svelte-0.4.0' => '/releases/inertia-svelte-0.4.0-2020-10-09',
            'releases/inertia-svelte-0.4.1' => '/releases/inertia-svelte-0.4.1-2020-10-13',
            'releases/inertia-svelte-0.5.0' => '/releases/inertia-svelte-0.5.0-2020-10-20',
            'releases/inertia-svelte-0.5.1' => '/releases/inertia-svelte-0.5.1-2020-11-13',
            'releases/inertia-svelte-0.6.0' => '/releases/inertia-svelte-0.6.0-2020-12-23',
            'releases/inertia-svelte-0.6.1' => '/releases/inertia-svelte-0.6.1-2021-02-26',
            'releases/inertia-svelte-0.6.2' => '/releases/inertia-svelte-0.6.2-2021-03-26',
            'releases/inertia-svelte-0.6.3' => '/releases/inertia-svelte-0.6.3-2021-04-02',
            'releases/inertia-svelte-0.6.4' => '/releases/inertia-svelte-0.6.4-2021-04-03',
            'releases/inertia-svelte-0.6.5' => '/releases/inertia-svelte-0.6.5-2021-04-05',
            'releases/inertia-svelte-0.6.6' => '/releases/inertia-svelte-0.6.6-2021-04-07',
            'releases/inertia-svelte-0.6.7' => '/releases/inertia-svelte-0.6.7-2021-04-19',
            'releases/inertia-vue-0.1.0' => '/releases/inertia-vue-0.1.0-2019-08-13',
            'releases/inertia-vue-0.1.1' => '/releases/inertia-vue-0.1.1-2019-08-13',
            'releases/inertia-vue-0.1.2' => '/releases/inertia-vue-0.1.2-2019-09-28',
            'releases/inertia-vue-0.1.3' => '/releases/inertia-vue-0.1.3-2020-05-07',
            'releases/inertia-vue-0.1.4' => '/releases/inertia-vue-0.1.4-2020-05-07',
            'releases/inertia-vue-0.2.1' => '/releases/inertia-vue-0.2.1-2020-09-01',
            'releases/inertia-vue-0.2.2' => '/releases/inertia-vue-0.2.2-2020-09-08',
            'releases/inertia-vue-0.2.3' => '/releases/inertia-vue-0.2.3-2020-09-09',
            'releases/inertia-vue-0.2.4' => '/releases/inertia-vue-0.2.4-2020-09-24',
            'releases/inertia-vue-0.3.0' => '/releases/inertia-vue-0.3.0-2020-10-09',
            'releases/inertia-vue-0.3.1' => '/releases/inertia-vue-0.3.1-2020-10-09',
            'releases/inertia-vue-0.3.2' => '/releases/inertia-vue-0.3.2-2020-10-13',
            'releases/inertia-vue-0.4.0' => '/releases/inertia-vue-0.4.0-2020-10-20',
            'releases/inertia-vue-0.4.1' => '/releases/inertia-vue-0.4.1-2020-10-27',
            'releases/inertia-vue-0.4.2' => '/releases/inertia-vue-0.4.2-2020-11-13',
            'releases/inertia-vue-0.5.0' => '/releases/inertia-vue-0.5.0-2020-12-23',
            'releases/inertia-vue-0.5.1' => '/releases/inertia-vue-0.5.1-2020-12-28',
            'releases/inertia-vue-0.5.2' => '/releases/inertia-vue-0.5.2-2020-12-28',
            'releases/inertia-vue-0.5.3' => '/releases/inertia-vue-0.5.3-2020-12-29',
            'releases/inertia-vue-0.5.4' => '/releases/inertia-vue-0.5.4-2020-12-29',
            'releases/inertia-vue-0.5.5' => '/releases/inertia-vue-0.5.5-2021-01-21',
            'releases/inertia-vue-0.5.6' => '/releases/inertia-vue-0.5.6-2021-03-26',
            'releases/inertia-vue-0.5.7' => '/releases/inertia-vue-0.5.7-2021-04-02',
            'releases/inertia-vue-0.5.8' => '/releases/inertia-vue-0.5.8-2021-04-03',
            'releases/inertia-vue-0.5.9' => '/releases/inertia-vue-0.5.9-2021-04-05',
            'releases/inertia-vue-0.5.10' => '/releases/inertia-vue-0.5.10-2021-04-07',
            'releases/inertia-vue-0.5.11' => '/releases/inertia-vue-0.5.11-2021-04-14',
            'releases/inertia-vue-0.5.12' => '/releases/inertia-vue-0.5.12-2021-04-19',
            'releases/inertia-vue3-0.1.0' => '/releases/inertia-vue3-0.1.0-2020-10-09',
            'releases/inertia-vue3-0.1.1' => '/releases/inertia-vue3-0.1.1-2020-10-13',
            'releases/inertia-vue3-0.2.0' => '/releases/inertia-vue3-0.2.0-2020-10-20',
            'releases/inertia-vue3-0.2.1' => '/releases/inertia-vue3-0.2.1-2020-10-27',
            'releases/inertia-vue3-0.2.2' => '/releases/inertia-vue3-0.2.2-2020-11-13',
            'releases/inertia-vue3-0.3.0' => '/releases/inertia-vue3-0.3.0-2020-12-23',
            'releases/inertia-vue3-0.3.1' => '/releases/inertia-vue3-0.3.1-2020-12-28',
            'releases/inertia-vue3-0.3.2' => '/releases/inertia-vue3-0.3.2-2020-12-28',
            'releases/inertia-vue3-0.3.3' => '/releases/inertia-vue3-0.3.3-2020-12-29',
            'releases/inertia-vue3-0.3.4' => '/releases/inertia-vue3-0.3.4-2020-12-29',
            'releases/inertia-vue3-0.3.5' => '/releases/inertia-vue3-0.3.5-2021-01-21',
            'releases/inertia-vue3-0.3.6' => '/releases/inertia-vue3-0.3.6-2021-03-26',
            'releases/inertia-vue3-0.3.7' => '/releases/inertia-vue3-0.3.7-2021-03-30',
            'releases/inertia-vue3-0.3.8' => '/releases/inertia-vue3-0.3.8-2021-04-01',
            'releases/inertia-vue3-0.3.9' => '/releases/inertia-vue3-0.3.9-2021-04-02',
            'releases/inertia-vue3-0.3.10' => '/releases/inertia-vue3-0.3.10-2021-04-03',
            'releases/inertia-vue3-0.3.11' => '/releases/inertia-vue3-0.3.11-2021-04-05',
            'releases/inertia-vue3-0.3.12' => '/releases/inertia-vue3-0.3.12-2021-04-07',
            'releases/inertia-vue3-0.3.13' => '/releases/inertia-vue3-0.3.13-2021-04-14',
            'releases/inertia-vue3-0.3.14' => '/releases/inertia-vue3-0.3.14-2021-04-19',
            'releases/inertia-progress-0.1.0' => '/releases/progress-0.1.0-2020-09-24',
            'releases/inertia-progress-0.1.1' => '/releases/progress-0.1.1-2020-09-24',
            'releases/inertia-progress-0.1.2' => '/releases/progress-0.1.2-2020-09-24',
            'releases/inertia-progress-0.2.0' => '/releases/progress-0.2.0-2020-10-27',
            'releases/inertia-progress-0.2.1' => '/releases/progress-0.2.1-2020-10-29',
            'releases/inertia-progress-0.2.2' => '/releases/progress-0.2.2-2020-11-03',
            'releases/inertia-progress-0.2.3' => '/releases/progress-0.2.3-2020-12-24',
            'releases/inertia-progress-0.2.4' => '/releases/progress-0.2.4-2020-12-24',
        ];

        if (isset($oldReleases[$page])) {
            return $oldReleases[$page];
        }
    }

    if ($redirect = oldReleaseRedirect($page)) {
        return Redirect::to($redirect, 301);
    }

    if (! file_exists(resource_path("js/Pages/$page.js"))) {
        App::abort(404);
    }

    $parts = explode('-', $slug);

    if (count($parts) === 6) {
        $parts[1] = $parts[0].'-'.$parts[1];
        $parts = array_splice($parts, 1);
    }

    return Inertia::render($page, [
        'title' => $parts[0].'@'.$parts[1],
        'date' => Date::createFromDate($parts[2], $parts[3], $parts[4])->format('F j, Y'),
    ]);
});

Route::get('{page?}', function ($page = 'index') {
    if (! file_exists(resource_path("js/Pages/$page.js"))) {
        App::abort(404);
    }

    return Inertia::render($page);
});
