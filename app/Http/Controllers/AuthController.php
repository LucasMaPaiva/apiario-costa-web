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
            $service->execute();
            return self::successResponse(
                message: 'Sessão encerrada com sucesso.'
            );
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Update the user's profile.
     *
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function updateProfile(\Illuminate\Http\Request $request): JsonResponse
    {
        try {
            $user = \App\Models\User::find(\Illuminate\Support\Facades\Auth::id());
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'phone' => 'nullable|string|max:20',
            ]);
            $user->update($data);
            return self::successResponse($user, 'Perfil atualizado com sucesso.');
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Update the user's password.
     *
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function updatePassword(\Illuminate\Http\Request $request): JsonResponse
    {
        try {
            $user = \App\Models\User::find(\Illuminate\Support\Facades\Auth::id());
            $data = $request->validate([
                'current_password' => 'required|current_password',
                'password' => 'required|string|min:8|confirmed',
            ]);
            $user->update(['password' => \Illuminate\Support\Facades\Hash::make($data['password'])]);
            return self::successResponse(null, 'Senha alterada com sucesso.');
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }
}