<?php

namespace Database\Seeders;

use App\Models\ShippingRule;
use Illuminate\Database\Seeder;

class ShippingRuleSeeder extends Seeder
{
    public function run(): void
    {
        ShippingRule::updateOrCreate(
            ['state' => 'RR', 'city' => 'Boa Vista'],
            ['name' => 'Entrega Boa Vista', 'flat_price' => 10.00, 'delivery_days' => 2]
        );

        ShippingRule::updateOrCreate(
            ['state' => 'RR', 'city' => null],
            ['name' => 'Entrega Interior de Roraima', 'flat_price' => 100.00, 'delivery_days' => 5]
        );
    }
}
