<?php

namespace App\Jobs;

use App\Models\DiscordUser;
use App\Models\GithubSponsor;
use App\Services\Discord\Discord;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateDiscordRoleAssignment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public DiscordUser $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(DiscordUser $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Github Account Unlinked.
        if ($this->user->has_sponsor_role && is_null($this->user->github_account)) {
            return $this->revokeSponsorRole();
        }

        // No Github Account, and not a sponsor.
        if (is_null($this->user->github_account)) {
            return;
        }

        $isSponsoring = GithubSponsor::where('login', $this->user->github_account)
            ->where(fn ($query) => $query
                ->whereNull('cancelled_at')
                ->orWhere('cancelled_at', '>', now())
            )
            ->exists();

        // Existing Sponsor
        if ($isSponsoring && $this->user->has_sponsor_role) {
            return;
        }

        // New Sponsor
        if ($isSponsoring && ! $this->user->has_sponsor_role) {
            return $this->assignSponsorRole();
        }

        // Sponsorship Cancelled
        if (! $isSponsoring && $this->user->has_sponsor_role) {
            return $this->revokeSponsorRole();
        }
    }

    protected function assignSponsorRole(): void
    {
        $this->user->has_sponsor_role = true;

        Discord::asBot()->assignSponsorRole($this->user);

        $this->user->save();
    }

    protected function revokeSponsorRole(): void
    {
        $this->user->has_sponsor_role = false;

        Discord::asBot()->revokeSponsorRole($this->user);

        $this->user->save();
    }
}
