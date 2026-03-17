<?php

namespace Database\Factories;

use App\Enums\RoleSlug;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Asignatura;
use App\Models\Rol;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Examen>
 */
class ExamenFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $alumnoRol = Rol::where('slug', RoleSlug::ALUM)->first();

        return [
            'user_id' => User::where("role_id", $alumnoRol->id)->inRandomOrder()->first()->id,
            'asignatura_id' => Asignatura::inRandomOrder()->first()->id,
            'nota' => fake()->numberBetween(1, 10)
        ];
    }
}
