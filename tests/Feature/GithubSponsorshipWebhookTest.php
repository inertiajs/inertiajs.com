<?php

namespace Tests\Feature;

use App\Models\DiscordUser;
use App\Models\GithubSponsor;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use LogicException;
use Tests\TestCase;

class GithubSponsorshipWebhookTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Http::fake();
        config(['services.github.webhook_secret' => null]);
    }

    protected function getSponsorsPayload($filename): array
    {
        if (! file_exists(base_path("tests/__fixtures/github-sponsors/${filename}.json"))) {
            throw new LogicException('Fixture does not exist.');
        }

        $json = file_get_contents(base_path("tests/__fixtures/github-sponsors/${filename}.json"));

        return json_decode($json, true, 512, JSON_THROW_ON_ERROR);
    }

    /** @test */
    public function it_creates_the_sponsorship_and_assigns_the_sponsor_role_to_existing_discord_users(): void
    {
        $userA = DiscordUser::factory()->create(['github_login' => 'monalisa', 'has_sponsor_role' => false]);
        $userB = DiscordUser::factory()->create(['github_login' => 'monalisa', 'has_sponsor_role' => false]);
        $userC = DiscordUser::factory()->create(['github_login' => 'claudiodekker', 'has_sponsor_role' => false]);

        $this->post('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('created'))
            ->assertStatus(200);

        tap(GithubSponsor::where('login', 'monalisa')->first(), function ($sponsor) {
            $this->assertNotNull($sponsor);
            $this->assertNull($sponsor->cancelled_at);
        });
        $this->assertTrue($userA->fresh()->has_sponsor_role);
        $this->assertTrue($userB->fresh()->has_sponsor_role);
        $this->assertFalse($userC->fresh()->has_sponsor_role);
    }

    /** @test */
    public function it_cancels_the_sponsorship_and_revokes_the_sponsor_role_from_applicable_discord_users(): void
    {
        Carbon::setTestNow('2021-01-01 01:23:45');
        $userA = DiscordUser::factory()->create(['github_login' => 'monalisa', 'has_sponsor_role' => true]);
        $userB = DiscordUser::factory()->create(['github_login' => 'claudiodekker', 'has_sponsor_role' => true]);
        $sponsor = GithubSponsor::factory()->create(['login' => 'monalisa', 'cancelled_at' => null]);

        $this->post('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('cancelled'))
            ->assertStatus(200);

        $this->assertTrue($sponsor->fresh()->cancelled_at->is(now()));
        $this->assertFalse($userA->fresh()->has_sponsor_role);
        $this->assertTrue($userB->fresh()->has_sponsor_role);
        Carbon::setTestNow();
    }

    /** @test */
    public function it_creates_a_short_term_sponsorship_and_assigns_the_sponsor_role_to_existing_discord_users_when_an_one_time_sponsorship_is_made(): void
    {
        Carbon::setTestNow('2021-01-01 01:23:45');
        $userA = DiscordUser::factory()->create(['github_login' => 'monalisa', 'has_sponsor_role' => false]);
        $userB = DiscordUser::factory()->create(['github_login' => 'claudiodekker', 'has_sponsor_role' => false]);
        $sponsor = GithubSponsor::factory()->create([
            'login' => 'monalisa',
            'cancelled_at' => now()->subMonth(),
        ]);

        $this->post('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('created_one_time'))
            ->assertStatus(200);

        $this->assertTrue($sponsor->fresh()->cancelled_at->is(now()->addMonth()));
        $this->assertTrue($userA->fresh()->has_sponsor_role);
        $this->assertFalse($userB->fresh()->has_sponsor_role);
        Carbon::setTestNow();
    }

    /** @test */
    public function it_registers_the_cancellation_date_when_a_pending_cancellation_is_received(): void
    {
        Carbon::setTestNow('2019-01-01');
        $userA = DiscordUser::factory()->create(['github_login' => 'monalisa', 'has_sponsor_role' => true]);
        $userB = DiscordUser::factory()->create(['github_login' => 'claudiodekker', 'has_sponsor_role' => false]);
        $sponsor = GithubSponsor::factory()->create(['login' => 'monalisa', 'cancelled_at' => null]);

        $this->post('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('pending_cancellation'))
            ->assertStatus(200);

        $this->assertTrue($sponsor->fresh()->cancelled_at->is(Carbon::parse('2019-12-30T00:00:00+00:00')));
        $this->assertTrue($userA->fresh()->has_sponsor_role);
        $this->assertFalse($userB->fresh()->has_sponsor_role);
        Carbon::setTestNow();
    }

    /** @test */
    public function it_changes_to_a_short_term_sponsorship_when_the_tier_is_changed_to_an_one_time_sponsorship(): void
    {
        Carbon::setTestNow('2019-01-01');
        $userA = DiscordUser::factory()->create(['github_login' => 'monalisa', 'has_sponsor_role' => true]);
        $userB = DiscordUser::factory()->create(['github_login' => 'claudiodekker', 'has_sponsor_role' => false]);
        $sponsor = GithubSponsor::factory()->create(['login' => 'monalisa', 'cancelled_at' => null]);

        $this->post('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('pending_tier_change_to_one_time'))
            ->assertStatus(200);

        $this->assertTrue($sponsor->fresh()->cancelled_at->is(Carbon::parse('2019-12-30T00:00:00+00:00')->addMonth()));
        $this->assertTrue($userA->fresh()->has_sponsor_role);
        $this->assertFalse($userB->fresh()->has_sponsor_role);
        Carbon::setTestNow();
    }

    /** @test */
    public function it_changes_to_an_indefinite_sponsorship_when_the_tier_will_change_to_a_continuous_sponsorship(): void
    {
        Carbon::setTestNow('2019-01-01');
        $userA = DiscordUser::factory()->create(['github_login' => 'monalisa', 'has_sponsor_role' => true]);
        $userB = DiscordUser::factory()->create(['github_login' => 'claudiodekker', 'has_sponsor_role' => false]);
        $sponsor = GithubSponsor::factory()->create(['login' => 'monalisa', 'cancelled_at' => '2019-12-30 00:00:00']);

        $this->post('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('pending_tier_change'))
            ->assertStatus(200);

        $this->assertNull($sponsor->fresh()->cancelled_at);
        $this->assertTrue($userA->fresh()->has_sponsor_role);
        $this->assertFalse($userB->fresh()->has_sponsor_role);
        Carbon::setTestNow();
    }

    /** @test */
    public function it_changes_to_an_indefinite_sponsorship_when_the_tier_is_changed_to_a_continuous_sponsorship(): void
    {
        Carbon::setTestNow('2019-01-01');
        $userA = DiscordUser::factory()->create(['github_login' => 'monalisa', 'has_sponsor_role' => true]);
        $userB = DiscordUser::factory()->create(['github_login' => 'claudiodekker', 'has_sponsor_role' => false]);
        $sponsor = GithubSponsor::factory()->create(['login' => 'monalisa', 'cancelled_at' => '2019-12-30 00:00:00']);

        $this->post('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('tier_changed'))
            ->assertStatus(200);

        $this->assertNull($sponsor->fresh()->cancelled_at);
        $this->assertTrue($userA->fresh()->has_sponsor_role);
        $this->assertFalse($userB->fresh()->has_sponsor_role);
        Carbon::setTestNow();
    }

    /** @test */
    public function it_blocks_the_request_when_a_webhook_secret_is_set_and_an_incorrect_or_no_hash_header_is_used(): void
    {
        config(['services.github.webhook_secret' => 'secret']);

        $this->post('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('created'))
            ->assertStatus(403);

        $this->assertEmpty(GithubSponsor::all());
    }

    /** @test */
    public function it_allows_the_request_when_a_webhook_secret_is_set_and_the_correct_hash_header_is_used(): void
    {
        config(['services.github.webhook_secret' => 'secret']);
        $payload = $this->getSponsorsPayload('created');

        $headers = ['X-Hub-Signature-256' => 'sha256=' . hash_hmac('sha256', json_encode($payload), 'secret')];
        $this->postJson('/api/github/webhooks/sponsorship', $payload, $headers)
            ->assertStatus(200);

        $this->assertTrue(GithubSponsor::where('login', 'monalisa')->exists());
    }
}
