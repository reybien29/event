<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateDivisionStandingsRequest;
use App\Models\Division;
use App\Models\Standing;
use App\Models\Team;
use App\Services\StandingsFacebookPublisher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class StatsController extends Controller
{
    public function index(StandingsFacebookPublisher $standingsFacebookPublisher): Response
    {
        $divisions = Division::query()
            ->withCount('teams')
            ->with([
                'tournament',
                'teams' => fn ($query) => $query
                    ->with('standings')
                    ->orderBy('name'),
            ])
            ->whereHas('teams')
            ->orderBy('name')
            ->get()
            ->map(function (Division $division) use ($standingsFacebookPublisher): array {
                return [
                    'id' => $division->id,
                    'name' => $division->name,
                    'teams_count' => $division->teams_count,
                    'tournament' => [
                        'name' => $division->tournament?->name,
                        'start_date' => $division->tournament?->start_date,
                        'end_date' => $division->tournament?->end_date,
                    ],
                    'teams' => $division->teams->map(function (Team $team): array {
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
                    'facebook_preview' => $standingsFacebookPublisher->buildDivisionMessage($division),
                ];
            })
            ->values();

        return Inertia::render('admin/stats/index', [
            'divisions' => $divisions,
            'facebook_configured' => (bool) config('services.facebook.page_id')
                && (bool) config('services.facebook.page_access_token'),
        ]);
    }

    public function update(UpdateDivisionStandingsRequest $request, Division $division): RedirectResponse
    {
        $standings = $request->validated('standings');
        $teamIds = collect($standings)->pluck('team_id');
        $matchingTeamIds = $division->teams()->whereIn('id', $teamIds)->pluck('id');

        abort_unless($matchingTeamIds->count() === $teamIds->count(), 404);

        DB::transaction(function () use ($division, $standings): void {
            foreach ($standings as $standingData) {
                Standing::query()->updateOrCreate(
                    [
                        'team_id' => $standingData['team_id'],
                        'division_id' => $division->id,
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
            ->with('success', "Standings updated for {$division->name}.");
    }

    public function publish(Division $division, StandingsFacebookPublisher $standingsFacebookPublisher): RedirectResponse
    {
        try {
            $standingsFacebookPublisher->publishDivisionStandings($division);
        } catch (RuntimeException $exception) {
            return redirect()
                ->route('admin.stats.index')
                ->with('error', $exception->getMessage());
        }

        return redirect()
            ->route('admin.stats.index')
            ->with('success', "Standings for {$division->name} were posted to Facebook.");
    }
}
