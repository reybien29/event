<?php

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
