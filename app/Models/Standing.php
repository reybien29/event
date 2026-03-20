<?php

namespace App\Models;

use Database\Factories\StandingFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Standing extends Model
{
    /** @use HasFactory<StandingFactory> */
    use HasFactory;

    protected $fillable = [
        'team_id',
        'tournament_id',
        'group_name',
        'wins',
        'losses',
        'draws',
        'points',
        'quotient',
    ];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }
}
