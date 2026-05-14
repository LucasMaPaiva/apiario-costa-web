<?php

use Database\Seeders\AdminUserSeeder;
use Database\Seeders\ProductSeeder;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        (new AdminUserSeeder())->run();
        (new ProductSeeder())->run();
    }

    public function down(): void
    {
        \App\Models\Product::query()->delete();
        \App\Models\Category::query()->delete();
    }
};
