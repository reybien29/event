<?php

namespace App\Services;

use App\Ai\Agents\DivisionBracketAgent;
use App\Models\Division;
use App\Models\Team;
use App\Models\Tournament;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Throwable;

class DivisionBracketService
{
    /**
     * @param  Collection<int, Team>  $teams
     * @return array<int, array<string, int|string>>
     */
    public function generate(Division $division, Tournament $tournament, Collection $teams): array
    {
        $orderedTeams = $teams->sortBy('name')->values();
        $maxPairings = intdiv($orderedTeams->count(), 2);

        $prompt = sprintf(
            'Create first-round single-elimination bracket pairings with scheduled match times for division %s (ID %d). Use only these teams: %s. Tournament window: %s to %s. Use realistic courts like Court A or Court B. Return at most %d games.',
            $division->name,
            $division->id,
            $orderedTeams->map(fn (Team $team) => [
                'id' => $team->id,
                'name' => $team->name,
            ])->values()->toJson(),
            $tournament->start_date ?? now()->toDateString(),
            $tournament->end_date ?? now()->toDateString(),
            $maxPairings,
        );

        try {
            $response = (new DivisionBracketAgent)->prompt($prompt);
            $aiGames = [];
            $usedTeamIds = [];

            foreach (collect($response['games'] ?? [])->values() as $game) {
                if (! is_array($game) || ! $this->isValidGame($game, $orderedTeams)) {
                    continue;
                }

                $teamAId = (int) $game['team_a_id'];
                $teamBId = (int) $game['team_b_id'];

                if (in_array($teamAId, $usedTeamIds, true) || in_array($teamBId, $usedTeamIds, true)) {
                    continue;
                }

                $usedTeamIds[] = $teamAId;
                $usedTeamIds[] = $teamBId;

                $aiGames[] = [
                    'team_a_id' => $teamAId,
                    'team_b_id' => $teamBId,
                    'scheduled_at' => Carbon::parse($game['scheduled_at'])->toDateTimeString(),
                    'court_name' => $game['court_name'] ?: $this->courtName(count($aiGames) + 1),
                    'group_name' => $this->roundName($orderedTeams->count(), count($aiGames) + 1),
                ];

                if (count($aiGames) >= $maxPairings) {
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
        $remainingTeams = $teams->values();
        $scheduledAt = Carbon::parse($tournament->start_date ?? now())
            ->startOfDay()
            ->setHour(9)
            ->setMinute(0);
        $games = [];
        $matchNumber = 1;

        while ($remainingTeams->count() > 1) {
            $teamA = $remainingTeams->shift();
            $teamB = $remainingTeams->pop();

            if (! $teamA instanceof Team || ! $teamB instanceof Team) {
                break;
            }

            $games[] = [
                'team_a_id' => $teamA->id,
                'team_b_id' => $teamB->id,
                'scheduled_at' => $scheduledAt->copy()->addMinutes(($matchNumber - 1) * 90)->toDateTimeString(),
                'court_name' => $this->courtName($matchNumber),
                'group_name' => $this->roundName($teams->count(), $matchNumber),
            ];

            $matchNumber++;
        }

        return $games;
    }

    protected function roundName(int $teamCount, int $matchNumber): string
    {
        return match (true) {
            $teamCount <= 2 => 'Final',
            $teamCount <= 4 => "Semifinal {$matchNumber}",
            $teamCount <= 8 => "Quarterfinal {$matchNumber}",
            default => "Elimination Match {$matchNumber}",
        };
    }

    protected function courtName(int $matchNumber): string
    {
        return $matchNumber % 2 === 0 ? 'Court B' : 'Court A';
    }
}
