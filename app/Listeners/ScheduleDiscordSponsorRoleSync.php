<?php

namespace App\Listeners;

use App\Events\DiscordConnectionUpdated;
use App\Events\UserStartedSponsoring;
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
     * @param  DiscordConnectionUpdated|UserStartedSponsoring  $event
     * @return void
     */
    public function handle($event)
    {
        if ($event instanceof DiscordConnectionUpdated) {
            dispatch(new SynchronizeDiscordSponsorRole($event->discordUser));
        } elseif ($event->user->discordUser) {
            dispatch(new SynchronizeDiscordSponsorRole($event->user->discordUser));
        }
    }
}
