<?php

namespace App\Jobs;

use App\Models\DiscordUser;
use App\Models\GithubSponsor;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessSponsorshipChanges implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public GithubSponsor $sponsor;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(GithubSponsor $sponsor)
    {
        $this->sponsor = $sponsor;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->sponsor->discordUsers->each(function (DiscordUser $user) {
            dispatch(new UpdateDiscordRoleAssignment($user));
        });
    }
}
