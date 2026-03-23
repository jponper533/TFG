<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelProfesor extends Model
{
    use HasFactory;
    protected $table = 'modulo_profesor';

    protected $fillable = [
        'id',
        'user_id',
        'asignatura_id'
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function conversacion()
    {
        return $this->hasMany(Conversacion::class, '');
    }
}
