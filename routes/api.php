<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\IntegrationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/categories', [App\Http\Controllers\CategoryController::class, 'index']);

// Auth Routes
Route::post('/auth/login', [App\Http\Controllers\AuthController::class, 'login'])->middleware('throttle:6,1');
Route::post('/auth/register', [App\Http\Controllers\AuthController::class, 'register'])->middleware('throttle:6,1');
Route::post('/auth/logout', [App\Http\Controllers\AuthController::class, 'logout'])->middleware('auth:sanctum');

// Rotas Administrativas
Route::middleware(['auth:sanctum', 'role:admin|employee'])->prefix('admin')->group(function () {
    // Produtos
    Route::get('/products', [ProductController::class, 'adminIndex']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::patch('/products/{id}/toggle-active', [ProductController::class, 'toggleActive']);
    
    // Categorias
    Route::get('/categories', [App\Http\Controllers\CategoryController::class, 'index']);
    Route::post('/categories', [App\Http\Controllers\CategoryController::class, 'store']);
    Route::delete('/categories/{id}', [App\Http\Controllers\CategoryController::class, 'destroy']);

    // Pedidos
    Route::get('/orders', [App\Http\Controllers\OrderController::class, 'adminIndex']);
    Route::patch('/orders/{id}/status', [App\Http\Controllers\OrderController::class, 'updateStatus']);

    // Integrações
    Route::get('/integrations/melhor-envio', [IntegrationController::class, 'index']);
    Route::get('/integrations/melhor-envio/redirect', [IntegrationController::class, 'redirect']);
});

// Callback da Integração (Público pois é um redirecionamento externo)
Route::get('/admin/integrations/melhor-envio/callback', [IntegrationController::class, 'callback']);

// Rotas do Cliente (Autenticado)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [App\Http\Controllers\OrderController::class, 'index']);
    Route::post('/orders', [App\Http\Controllers\OrderController::class, 'store']);
});
