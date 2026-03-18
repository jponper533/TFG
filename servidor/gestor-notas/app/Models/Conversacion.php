<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversacion extends Model
{
    protected $fillable = [
        'id',
        'id-alumno',
        'id_examen'
    ];

    public function modulo_alumno()
    {
        return $this->belongsTo(ModelAlumno::class);
    }

    public function modulo_profesor()
    {
        return $this->belongsTo(ModelProfesor::class);
    }

    public function mensajes()
    {
        return $this->hasMany(Mensaje::class);
    }
}
