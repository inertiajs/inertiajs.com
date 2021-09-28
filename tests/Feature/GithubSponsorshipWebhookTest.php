<?php

namespace Tests\Feature;

use App\Http\Requests\GithubWebhookRequest;
use App\Jobs\SynchronizeSponsorStatus;
use App\Models\Sponsor;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
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
    public function it_uses_the_github_webhook_form_request(): void
    {
        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('created'));

        $response->assertUsesFormRequest(GithubWebhookRequest::class);
    }

    /** @test */
    public function someone_started_sponsoring(): void
    {
        Queue::fake();

        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('created'));

        $response->assertNoContent();
        $this->assertCount(1, Sponsor::all());
        tap(Sponsor::first(), function (Sponsor $sponsor) {
            $this->assertSame(2871897, $sponsor->github_api_id);
            $this->assertNull($sponsor->expires_at);
        });
        Queue::assertNothingPushed();
    }

    /** @test */
    public function someone_started_sponsoring_once(): void
    {
        Carbon::setTestNow('2021-01-01 00:00:00');
        Queue::fake();

        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('created-one_time'));

        $response->assertNoContent();
        $this->assertCount(1, Sponsor::all());
        tap(Sponsor::first(), function (Sponsor $sponsor) {
            $this->assertSame(39676034, $sponsor->github_api_id);
            $this->assertTrue(now()->addYear()->eq($sponsor->expires_at));
        });
        Queue::assertNothingPushed();
        Carbon::setTestNow();
    }

    /** @test */
    public function someone_stopped_sponsoring(): void
    {
        Carbon::setTestNow('2021-01-01 00:00:00');
        Queue::fake();
        $sponsor = Sponsor::factory()->organization()->create();
        $userA = User::factory()->create(['sponsor_id' => $sponsor->id]);
        $userB = User::factory()->withGithub()->create(['sponsor_id' => $sponsor->id]);

        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('cancelled'));

        $response->assertNoContent();
        $this->assertCount(1, Sponsor::all());
        $this->assertTrue(now()->eq($sponsor->fresh()->expires_at));
        Queue::assertPushed(SynchronizeSponsorStatus::class, fn ($event) => $event->user->is($userA));
        Queue::assertPushed(SynchronizeSponsorStatus::class, fn ($event) => $event->user->is($userB));
        Carbon::setTestNow();
    }

    /** @test */
    public function it_does_nothing_when_someone_unknown_stopped_sponsoring(): void
    {
        Queue::fake();
        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('cancelled'));

        $response->assertNoContent();
        $this->assertCount(0, Sponsor::all());
        Queue::assertNothingPushed();
    }

    /** @test */
    public function it_does_nothing_when_an_unsupported_event_was_received(): void
    {
        Queue::fake();

        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('pending_cancellation'));

        $response->assertUnprocessable();
        Queue::assertNothingPushed();
    }
}
