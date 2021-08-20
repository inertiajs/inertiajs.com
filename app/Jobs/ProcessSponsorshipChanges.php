<?php

namespace App\Jobs;

use App\Models\GithubSponsor;
use App\Models\GithubUser;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessSponsorshipChanges implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public GithubSponsor $githubSponsor;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(GithubSponsor $githubSponsor)
    {
        $this->githubSponsor = $githubSponsor;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if (! $this->githubSponsor->is_organization) {
            GithubUser::firstOrCreate(
                ['github_api_id' => $this->githubSponsor->github_api_id],
                ['github_api_login' => $this->githubSponsor->github_api_login, 'github_sponsor_id' => $this->githubSponsor->id],
            );
        }

        $this->githubSponsor->githubUsers->each(function (GithubUser $githubUser) {
            dispatch(new UpdateGithubUserPerks($githubUser));
        });
    }
}
