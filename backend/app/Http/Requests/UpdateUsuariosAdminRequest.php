<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateUsuariosAdminRequest extends FormRequest
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
        $userId = $this->route('id'); // Obtener el ID del usuario desde la ruta

        return [
            'email' => 'required|email|unique:users,email,' . $userId,

            'password' => 'nullable|string|min:4',

            'telefono' => 'nullable|string|max:20',

            'name' => 'nullable|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'El campo email es obligatorio.',
            'email.unique' => 'Este correo electrónico ya está registrado por otro usuario.',
            'password.min' => 'Si vas a cambiar la contraseña, debe tener al menos 4 caracteres.',
            'name.max' => 'El nombre no puede tener más de 255 caracteres.',
        ];
    }
}
