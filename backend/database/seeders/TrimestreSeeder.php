<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Trimestre;

class TrimestreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Trimestre::firstOrCreate(['num_trimestre' => 1]);
        Trimestre::firstOrCreate(['num_trimestre' => 2]);
        Trimestre::firstOrCreate(['num_trimestre' => 3]);
    }
}
