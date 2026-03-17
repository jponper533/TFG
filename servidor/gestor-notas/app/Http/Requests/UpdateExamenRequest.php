<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\RoleSlug;
use Illuminate\Support\Facades\Auth;

class UpdateExamenRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::user();

        if ($user->rol->slug === RoleSlug::ADMIN || $user->rol->slug === RoleSlug::PROF) {
            return true;
        }

        return false;  
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'asignatura_id' => 'required|exists:asignaturas,id',
            'nota' => 'required|numeric|min:0|max:10',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'El campo alumno es obligatorio.',
            'user_id.exists' => 'El alumno seleccionado no es válido.',
            'asignatura_id.required' => 'El campo asignatura es obligatorio.',
            'asignatura_id.exists' => 'La asignatura seleccionada no es válida.',
            'nota.required' => 'El campo nota es obligatorio.',
            'nota.numeric' => 'La nota debe ser un número.',
            'nota.min' => 'La nota debe ser al menos 0.',
            'nota.max' => 'La nota no puede ser mayor que 10.',
        ];
    }
}
