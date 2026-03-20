<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationRequest;
use App\Models\Standing;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    public function create()
    {
        return Inertia::render('registration/create', [
        ]);
    }

    public function store(RegistrationRequest $request)
    {
        $validated = $request->validated();
        
        $tournament = Tournament::active()->first();
        $tournamentId = $tournament ? $tournament->id : 1;

        return DB::transaction(function () use ($validated, $tournamentId) {
            $team = Team::create([
                'tournament_id' => $tournamentId,
                'name' => $validated['team_name'],
                'coach_name' => $validated['coach_name'],
                'contact_number' => $validated['contact_number'],
                'status' => 'pending',
            ]);

            foreach ($validated['players'] as $player) {
                // Ensure empty strings are handled as nulls for strict database engines (e.g. PostgreSQL)
                $player['jersey_number'] = empty($player['jersey_number']) ? null : $player['jersey_number'];
                $player['position'] = empty($player['position']) ? null : $player['position'];
                $player['birth_date'] = empty($player['birth_date']) ? null : $player['birth_date'];

                $team->players()->create($player);
            }

            // Initialize standings for this team
            Standing::create([
                'team_id' => $team->id,
                'tournament_id' => $team->tournament_id,
            ]);

            return redirect()->route('registration.success', ['reference' => $team->id]);
        });
    }

    public function success($reference)
    {
        return Inertia::render('registration/success', [
            'reference' => 'TEAM-'.str_pad($reference, 6, '0', STR_PAD_LEFT),
        ]);
    }
}
