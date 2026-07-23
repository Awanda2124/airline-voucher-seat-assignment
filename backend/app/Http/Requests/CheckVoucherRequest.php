<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckVoucherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'flightNumber' => 'required|string|max:20',
            'date' => 'required|date',
        ];
    }

    public function messages(): array
    {
        return [
            'flightNumber.required' => 'Flight Number wajib diisi.',
            'date.required' => 'Tanggal wajib diisi.',
            'date.date' => 'Format tanggal tidak valid.',
        ];
    }
}
