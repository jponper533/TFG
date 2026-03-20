<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Rol;
use App\Enums\RoleSlug;

class RolsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rol::firstOrCreate(['slug' => RoleSlug::ADMIN, 'nombre' => 'Administrador']);
        Rol::firstOrCreate(['slug' => RoleSlug::PROF, 'nombre' => 'Profesor']);
        Rol::firstOrCreate(['slug' => RoleSlug::ALUM, 'nombre' => 'Alumno']);
    }
}