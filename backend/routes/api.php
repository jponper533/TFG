<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ExamenController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Api\NoticiasController;
use App\Http\Controllers\Api\ModuloProfController;
use Illuminate\Http\Request;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->put('/userUpdate', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->put('/userUpdate/{id}', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->put('/userUpdateAdmin/{id}', [UserController::class, 'updateAdmin']);
Route::middleware('auth:sanctum')->get('/me', [UserController::class, 'me']);
Route::middleware('auth:sanctum')->get('/userIndex', [UserController::class, 'index']);
Route::middleware('auth:sanctum')->get('/userShow/{id}', [UserController::class, 'show']);
Route::middleware('auth:sanctum')->delete('/userDelete/{id}', [UserController::class, 'delete']);
Route::post('/userStore', [UserController::class, 'store']);
Route::middleware('auth:sanctum')->get('/roles', [UserController::class, 'roles']);
Route::middleware('auth:sanctum')->get('/verify-token', function (Request $request) {
    return $request->user();
});
Route::post('/noticiaStore', [NoticiasController::class, 'store']);
Route::middleware('auth:sanctum')->get('/asignaturas', [ModuloProfController::class, 'asignaturas']);
Route::middleware('auth:sanctum')->get('/modulos/{profesorId}', [ModuloProfController::class, 'modulosPorProfesor']);
Route::middleware('auth:sanctum')->post('/modulos', [ModuloProfController::class, 'store']);
Route::middleware('auth:sanctum')->delete('/modulos/{profesorId}/{asignaturaId}', [ModuloProfController::class, 'destroy']);


// Route::post('/examen', [ExamenController::class, 'store']);
// Route::put('/examen/{id}', [ExamenController::class, 'update']);
// Route::patch('/examen/{id}', [ExamenController::class, 'update']);

//les puse ese nombre pq me daba conflicto a la hora de entrar en las views
// });

Route::get('/noticias', [NoticiasController::class, 'index']);
Route::get('/noticias/{id}', [NoticiasController::class, 'show']);

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);