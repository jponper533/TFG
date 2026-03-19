<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trimestre extends Model
{
    protected $fillable = [
        'id',
        'num_trimestre'
    ];

    public function examenes() {
        return $this->hasMany(User::class, 'id_trimestre');
    }
}
