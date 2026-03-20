<?php

namespace App\Ai\Agents;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Promptable;

class SchedulerAgent implements Agent, HasStructuredOutput
{
    use Promptable;

    public function instructions(): string
    {
        return 'You are an expert sports tournament scheduler. Generate a balanced basketball schedule.';
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'games' => $schema->array()->items(
                $schema->object([
                    'tournament_id' => $schema->integer()->required(),
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
