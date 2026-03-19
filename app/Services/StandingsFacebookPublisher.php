<?php

namespace App\Services;

use App\Models\Division;
use App\Models\Team;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class StandingsFacebookPublisher
{
    /**
     * @return array<int, array<string, int|float|string|null>>
     */
    public function standingsSnapshot(Division $division): array
    {
        $division->loadMissing([
            'tournament',
            'teams' => fn ($query) => $query
                ->with('standings')
                ->orderBy('name'),
        ]);

        return $division->teams
            ->map(function (Team $team): array {
                $standing = $team->standings;
                $wins = (int) ($standing?->wins ?? 0);
                $losses = (int) ($standing?->losses ?? 0);
                $draws = (int) ($standing?->draws ?? 0);

                return [
                    'team_id' => $team->id,
                    'team_name' => $team->name,
                    'group_name' => $standing?->group_name,
                    'wins' => $wins,
                    'losses' => $losses,
                    'draws' => $draws,
                    'points' => (int) ($standing?->points ?? 0),
                    'quotient' => (float) ($standing?->quotient ?? 0),
                    'played' => $wins + $losses + $draws,
                ];
            })
            ->sort(function (array $left, array $right): int {
                return ($right['points'] <=> $left['points'])
                    ?: ($right['quotient'] <=> $left['quotient'])
                    ?: ($right['wins'] <=> $left['wins'])
                    ?: strcmp((string) $left['team_name'], (string) $right['team_name']);
            })
            ->values()
            ->all();
    }

    public function buildDivisionMessage(Division $division): string
    {
        $standings = $this->standingsSnapshot($division);

        if ($standings === []) {
            throw new RuntimeException('No team standings are available for this division yet.');
        }

        $heading = $division->tournament?->name
            ? "{$division->tournament->name} Standings Update"
            : 'Standings Update';

        $lines = [
            $heading,
            "Division: {$division->name}",
            '',
        ];

        foreach ($standings as $index => $standing) {
            $record = "{$standing['wins']}-{$standing['losses']}";

            if ((int) $standing['draws'] > 0) {
                $record .= "-{$standing['draws']}";
            }

            $groupSuffix = $standing['group_name']
                ? " | {$standing['group_name']}"
                : '';

            $lines[] = sprintf(
                '%d. %s | %s | %d pts | Quotient %.4f%s',
                $index + 1,
                $standing['team_name'],
                $record,
                $standing['points'],
                $standing['quotient'],
                $groupSuffix,
            );
        }

        return implode("\n", $lines);
    }

    public function publishDivisionStandings(Division $division): void
    {
        $pageId = (string) config('services.facebook.page_id', '');
        $pageAccessToken = (string) config('services.facebook.page_access_token', '');
        $graphVersion = (string) config('services.facebook.graph_version', 'v23.0');

        if ($pageId === '' || $pageAccessToken === '') {
            throw new RuntimeException('Configure FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN before posting standings.');
        }

        try {
            Http::asForm()
                ->timeout(15)
                ->post("https://graph.facebook.com/{$graphVersion}/{$pageId}/feed", [
                    'message' => $this->buildDivisionMessage($division),
                    'access_token' => $pageAccessToken,
                ])
                ->throw();
        } catch (RequestException $exception) {
            $message = $exception->response?->json('error.message')
                ?? 'Facebook rejected the standings post.';

            throw new RuntimeException($message, previous: $exception);
        }
    }
}
