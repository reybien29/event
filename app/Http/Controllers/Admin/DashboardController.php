<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Payment;
use App\Models\Player;
use App\Models\Team;
use App\Models\Tournament;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $activeTournament = Tournament::active()->latest()->first() ?? Tournament::latest()->first();

        $bracket = $activeTournament
            ? Game::where('tournament_id', $activeTournament->id)
                ->where('stage', 'pool')
                ->with(['teamA', 'teamB'])
                ->orderBy('scheduled_at')
                ->get()
            : [];

        $standings = [];
        if ($activeTournament) {
            $standings = $activeTournament->teams()
                ->with('standings')
                ->get()
                ->map(function (Team $team) {
                    $standing = $team->standings;
                    $wins = (int) ($standing?->wins ?? 0);
                    $losses = (int) ($standing?->losses ?? 0);
                    $draws = (int) ($standing?->draws ?? 0);

                    return [
                        'id' => $team->id,
                        'name' => $team->name,
                        'group_name' => $standing?->group_name,
                        'wins' => $wins,
                        'losses' => $losses,
                        'draws' => $draws,
                        'points' => (int) ($standing?->points ?? 0),
                        'quotient' => (float) ($standing?->quotient ?? 0),
                        'played' => $wins + $losses + $draws,
                    ];
                })
                ->sortBy([
                    fn ($a, $b) => $b['points'] <=> $a['points'],
                    fn ($a, $b) => $b['quotient'] <=> $a['quotient'],
                    fn ($a, $b) => $b['wins'] <=> $a['wins'],
                    fn ($a, $b) => $a['name'] <=> $b['name'],
                ])->values()->toArray();
        }

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total_teams' => Team::count(),
                'total_players' => Player::count(),
                'total_payments' => '₱ '.number_format(Payment::where('status', 'paid')->sum('amount'), 2),
                'pending_registrations' => Team::where('status', 'pending')->count(),
            ],
            'recent_teams' => Team::latest()->paginate(5),
            'bracket' => $bracket,
            'active_tournament' => $activeTournament,
            'standings' => $standings,
        ]);
    }
}
