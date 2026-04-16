<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUsuariosRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rol;
use App\Http\Requests\UpdateUsuariosRequest;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function index()
    {
        $usuarios = User::paginate(12);

        return response()->json($usuarios, 200);
    }

    public function store(StoreUsuariosRequest $request)
    {
        $validate = $request->validated();

        User::create($validate);

        return response()->json(['message' => 'Usuario creado correctamente'], 201);
    }

    public function show($id)
    {
        $usuario = User::find($id);
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        return response()->json($usuario, 200);
    }

    public function destroy($id)
    {
        $usuario = User::find($id);
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $usuario->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
    }

    public function update(UpdateUsuariosRequest $request)
    {
        /** @var \App\Models\User $usuario */
        $usuario = Auth::user();

        if (!$usuario) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        $validate = $request->validated();

        if (!empty($validate['password'])) {
            $validate['password'] = bcrypt($validate['password']);
        } else {
            unset($validate['password']);
        }

        $usuario->update($validate);

        return response()->json([
            'message' => 'Usuario actualizado correctamente'
        ], 200);
    }

    public function me()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        return response()->json($user);
    }
    
    public function delete($id)
    {
        $usuario = User::find($id);
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $usuario->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
    }    
}
