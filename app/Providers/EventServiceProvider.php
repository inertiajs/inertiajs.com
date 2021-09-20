<?php

namespace App\Providers;

use App\Events\DiscordConnectionUpdated;
use App\Events\GithubCredentialsUpdated;
use App\Events\UserStartedSponsoring;
use App\Listeners\ScheduleDiscordSponsorRoleSync;
use App\Listeners\ScheduleSponsorshipStatusSync;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use SocialiteProviders\Discord\DiscordExtendSocialite;
use SocialiteProviders\GitHub\GitHubExtendSocialite;
use SocialiteProviders\Manager\SocialiteWasCalled;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        DiscordConnectionUpdated::class => [
            ScheduleDiscordSponsorRoleSync::class,
        ],
        GithubCredentialsUpdated::class => [
            ScheduleSponsorshipStatusSync::class,
        ],
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        SocialiteWasCalled::class => [
            DiscordExtendSocialite::class,
            GitHubExtendSocialite::class,
        ],
        UserStartedSponsoring::class => [
            ScheduleDiscordSponsorRoleSync::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
