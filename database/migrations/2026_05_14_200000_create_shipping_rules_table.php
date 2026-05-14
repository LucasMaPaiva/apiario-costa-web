<?php

use Database\Seeders\ShippingRuleSeeder;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shipping_rules', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('state', 2);
            $table->string('city')->nullable();
            $table->decimal('flat_price', 10, 2);
            $table->integer('delivery_days');
            $table->timestamps();
            $table->index(['state', 'city']);
        });

        (new ShippingRuleSeeder())->run();
    }

    public function down(): void
    {
        Schema::dropIfExists('shipping_rules');
    }
};
