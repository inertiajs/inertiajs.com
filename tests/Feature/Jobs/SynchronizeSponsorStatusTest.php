<?php

namespace Tests\Feature\Jobs;

use App\Events\UserStartedSponsoring;
use App\Jobs\SynchronizeSponsorStatus;
use App\Models\Sponsor;
use App\Models\User;
use Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Fixtures\HttpFakes;
use Tests\TestCase;

class SynchronizeSponsorStatusTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function the_user_has_started_sponsoring(): void
    {
        Event::fake(UserStartedSponsoring::class);
        HttpFakes::githubSponsorsViewerIsSponsoringUser();
        $user = User::factory()->claudiodekker()->create();
        $this->assertNull($user->sponsor);

        SynchronizeSponsorStatus::dispatch($user);

        tap($user->fresh()->sponsor, function (Sponsor $sponsor) use ($user) {
            $this->assertSame($user->github_api_id, $sponsor->github_api_id);
        });
        Event::assertDispatched(UserStartedSponsoring::class, function ($event) use ($user) {
            return $event->user->is($user);
        });
    }
}
