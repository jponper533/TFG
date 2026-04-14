<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Noticia;

class NoticiasController extends Controller
{
    public function index()
    {
        $noticias = Noticia::with('users')->paginate(5);
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
}