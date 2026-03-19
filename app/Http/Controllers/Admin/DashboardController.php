<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Division;
use App\Models\Payment;
use App\Models\Player;
use App\Models\Team;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $divisionBrackets = Division::query()
            ->withCount(['teams', 'games'])
            ->with([
                'games' => fn ($query) => $query
                    ->with(['teamA', 'teamB'])
                    ->orderBy('scheduled_at')
                    ->orderBy('group_name'),
            ])
            ->whereHas('games')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total_teams' => Team::count(),
                'total_players' => Player::count(),
                'total_payments' => '₱ '.number_format(Payment::where('status', 'paid')->sum('amount'), 2),
                'pending_registrations' => Team::where('status', 'pending')->count(),
            ],
            'recent_teams' => Team::with('division')->latest()->take(5)->get(),
            'division_brackets' => $divisionBrackets,
        ]);
    }
}
