<?php

namespace Database\Factories;

use App\Models\Division;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'division_id' => Division::factory(),
            'name' => fake()->city().' Ballers',
            'coach_name' => fake()->name(),
            'contact_number' => fake()->numerify('09#########'),
            'logo' => null,
            'status' => 'pending',
            'payment_reference' => null,
        ];
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
        ]);
    }
}
