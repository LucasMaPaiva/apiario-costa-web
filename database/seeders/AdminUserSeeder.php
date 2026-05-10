<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Garante que a permissão existe
        $permission = Permission::firstOrCreate(['name' => 'admin-access']);

        // Garante que a role existe e tem a permissão
        $role = Role::firstOrCreate(['name' => 'admin']);
        $role->givePermissionTo($permission);

        // Cria ou atualiza o usuário admin
        $user = User::updateOrCreate(
            ['email' => 'admin@apiariocosta.com'],
            [
                'name' => 'Administrador Apiário',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // Atribui a role ao usuário
        $user->assignRole($role);
    }
}
