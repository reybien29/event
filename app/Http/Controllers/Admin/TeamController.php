<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Division;
use App\Models\Game;
use App\Models\Team;
use App\Services\DivisionBracketService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(): Response
    {
        return inertia('admin/teams/index', [
            'teams' => Team::with('division')->latest()->get(),
        ]);
    }

    public function generateBrackets(DivisionBracketService $divisionBracketService): RedirectResponse
    {
        $divisions = Division::query()
            ->with([
                'tournament',
                'teams' => fn ($query) => $query->orderBy('name'),
            ])
            ->whereHas('teams')
            ->orderBy('name')
            ->get();

        $generatedDivisions = 0;
        $generatedGames = 0;

        DB::transaction(function () use ($divisions, $divisionBracketService, &$generatedDivisions, &$generatedGames): void {
            foreach ($divisions as $division) {
                if ($division->tournament === null || $division->teams->count() < 2) {
                    continue;
                }

                $generatedBracketGames = $divisionBracketService->generateRandomized($division, $division->tournament, $division->teams);

                if ($generatedBracketGames === []) {
                    continue;
                }

                Game::query()
                    ->where('division_id', $division->id)
                    ->where('stage', 'elimination')
                    ->delete();

                foreach ($generatedBracketGames as $generatedGame) {
                    Game::query()->create([
                        'tournament_id' => $division->tournament->id,
                        'division_id' => $division->id,
                        'team_a_id' => $generatedGame['team_a_id'],
                        'team_b_id' => $generatedGame['team_b_id'],
                        'court_name' => $generatedGame['court_name'],
                        'scheduled_at' => $generatedGame['scheduled_at'],
                        'status' => 'scheduled',
                        'stage' => 'elimination',
                        'group_name' => $generatedGame['group_name'],
                    ]);
                }

                $generatedDivisions++;
                $generatedGames += count($generatedBracketGames);
            }
        });

        if ($generatedGames === 0) {
            return redirect()
                ->route('admin.teams.index')
                ->with('error', 'Add at least two registered teams inside a division before generating brackets.');
        }

        return redirect()
            ->route('admin.teams.index')
            ->with('success', "AI Generation Bracketing created {$generatedGames} elimination games across {$generatedDivisions} divisions.");
    }
}
