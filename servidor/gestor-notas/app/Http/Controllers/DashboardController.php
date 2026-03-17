<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Examen;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user(); 
        $usuarios = User::all();
        
        if ($user->role_id === 1) {
            $examenes = Examen::all()->sortByDesc('updated_at')->slice(0, 5);
        } else if ($user->role_id === 2) {
            $examenes = $user->examenes;
        } else {
            $examenes = Examen::where('user_id', $user->id)->get()->sortByDesc('updated_at')->slice(0, 5);
        }

        return view('dashboard.index', compact('examenes', 'usuarios'));
    }

}