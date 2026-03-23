<?php

// Mock registration request
$data = [
    'team_name' => 'Test Team '.rand(100, 999),
    'coach_name' => 'Test Coach',
    'contact_number' => '09123456789',
    'players' => [
        ['name' => 'Player 1', 'jersey_number' => '10'],
        ['name' => 'Player 2', 'jersey_number' => '11'],
        ['name' => 'Player 3', 'jersey_number' => '12'],
        ['name' => 'Player 4', 'jersey_number' => '13'],
        ['name' => 'Player 5', 'jersey_number' => '14'],
    ],
    'agreed_to_terms' => true,
];

echo "Simulating registration...\n";
// Since I can't easily call the route with session/csrf etc. via CLI easily without a real request
// I will just use artisan tinker to execute the logic manually and see if it fails.
