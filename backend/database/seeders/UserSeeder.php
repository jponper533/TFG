<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Rol;
use App\Models\User;
use App\Enums\RoleSlug;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sin cadenas mágicas, utilizamos la enumeración RoleSlug
        $administradorRole = Rol::where('slug', RoleSlug::ADMIN)->first();
        User::firstOrCreate(['name' => 'admin', 'email' => 'admin@admin.com', 'password' => bcrypt('1234'), 'role_id' => $administradorRole->id, 'telefono'=>rand(100, 999)]);

        $administradorRole = Rol::where('slug', RoleSlug::ADMIN)->first();
        User::firstOrCreate(['name' => 'prueba', 'email' => 'jponper533@g.educaand.es', 'password' => bcrypt('jpp.2022'), 'role_id' => $administradorRole->id, 'telefono'=>rand(100, 999)]);

         $administradorRole = Rol::where('slug', RoleSlug::ADMIN)->first();
        User::firstOrCreate(['name' => 'prueba', 'email' => 'javierponceperez05@gmail.com', 'password' => bcrypt('620681016j'), 'role_id' => $administradorRole->id, 'telefono'=>rand(100, 999)]);
        
        // Sin cadenas mágicas, utilizamos la enumeración RoleSlug
        $usuarioRole = Rol::where('slug', RoleSlug::ALUM)->first();
        User::firstOrCreate(['name' => 'javier', 'email' => 'javier@javier.com', 'password' => bcrypt('1234'), 'role_id' => $usuarioRole->id, 'telefono'=>rand(100, 999)]);

        $usuarioRole = Rol::where('slug', RoleSlug::ALUM)->first();
        User::firstOrCreate(['name' => 'pepe', 'email' => 'pepe@pepe.com', 'password' => bcrypt('1234'), 'role_id' => $usuarioRole->id, 'telefono'=>rand(100, 999)]);

        $usuarioRole = Rol::where('slug', RoleSlug::PROF)->first();
        User::firstOrCreate(['name' => 'marta', 'email' => 'marta@marta.com', 'password' => bcrypt('1234'), 'role_id' => $usuarioRole->id, 'telefono'=>rand(100, 999)]);

        $usuarioRole = Rol::where('slug', RoleSlug::PROF)->first();
        User::firstOrCreate(['name' => 'julia', 'email' => 'julia@julia.com', 'password' => bcrypt('1234'), 'role_id' => $usuarioRole->id, 'telefono'=>rand(100, 999)]);
    }
}
