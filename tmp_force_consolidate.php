<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Kernel::class)->bootstrap();

use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Contracts\Console\Kernel;

$tournament = Tournament::active()->latest()->first();
echo 'Consolidating all teams to Tournament ID: '.$tournament->id.PHP_EOL;

$count = Team::query()->update(['tournament_id' => $tournament->id]);
echo "Updated $count teams.".PHP_EOL;

$stats = Team::groupBy('tournament_id')->select('tournament_id', DB::raw('count(*) as count'))->get();
foreach ($stats as $s) {
    echo "ID: {$s->tournament_id}, Count: {$s->count}\n";
}
