<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Standing;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/games/index', [
            'games' => Game::with(['teamA', 'teamB'])->latest()->get(),
            'teams_count' => Team::count(),
        ]);
    }

    public function updateResult(Request $request, Game $game): RedirectResponse
    {
        $validated = $request->validate([
            'winner_id' => ['required', 'integer'],
        ]);

        if ($game->status === 'finished') {
            return back()->with('error', 'Game result already recorded. Please use Stats Management for corrections.');
        }

        $winnerId = (int) $validated['winner_id'];
        $loserId = $winnerId === $game->team_a_id ? $game->team_b_id : $game->team_a_id;

        DB::transaction(function () use ($game, $winnerId, $loserId) {
            $game->update([
                'status' => 'finished',
                'team_a_score' => $winnerId === $game->team_a_id ? 1 : 0,
                'team_b_score' => $winnerId === $game->team_b_id ? 1 : 0,
            ]);

            $winnerStanding = Standing::firstOrCreate(
                ['team_id' => $winnerId, 'tournament_id' => $game->tournament_id],
                ['wins' => 0, 'losses' => 0, 'draws' => 0, 'points' => 0, 'quotient' => 0]
            );
            $winnerStanding->increment('wins');
            $winnerStanding->increment('points', 3);

            $loserStanding = Standing::firstOrCreate(
                ['team_id' => $loserId, 'tournament_id' => $game->tournament_id],
                ['wins' => 0, 'losses' => 0, 'draws' => 0, 'points' => 0, 'quotient' => 0]
            );
            $loserStanding->increment('losses');
        });

        return back()->with('success', 'Match result saved and overall standings updated.');
    }
}
