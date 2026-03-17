<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    use HasFactory;
    protected $table = 'examenes';
    protected $fillable = [
        'user_id',
        'asignatura_id',
        'nota'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function asignatura()
    {
        return $this->belongsTo(Asignatura::class, 'asignatura_id');
    }
}
