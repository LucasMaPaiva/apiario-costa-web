<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthService
{
    /**
     * Handle the authentication logic.
     *
     * @param array $credentials
     * @return array
     * @throws ValidationException
     */
    public function login(array $credentials): array
    {
        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais informadas são inválidas.'],
            ]);
        }

        $user = Auth::user();
        
        // Ensure tokens can be created if needed
        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ];
    }

    /**
     * Handle logout.
     *
     * @return void
     */
    public function logout(): void
    {
        $user = Auth::user();
        if ($user) {
            $user->currentAccessToken()?->delete();
            Auth::guard('web')->logout();
        }
    }
}
