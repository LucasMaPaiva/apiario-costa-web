<?php

namespace App\Http\Controllers;

use App\Base\Http\Controllers\BaseController;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Auth\LoginService;
use App\Services\Auth\LogoutService;
use App\Services\Auth\RegisterService;
use Illuminate\Http\JsonResponse;

class AuthController extends BaseController
{
    /**
     * Handle an authentication attempt.
     *
     * @param LoginRequest $request
     * @param LoginService $service
     * @return JsonResponse
     */
    public function login(LoginRequest $request, LoginService $service): JsonResponse
    {
        try {
            return self::successResponse(
                $service->execute($request->validated()),
                'Login realizado com sucesso.'
            );
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Handle a registration attempt.
     *
     * @param RegisterRequest $request
     * @param RegisterService $service
     * @return JsonResponse
     */
    public function register(RegisterRequest $request, RegisterService $service): JsonResponse
    {
        try {
            return self::successResponse(
                $service->execute($request->validated()),
                'Cadastro realizado com sucesso.'
            );
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Log the user out.
     *
     * @param LogoutService $service
     * @return JsonResponse
     */
    public function logout(LogoutService $service): JsonResponse
    {
        try {
            return self::successResponse(
                data: $service->execute(), 
                message: 'Sessão encerrada com sucesso.'
            );
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }
}