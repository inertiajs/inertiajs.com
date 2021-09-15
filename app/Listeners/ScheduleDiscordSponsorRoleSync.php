<?php

namespace App\Listeners;

use App\Events\DiscordConnectionUpdated;
use App\Jobs\SynchronizeDiscordSponsorRole;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ScheduleDiscordSponsorRoleSync
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
     * @param  DiscordConnectionUpdated  $event
     * @return void
     */
    public function handle(DiscordConnectionUpdated $event)
    {
        dispatch(new SynchronizeDiscordSponsorRole($event->discordUser));
    }
}
