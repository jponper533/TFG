<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExamenRequest;
use App\Models\Examen;
use App\Services\ExamenServices;
use App\Http\Resources\ExamenResource;
use App\Http\Requests\UpdateExamenRequest;

class ExamenController extends Controller
{
    protected $examenService;

    public function __construct(ExamenServices $examen)
    {
        $this->examenService = $examen;
    }

    public function index()
    {
        // $examenes = Examen::all();
        $examenes = Examen::with('asignatura')->with('user')->paginate(5);
        return response()->json($examenes, 200);
        // return ExamenResource::collection($examenes);
    }

    public function store(StoreExamenRequest $request)
    {
        // Validación
        $validate = $request->validated();

        // Crea el examen con los datos validados
        $this->examenService->crearExamen($validate);
        
        //return Proyecto::find($id)->toJson();
        return response()->json(['message' => 'Examen creado correctamente'], 201);
    }

        public function show($id)
        {
            $examen = Examen::with('asignatura')->with('user')->find($id);
            if (!$examen) {
                return response()->json(['message' => 'Examen no encontrado'], 404);
            }
            return response()->json($examen, 200);
        }
    
        public function destroy($id)
        {
            $examen = Examen::find($id);
            if (!$examen) {
                return response()->json(['message' => 'Examen no encontrado'], 404);
            }
            $examen->delete();
            return response()->json(['message' => 'Examen eliminado correctamente'], 200);
        }

        public function update(UpdateExamenRequest $request, $id)
        {
            $examen = Examen::find($id);
            if (!$examen) {
                return response()->json(['message' => 'Examen no encontrado'], 404);
            }
            $validate = $request->validated();
            $this->examenService->actualizarExamen($id, $validate);
            return response()->json(['message' => 'Examen actualizado correctamente'], 200);
        }
}