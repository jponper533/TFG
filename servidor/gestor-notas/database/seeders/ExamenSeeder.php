<?php

namespace Database\Seeders;

use App\Models\Examen;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExamenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Examen::factory()->count(random_int(10, 20))->create();
    }
}
