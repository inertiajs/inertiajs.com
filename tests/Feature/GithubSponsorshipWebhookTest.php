<?php

namespace Tests\Feature;

use App\Models\Sponsor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
        $response = $this->postJson('/api/github/webhooks/sponsorship', $this->getSponsorsPayload('created'));

        $response->assertNoContent();
        $this->assertCount(1, Sponsor::all());
        tap(Sponsor::first(), function (Sponsor $sponsor) {
            $this->assertSame(2871897, $sponsor->github_api_id);
            $this->assertFalse($sponsor->has_expired);
        });
    }
}
