<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/categories', [App\Http\Controllers\CategoryController::class, 'index']);

// Rotas Administrativas
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    // Produtos
    Route::get('/products', [ProductController::class, 'adminIndex']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']); // Usando PUT para o method spoofing do FormData
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::patch('/products/{id}/toggle-active', [ProductController::class, 'toggleActive']);
    
    // Categorias
    Route::get('/categories', [App\Http\Controllers\CategoryController::class, 'index']);
    Route::post('/categories', [App\Http\Controllers\CategoryController::class, 'store']);
    Route::delete('/categories/{id}', [App\Http\Controllers\CategoryController::class, 'destroy']);
});
