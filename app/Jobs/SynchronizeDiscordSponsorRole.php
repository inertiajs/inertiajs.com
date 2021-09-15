<?php

namespace App\Jobs;

use App\Models\DiscordUser;
use App\Services\Discord\Bot as DiscordBot;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SynchronizeDiscordSponsorRole implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var DiscordUser
     */
    public $discordUser;

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
        $discordUser = $this->discordUser;
        $isSponsoring = $discordUser->user->hasActiveSponsor();

        if ($isSponsoring && ! $discordUser->has_sponsor_role) {
            $discordUser->has_sponsor_role = app(DiscordBot::class)->assignSponsorRole($discordUser->discord_api_id);
            $discordUser->save();
        }
    }
}
