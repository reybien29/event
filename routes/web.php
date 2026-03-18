<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DivisionController;
use App\Http\Controllers\Admin\GameController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\RegistrationController;
use App\Models\Game;
use App\Models\Standing;
use App\Models\Tournament;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'tournament' => Tournament::active()->with('divisions')->first(),
        'recent_games' => Game::with(['teamA', 'teamB', 'division'])->latest()->take(6)->get(),
        'standings' => Standing::with(['team', 'division'])->orderByDesc('points')->get(),
    ]);
})->name('home');

Route::get('/register', [RegistrationController::class, 'create'])->name('register');
Route::post('/register', [RegistrationController::class, 'store'])->name('register.store');
Route::get('/register/success/{reference}', [RegistrationController::class, 'success'])->name('registration.success');

Route::get('/api/divisions', [\App\Http\Controllers\Admin\DivisionController::class, 'apiIndex']);

Route::get('/admin/login', [App\Http\Controllers\Admin\AuthController::class, 'create'])->name('login');
Route::post('/admin/login', [App\Http\Controllers\Admin\AuthController::class, 'store']);
Route::post('/admin/logout', [App\Http\Controllers\Admin\AuthController::class, 'destroy'])->name('admin.logout');

Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/teams', [\App\Http\Controllers\Admin\TeamController::class, 'index'])->name('teams.index');
    Route::get('/divisions', [\App\Http\Controllers\Admin\DivisionController::class, 'index'])->name('divisions.index');
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::get('/games', [GameController::class, 'index'])->name('games.index');
    Route::post('/games/generate', [GameController::class, 'generate'])->name('games.generate');

});
