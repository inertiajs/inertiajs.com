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
        'is_organization' => 'bool',
    ];

    /**
     * Whether the Sponsorship is still active or not.
     *
     * @return bool
     */
    public function getSponsoringAttribute()
    {
        return is_null($this->cancelled_at) || $this->cancelled_at->isFuture();
    }

    /**
     * The Github Users that are benefiting from this Sponsorship.
     *
     * @return HasMany
     */
    public function githubUsers(): HasMany
    {
        return $this->hasMany(GithubUser::class);
    }
}
