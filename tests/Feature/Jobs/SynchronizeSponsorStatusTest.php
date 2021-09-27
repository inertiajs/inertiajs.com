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
use Illuminate\Support\Facades\Http;
use Tests\Fixtures\HttpFakes;
use Tests\TestCase;

class SynchronizeSponsorStatusTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Event::fake([UserStartedSponsoring::class, UserStoppedSponsoring::class]);
    }

    /** @test */
    public function the_user_started_sponsoring_directly(): void
    {
        HttpFakes::githubSponsorsInvalidTokenError();
        $user = User::factory()->withGithub()->create();
        $sponsor = Sponsor::factory()->create(['github_api_id' => $user->github_api_id]);
        $this->assertNull($user->sponsor);

        SynchronizeSponsorStatus::dispatch($user);

        $this->assertTrue($user->fresh()->sponsor->is($sponsor));
        Event::assertDispatched(UserStartedSponsoring::class, fn ($event) => $event->user->is($user));
        Event::assertNotDispatched(UserStoppedSponsoring::class);
    }

    /** @test */
    public function the_user_stopped_sponsoring_directly(): void
    {
        HttpFakes::githubSponsorsInvalidTokenError();
        $user = User::factory()->withGithub()->sponsoring(['expires_at' => now()])->create();
        $this->assertNotNull($user->sponsor);

        SynchronizeSponsorStatus::dispatch($user);

        $this->assertNull($user->fresh()->sponsor);
        Event::assertNotDispatched(UserStartedSponsoring::class);
        Event::assertDispatched(UserStoppedSponsoring::class, fn ($event) => $event->user->is($user));
    }

    /** @test */
    public function it_does_nothing_when_the_user_is_not_a_sponsor(): void
    {
        $user = User::factory()->withGithub()->create();

        SynchronizeSponsorStatus::dispatch($user);

        $this->assertNull($user->fresh()->sponsor);
        Event::assertNothingDispatched();
    }

    /** @test */
    public function it_does_nothing_when_the_user_is_already_a_sponsor(): void
    {
        HttpFakes::githubSponsorsViewerIsSponsoringUser();
        $user = User::factory()->withGithub()->sponsoring()->create();
        $sponsor = $user->sponsor;

        SynchronizeSponsorStatus::dispatch($user);

        $this->assertTrue($user->fresh()->sponsor->is($sponsor));
        Event::assertNothingDispatched();
    }

    /** @test */
    public function the_user_started_sponsoring_through_an_organization(): void
    {
        HttpFakes::githubOrganizations();
        $sponsor = Sponsor::factory()->organization()->create();
        $user = User::factory()->withGithub()->create();

        SynchronizeSponsorStatus::dispatch($user);

        $this->assertTrue($user->fresh()->sponsor->is($sponsor));
        Event::assertDispatched(UserStartedSponsoring::class, fn ($event) => $event->user->is($user));
        Event::assertNotDispatched(UserStoppedSponsoring::class);
    }

    /** @test */
    public function the_user_cannot_sponsor_through_an_organization_when_github_access_was_revoked(): void
    {
        HttpFakes::githubSponsorsInvalidTokenError();
        Sponsor::factory()->organization()->create();
        $user = User::factory()->withGithub()->create();

        SynchronizeSponsorStatus::dispatch($user);

        $this->assertNull($user->sponsor);
        Event::assertNothingDispatched();
    }

    /** @test */
    public function the_user_stopped_sponsoring_through_an_organization(): void
    {
        HttpFakes::githubOrganizations();
        $sponsor = Sponsor::factory()->organization()->create(['expires_at' => now()]);
        $user = User::factory()->withGithub()->create(['sponsor_id' => $sponsor->id]);
        $this->assertTrue($user->sponsor->is($sponsor));

        SynchronizeSponsorStatus::dispatch($user);

        $this->assertNull($user->fresh()->sponsor);
        Event::assertNotDispatched(UserStartedSponsoring::class);
        Event::assertDispatched(UserStoppedSponsoring::class, fn ($event) => $event->user->is($user));
    }

    /** @test */
    public function the_user_silently_switches_sponsor_when_one_of_their_organizations_stopped_sponsoring_but_another_still_is(): void
    {
        HttpFakes::githubOrganizations();
        $sponsorA = Sponsor::factory()->create(['github_api_id' => 39676034, 'expires_at' => now()]);
        $sponsorB = Sponsor::factory()->create(['github_api_id' => 958072]);
        $user = User::factory()->withGithub()->create(['sponsor_id' => $sponsorA]);
        $this->assertTrue($user->sponsor->is($sponsorA));

        SynchronizeSponsorStatus::dispatch($user);

        $this->assertTrue($user->fresh()->sponsor->is($sponsorB));
        Event::assertNothingDispatched();
    }
}
