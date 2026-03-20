<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Rol;
use App\Models\Asignatura;
use App\Enums\RoleSlug;
use App\Enums\AsignaturaEnum;
use App\Models\User;

class AsignaturaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {   
        Asignatura::factory()->count(count(AsignaturaEnum::cases()))->create();
    }
}
