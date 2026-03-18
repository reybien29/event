<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Player;
use App\Models\Team;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total_teams' => Team::count(),
                'total_players' => Player::count(),
                'total_payments' => '₱ '.number_format(Payment::where('status', 'paid')->sum('amount'), 2),
                'pending_registrations' => Team::where('status', 'pending')->count(),
            ],
            'recent_teams' => Team::with('division')->latest()->take(5)->get(),
        ]);
    }
}
