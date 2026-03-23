 <?php

require_once __DIR__.'/vendor/autoload.php';

use App\Services\TournamentBracketService;
use Carbon\Carbon;

class TestTournament
{
    public $id = 1;

    public $name = 'Test Tournament';

    public $start_date = '2026-03-20';

    public $end_date = '2026-03-22';
}

class TestTeam
{
    public $id;

    public $name;

    public function __construct($id, $name)
    {
        $this->id = $id;
        $this->name = $name;
    }
}

$tournament = new TestTournament;
$teams = collect([
    new TestTeam(1, 'Team A'),
    new TestTeam(2, 'Team B'),
    new TestTeam(3, 'Team C'),
    new TestTeam(4, 'Team D'),
    new TestTeam(5, 'Team E'),
    new TestTeam(6, 'Team F'),
    new TestTeam(7, 'Team G'),
    new TestTeam(8, 'Team H'),
]);

// Test the fallback bracket generation directly
$service = new TournamentBracketService;

// Simulate the fallback logic
$remainingTeams = $teams->values();
$scheduledAt = Carbon::parse($tournament->start_date)
    ->startOfDay()
    ->setHour(9)
    ->setMinute(0);
$games = [];
$matchNumber = 1;

while ($remainingTeams->count() > 1) {
    $teamA = $remainingTeams->shift();
    $teamB = $remainingTeams->pop();

    if (! $teamA instanceof TestTeam || ! $teamB instanceof TestTeam) {
        break;
    }

    $games[] = [
        'team_a_id' => $teamA->id,
        'team_b_id' => $teamB->id,
        'scheduled_at' => $scheduledAt->copy()->addMinutes(($matchNumber - 1) * 90)->toDateTimeString(),
        'court_name' => $matchNumber % 2 === 0 ? 'Court B' : 'Court A',
        'group_name' => $matchNumber <= 2 ? 'Final' : "Elimination Match {$matchNumber}",
    ];

    $matchNumber++;
}

echo 'Generated '.count($games)." games:\n";
foreach ($games as $game) {
    echo 'Game: '.$game['team_a_id'].' vs '.$game['team_b_id'].' at '.$game['scheduled_at'].' on '.$game['court_name']."\n";
}
