<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

use App\Models\Standing;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\DB;

try {
    $tournament = Tournament::active()->first();
    $tournamentId = $tournament ? $tournament->id : 1;

    DB::transaction(function () use ($tournamentId) {
        $team = Team::create([
            'tournament_id' => $tournamentId,
            'name' => 'Legacy Team '.rand(1, 100),
            'coach_name' => 'Coach Legacy',
            'contact_number' => '09991234567',
            'status' => 'pending',
        ]);

        $team->players()->create([
            'name' => 'Legacy Player 1',
            'jersey_number' => 24,
        ]);

        Standing::create([
            'team_id' => $team->id,
            'tournament_id' => $team->tournament_id,
        ]);

        echo 'Successfully created team ID: '.$team->id."\n";
    });
} catch (Exception $e) {
    echo 'Error: '.$e->getMessage()."\n";
}
