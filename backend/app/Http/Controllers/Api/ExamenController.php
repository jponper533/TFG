<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExamenRequest;
use App\Models\Examen;
use App\Http\Requests\UpdateExamenRequest;
use Illuminate\Http\Request;

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
        $query = Examen::with(['asignatura', 'profesor', 'alumno']);

        if ($request->trimestre) {
            $query->where('id_trimestre', $request->trimestre);
        }

        if ($request->asignatura) {
            $query->where('asignatura_id', $request->asignatura);
        }

        return response()->json($query->get());
    }

    public function filtroExamenesAlumno(Request $request, $alumnoId)
    {
        $query = Examen::with(['asignatura', 'profesor', 'alumno'])
            ->where('user_alum_id', $alumnoId);

        if ($request->trimestre) {
            $query->where('id_trimestre', $request->trimestre);
        }

        if ($request->asignatura) {
            $query->where('asignatura_id', $request->asignatura);
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
