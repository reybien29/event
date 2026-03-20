<?php

namespace App\Models;

use Database\Factories\TournamentFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tournament extends Model
{
    /** @use HasFactory<TournamentFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'logo',
        'primary_color',
        'secondary_color',
        'start_date',
        'end_date',
        'prize_pool',
        'status',
    ];

    protected $appends = [
        'brand_color',
    ];

    public function teams(): HasMany
    {
        return $this->hasMany(Team::class);
    }

    public function games(): HasMany
    {
        return $this->hasMany(Game::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    protected function brandColor(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->primary_color,
        );
    }
}
