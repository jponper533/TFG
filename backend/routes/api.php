<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ExamenController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Api\NoticiasController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->put('/userUpdate', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->put('/userUpdate/{id}', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->get('/me', [UserController::class, 'me']);
Route::middleware('auth:sanctum')->get('/userIndex', [UserController::class, 'index']);
Route::middleware('auth:sanctum')->get('/userShow/{id}', [UserController::class, 'show']);
Route::middleware('auth:sanctum')->delete('/userDelete/{id}', [UserController::class, 'delete']);

// Route::post('/examen', [ExamenController::class, 'store']);
// Route::put('/examen/{id}', [ExamenController::class, 'update']);
// Route::patch('/examen/{id}', [ExamenController::class, 'update']);

//les puse ese nombre pq me daba conflicto a la hora de entrar en las views
// });

Route::get('/noticias', [NoticiasController::class, 'index']);
Route::get('/noticias/{id}', [NoticiasController::class, 'show']);

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);