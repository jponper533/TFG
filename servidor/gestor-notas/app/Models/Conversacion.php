<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversacion extends Model
{
    protected $fillable = [
        'id',
        'user_alum_id',
        'user_prof_id',
        'id_examen'
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function mensajes()
    {
        return $this->hasMany(Mensaje::class);
    }
}
