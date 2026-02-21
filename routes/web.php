<?php

use App\Http\Controllers\ContactController;
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

Route::get('/', [PortfolioController::class, 'index'])->name('home');
// Route::post('/contact', [PortfolioController::class, 'contact'])->name('contact');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

// Blog
Route::prefix('blog')->name('blog.')->group(function () {
    Route::get('/', [\App\Http\Controllers\BlogController::class, 'index'])->name('index');
    Route::get('/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('show');
});

require __DIR__ . '/settings.php';
