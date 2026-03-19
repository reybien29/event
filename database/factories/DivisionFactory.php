<?php

namespace Database\Factories;

use App\Models\Division;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Division>
 */
class DivisionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tournament_id' => Tournament::factory(),
            'name' => fake()->randomElement(['Under 16', 'Under 18', 'Mens Open', 'Womens Open']),
            'registration_fee' => fake()->randomFloat(2, 1500, 5000),
        ];
    }
}
