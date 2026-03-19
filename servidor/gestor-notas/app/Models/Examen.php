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

    public function users()
    {
        return $this->belongsTo(User::class, 'alumno_id');
    }

    public function trimestre()
    {
        return $this->belongsTo(Trimestre::class, 'id_trimestre');
    }

    public function asignatura()
    {
        return $this->belongsTo(Asignatura::class, 'asignatura_id');
    }

    public function conversacion()
    {
        return $this->hasmany(Conversacion::class, 'id_examen');
    }

}
