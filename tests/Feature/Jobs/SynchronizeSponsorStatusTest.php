<?php

namespace Tests\Feature\Jobs;

use App\Events\UserStartedSponsoring;
use App\Events\UserStoppedSponsoring;
use App\Jobs\SynchronizeSponsorStatus;
use App\Models\Sponsor;
use App\Models\User;
use Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
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
            $this->assertFalse($sponsor->has_expired);
        });
        Event::assertDispatched(UserStartedSponsoring::class, function ($event) use ($user) {
            return $event->user->is($user);
        });
    }

    /** @test */
    public function the_user_has_stopped_sponsoring(): void
    {
        Carbon::setTestNow('2021-01-01');
        Event::fake(UserStoppedSponsoring::class);
        HttpFakes::githubSponsorsViewerIsNotSponsoringUser();
        $user = User::factory()->claudiodekker()->for(Sponsor::factory()->claudiodekker())->create();
        $this->assertNotNull($user->sponsor);

        SynchronizeSponsorStatus::dispatch($user);

        tap($user->fresh()->sponsor, function (Sponsor $sponsor) use ($user) {
            $this->assertSame($user->github_api_id, $sponsor->github_api_id);
            $this->assertTrue($sponsor->has_expired);
        });
        Event::assertDispatched(UserStoppedSponsoring::class, function ($event) use ($user) {
            return $event->user->is($user);
        });
        Carbon::setTestNow();
    }

    /** @test */
    public function it_does_nothing_when_the_user_is_already_sponsoring(): void
    {
        Event::fake([UserStartedSponsoring::class, UserStoppedSponsoring::class]);
        HttpFakes::githubSponsorsViewerIsSponsoringUser();
        $user = User::factory()->claudiodekker()->for(Sponsor::factory()->claudiodekker())->create();
        $this->assertNotNull($existingSponsor = $user->sponsor);

        SynchronizeSponsorStatus::dispatch($user);

        tap($user->fresh()->sponsor, function (Sponsor $sponsor) use ($user, $existingSponsor) {
            $this->assertTrue($sponsor->is($existingSponsor));
            $this->assertSame($user->github_api_id, $sponsor->github_api_id);
            $this->assertFalse($sponsor->has_expired);
        });
        Event::assertNothingDispatched();
    }

    /** @test */
    public function it_does_nothing_when_the_user_is_not_a_sponsor(): void
    {
        Event::fake([UserStartedSponsoring::class, UserStoppedSponsoring::class]);
        HttpFakes::githubSponsorsViewerIsNotSponsoringUser();
        $user = User::factory()->claudiodekker()->create();

        SynchronizeSponsorStatus::dispatch($user);

        $this->assertNull($user->fresh()->sponsor);
        Event::assertNothingDispatched();
    }

    /** @test */
    public function the_user_resumes_their_sponsorship(): void
    {
        Event::fake([UserStartedSponsoring::class]);
        HttpFakes::githubSponsorsViewerIsSponsoringUser();
        $user = User::factory()->claudiodekker()->for(Sponsor::factory()->claudiodekker())->create();
        $user->sponsor->update(['has_expired' => true]);

        SynchronizeSponsorStatus::dispatch($user);

        tap($user->fresh()->sponsor, function (Sponsor $sponsor) use ($user) {
            $this->assertSame($user->github_api_id, $sponsor->github_api_id);
            $this->assertFalse($sponsor->has_expired);
        });
        Event::assertDispatched(UserStartedSponsoring::class, fn ($event) => $event->user->is($user));
    }
}
