<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingRule extends Model
{
    protected $fillable = [
        'name',
        'state',
        'city',
        'flat_price',
        'delivery_days',
    ];

    protected $casts = [
        'flat_price' => 'decimal:2',
        'delivery_days' => 'integer',
    ];
}
