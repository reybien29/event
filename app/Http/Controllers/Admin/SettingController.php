<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateActiveTournamentRequest;
use App\Models\Tournament;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/settings/index', [
            'tournament' => Tournament::query()
                ->where('status', 'active')
                ->latest()
                ->first(),
        ]);
    }

    public function update(UpdateActiveTournamentRequest $request): RedirectResponse
    {
        $tournament = Tournament::query()
            ->where('status', 'active')
            ->latest()
            ->first() ?? new Tournament;

        $tournament->fill($request->validated());
        $tournament->status = 'active';
        $tournament->save();

        return redirect()
            ->route('admin.settings.index')
            ->with('success', 'Active tournament settings updated successfully.');
    }
}
