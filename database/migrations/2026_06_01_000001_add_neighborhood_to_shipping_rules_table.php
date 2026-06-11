<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('shipping_rules', function (Blueprint $table) {
            $table->string('neighborhood')->nullable()->after('city');
            $table->index(['state', 'city', 'neighborhood']);
        });
    }

    public function down(): void
    {
        Schema::table('shipping_rules', function (Blueprint $table) {
            $table->dropIndex(['state', 'city', 'neighborhood']);
            $table->dropColumn('neighborhood');
        });
    }
};
