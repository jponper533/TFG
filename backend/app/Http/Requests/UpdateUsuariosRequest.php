<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\RoleSlug;
use Illuminate\Support\Facades\Auth;

class UpdateUsuariosRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        if ($this->password === '') {
            $this->merge([
                'password' => null
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|unique:users,email,' . Auth::id(),
            'password' => 'nullable|string|min:4',
            'telefono' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'El campo email es obligatorio.',
            'email.email' => 'El campo email debe ser una dirección de correo electrónico válida.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'telefono.required' => 'El campo teléfono es obligatorio.',
        ];
    }
}
