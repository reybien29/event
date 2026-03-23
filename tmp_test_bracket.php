<?php

require_once __DIR__.'/vendor/autoload.php';

use App\Models\Team;
use App\Models\Tournament;
use App\Services\TournamentBracketService;

function createTestTournament()
{
    $tournament = new Tournament;
    $tournament->id = 1;
    $tournament->name = 'Test Tournament';
    $tournament->start_date = '2026-03-20';
    $tournament->end_date = '2026-03-22';

    return $tournament;
}

function createTestTeams($count)
{
    $teams = [];
    for ($i = 1; $i <= $count; $i++) {
        $team = new Team;
        $team->id = $i;
        $team->name = 'Team '.$i;
        $teams[] = $team;
    }

    return collect($teams);
}
$tournament = createTestTournament();
$teams = createTestTeams(8);

$service = new TournamentBracketService;
$bracket = $service->generate($tournament, $teams);

echo 'Generated '.count($bracket)." games:\n";
foreach ($bracket as $game) {
    echo 'Game: '.$game['team_a_id'].' vs '.$game['team_b_id'].' at '.$game['scheduled_at'].' on '.$game['court_name']."\n";
}
