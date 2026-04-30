<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExamenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
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
            'user_id.required' => 'El campo profesor es obligatorio.',
            'user_id.exists' => 'El profesor seleccionado no es válido.',

            'alumno_id.required' => 'El campo alumno es obligatorio.',
            'alumno_id.exists' => 'El alumno seleccionado no es válido.',

            'asignatura_id.required' => 'El campo asignatura es obligatorio.',
            'asignatura_id.exists' => 'La asignatura seleccionada no es válida.',

            'nota.required' => 'El campo nota es obligatorio.',
            'nota.numeric' => 'La nota debe ser un número.',
            'nota.min' => 'La nota mínima es 0.',
            'nota.max' => 'La nota máxima es 10.',

            'id_trimestre.required' => 'El campo trimestre es obligatorio.',
            'id_trimestre.exists' => 'El trimestre seleccionado no es válido.',
        ];
    }
}