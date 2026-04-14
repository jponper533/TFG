<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    // Procesa el login del usuario
    public function login(Request $request)
    {
        $credenciales = $request->only('name', 'password');

        // Busca el usuario y lo autentica
        if (Auth::attempt($credenciales)) {

        /** @var User $user */
            $user = Auth::user();
            $token = $user->createToken('api-token')->plainTextToken;
            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }
    }
}