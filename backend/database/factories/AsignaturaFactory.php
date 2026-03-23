<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\AsignaturaEnum;
use App\Enums\RoleSlug;
use App\Models\Rol;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asignatura>
 */
class AsignaturaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $asignatura = fake()->unique()->randomElement(AsignaturaEnum::cases());

        return [
            'nombre_asignatura' => $asignatura->value,
        ];
    }
}
