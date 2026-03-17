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

    public function asignatura()
    {
        return $this->hasMany(Asignatura::class, 'user_id');
    }

    public function asignaturas()
    {
        return $this->hasMany(Asignatura::class, 'user_id');
    }

    public function examen()
    {
        return $this->hasMany(Examen::class, 'user_id');
    }


    public function examenes()
    {
        return $this->hasManyThrough(
            Examen::class,
            Asignatura::class
        );
    }

    public function rol()
    {
        return $this->belongsTo(Rol::class, 'role_id');
    }
}