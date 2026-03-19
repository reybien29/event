<?php

use App\Models\Division;
use App\Models\Game;
use App\Models\Team;
use App\Models\Tournament;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('updates active tournament settings and exposes them on the landing page', function () {
    $admin = User::factory()->admin()->create();
    Tournament::factory()->active()->create([
        'name' => 'Old League Name',
        'description' => 'Old description',
        'start_date' => '2026-04-01',
        'end_date' => '2026-04-10',
    ]);

    $this->actingAs($admin)
        ->put(route('admin.settings.update'), [
            'name' => 'Summer Slam 2026',
            'description' => 'Updated tournament copy from admin settings.',
            'start_date' => '2026-05-01',
            'end_date' => '2026-05-31',
        ])
        ->assertRedirect(route('admin.settings.index'));

    $this->assertDatabaseHas('tournaments', [
        'name' => 'Summer Slam 2026',
        'description' => 'Updated tournament copy from admin settings.',
        'start_date' => '2026-05-01',
        'end_date' => '2026-05-31',
        'status' => 'active',
    ]);

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome')
            ->where('tournament.name', 'Summer Slam 2026')
            ->where('tournament.description', 'Updated tournament copy from admin settings.')
            ->where('tournament.start_date', '2026-05-01')
            ->where('tournament.end_date', '2026-05-31'));
});

it('creates and updates divisions from division management', function () {
    $admin = User::factory()->admin()->create();
    Tournament::factory()->active()->create();

    $this->actingAs($admin)
        ->post(route('admin.divisions.store'), [
            'name' => 'Under 18',
            'registration_fee' => 3500,
        ])
        ->assertRedirect(route('admin.divisions.index'));

    $division = Division::query()->firstOrFail();

    expect($division->name)->toBe('Under 18');
    expect((float) $division->registration_fee)->toBe(3500.0);

    $this->actingAs($admin)
        ->put(route('admin.divisions.update', $division), [
            'name' => 'Under 19',
            'registration_fee' => 4200,
        ])
        ->assertRedirect(route('admin.divisions.show', $division));

    $division->refresh();

    expect($division->name)->toBe('Under 19');
    expect((float) $division->registration_fee)->toBe(4200.0);
});

it('deletes teams from a division and keeps bracket details off the dashboard', function () {
    $admin = User::factory()->admin()->create();
    $tournament = Tournament::factory()->active()->create([
        'start_date' => '2026-06-01',
        'end_date' => '2026-06-15',
    ]);
    $division = Division::factory()->for($tournament)->create([
        'name' => 'Mens Open',
    ]);

    $teamToDelete = Team::factory()->for($division)->create([
        'name' => 'Delete Me',
    ]);

    Team::factory()->count(4)->for($division)->create();

    $this->actingAs($admin)
        ->delete(route('admin.divisions.teams.destroy', [$division, $teamToDelete]))
        ->assertRedirect(route('admin.divisions.show', $division));

    $this->assertDatabaseMissing('teams', [
        'id' => $teamToDelete->id,
    ]);

    $this->actingAs($admin)
        ->post(route('admin.divisions.bracket.generate', $division))
        ->assertRedirect(route('admin.divisions.show', $division));

    expect(Game::query()->where('division_id', $division->id)->count())->toBe(2);
    expect(Game::query()->where('division_id', $division->id)->where('stage', 'elimination')->count())->toBe(2);

    $this->actingAs($admin)
        ->get(route('admin.dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->has('recent_teams', 4)
            ->missing('division_brackets'));
});
