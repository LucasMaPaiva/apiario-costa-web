<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Integration extends Model
{
    protected $fillable = [
        'provider',
        'access_token',
        'refresh_token',
        'expires_at',
        'environment',
        'data'
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'data' => 'array'
    ];
}
