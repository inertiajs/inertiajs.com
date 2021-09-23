<?php

namespace Tests\Feature;

use App\Events\UserStartedSponsoring;
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
}
