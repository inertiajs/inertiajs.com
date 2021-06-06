<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GithubSponsor extends Model
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
        'cancelled_at' => 'datetime',
    ];

    /**
     * The Discord users that have this Github account connected to their profiles.
     *
     * @return HasMany
     */
    public function discordUsers(): HasMany
    {
        return $this->hasMany(DiscordUser::class, 'github_login', 'login');
    }
}
