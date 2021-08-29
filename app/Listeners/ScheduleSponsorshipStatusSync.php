<?php

namespace App\Listeners;

use App\Events\GithubCredentialsUpdated;
use App\Jobs\SynchronizeSponsorStatus;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ScheduleSponsorshipStatusSync
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  GithubCredentialsUpdated  $event
     * @return void
     */
    public function handle(GithubCredentialsUpdated $event)
    {
        dispatch(new SynchronizeSponsorStatus($event->user));
    }
}
