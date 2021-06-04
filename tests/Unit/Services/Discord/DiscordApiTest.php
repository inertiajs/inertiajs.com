<?php

namespace Tests\Unit\Services\Discord;

use App\Models\DiscordUser;
use App\Services\Discord\DiscordApi;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class DiscordApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_does_not_automatically_renew_tokens_if_the_access_token_is_still_valid(): void
    {
        Http::fake([
            'https://discord.com/api/oauth2/token' => Http::response([]),
            'https://discord.com/api/fake-request' => Http::response([
                'status' => 'successful',
            ]),
        ]);

        $user = DiscordUser::factory()->create([
            'access_token' => 'access-token',
            'refresh_token' => 'refresh-token',
        ]);

        $response = DiscordApi::actingAs($user)->getJson('/fake-request');

        Http::assertSentCount(1);
        $this->assertEquals('successful', $response['status']);
    }

    /** @test */
    public function it_automatically_renews_tokens_and_retries_the_request_when_the_access_token_is_expired(): void
    {
        Http::fake([
            'https://discord.com/api/oauth2/token' => Http::response([
                'access_token' => 'new-access-token',
                'token_type' => 'Bearer',
                'expires_in' => 604800,
                'refresh_token' => 'new-refresh-token',
                'scope' => 'identify',
            ]),
            'https://discord.com/api/fake-request' => Http::sequence()
                ->push('unauthorized', 401)
                ->push(['status' => 'successful']),
        ]);

        $user = DiscordUser::factory()->create([
            'access_token' => 'old-access-token',
            'refresh_token' => 'old-refresh-token',
        ]);

        $response = DiscordApi::actingAs($user)->getJson('/fake-request');

        Http::assertSentCount(3);
        $this->assertEquals('successful', $response['status']);
        tap($user->fresh(), function (DiscordUser $user) {
            $this->assertEquals('new-access-token', $user->access_token);
            $this->assertEquals('new-refresh-token', $user->refresh_token);
        });
    }

    /** @test */
    public function it_throws_an_exception_if_it_could_not_automatically_renew_the_access_token(): void
    {
        Http::fake([
            'https://discord.com/api/oauth2/token' => Http::response('invalid-token', 401),
            'https://discord.com/api/fake-request' => Http::response('unauthorized', 401),
        ]);

        $user = DiscordUser::factory()->create([
            'access_token' => 'old-access-token',
            'refresh_token' => 'old-refresh-token',
        ]);

        try {
            DiscordApi::actingAs($user)->getJson('/fake-request');
        } catch (RequestException $exception) {
            Http::assertSentCount(2);
            $this->assertEquals('invalid-token', $exception->response->body());
            tap($user->fresh(), function (DiscordUser $user) {
                $this->assertEquals('old-access-token', $user->access_token);
                $this->assertEquals('old-refresh-token', $user->refresh_token);
            });

            return;
        }

        $this->fail('RequestException was expected.');
    }

    /** @test */
    public function it_throws_an_exception_when_the_user_does_not_have_access_to_the_resource(): void
    {
        Http::fake([
            'https://discord.com/api/oauth2/token' => Http::response([
                'access_token' => 'new-access-token',
                'token_type' => 'Bearer',
                'expires_in' => 604800,
                'refresh_token' => 'new-refresh-token',
                'scope' => 'identify',
            ]),
            'https://discord.com/api/fake-request' => Http::response('unauthorized', 401),
        ]);

        $user = DiscordUser::factory()->create([
            'access_token' => 'old-access-token',
            'refresh_token' => 'old-refresh-token',
        ]);

        try {
            DiscordApi::actingAs($user)->getJson('/fake-request');
        } catch (RequestException $exception) {
            Http::assertSentCount(3);
            $this->assertEquals('unauthorized', $exception->response->body());
            tap($user->fresh(), function (DiscordUser $user) {
                $this->assertEquals('new-access-token', $user->access_token);
                $this->assertEquals('new-refresh-token', $user->refresh_token);
            });

            return;
        }

        $this->fail('RequestException was expected.');
    }
}
