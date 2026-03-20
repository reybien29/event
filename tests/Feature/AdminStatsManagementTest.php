<?php

use App\Models\Game;
use App\Models\Standing;
use App\Models\Team;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;

it('updates tournament standings from stats management', function () {
    $admin = User::factory()->admin()->create();
    $tournament = Tournament::factory()->active()->create([
        'name' => 'Summer Slam 2026',
    ]);
    $teams = Team::factory()->count(2)->create([
        'tournament_id' => $tournament->id,
    ]);

    $this->actingAs($admin)
        ->put(route('admin.stats.update', $tournament), [
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
        'tournament_id' => $tournament->id,
        'group_name' => 'Group A',
        'wins' => 3,
        'losses' => 1,
        'points' => 7,
    ]);

    $this->actingAs($admin)
        ->get(route('admin.stats.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/stats/index')
            ->where('tournaments.0.name', 'Summer Slam 2026')
            ->where('tournaments.0.teams.0.standing.group_name', 'Group A')
            ->where('facebook_configured', false));
});

it('posts tournament standings to facebook when credentials are configured', function () {
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
    $team = Team::factory()->create([
        'tournament_id' => $tournament->id,
        'name' => 'Aurora Ballers',
    ]);

    Standing::query()->create([
        'team_id' => $team->id,
        'tournament_id' => $tournament->id,
        'group_name' => 'Group B',
        'wins' => 4,
        'losses' => 0,
        'draws' => 0,
        'points' => 8,
        'quotient' => 1.8888,
    ]);

    $this->actingAs($admin)
        ->post(route('admin.stats.publish', $tournament))
        ->assertRedirect(route('admin.stats.index'));

    Http::assertSent(function (Request $request) {
        return $request->url() === 'https://graph.facebook.com/v23.0/987654321/feed'
            && str_contains($request['message'], 'Elite Cup 2026 Standings Update')
            && str_contains($request['message'], 'Aurora Ballers')
            && $request['access_token'] === 'page-token';
    });
});

it('generates randomized elimination brackets for the tournament from team management', function () {
    $admin = User::factory()->admin()->create();
    $tournament = Tournament::factory()->active()->create([
        'start_date' => '2026-07-01',
        'end_date' => '2026-07-10',
    ]);

    Team::factory()->count(4)->create([
        'tournament_id' => $tournament->id,
    ]);

    $this->actingAs($admin)
        ->post(route('admin.teams.brackets.generate'))
        ->assertRedirect(route('admin.teams.index'));

    expect(Game::query()->where('tournament_id', $tournament->id)->where('stage', 'elimination')->count())->toBe(2);

    $this->actingAs($admin)
        ->get(route('admin.teams.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/teams/index')
            ->has('teams', 4));
});
