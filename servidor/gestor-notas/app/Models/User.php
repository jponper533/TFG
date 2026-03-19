<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes; 
use App\Enums\RoleSlug;
use App\Models\Rol;

class User extends Authenticatable
{
    use SoftDeletes;

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'name',
        'email',
        'password',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $dates=['deleted_at'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function examen()
    {
        return $this->hasMany(Examen::class, 'user_prof_id', 'user_alum_id');
    }

    public function modulo_alumno()
    {
        return $this->hasMany(ModelAlumno::class, 'user_id');
    }

    public function modulo_profesor()
    {
        return $this->hasMany(ModelProfesor::class, 'user_id');
    }

     public function conversacion()
    {
        return $this->hasMany(ModelAlumno::class, 'user_id');
    }

    public function rol()
    {
        return $this->belongsTo(Rol::class, 'role_id');
    }
}