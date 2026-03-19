<?php

namespace App\Ai\Agents;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Promptable;
use Stringable;

class DivisionBracketAgent implements Agent, HasStructuredOutput
{
    use Promptable;

    /**
     * Get the instructions that the agent should follow.
     */
    public function instructions(): Stringable|string
    {
        return 'You generate first-round basketball elimination brackets. Return only valid team-vs-team pairings using the provided team IDs, never duplicate a team in more than one game, and always use "elimination" as the stage.';
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'games' => $schema->array()->items(
                $schema->object([
                    'division_id' => $schema->integer()->required(),
                    'team_a_id' => $schema->integer()->required(),
                    'team_b_id' => $schema->integer()->required(),
                    'scheduled_at' => $schema->string()->format('date-time')->required(),
                    'court_name' => $schema->string()->required(),
                    'stage' => $schema->string()->required(),
                ])
            )->required(),
        ];
    }
}
