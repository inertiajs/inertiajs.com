<?php

namespace Tests\Feature;

use App\Events\UserStartedSponsoring;
use App\Events\UserStoppedSponsoring;
use App\Models\Sponsor;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use LogicException;
use Tests\TestCase;

class GithubSponsorshipWebhookTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['services.github.webhook_secret' => null]);
    }

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
            $this->assertNull($sponsor->expires_at);
        });
        Event::assertNothingDispatched();
    }

    /** @test */
    public function someone_started_sponsoring_once(): void
    {
        Carbon::setTestNow('2021-01-01 00:00:00');
        Event::fake(UserStartedSponsoring::class);

        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('created-one_time'));

        $response->assertNoContent();
        $this->assertCount(1, Sponsor::all());
        tap(Sponsor::first(), function (Sponsor $sponsor) {
            $this->assertSame(39676034, $sponsor->github_api_id);
            $this->assertTrue(now()->addMonth()->eq($sponsor->expires_at));
        });
        Event::assertNothingDispatched();
        Carbon::setTestNow();
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
            $this->assertNull($sponsor->expires_at);
        });
        Event::assertDispatched(UserStartedSponsoring::class, fn ($event) => $event->user->is($user));
    }

    /** @test */
    public function a_known_user_stopped_sponsoring(): void
    {
        Carbon::setTestNow('2021-01-01');
        Event::fake(UserStoppedSponsoring::class);
        $user = User::factory()->sponsoring()->create(['github_api_id' => 39676034]);

        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('cancelled'));

        $response->assertNoContent();
        $this->assertCount(1, Sponsor::all());
        tap($user->sponsor, function (Sponsor $sponsor) {
            $this->assertSame(39676034, $sponsor->github_api_id);
            $this->assertTrue(now()->eq($sponsor->expires_at));
        });
        Event::assertDispatched(UserStoppedSponsoring::class, fn ($event) => $event->user->is($user));
        Carbon::setTestNow();
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

    /** @test */
    public function it_does_nothing_when_an_unsupported_event_was_received(): void
    {
        Event::fake([UserStartedSponsoring::class, UserStoppedSponsoring::class]);

        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('pending_cancellation'));

        $response->assertUnprocessable();
    }

    /** @test */
    public function the_request_must_be_json(): void
    {
        $response = $this->post('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('created'));

        $response->assertStatus(415);
    }

    /** @test */
    public function it_blocks_the_request_when_a_webhook_secret_is_configured_but_no_header_was_provided(): void
    {
        config(['services.github.webhook_secret' => 'secret']);

        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('created'));

        $response->assertForbidden();
    }

    /** @test */
    public function it_blocks_the_request_when_a_webhook_secret_is_configured_but_an_incorrect_header_was_provided(): void
    {
        config(['services.github.webhook_secret' => 'secret']);
        $payload = $this->getSponsorsPayload('created');
        $headers = ['X-Hub-Signature-256' => 'foo'];

        $response = $this->postJson('/api/github/webhooks/sponsorship', $payload, $headers);

        $response->assertForbidden();
    }

    /** @test */
    public function it_allows_the_request_when_a_webhook_secret_is_configured_and_the_correct_header_was_provided(): void
    {
        config(['services.github.webhook_secret' => 'secret']);
        $payload = $this->getSponsorsPayload('created');
        $headers = ['X-Hub-Signature-256' => 'sha256='.hash_hmac('sha256', json_encode($payload), 'secret')];

        $response = $this->postJson('/api/github/webhooks/sponsorship', $payload, $headers);

        $response->assertNoContent();
    }
}
