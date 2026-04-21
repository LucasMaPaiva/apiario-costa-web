<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\Auth;

class LogoutService
{
    /**
     * Handle the logout logic.
     */
    public function execute(): void
    {
        $user = Auth::user();
        if ($user) {
            $user->currentAccessToken()?->delete();
            Auth::guard('web')->logout();
        }
    }
}
