<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Asignatura;
use App\Models\ModelProfesor;

class ModuloProfController extends Controller
{
    public function asignaturas()
    {
        return response()->json(Asignatura::all());
    }

    public function modulosPorProfesor($profesorId)
    {
        $modulos = ModelProfesor::where('user_id', $profesorId)->get();

        return response()->json($modulos);
    }

    public function store(Request $request)
    {
        $request->validate([
            'profesorId' => 'required|integer',
            'asignaturaId' => 'required|integer'
        ]);

        $existe = ModelProfesor::where('user_id', $request->profesorId)
            ->where('asignatura_id', $request->asignaturaId)
            ->exists();

        if ($existe) {
            return response()->json(['message' => 'Ya existe'], 409);
        }

        $modulo = ModelProfesor::create([
            'user_id' => $request->profesorId,
            'asignatura_id' => $request->asignaturaId
        ]);

        return response()->json($modulo, 201);
    }

    public function destroy($profesorId, $asignaturaId)
    {
        $modulo = ModelProfesor::where('user_id', $profesorId)
            ->where('asignatura_id', $asignaturaId)
            ->first();

        if (!$modulo) {
            return response()->json(['message' => 'No existe'], 404);
        }

        $modulo->delete();

        return response()->json(['message' => 'Eliminado']);
    }
}
