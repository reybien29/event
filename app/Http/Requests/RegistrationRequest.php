<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegistrationRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'team_name' => 'required|string|max:255',
            'coach_name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'players' => 'required|array|min:5|max:12', // Critical: 5–12 dynamic player inputs
            'players.*.name' => 'required|string|max:255',
            'players.*.jersey_number' => 'nullable|integer',
            'players.*.position' => 'nullable|string|max:100',
            'players.*.birth_date' => 'nullable|date',
            'agreed_to_terms' => 'required|accepted', // Validation Gate
        ];
    }

    public function messages(): array
    {
        return [
            'players.min' => 'A minimum of 5 players is required to register a team.',
            'players.max' => 'A team can have at most 12 players.',
            'agreed_to_terms.accepted' => 'You must agree to the mandatory policy to bring original PSA and valid IDs.',
        ];
    }
}
