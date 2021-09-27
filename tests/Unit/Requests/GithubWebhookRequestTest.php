<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\GithubWebhookRequest;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class GithubWebhookRequestTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Route::post('/github-webhook-request-test', function (GithubWebhookRequest $request) {
            //
        });
    }

    /** @test */
    public function the_request_must_be_json(): void
    {
        $response = $this->post('/github-webhook-request-test', []);

        $response->assertStatus(415);
    }

    /** @test */
    public function it_allows_the_request_when_a_webhook_secret_is_configured_and_the_correct_header_was_provided(): void
    {
        config(['services.github.webhook_secret' => 'secret']);
        $payload = [];
        $headers = ['X-Hub-Signature-256' => 'sha256='.hash_hmac('sha256', json_encode($payload), 'secret')];

        $response = $this->postJson('/github-webhook-request-test', $payload, $headers);

        $response->assertOk();
    }

    /** @test */
    public function it_blocks_the_request_when_a_webhook_secret_is_configured_but_no_header_was_provided(): void
    {
        config(['services.github.webhook_secret' => 'secret']);

        $response = $this->postJson('/github-webhook-request-test', []);

        $response->assertForbidden();
    }

    /** @test */
    public function it_blocks_the_request_when_a_webhook_secret_is_configured_but_an_incorrect_header_was_provided(): void
    {
        config(['services.github.webhook_secret' => 'secret']);
        $payload = [];
        $headers = ['X-Hub-Signature-256' => 'github-webhook-request-test'];

        $response = $this->postJson('/github-webhook-request-test', $payload, $headers);

        $response->assertForbidden();
    }
}
