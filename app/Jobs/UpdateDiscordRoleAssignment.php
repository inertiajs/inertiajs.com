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

    public DiscordUser $discordUser;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(DiscordUser $discordUser)
    {
        $this->discordUser = $discordUser;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $noGithubAccount = is_null($this->discordUser->github_login);
        $hasSponsorRole = $this->discordUser->has_sponsor_role;

        // Github Account Unlinked.
        if ($noGithubAccount && $hasSponsorRole) {
            return $this->revokeSponsorRole();
        }

        // No Github Account, and not a sponsor.
        if ($noGithubAccount) {
            return;
        }

        /** @var ?GithubSponsor $githubSponsor */
        $githubSponsor = optional($this->discordUser->githubUser)->githubSponsor;
        $isSponsoring = optional($githubSponsor)->sponsoring ?? false;

        // Existing Sponsor
        if ($isSponsoring && $hasSponsorRole) {
            return;
        }

        // New Sponsor
        if ($isSponsoring && ! $hasSponsorRole) {
            return $this->assignSponsorRole();
        }

        // Sponsorship Cancelled
        if (! $isSponsoring && $hasSponsorRole) {
            return $this->revokeSponsorRole();
        }
    }

    protected function assignSponsorRole(): void
    {
        $this->discordUser->has_sponsor_role = true;

        Discord::asBot()->assignSponsorRole($this->discordUser);

        $this->discordUser->save();
    }

    protected function revokeSponsorRole(): void
    {
        $this->discordUser->has_sponsor_role = false;

        Discord::asBot()->revokeSponsorRole($this->discordUser);

        $this->discordUser->save();
    }
}
