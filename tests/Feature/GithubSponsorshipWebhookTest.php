<?php

namespace Tests\Feature;

use App\Events\UserStartedSponsoring;
use App\Events\UserStoppedSponsoring;
use App\Models\Sponsor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use LogicException;
use Tests\TestCase;

class GithubSponsorshipWebhookTest extends TestCase
{
    use RefreshDatabase;

    protected function getSponsorsPayload($filename): array
    {
        if (! file_exists(base_path("tests/__fixtures/github-sponsors-webhook/${filename}.json"))) {
            throw new LogicException('Fixture does not exist.');
        }

        $json = file_get_contents(base_path("tests/__fixtures/github-sponsors-webhook/${filename}.json"));

        return json_decode($json, true, 512, JSON_THROW_ON_ERROR);
    }

    /** @test */
    public function someone_started_sponsoring(): void
    {
        Event::fake(UserStartedSponsoring::class);

        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('created'));

        $response->assertNoContent();
        $this->assertCount(1, Sponsor::all());
        tap(Sponsor::first(), function (Sponsor $sponsor) {
            $this->assertSame(2871897, $sponsor->github_api_id);
            $this->assertFalse($sponsor->has_expired);
        });
        Event::assertNothingDispatched();
    }

    /** @test */
    public function a_known_user_started_sponsoring(): void
    {
        Event::fake(UserStartedSponsoring::class);
        $user = User::factory()->expiredSponsor()->create(['github_api_id' => 2871897]);

        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('created'));

        $response->assertNoContent();
        $this->assertCount(1, Sponsor::all());
        tap($user->sponsor, function (Sponsor $sponsor) {
            $this->assertSame(2871897, $sponsor->github_api_id);
            $this->assertFalse($sponsor->has_expired);
        });
        Event::assertDispatched(UserStartedSponsoring::class, fn ($event) => $event->user->is($user));
    }

    /** @test */
    public function a_known_user_stopped_sponsoring(): void
    {
        Event::fake(UserStoppedSponsoring::class);
        $user = User::factory()->sponsoring()->create(['github_api_id' => 39676034]);

        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('cancelled'));

        $response->assertNoContent();
        $this->assertCount(1, Sponsor::all());
        tap($user->sponsor, function (Sponsor $sponsor) {
            $this->assertSame(39676034, $sponsor->github_api_id);
            $this->assertTrue($sponsor->has_expired);
        });
        Event::assertDispatched(UserStoppedSponsoring::class, fn ($event) => $event->user->is($user));
    }

    /** @test */
    public function it_does_nothing_when_someone_unknown_stopped_sponsoring(): void
    {
        Event::fake([UserStartedSponsoring::class, UserStoppedSponsoring::class]);

        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('cancelled'));

        $response->assertNoContent();
        $this->assertCount(0, Sponsor::all());
        Event::assertNothingDispatched();
    }
}
