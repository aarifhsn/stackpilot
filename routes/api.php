<?php

use App\Http\Controllers\Api\BlogController as ApiBlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;

Route::get('/posts', [ApiBlogController::class, 'index']);
Route::get('/posts/{id}', [ApiBlogController::class, 'show']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
