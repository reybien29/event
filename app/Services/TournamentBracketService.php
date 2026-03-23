<?php

namespace App\Services;

use App\Ai\Agents\TournamentBracketAgent;
use App\Models\Team;
use App\Models\Tournament;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Throwable;

class TournamentBracketService
{
    /**
     * @param  Collection<int, Team>  $teams
     * @return array<int, array<string, int|string>>
     */
    public function generate(Tournament $tournament, Collection $teams): array
    {
        $orderedTeams = $teams->sortBy('name')->values();
        $teamCount = $orderedTeams->count();
        $expectedGames = ($teamCount * ($teamCount - 1)) / 2;

        $prompt = sprintf(
            'Create a single round-robin group stage fixture with scheduled match times for tournament %s (ID %d). Each team plays every other team exactly once. Use only these teams: %s. Tournament window: %s to %s. Use realistic courts like Court A or Court B. Return exactly %d games.',
            $tournament->name,
            $tournament->id,
            $orderedTeams->map(fn (Team $team) => [
                'id' => $team->id,
                'name' => $team->name,
            ])->values()->toJson(),
            $tournament->start_date ?? now()->toDateString(),
            $tournament->end_date ?? now()->toDateString(),
            $expectedGames,
        );

        try {
            $response = (new TournamentBracketAgent)->prompt($prompt);
            $aiGames = [];
            $playedPairs = [];

            foreach (collect($response['games'] ?? [])->values() as $game) {
                if (! is_array($game) || ! $this->isValidGame($game, $orderedTeams)) {
                    continue;
                }

                $teamAId = (int) $game['team_a_id'];
                $teamBId = (int) $game['team_b_id'];

                $matchKey = min($teamAId, $teamBId).'-'.max($teamAId, $teamBId);
                if (isset($playedPairs[$matchKey])) {
                    continue;
                }

                $playedPairs[$matchKey] = true;

                $aiGames[] = [
                    'team_a_id' => $teamAId,
                    'team_b_id' => $teamBId,
                    'scheduled_at' => Carbon::parse($game['scheduled_at'])->toDateTimeString(),
                    'court_name' => $game['court_name'] ?: $this->courtName(count($aiGames) + 1),
                    'group_name' => $game['group_name'] ?: 'Round Robin Match',
                ];

                if (count($aiGames) >= $expectedGames) {
                    break;
                }
            }

            if ($aiGames !== []) {
                return $aiGames;
            }
        } catch (Throwable) {
        }

        return $this->fallbackBracket($orderedTeams, $tournament);
    }

    /**
     * @param  Collection<int, Team>  $teams
     * @return array<int, array<string, int|string>>
     */
    public function generateRandomized(Tournament $tournament, Collection $teams): array
    {
        return $this->fallbackBracket($teams->shuffle()->values(), $tournament);
    }

    /**
     * @param  array<string, mixed>  $game
     * @param  Collection<int, Team>  $teams
     */
    protected function isValidGame(array $game, Collection $teams): bool
    {
        $teamIds = $teams->pluck('id');

        return isset($game['team_a_id'], $game['team_b_id'], $game['scheduled_at'])
            && $teamIds->contains((int) $game['team_a_id'])
            && $teamIds->contains((int) $game['team_b_id'])
            && (int) $game['team_a_id'] !== (int) $game['team_b_id'];
    }

    /**
     * @param  Collection<int, Team>  $teams
     * @return array<int, array<string, int|string>>
     */
    protected function fallbackBracket(Collection $teams, Tournament $tournament): array
    {
        $teamArray = $teams->values()->all();
        $teamCount = count($teamArray);
        if ($teamCount % 2 !== 0) {
            $teamArray[] = null;
            $teamCount++;
        }

        $scheduledAt = Carbon::parse($tournament->start_date ?? now())
            ->startOfDay()
            ->setHour(9)
            ->setMinute(0);
        $games = [];
        $matchNumber = 1;
        $totalRounds = $teamCount - 1;
        $half = $teamCount / 2;

        $indices = array_keys($teamArray);
        array_shift($indices);

        for ($round = 0; $round < $totalRounds; $round++) {

            $teamIdx2 = $indices[$round % count($indices)];
            if ($teamArray[0] !== null && $teamArray[$teamIdx2] !== null) {
                $games[] = [
                    'team_a_id' => $teamArray[0]->id,
                    'team_b_id' => $teamArray[$teamIdx2]->id,
                    'scheduled_at' => $scheduledAt->copy()->addMinutes(($matchNumber - 1) * 90)->toDateTimeString(),
                    'court_name' => $this->courtName($matchNumber),
                    'group_name' => 'Round '.($round + 1),
                ];
                $matchNumber++;
            }

            for ($i = 1; $i < $half; $i++) {
                $firstIdx = ($round + $i) % count($indices);
                $secondIdx = ($round + count($indices) - $i) % count($indices);
                $t1 = $teamArray[$indices[$firstIdx]];
                $t2 = $teamArray[$indices[$secondIdx]];

                if ($t1 !== null && $t2 !== null) {
                    $games[] = [
                        'team_a_id' => $t1->id,
                        'team_b_id' => $t2->id,
                        'scheduled_at' => $scheduledAt->copy()->addMinutes(($matchNumber - 1) * 90)->toDateTimeString(),
                        'court_name' => $this->courtName($matchNumber),
                        'group_name' => 'Round '.($round + 1),
                    ];
                    $matchNumber++;
                }
            }

            // Move to the next day for the next round
            $scheduledAt->addDay();
            $matchNumber = 1; // reset time spacing for new day
        }

        return $games;
    }

    protected function roundName(int $teamCount, int $matchNumber): string
    {
        return 'Round Robin Match';
    }

    protected function courtName(int $matchNumber): string
    {
        return $matchNumber % 2 === 0 ? 'Court B' : 'Court A';
    }
}
