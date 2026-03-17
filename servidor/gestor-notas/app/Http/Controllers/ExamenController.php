<?php

namespace App\Http\Controllers;

use App\Models\Asignatura;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Examen;
use App\Enums\RoleSlug;
use App\Http\Requests\UpdateExamenRequest;
use App\Http\Requests\StoreExamenRequest;
use App\Services\ExamenServices;
use App\Models\User;
use App\Models\Rol;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\HttpCache\Store;


class ExamenController extends Controller
{
    protected $examenService;

    public function __construct(ExamenServices $examen)
    {
        $this->examenService = $examen;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        if ($user->role_id === 1) {
            $examenes = Examen::all();
        } elseif ($user->role_id === 2) {
            $examenes = $user->examenes;

        } else {
            $examenes = Examen::where('user_id', $user->id)->get();
        }

        return view('examenes.index', compact('examenes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $alumnoRol = Rol::where('slug', RoleSlug::ALUM)->first();
        $usuarios = User::where('role_id', $alumnoRol->id)->get();
        if ($user->role_id == 1) {
            $asignatura = Asignatura::all();
        } else {
            $asignatura = Asignatura::where('user_id', $user->id)->get();
        }
        return view('examenes.create', compact('usuarios', 'asignatura'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExamenRequest $request)
    {
        // Validación
        $validate = $request->validated();

        // Crea el examen con los datos validados
        $this->examenService->crearExamen($validate);

        return redirect()->route('examen.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Examen $examen)
    {
        $alumnoRol = Rol::where('slug', RoleSlug::ALUM)->first();
        $usuarios = User::where('role_id', $alumnoRol->id)->get();
        $asignatura = Asignatura::all();

        return view('examenes.show', compact('examen', 'asignatura', 'usuarios'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Examen $examen)
    {
        $user = Auth::user();
        $alumnoRol = Rol::where('slug', RoleSlug::ALUM)->first();
        $usuarios = User::where('role_id', $alumnoRol->id)->get();
        if ($user->role_id == 1) {
            $asignatura = Asignatura::all();
        } else {
            $asignatura = Asignatura::where('user_id', $user->id)->get();
        }
        return view('examenes.edit', compact('examen', 'usuarios', 'asignatura'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExamenRequest $request, Examen $examen)
    {
        // Validación usando Form Request
        $validate = $request->validated();

        // Actualiza la tarea con los datos validados
        $examen->update($validate);

        //return redirect()->route('tareas.index')->with('success', 'Tarea actualizada correctamente.');
        return redirect()->route('examen.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Examen $examen)
    {
        $user = Auth::user();
            $examen->delete();
            return redirect()->route('examen.index');
    }
}
