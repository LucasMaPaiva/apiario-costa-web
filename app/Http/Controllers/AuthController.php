<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * @param AuthService $authService
     */
    public function __construct(
        protected AuthService $authService
    ) {}

    /**
     * Handle an authentication attempt.
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $data = $this->authService->login($request->validated());

            return response()->json($data);
        } catch (\Exception $e) {
            Log::error('Login unexpected error: ' . $e->getMessage());
            
            return response()->json([
                'message' => $e->getMessage(),
            ], 401);
        }
    }

    /**
     * Log the user out.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            $this->authService->logout();

            return response()->json([
                'message' => 'Sessão encerrada com sucesso.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao encerrar sessão.',
            ], 500);
        }
    }
}
