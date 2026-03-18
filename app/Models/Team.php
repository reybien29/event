<?php

namespace App\Models;

use Database\Factories\TeamFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Team extends Model
{
    /** @use HasFactory<TeamFactory> */
    use HasFactory;

    protected $fillable = [
        'division_id',
        'name',
        'coach_name',
        'contact_number',
        'logo',
        'status',
        'payment_reference',
    ];

    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class);
    }

    public function players(): HasMany
    {
        return $this->hasMany(Player::class);
    }

    public function standings(): HasOne
    {
        return $this->hasOne(Standing::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }
}
