<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model
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
        'expires_at' => 'datetime',
        'has_expired' => 'boolean',
    ];

    /**
     * Whether the Sponsor has expired or not.
     */
    public function getHasExpiredAttribute(): bool
    {
        if (is_null($this->expires_at)) {
            return false;
        }

        return ! $this->expires_at->isFuture();
    }
}
