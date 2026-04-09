<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ExamenController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;

Route::post('/login', [AuthController::class, 'login']);

// Route::get('/usuarios', [UserController::class, 'index']);


// Route::middleware('auth:sanctum')->group(function () {
// Route::get('/examen', [ExamenController::class, 'index']);
// Route::post('/usuarios', [UserController::class, 'store']);

//les puse ese nombre pq me daba conflicto a la hora de entrar en las views
Route::apiResource('usuariosApi', UserController::class)->parameters(['usuariosApi' => 'usuario']);
// Route::post('/examen', [ExamenController::class, 'store']);
// Route::put('/examen/{id}', [ExamenController::class, 'update']);
// Route::patch('/examen/{id}', [ExamenController::class, 'update']);

//les puse ese nombre pq me daba conflicto a la hora de entrar en las views
Route::apiResource('examenesApi', ExamenController::class)->parameters(['examenesApi' => 'examen']);
// });

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);