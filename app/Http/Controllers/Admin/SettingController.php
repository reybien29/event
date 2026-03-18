<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tournament;

class SettingController extends Controller
{
    public function index()
    {
        return inertia('admin/settings/index', [
            'tournament' => Tournament::where('status', 'active')->first(),
        ]);
    }
}
