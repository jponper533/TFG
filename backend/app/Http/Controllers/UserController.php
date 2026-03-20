<?php

namespace App\Http\Controllers;

use App\Models\Asignatura;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Rol;
use App\Http\Requests\UpdateUsuariosRequest;
use App\Http\Requests\StoreUsuariosRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\HttpCache\Store;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usuarios = User::all();

        return view('usuarios.index', compact('usuarios'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $role_id = Rol::All();

        return view('usuarios.create', compact('role_id'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUsuariosRequest $request)
    {
        $validate = $request->validated();

        // Crea el examen con los datos validados
        User::create($validate);

        return redirect()->route('usuarios.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $usuario)
    {
        return view('usuarios.show', compact('usuario'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $usuario)
    {
        $rol = Rol::All();
        return view('usuarios.edit', compact('usuario', 'rol'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUsuariosRequest $request, User $usuario)
    {
        // Validación usando Form Request
        $validate = $request->validated();

        // Actualiza la tarea con los datos validados
        $usuario->update($validate);

        //return redirect()->route('tareas.index')->with('success', 'Tarea actualizada correctamente.');
        return redirect()->route('usuarios.index');
    }

    /**
     * Remove the specified resource from storage.
     */
public function destroy(User $usuario)
{
    $user = Auth::user();
    if ($user->role_id == 1) {
        $usuario->delete();
        return redirect()->route('usuarios.index');
    } else {
        return redirect()->route('usuarios.index')->with('error', 'No tienes permiso para eliminar este usuario');
    }
}
}