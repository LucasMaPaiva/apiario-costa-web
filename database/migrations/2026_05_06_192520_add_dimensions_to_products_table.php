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
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('weight', 8, 3)->default(0)->after('price')->comment('Peso em KG');
            $table->integer('width')->default(0)->after('weight')->comment('Largura em cm');
            $table->integer('height')->default(0)->after('width')->comment('Altura em cm');
            $table->integer('length')->default(0)->after('height')->comment('Comprimento em cm');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['weight', 'width', 'height', 'length']);
        });
    }
};
