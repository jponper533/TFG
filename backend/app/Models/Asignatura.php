<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Asignatura extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'nombre_asignatura',
        'user_id'
    ];

    public function modulo_alumno()
    {
        return $this->hasMany(ModelAlumno::class, 'asignatura_id');
    }

    public function modulo_profesor()
    {
        return $this->hasMany(ModelProfesor::class, 'asignatura_id');
    }

    public function examenes()
    {
        return $this->hasMany(Examen::class, 'asignatura_id');
    }
}
