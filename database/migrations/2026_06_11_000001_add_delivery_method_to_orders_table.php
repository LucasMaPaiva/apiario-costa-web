<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('delivery_method')->default('delivery')->after('status'); // delivery, pickup
        });

        // Endereço deixa de ser obrigatório quando o pedido é para retirada no local.
        foreach (['cep', 'street', 'number', 'neighborhood', 'city', 'state'] as $column) {
            DB::statement("ALTER TABLE orders ALTER COLUMN {$column} DROP NOT NULL");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach (['cep', 'street', 'number', 'neighborhood', 'city', 'state'] as $column) {
            DB::statement("ALTER TABLE orders ALTER COLUMN {$column} SET NOT NULL");
        }

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('delivery_method');
        });
    }
};
