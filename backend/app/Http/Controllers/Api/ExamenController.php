<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExamenRequest;
use App\Models\Examen;
use App\Http\Requests\UpdateExamenRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExamenController extends Controller
{

    public function destroy($id)
    {
        $examen = Examen::findOrFail($id);
        $examen->delete();

        return response()->json(['message' => 'Examen eliminado']);
    }

public function filtroExamenes(Request $request)
{
    $user = Auth::user();

    $query = Examen::with(['asignatura', 'profesor', 'alumno']);

    if ($request->trimestre) {
        $query->where('id_trimestre', $request->trimestre);
    }

    if ($request->asignatura) {
        $query->where('asignatura_id', $request->asignatura);
    }

    if ($user->role_id == 3) {
        // Alumno -> solo sus exámenes
        $query->where('alumno_id', $user->id);
    } else if ($user->role_id == 2) {
        // Profesor -> solo sus exámenes
        $query->where('user_id', $user->id);
    }

    return response()->json($query->get());
}

    public function store(StoreExamenRequest $request)
    {
        $validated = $request->validated();

        $examen = Examen::create($validated);

        return response()->json($examen, 201);
    }

    public function update(UpdateExamenRequest $request, $id)
    {
        $validated = $request->validated();

        $examen = Examen::findOrFail($id);
        $examen->update($validated);

        return response()->json($examen);
    }

    public function show($id)
    {
        $examen = Examen::with(['asignatura', 'profesor', 'alumno'])->findOrFail($id);
        return response()->json($examen);
    }
}
