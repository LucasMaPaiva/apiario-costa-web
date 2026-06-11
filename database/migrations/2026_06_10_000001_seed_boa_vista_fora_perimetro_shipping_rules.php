<?php

use App\Models\ShippingRule;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    private const BAIRROS = [
        'PAMC',
        'João de Barro',
        'Pedra Pintada',
        'Residencial Monte Cristo',
    ];

    public function up(): void
    {
        foreach (self::BAIRROS as $bairro) {
            ShippingRule::updateOrCreate(
                ['state' => 'RR', 'city' => 'Boa Vista', 'neighborhood' => $bairro],
                ['name' => 'Entrega Boa Vista - ' . $bairro, 'flat_price' => 25.00, 'delivery_days' => 2]
            );
        }
    }

    public function down(): void
    {
        ShippingRule::where('state', 'RR')
            ->where('city', 'Boa Vista')
            ->whereIn('neighborhood', self::BAIRROS)
            ->delete();
    }
};
