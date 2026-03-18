<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;

class TeamController extends Controller
{
    public function index()
    {
        return inertia('admin/teams/index', [
            'teams' => Team::with('division')->latest()->get(),
        ]);
    }
}
