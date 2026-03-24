<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Ensures a single admin user exists. Safe to run on every deploy (idempotent).
 * Set ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME in the environment on production.
 */
class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@admin.com');

        User::query()->firstOrCreate(
            ['email' => $email],
            [
                'name' => env('ADMIN_NAME', 'Admin User'),
                'password' => env('ADMIN_PASSWORD', 'password'),
                'is_admin' => true,
            ],
        );
    }
}
