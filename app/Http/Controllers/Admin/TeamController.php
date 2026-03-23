<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Standing;
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
        $activeTournament = Tournament::active()->latest()->first();
        $hasBrackets = $activeTournament ? Game::where('tournament_id', $activeTournament->id)->exists() : false;

        return inertia('admin/teams/index', [
            'teams' => Team::latest()->get(),
            'hasBrackets' => $hasBrackets,
        ]);
    }

    public function generateBrackets(TournamentBracketService $bracketService): RedirectResponse
    {
        $tournament = Tournament::active()
            ->with(['teams' => fn ($query) => $query->orderBy('name')])
            ->latest()
            ->first();

        $teamCount = $tournament ? $tournament->teams->count() : 0;

        if ($tournament === null || $teamCount < 8 || $teamCount > 10) {
            return redirect()
                ->route('admin.teams.index')
                ->with('error', 'The AI engine requires 8–10 registered teams to generate valid tournament brackets.');
        }

        $generatedGames = 0;

        DB::transaction(function () use ($tournament, $bracketService, &$generatedGames): void {
            $generatedBracketGames = $bracketService->generate($tournament, $tournament->teams);

            if ($generatedBracketGames === []) {
                return;
            }

            // Remove previous pool stage bracket games if they existed
            Game::query()
                ->where('tournament_id', $tournament->id)
                ->where('stage', 'pool')
                ->delete();

            foreach ($generatedBracketGames as $generatedGame) {
                Game::query()->create([
                    'tournament_id' => $tournament->id,
                    'team_a_id' => $generatedGame['team_a_id'],
                    'team_b_id' => $generatedGame['team_b_id'],
                    'court_name' => $generatedGame['court_name'],
                    'scheduled_at' => $generatedGame['scheduled_at'],
                    'status' => 'scheduled',
                    'stage' => 'pool',
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
            ->route('admin.dashboard')
            ->with('success', "AI-Powered Bracket Generators created {$generatedGames} group stage games.");
    }

    public function destroy(Team $team): RedirectResponse
    {
        $team->delete();

        return redirect()
            ->route('admin.teams.index')
            ->with('success', 'Team deleted successfully.');
    }

    public function discardBrackets(): RedirectResponse
    {
        $tournament = Tournament::active()->latest()->first();

        if ($tournament) {
            DB::transaction(function () use ($tournament) {
                Game::query()
                    ->where('tournament_id', $tournament->id)
                    ->delete();

                Standing::query()
                    ->where('tournament_id', $tournament->id)
                    ->delete();
            });
        }

        return redirect()
            ->route('admin.teams.index')
            ->with('success', 'Generated brackets discarded successfully.');
    }
}
