<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\RoleSlug;
use Illuminate\Support\Facades\Auth;

class StoreNoticiasRequest extends FormRequest
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
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'user_id' => 'required|exists:users,id',

        ];
    }

    public function messages()
    {
        return [
            'titulo.required' => 'El campo título es obligatorio.',
            'descripcion.required' => 'El campo descripción es obligatorio.',
            'user_id.required' => 'El campo usuario es obligatorio.',
        ];
    }
}
