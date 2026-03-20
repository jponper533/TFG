<?php

namespace App\Services;

use App\Models\Examen;

class ExamenServices {

    public function crearExamen(array $datos): Examen 
    {
        return Examen::create($datos);
    }

public function actualizarExamen(int $id, array $datos): Examen
{
    $examen = Examen::findOrFail($id);
    $examen->update($datos);
    return $examen;
}

    
}