<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    use HasFactory;
    protected $table = 'examenes';
    protected $fillable = [
        'id',
        'alumno_id',
        'asignatura_id',
        'nota',
        'profesor_id',
        'id_trimestre'
    ];

    public function modulo_alumno()
    {
        return $this->belongsTo(ModelAlumno::class, 'alumno_id');
    }

    public function trimestre()
    {
        return $this->belongsTo(Trimestre::class, 'id_trimestre');
    }

    public function modulo_profesor()
    {
        return $this->belongsTo(ModelProfesor::class, 'profesor_id');
    }

    public function asignatura()
    {
        return $this->belongsTo(Asignatura::class, 'asignatura_id');
    }
}
