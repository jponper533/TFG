<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Noticia;
use Illuminate\Http\Request;
use App\Http\Requests\StoreNoticiasRequest;

class NoticiasController extends Controller
{
    public function index()
    {
        $noticias = Noticia::with('users')->orderBy('created_at', 'desc')->paginate(5);
        return response()->json($noticias, 200);
    }

    public function show($id)
    {
        $noticia = Noticia::with('users')->find($id);
        if (!$noticia) {
            return response()->json(['message' => 'Noticia no encontrada'], 404);
        }
        return response()->json($noticia, 200);
    }

    public function destroy($id)
    {
        $noticia = Noticia::find($id);
        if (!$noticia) {
            return response()->json(['message' => 'Noticia no encontrada'], 404);
        }
        $noticia->delete();
        return response()->json(['message' => 'Noticia eliminada'], 200);
    }

    public function store(StoreNoticiasRequest $request)
    {
        $validate = $request->validated();

        $noticia = Noticia::create($validate);

        return response()->json($noticia, 201);
        return response()->json(['message' => 'Noticia creada correctamente'], 201);
    }
}
