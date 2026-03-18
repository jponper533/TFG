<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModelAlumno extends Model
{
    protected $fillable = [
        'id',
        'alumno_id',
        'asignatura_id'
    ];

    public function examen()
    {
        return $this->belongsTo(Conversacion::class, 'conversacion_id');
    }

    public function conversacion() {
        return $this->hasMany(Conversacion::class, '');
    }
}
