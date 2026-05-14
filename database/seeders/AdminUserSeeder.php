<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@apiariocosta.com'],
            [
                'name' => 'Administrador Apiário',
                'password' => Hash::make('admin123'), // Defini uma senha padrão fácil para você
                'email_verified_at' => now(),
            ]
        );
    }
}
