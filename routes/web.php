<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\PortfolioController;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// ── Main portfolio site (arifhassan.com) ──────────────────────────────
Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::post('/contact', [PortfolioController::class, 'contact'])->name('contact');

// ── Blog subdomain (blog.arifhassan.com) ──────────────────────────────
Route::domain('blog.' . config('app.base_domain', 'arifhassan.com'))->group(function () {
    Route::get('/', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog.index');
    Route::get('/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('blog.show');
});

require __DIR__ . '/settings.php';
