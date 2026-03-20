<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\UserController;

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');




// Route::middleware('auth')->group(function () {
//     // Rutas protegidas por autenticación
//     Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
//     Route::resource('examen', ExamenController::class)->parameters(['examen' => 'examen']);
//     Route::resource('usuarios', UserController::class);
// });

Route::middleware('auth')->group(function () {

    // Dashboard -> todos los roles
    Route::get('/', [DashboardController::class, 'index'])
        ->name('dashboard');

        
    //  Profesor -> todas las rutas resource
    Route::middleware('role:profe,admin')->group(function () {
        Route::resource('examen', ExamenController::class)->except(['index', 'show'])->parameters(['examen' => 'examen']);
    });
    
    //  Alumno -> solo index y show
    Route::middleware('role:alum,profe,admin')->group(function () {
        Route::get('examen', [ExamenController::class, 'index'])->name('examen.index');
        Route::get('examen/{examen}', [ExamenController::class, 'show'])->name('examen.show');
    });


    //  Admin -> gestión de usuarios
    Route::middleware('role:admin')->group(function () {
        Route::resource('usuarios', UserController::class);
    });

});