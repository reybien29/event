<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateDivisionStandingsRequest extends FormRequest
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
            'standings' => ['required', 'array', 'min:1'],
            'standings.*.team_id' => ['required', 'integer', 'exists:teams,id'],
            'standings.*.group_name' => ['nullable', 'string', 'max:255'],
            'standings.*.wins' => ['required', 'integer', 'min:0'],
            'standings.*.losses' => ['required', 'integer', 'min:0'],
            'standings.*.draws' => ['required', 'integer', 'min:0'],
            'standings.*.points' => ['required', 'integer', 'min:0'],
            'standings.*.quotient' => ['required', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'standings.required' => 'Add at least one team standing before saving.',
            'standings.*.team_id.exists' => 'One of the selected teams could not be found.',
            'standings.*.wins.min' => 'Wins cannot be less than zero.',
            'standings.*.losses.min' => 'Losses cannot be less than zero.',
            'standings.*.draws.min' => 'Draws cannot be less than zero.',
            'standings.*.points.min' => 'Points cannot be less than zero.',
            'standings.*.quotient.min' => 'Quotient cannot be less than zero.',
        ];
    }
}
