<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Examen extends Model
{

    use SoftDeletes;


    use HasFactory;
    protected $table = 'examenes';
    protected $fillable = [
        'id',
        'alumno_id',
        'asignatura_id',
        'nota',
        'user_id',
        'id_trimestre'
    ];

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
        return $this->hasMany(Conversacion::class, 'id_examen');
    }

    public function profesor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function alumno()
    {
        return $this->belongsTo(User::class, 'alumno_id');
    }
}
