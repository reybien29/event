<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Kernel::class)->bootstrap();

use App\Models\Tournament;
use Illuminate\Contracts\Console\Kernel;

$tournament = Tournament::active()->first();
echo 'Active Tournament ID: '.($tournament->id ?? 'NONE').PHP_EOL;
echo 'Teams in this tournament: '.($tournament ? $tournament->teams->count() : 0).PHP_EOL;

$allActiveTournaments = Tournament::active()->get();
foreach ($allActiveTournaments as $t) {
    echo "ID: {$t->id}, Teams: {$t->teams->count()}\n";
}
