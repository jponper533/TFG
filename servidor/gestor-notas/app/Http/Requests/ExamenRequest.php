<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamenRequest extends FormRequest
{
    protected function validacion()
    {
        return [
            'nota' => 'required|numeric|min:0|max:10',
        ];
    }
}