<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DiscordUser extends Model
{
    use HasFactory;

    /**
     * Indicates if all mass assignment is enabled.
     *
     * @var bool
     */
    protected static $unguarded = true;

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'has_sponsor_role' => 'boolean',
    ];

    /**
     * Only include Discord Users with an active connection.
     *
     * @param Builder $query
     * @return Builder
     */
    public function scopeActive(Builder $query)
    {
        return $query->whereNotNull('discord_api_refresh_token');
    }

    /**
     * The Github User that this Discord User is connected to.
     *
     * @return BelongsTo
     */
    public function githubUser(): BelongsTo
    {
        return $this->belongsTo(GithubUser::class, 'github_login', 'github_api_login');
    }
}
