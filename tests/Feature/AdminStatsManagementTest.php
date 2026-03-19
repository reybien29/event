<?php

use App\Models\Division;
use App\Models\Game;
use App\Models\Standing;
use App\Models\Team;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;

it('updates division standings from stats management', function () {
    $admin = User::factory()->admin()->create();
    $tournament = Tournament::factory()->active()->create([
        'name' => 'Summer Slam 2026',
    ]);
    $division = Division::factory()->for($tournament)->create([
        'name' => 'Mens Open',
    ]);
    $teams = Team::factory()->count(2)->for($division)->create();

    $this->actingAs($admin)
        ->put(route('admin.stats.update', $division), [
            'standings' => [
                [
                    'team_id' => $teams[0]->id,
                    'group_name' => 'Group A',
                    'wins' => 3,
                    'losses' => 1,
                    'draws' => 0,
                    'points' => 7,
                    'quotient' => 1.2154,
                ],
                [
                    'team_id' => $teams[1]->id,
                    'group_name' => 'Group A',
                    'wins' => 2,
                    'losses' => 2,
                    'draws' => 0,
                    'points' => 6,
                    'quotient' => 1.1023,
                ],
            ],
        ])
        ->assertRedirect(route('admin.stats.index'));

    $this->assertDatabaseHas('standings', [
        'team_id' => $teams[0]->id,
        'division_id' => $division->id,
        'group_name' => 'Group A',
        'wins' => 3,
        'losses' => 1,
        'points' => 7,
    ]);

    $this->actingAs($admin)
        ->get(route('admin.stats.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/stats/index')
            ->where('divisions.0.name', 'Mens Open')
            ->where('divisions.0.teams.0.standing.group_name', 'Group A')
            ->where('facebook_configured', false));
});

it('posts division standings to facebook when credentials are configured', function () {
    config()->set('services.facebook.page_id', '987654321');
    config()->set('services.facebook.page_access_token', 'page-token');
    config()->set('services.facebook.graph_version', 'v23.0');

    Http::fake([
        'https://graph.facebook.com/*' => Http::response(['id' => '987654321_111'], 200),
    ]);

    $admin = User::factory()->admin()->create();
    $tournament = Tournament::factory()->active()->create([
        'name' => 'Elite Cup 2026',
    ]);
    $division = Division::factory()->for($tournament)->create([
        'name' => 'Womens Open',
    ]);
    $team = Team::factory()->for($division)->create([
        'name' => 'Aurora Ballers',
    ]);

    Standing::query()->create([
        'team_id' => $team->id,
        'division_id' => $division->id,
        'group_name' => 'Group B',
        'wins' => 4,
        'losses' => 0,
        'draws' => 0,
        'points' => 8,
        'quotient' => 1.8888,
    ]);

    $this->actingAs($admin)
        ->post(route('admin.stats.publish', $division))
        ->assertRedirect(route('admin.stats.index'));

    Http::assertSent(function (Request $request) {
        return $request->url() === 'https://graph.facebook.com/v23.0/987654321/feed'
            && str_contains($request['message'], 'Division: Womens Open')
            && str_contains($request['message'], 'Aurora Ballers')
            && $request['access_token'] === 'page-token';
    });
});

it('generates randomized elimination brackets for every division from team management', function () {
    $admin = User::factory()->admin()->create();
    $tournament = Tournament::factory()->active()->create([
        'start_date' => '2026-07-01',
        'end_date' => '2026-07-10',
    ]);
    $divisionOne = Division::factory()->for($tournament)->create([
        'name' => 'Mens Open',
    ]);
    $divisionTwo = Division::factory()->for($tournament)->create([
        'name' => 'Under 18',
    ]);

    Team::factory()->count(4)->for($divisionOne)->create();
    Team::factory()->count(2)->for($divisionTwo)->create();

    $this->actingAs($admin)
        ->post(route('admin.teams.brackets.generate'))
        ->assertRedirect(route('admin.teams.index'));

    expect(Game::query()->where('division_id', $divisionOne->id)->where('stage', 'elimination')->count())->toBe(2);
    expect(Game::query()->where('division_id', $divisionTwo->id)->where('stage', 'elimination')->count())->toBe(1);
    expect(Game::query()->where('stage', 'elimination')->count())->toBe(3);

    $this->actingAs($admin)
        ->get(route('admin.teams.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/teams/index')
            ->has('teams', 6));
});
