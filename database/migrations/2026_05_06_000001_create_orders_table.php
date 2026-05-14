<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('total_amount', 10, 2);
            $table->string('status')->default('pending'); // pending, processing, shipped, delivered, cancelled
            
            // Dados de Endereço (Snapshot do momento da compra)
            $table->string('cep');
            $table->string('street');
            $table->string('number');
            $table->string('complement')->nullable();
            $table->string('neighborhood');
            $table->string('city');
            $table->string('state');
            
            // Frete e Pagamento (A serem preenchidos futuramente)
            $table->string('shipping_method')->nullable();
            $table->decimal('shipping_cost', 10, 2)->default(0);
            $table->string('payment_method')->nullable();
            $table->string('payment_status')->default('pending');
            $table->string('transaction_id')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
