<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Standing;
use App\Models\Team;
use App\Models\Tournament;
use App\Services\StandingsFacebookPublisher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class StatsController extends Controller
{
    public function index(StandingsFacebookPublisher $standingsFacebookPublisher): Response
    {
        $tournaments = Tournament::query()
            ->withCount('teams')
            ->with([
                'teams' => fn ($query) => $query
                    ->with('standings')
                    ->orderBy('name'),
            ])
            ->whereHas('teams')
            ->orderBy('name')
            ->get()
            ->map(function (Tournament $tournament) use ($standingsFacebookPublisher): array {
                return [
                    'id' => $tournament->id,
                    'name' => $tournament->name,
                    'teams_count' => $tournament->teams_count,
                    'start_date' => $tournament->start_date,
                    'end_date' => $tournament->end_date,
                    'teams' => $tournament->teams->map(function (Team $team): array {
                        $standing = $team->standings;
                        $wins = (int) ($standing?->wins ?? 0);
                        $losses = (int) ($standing?->losses ?? 0);
                        $draws = (int) ($standing?->draws ?? 0);

                        return [
                            'id' => $team->id,
                            'name' => $team->name,
                            'coach_name' => $team->coach_name,
                            'status' => $team->status,
                            'standing' => [
                                'group_name' => $standing?->group_name,
                                'wins' => $wins,
                                'losses' => $losses,
                                'draws' => $draws,
                                'points' => (int) ($standing?->points ?? 0),
                                'quotient' => (float) ($standing?->quotient ?? 0),
                                'played' => $wins + $losses + $draws,
                            ],
                        ];
                    })->values(),
                    'facebook_preview' => rtrim($standingsFacebookPublisher->buildTournamentMessage($tournament)),
                ];
            })
            ->values();

        return Inertia::render('admin/stats/index', [
            'tournaments' => $tournaments,
            'facebook_configured' => (bool) config('services.facebook.page_id')
                && (bool) config('services.facebook.page_access_token'),
        ]);
    }

    public function update(Request $request, Tournament $tournament): RedirectResponse
    {
        $validated = $request->validate([
            'standings' => ['required', 'array'],
            'standings.*.team_id' => ['required', 'integer', 'exists:teams,id'],
            'standings.*.group_name' => ['nullable', 'string', 'max:255'],
            'standings.*.wins' => ['required', 'integer', 'min:0'],
            'standings.*.losses' => ['required', 'integer', 'min:0'],
            'standings.*.draws' => ['required', 'integer', 'min:0'],
            'standings.*.points' => ['required', 'integer', 'min:0'],
            'standings.*.quotient' => ['required', 'numeric'],
        ]);

        $standings = $validated['standings'];
        $teamIds = collect($standings)->pluck('team_id');
        $matchingTeamIds = $tournament->teams()->whereIn('id', $teamIds)->pluck('id');

        abort_unless($matchingTeamIds->count() === $teamIds->count(), 404);

        DB::transaction(function () use ($tournament, $standings): void {
            foreach ($standings as $standingData) {
                Standing::query()->updateOrCreate(
                    [
                        'team_id' => $standingData['team_id'],
                        'tournament_id' => $tournament->id,
                    ],
                    [
                        'group_name' => $standingData['group_name'] ?: null,
                        'wins' => $standingData['wins'],
                        'losses' => $standingData['losses'],
                        'draws' => $standingData['draws'],
                        'points' => $standingData['points'],
                        'quotient' => $standingData['quotient'],
                    ],
                );
            }
        });

        return redirect()
            ->route('admin.stats.index')
            ->with('success', "Standings updated for {$tournament->name}.");
    }

    public function publish(Tournament $tournament, StandingsFacebookPublisher $standingsFacebookPublisher): RedirectResponse
    {
        try {
            $standingsFacebookPublisher->publishTournamentStandings($tournament);
        } catch (RuntimeException $exception) {
            return redirect()
                ->route('admin.stats.index')
                ->with('error', $exception->getMessage());
        }

        return redirect()
            ->route('admin.stats.index')
            ->with('success', "Standings for {$tournament->name} were posted to Facebook.");
    }
}
