<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExamenRequest;
use App\Models\Examen;
use App\Services\ExamenServices;
use App\Http\Resources\ExamenResource;
use App\Http\Requests\UpdateExamenRequest;
use Illuminate\Http\Request;

class ExamenController extends Controller
{
    protected $examenService;

    public function __construct(ExamenServices $examen)
    {
        $this->examenService = $examen;
    }

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
}
