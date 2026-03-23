<?php

namespace Database\Factories;

use App\Enums\RoleSlug;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Asignatura;
use App\Models\Rol;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ModelProfesorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $profesorRol = Rol::where('slug', RoleSlug::PROF)->first();

        return [
            'user_id' => User::where("role_id", $profesorRol->id)->inRandomOrder()->first()->id,
            'asignatura_id' => Asignatura::inRandomOrder()->first()->id,
        ];
    }
}
