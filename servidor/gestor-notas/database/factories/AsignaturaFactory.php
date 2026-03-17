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
        $profesorRol = Rol::where('slug', RoleSlug::PROF)->first();

        return [
            'nombre_asignatura' => $asignatura->value,
            'user_id' => User::where('role_id', $profesorRol->id)->inRandomOrder()->value('id'),
        ];
    }
}
