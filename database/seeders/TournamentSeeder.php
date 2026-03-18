<?php

namespace Database\Seeders;

use App\Models\Tournament;
use Illuminate\Database\Seeder;

class TournamentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tournament = Tournament::create([
            'name' => 'Elite Basketball League 2026',
            'description' => 'The premier basketball tournament for the next generation of athletes. Experience high-octane action and top-tier competition.',
            'logo' => 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1000',
            'primary_color' => '#EAB308', // Premium Yellow/Gold
            'secondary_color' => '#0F172A', // Slate 900
            'start_date' => now()->addDays(30),
            'end_date' => now()->addDays(60),
            'prize_pool' => '₱500,000.00',
            'status' => 'active',
        ]);

        $tournament->divisions()->createMany([
            ['name' => 'Mens Open', 'registration_fee' => 3500],
            ['name' => 'Under-21 Elite', 'registration_fee' => 3500],
            ['name' => 'Junior Pro (U18)', 'registration_fee' => 3500],
            ['name' => 'Legends (35+)', 'registration_fee' => 3500],
        ]);
    }
}
