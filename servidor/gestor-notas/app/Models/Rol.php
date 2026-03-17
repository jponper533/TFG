<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\RoleSlug;

class Rol extends Model
{
    protected $table = 'roles';
    public $timestamps = false;

    protected $casts = [
        'slug' => RoleSlug::class,
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'role_id');
    }
}
