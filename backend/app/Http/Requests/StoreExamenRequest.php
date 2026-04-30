<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExamenRequest extends FormRequest
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
            //
            'user_id' => 'required|exists:users,id',
            'alumno_id' => 'required|exists:users,id',
            'asignatura_id' => 'required|exists:asignaturas,id',
            'nota' => 'required|numeric|min:0|max:10',
            'id_trimestre' => 'required|exists:trimestres,id',

        ];
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
            'id_trimestre.required' => 'El campo trimestre es obligatorio.',
            'id_trimestre.exists' => 'El trimestre seleccionado no existe.',
            'alumno_id.required' => 'El campo alumno es obligatorio.',
            'alumno_id.exists' => 'El alumno seleccionado no existe.',
        ];
    }
}
