<?php

use App\Http\Controllers\DiscordAuthController;
use App\Http\Controllers\GithubAuthController;
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

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('discord/authorize')->group(function () {
    Route::get('/', [DiscordAuthController::class, 'show'])->name('discord.auth');
    Route::get('/callback', [DiscordAuthController::class, 'store']);
});

Route::prefix('github/authorize')->group(function () {
    Route::get('/', [GithubAuthController::class, 'show'])->name('github.auth');
    Route::get('/callback', [GithubAuthController::class, 'store']);
});
