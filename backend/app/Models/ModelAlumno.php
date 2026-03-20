<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModelAlumno extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'asignatura_id'
    ];

    public function users() {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function asignatura() {
        return $this->belongsTo(Asignatura::class, 'asignatura_id');
    }
}
