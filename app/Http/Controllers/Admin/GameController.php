<?php

namespace App\Http\Controllers\Admin;

use App\Ai\Agents\SchedulerAgent;
use App\Http\Controllers\Controller;
use App\Models\Division;
use App\Models\Game;
use App\Models\Team;
use App\Models\Tournament;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index()
    {
        return inertia('admin/games/index', [
            'games' => Game::with(['teamA', 'teamB', 'division'])->latest()->get(),
            'teams_count' => Team::count(),
        ]);
    }

    public function generate(Request $request)
    {
        $tournament = Tournament::where('status', 'active')->first();
        if (! $tournament) {
            return back()->with('error', 'No active tournament found.');
        }

        $teams = Team::approved()->get();
        if ($teams->count() < 2) {
            return back()->with('error', 'At least 2 approved teams are required to generate a schedule.');
        }

        $divisions = Division::all();
        $prompt = "Generate a round-robin schedule for these divisions: {$divisions->toJson()} and approved teams: {$teams->toJson()}. Tournament dates: {$tournament->start_date} to {$tournament->end_date}. Available Courts: Court 1, Court 2.";

        try {
            // Using laravel/ai SDK
            $response = (new SchedulerAgent)->prompt($prompt);
            $generatedGames = $response['games'];
        } catch (\Exception $e) {
            // Fallback deterministic scheduler if AI fails (e.g. no API key)
            $generatedGames = $this->fallbackScheduler($teams, $tournament);
        }

        foreach ($generatedGames as $gameData) {
            Game::create([
                'tournament_id' => $tournament->id,
                'division_id' => $gameData['division_id'],
                'team_a_id' => $gameData['team_a_id'],
                'team_b_id' => $gameData['team_b_id'],
                'scheduled_at' => $gameData['scheduled_at'],
                'court_name' => $gameData['court_name'],
                'stage' => $gameData['stage'] ?? 'Elimination',
                'status' => 'scheduled',
            ]);
        }

        return back()->with('success', 'Games scheduled successfully.');
    }

    protected function fallbackScheduler($teams, $tournament): array
    {
        $games = [];
        $divisions = $teams->groupBy('division_id');
        $startDate = Carbon::parse($tournament->start_date);
        $gameTime = $startDate->copy()->setHour(18)->setMinute(0); // Start at 6 PM

        foreach ($divisions as $divisionId => $divTeams) {
            $teamList = $divTeams->pluck('id')->toArray();
            $numTeams = count($teamList);

            for ($i = 0; $i < $numTeams; $i++) {
                for ($j = $i + 1; $j < $numTeams; $j++) {
                    $games[] = [
                        'division_id' => $divisionId,
                        'team_a_id' => $teamList[$i],
                        'team_b_id' => $teamList[$j],
                        'scheduled_at' => $gameTime->toDateTimeString(),
                        'court_name' => 'Main Court',
                        'stage' => 'Elimination',
                    ];
                    // Increment time for next game
                    $gameTime->addHours(2);
                    if ($gameTime->hour >= 22) {
                        $gameTime->addDay()->setHour(18);
                    }
                }
            }
        }

        return $games;
    }
}
