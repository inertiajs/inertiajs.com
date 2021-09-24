<?php

namespace App\Models;

use App\Services\Github\Api as GithubApi;
use App\Services\Github\Exceptions\BadCredentialsException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'github_api_id',
        'github_api_login',
        'github_api_access_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'github_api_access_token',
    ];

    /**
     * The Sponsor of this User.
     *
     * @return BelongsTo
     */
    public function sponsor(): BelongsTo
    {
        return $this->belongsTo(Sponsor::class);
    }

    /**
     * Whether the User has a Sponsor that isn't expired.
     */
    public function hasActiveSponsor()
    {
        if (! $this->sponsor) {
            return false;
        }

        return ! $this->sponsor->has_expired;
    }

    /**
     * The User's Discord Connection.
     *
     * @return HasOne
     */
    public function discordUser(): HasOne
    {
        return $this->hasOne(DiscordUser::class);
    }

    /**
     * Determine whether the User is currently a Github Sponsor.
     *
     * @return bool
     * @throws BadCredentialsException
     */
    public function isGithubSponsor(): bool
    {
        return app(GithubApi::class)->isSponsoring(
            config('services.github.sponsor_target'),
            $this->github_api_access_token,
        );
    }

    /**
     * The Github Organization ID's the User is part of.
     *
     * @return array
     * @throws BadCredentialsException
     */
    public function getGithubOrganizationIds(): array
    {
        return app(GithubApi::class)->organizationIds(
            $this->github_api_access_token
        );
    }
}
