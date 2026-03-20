<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamenResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'not' => $this->nota,
            'crea_at' => $this->created_at,
            'asig' => $this->asignatura->nombre,
            'alum' => $this->user->name,
        ];
    }
}
