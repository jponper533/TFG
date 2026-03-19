<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModelProfesor extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'asignatura_id'
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function conversacion() {
        return $this->hasMany(Conversacion::class, '');
    }
}
