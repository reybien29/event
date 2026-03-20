<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GameController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\StatsController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\RegistrationController;
use App\Models\Tournament;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'tournament' => Tournament::active()->first(),
    ]);
})->name('home');

Route::get('/register', [RegistrationController::class, 'create'])->name('register');
Route::post('/register', [RegistrationController::class, 'store'])->name('register.store');
Route::get('/register/success/{reference}', [RegistrationController::class, 'success'])->name('registration.success');

Route::get('/register/success/{reference}', [RegistrationController::class, 'success'])->name('registration.success');

Route::get('/admin/login', [AuthController::class, 'create'])->name('login');
Route::post('/admin/login', [AuthController::class, 'store']);
Route::post('/admin/logout', [AuthController::class, 'destroy'])->name('admin.logout');

Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');
    Route::post('/teams/brackets/generate', [TeamController::class, 'generateBrackets'])->name('teams.brackets.generate');
    Route::get('/stats', [StatsController::class, 'index'])->name('stats.index');
    Route::put('/stats/tournament/{tournament}', [StatsController::class, 'update'])->name('stats.update');
    Route::post('/stats/tournament/{tournament}/facebook', [StatsController::class, 'publish'])->name('stats.publish');
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');
    Route::get('/games', [GameController::class, 'index'])->name('games.index');
});
