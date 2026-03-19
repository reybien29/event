<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveDivisionRequest;
use App\Models\Division;
use App\Models\Game;
use App\Models\Team;
use App\Models\Tournament;
use App\Services\DivisionBracketService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DivisionController extends Controller
{
    public function index(): Response
    {
        $activeTournament = Tournament::query()
            ->where('status', 'active')
            ->latest()
            ->first();

        return Inertia::render('admin/divisions/index', [
            'active_tournament' => $activeTournament,
            'divisions' => $activeTournament?->divisions()
                ->withCount(['teams', 'games'])
                ->orderBy('name')
                ->get() ?? collect(),
        ]);
    }

    public function show(Division $division): Response
    {
        $division->load([
            'tournament',
            'teams' => fn ($query) => $query->latest(),
            'games' => fn ($query) => $query
                ->with(['teamA', 'teamB'])
                ->orderBy('scheduled_at')
                ->orderBy('group_name'),
        ])->loadCount(['teams', 'games']);

        return Inertia::render('admin/divisions/show', [
            'division' => $division,
        ]);
    }

    public function store(SaveDivisionRequest $request): RedirectResponse
    {
        $tournament = Tournament::query()
            ->where('status', 'active')
            ->latest()
            ->first();

        if (! $tournament) {
            return redirect()
                ->route('admin.divisions.index')
                ->with('error', 'Create or activate a tournament before adding divisions.');
        }

        $tournament->divisions()->create($request->validated());

        return redirect()
            ->route('admin.divisions.index')
            ->with('success', 'Division created successfully.');
    }

    public function update(SaveDivisionRequest $request, Division $division): RedirectResponse
    {
        $division->update($request->validated());

        return redirect()
            ->route('admin.divisions.show', $division)
            ->with('success', 'Division updated successfully.');
    }

    public function destroy(Division $division): RedirectResponse
    {
        if ($division->teams()->exists()) {
            return redirect()
                ->route('admin.divisions.show', $division)
                ->with('error', 'Delete registered teams first before removing the division.');
        }

        if ($division->games()->exists()) {
            return redirect()
                ->route('admin.divisions.show', $division)
                ->with('error', 'Delete bracket games first before removing the division.');
        }

        $division->delete();

        return redirect()
            ->route('admin.divisions.index')
            ->with('success', 'Division deleted successfully.');
    }

    public function destroyTeam(Division $division, Team $team): RedirectResponse
    {
        abort_unless($team->division_id === $division->id, 404);

        $team->delete();

        return redirect()
            ->route('admin.divisions.show', $division)
            ->with('success', 'Registered team deleted successfully.');
    }

    public function generateBracket(Division $division, DivisionBracketService $divisionBracketService): RedirectResponse
    {
        $division->load('tournament');

        if (! $division->tournament) {
            return redirect()
                ->route('admin.divisions.show', $division)
                ->with('error', 'No tournament is assigned to this division.');
        }

        $teams = $division->teams()
            ->orderBy('name')
            ->get();

        if ($teams->count() < 2) {
            return redirect()
                ->route('admin.divisions.show', $division)
                ->with('error', 'At least two registered teams are required to generate a bracket.');
        }

        $generatedGames = $divisionBracketService->generate($division, $division->tournament, $teams);

        Game::query()
            ->where('division_id', $division->id)
            ->where('stage', 'elimination')
            ->delete();

        foreach ($generatedGames as $generatedGame) {
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

        return redirect()
            ->route('admin.divisions.show', $division)
            ->with('success', "Bracket schedule generated for {$division->name}.");
    }

    public function apiIndex()
    {
        return response()->json(Division::all());
    }
}
