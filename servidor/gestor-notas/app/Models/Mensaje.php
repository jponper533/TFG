<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    protected $fillable = [
        'id',
        'conversacion_id',
        'remitente_id',
        'contenido',
    ];

    public function conversacion()
    {
        return $this->belongsTo(Conversacion::class, 'conversacion_id');
    }

    public function remitente() {
        return $this->belongsTo(User::class, 'remitente_id');
    }
}
