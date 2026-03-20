<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Team;
use App\Models\Tournament;
use App\Services\TournamentBracketService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(): Response
    {
        return inertia('admin/teams/index', [
            'teams' => Team::latest()->get(),
        ]);
    }

    public function generateBrackets(TournamentBracketService $bracketService): RedirectResponse
    {
        $tournament = Tournament::active()
            ->with(['teams' => fn ($query) => $query->orderBy('name')])
            ->first();

        if ($tournament === null || $tournament->teams->count() < 2) {
            return redirect()
                ->route('admin.teams.index')
                ->with('error', 'Add at least two registered teams before generating brackets.');
        }

        $generatedGames = 0;

        DB::transaction(function () use ($tournament, $bracketService, &$generatedGames): void {
            $generatedBracketGames = $bracketService->generateRandomized($tournament, $tournament->teams);

            if ($generatedBracketGames === []) {
                return;
            }

            // Remove previous elimination bracket games if they existed
            Game::query()
                ->where('tournament_id', $tournament->id)
                ->where('stage', 'elimination')
                ->delete();

            foreach ($generatedBracketGames as $generatedGame) {
                Game::query()->create([
                    'tournament_id' => $tournament->id,
                    'team_a_id' => $generatedGame['team_a_id'],
                    'team_b_id' => $generatedGame['team_b_id'],
                    'court_name' => $generatedGame['court_name'],
                    'scheduled_at' => $generatedGame['scheduled_at'],
                    'status' => 'scheduled',
                    'stage' => 'elimination',
                    'group_name' => $generatedGame['group_name'],
                ]);
            }

            $generatedGames += count($generatedBracketGames);
        });

        if ($generatedGames === 0) {
            return redirect()
                ->route('admin.teams.index')
                ->with('error', 'Unable to generate pairings.');
        }

        return redirect()
            ->route('admin.teams.index')
            ->with('success', "AI Generation Bracketing created {$generatedGames} elimination games.");
    }
}
