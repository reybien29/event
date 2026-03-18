<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationRequest;
use App\Models\Division;
use App\Models\Standing;
use App\Models\Team;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    public function create()
    {
        return Inertia::render('registration/create', [
            'divisions' => Division::all(),
        ]);
    }

    public function store(RegistrationRequest $request)
    {
        $validated = $request->validated();

        return DB::transaction(function () use ($validated) {
            $team = Team::create([
                'division_id' => $validated['division_id'],
                'name' => $validated['team_name'],
                'coach_name' => $validated['coach_name'],
                'contact_number' => $validated['contact_number'],
                'status' => 'pending',
            ]);

            foreach ($validated['players'] as $player) {
                $team->players()->create($player);
            }

            // Initialize standings for this team
            Standing::create([
                'team_id' => $team->id,
                'division_id' => $team->division_id,
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
