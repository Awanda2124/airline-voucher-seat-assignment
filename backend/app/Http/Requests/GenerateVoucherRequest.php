<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GenerateVoucherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'id' => 'required|string|max:50',
            'flightNumber' => 'required|string|max:20',
            'date' => 'required|date',
            'aircraft' => 'required|in:ATR,Airbus 320,Boeing 737 Max',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama crew wajib diisi.',
            'id.required' => 'Crew ID wajib diisi.',
            'flightNumber.required' => 'Flight Number wajib diisi.',
            'date.required' => 'Tanggal wajib diisi.',
            'aircraft.required' => 'Aircraft wajib dipilih.',
            'aircraft.in' => 'Aircraft tidak valid.',
        ];
    }
}
