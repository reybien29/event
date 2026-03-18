<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Division;

class DivisionController extends Controller
{
    public function index()
    {
        return inertia('admin/divisions/index', [
            'divisions' => Division::all(),
        ]);
    }
}
