<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ShippingController;

Route::get('/user', function (Request $request) {
    $user = $request->user();
    if (!$user) return response()->json(['success' => false], 401);
    
    // Usamos o wrapper padrão do projeto para consistência
    return response()->json([
        'success' => true,
        'data' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'is_admin' => $user->roles()->where('name', 'admin')->exists(),
            'roles' => $user->roles()->pluck('name')->toArray()
        ]
    ]);
})->middleware('auth:sanctum');

// Autenticação
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Webhook do Mercado Pago (público, sem autenticação)
Route::post('/payments/webhook', [App\Http\Controllers\PaymentController::class, 'webhook']);

// Produtos e Categorias (Público)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/shipping/calculate', [ShippingController::class, 'calculate']);

// Administrativo
Route::middleware(['auth:sanctum', 'can:admin-access'])->group(function () {
    // Pedidos
    Route::get('/admin/orders', [App\Http\Controllers\OrderController::class, 'adminIndex']);
    Route::get('/admin/orders/{id}', [App\Http\Controllers\OrderController::class, 'adminShow']);
    
    // Produtos
    Route::get('/admin/products', [App\Http\Controllers\ProductController::class, 'adminIndex']);
    Route::post('/admin/products', [App\Http\Controllers\ProductController::class, 'store']);
    Route::put('/admin/products/{id}', [App\Http\Controllers\ProductController::class, 'update']);
    Route::delete('/admin/products/{id}', [App\Http\Controllers\ProductController::class, 'destroy']);
    Route::patch('/admin/products/{id}/toggle-active', [App\Http\Controllers\ProductController::class, 'toggleActive']);

    // Categorias
    Route::get('/admin/categories', [App\Http\Controllers\CategoryController::class, 'index']);
    Route::post('/admin/categories', [App\Http\Controllers\CategoryController::class, 'store']);
    Route::delete('/admin/categories/{id}', [App\Http\Controllers\CategoryController::class, 'destroy']);

    // Configurações
    Route::get('/admin/settings/store-address', [App\Http\Controllers\SettingController::class, 'getStoreAddress']);
    Route::post('/admin/settings/store-address', [App\Http\Controllers\SettingController::class, 'updateStoreAddress']);

    // Integração Melhor Envio
    Route::get('/admin/integrations/melhor-envio', [App\Http\Controllers\Admin\IntegrationController::class, 'index']);
    Route::get('/admin/integrations/melhor-envio/redirect-url', [App\Http\Controllers\Admin\IntegrationController::class, 'getRedirectUrl']);
});

// Callback público do Melhor Envio (não pode ter auth:sanctum pois é um redirect externo do browser)
Route::get('/admin/integrations/melhor-envio/callback', [App\Http\Controllers\Admin\IntegrationController::class, 'callback']);

// Rotas do Cliente (Autenticado)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [App\Http\Controllers\OrderController::class, 'index']);
    Route::get('/orders/{id}', [App\Http\Controllers\OrderController::class, 'show']);
    Route::post('/orders', [App\Http\Controllers\OrderController::class, 'store']);
    Route::put('/orders/{id}/status', [App\Http\Controllers\OrderController::class, 'updateStatus']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    Route::put('/user/password', [AuthController::class, 'updatePassword']);

    // Pagamento
    Route::post('/payments/preference', [App\Http\Controllers\PaymentController::class, 'createPreference']);

    // Endereços
    Route::get('/addresses', [App\Http\Controllers\AddressController::class, 'index']);
    Route::post('/addresses', [App\Http\Controllers\AddressController::class, 'store']);
    Route::put('/addresses/{id}', [App\Http\Controllers\AddressController::class, 'update']);
    Route::patch('/addresses/{id}/set-main', [App\Http\Controllers\AddressController::class, 'setMain']);
    Route::delete('/addresses/{id}', [App\Http\Controllers\AddressController::class, 'destroy']);
});
