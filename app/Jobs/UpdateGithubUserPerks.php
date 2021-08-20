<?php

namespace App\Jobs;

use App\Models\DiscordUser;
use App\Models\GithubUser;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateGithubUserPerks implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public GithubUser $githubUser;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(GithubUser $githubUser)
    {
        $this->githubUser = $githubUser;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->githubUser->discordUsers->each(function (DiscordUser $discordUser) {
            dispatch(new UpdateDiscordRoleAssignment($discordUser));
        });
    }
}
