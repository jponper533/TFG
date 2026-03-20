<?php

namespace App\Http\Requests;

use App\Models\Examen;
use App\Enums\RoleSlug;
use Illuminate\Support\Facades\Auth;

class StoreExamenRequest extends ExamenRequest
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
        return array_merge($this->validacion(), [ 
            //
            'user_id' => 'required|exists:users,id',
            'asignatura_id' => 'required|exists:asignaturas,id',
            // 'nota' => 'required|numeric|min:0|max:10',
        ]);
    }

    public function messages()
    {
        return [
            'user_id.required' => 'El campo usuario es obligatorio.',
            'user_id.exists' => 'El usuario seleccionado no existe.',
            'asignatura_id.required' => 'El campo asignatura es obligatorio.',
            'asignatura_id.exists' => 'La asignatura seleccionada no existe.',
            'nota.required' => 'El campo nota es obligatorio.', 
            'nota.numeric' => 'El campo nota debe ser un número.',
            'nota.min' => 'El campo nota debe ser al menos :min.',
            'nota.max' => 'El campo nota no debe ser mayor que :max.',
        ];
    }
}
