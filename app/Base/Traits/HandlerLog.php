<?php

namespace App\Base\Traits;

use Illuminate\Support\Facades\Log;
use Throwable;

trait HandlerLog {
    /**
     * Log the error for debugging purposes.
     *
     * @param Throwable $exception
     * @return void
     */
    public static function logError(Throwable $exception): void
    {
        Log::error($exception->getMessage(), [
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->getTraceAsString()
        ]);
    }
}
