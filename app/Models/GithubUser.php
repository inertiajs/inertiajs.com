<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GithubUser extends Model
{
    use HasFactory;

    /**
     * Indicates if all mass assignment is enabled.
     *
     * @var bool
     */
    protected static $unguarded = true;

    /**
     * The Discord Users that have this Github User as a connected account.
     *
     * @return HasMany
     */
    public function discordUsers(): HasMany
    {
        return $this->hasMany(DiscordUser::class, 'github_login', 'github_api_login');
    }

    /**
     * The Github Sponsor that this Github User is sponsoring through.
     *
     * @return BelongsTo
     */
    public function githubSponsor(): BelongsTo
    {
        return $this->belongsTo(GithubSponsor::class);
    }
}
