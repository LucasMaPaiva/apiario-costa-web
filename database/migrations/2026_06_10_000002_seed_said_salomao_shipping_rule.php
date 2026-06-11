<?php

use App\Models\ShippingRule;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        ShippingRule::updateOrCreate(
            ['state' => 'RR', 'city' => 'Boa Vista', 'neighborhood' => 'Said Salomão'],
            ['name' => 'Entrega Boa Vista - Said Salomão', 'flat_price' => 25.00, 'delivery_days' => 2]
        );
    }

    public function down(): void
    {
        ShippingRule::where('state', 'RR')
            ->where('city', 'Boa Vista')
            ->where('neighborhood', 'Said Salomão')
            ->delete();
    }
};
