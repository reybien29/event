<?php

namespace Database\Factories;

use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tournament>
 */
class TournamentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company().' Cup',
            'description' => fake()->sentence(12),
            'logo' => null,
            'primary_color' => '#B8860B',
            'secondary_color' => '#020617',
            'start_date' => now()->addWeek()->toDateString(),
            'end_date' => now()->addWeeks(3)->toDateString(),
            'prize_pool' => '₱500,000.00',
            'status' => 'draft',
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}
