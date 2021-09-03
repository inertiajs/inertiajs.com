<?php

namespace App\Models;

use App\Services\Github\Api as GithubApi;
use App\Services\Github\Exceptions\BadCredentialsException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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
}
