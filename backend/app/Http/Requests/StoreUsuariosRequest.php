<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\RoleSlug;
use Illuminate\Support\Facades\Auth;

class StoreUsuariosRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        
            return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'telefono' => 'nullable|string|max:20',
            'role_id' => 'required|exists:roles,id',

        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'El campo nombre es obligatorio.',
            'email.required' => 'El campo email es obligatorio.',
            'email.email' => 'El campo email debe ser una dirección de correo electrónico válida.',
            'email.unique' => 'El email ya está en uso.',
            'password.required' => 'El campo contraseña es obligatorio.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'telefono.string' => 'El campo teléfono debe ser una cadena de texto.',
            'telefono.max' => 'El campo teléfono no debe exceder los 20 caracteres.',
            'role_id.required' => 'El campo rol es obligatorio.',
            'role_id.exists' => 'El rol seleccionado no es válido.',
        ];
    }
}
