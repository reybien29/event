<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Team;
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
}
