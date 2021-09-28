<?php

namespace App\Jobs;

use App\Events\UserStartedSponsoring;
use App\Events\UserStoppedSponsoring;
use App\Models\Sponsor;
use App\Models\User;
use App\Services\Github\Exceptions\BadCredentialsException;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SynchronizeSponsorStatus implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var User
     */
    public $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user)
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
        $user = $this->user;
        $sponsor = $this->getSponsor();

        // Do nothing when the user is not a sponsor.
        if (! $sponsor && ! $user->sponsor) {
            return;
        }

        // Do nothing when the user is already a sponsor.
        if ($user->hasActiveSponsor()) {
            return;
        }

        // Silently switch sponsorship.
        if ($sponsor && $user->sponsor) {
            $user->sponsor_id = $sponsor->id;
            $user->save();

            return;
        }

        if ($sponsor) {
            $user->sponsor_id = $sponsor->id;
            $user->save();

            UserStartedSponsoring::dispatch($user);
        } else {
            $user->sponsor_id = null;
            $user->save();

            UserStoppedSponsoring::dispatch($user);
        }
    }

    protected function getSponsor(): ?Sponsor
    {
        $sponsor = Sponsor::firstWhere('github_api_id', $this->user->github_api_id);
        if (! $sponsor) {
            $sponsor = $this->temporarilyCreateSponsorWhenSponsoringDirectly();
        }

        if ($sponsor && ! $sponsor->has_expired) {
            return $sponsor;
        }

        try {
            return Sponsor::query()
                ->whereIn('github_api_id', $this->user->getGithubOrganizationIds())
                ->get()
                ->first(fn (Sponsor $sponsor) => ! $sponsor->has_expired);
        } catch (BadCredentialsException $exception) {
            return null;
        }
    }

    /**
     * This function was temporarily added to make sure existing sponsors don't lose
     * their sponsorship, due to the fact that all of their Github Webhook events
     * never had an opportunity to be observed by this system.
     *
     * Unfortunately, this only works for DIRECT SPONSORS and NOT for Organization
     * sponsors, but there's only a handful of those, meaning we can manually
     * re-insert those into our database as we have done until now.
     *
     * @return Sponsor|null
     */
    private function temporarilyCreateSponsorWhenSponsoringDirectly(): ?Sponsor
    {
        try {
            if ($this->user->isGithubSponsor()) {
                return Sponsor::create(['github_api_id' => $this->user->github_api_id]);
            }
        } catch (BadCredentialsException $exception) {
            //
        }

        return null;
    }
}
