<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Auth Routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth');

// Catch-all for all GET routes to serve React SPA
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
