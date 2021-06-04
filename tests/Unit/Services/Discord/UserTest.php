<?php

namespace Tests\Unit\Services\Discord;

use App\Models\DiscordUser;
use App\Services\Discord\Discord;
use App\Services\Discord\Exceptions\InvalidAuthorizationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'services.discord.client_id' => '012',
            'services.discord.client_secret' => '123',
        ]);
    }

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

        $response = Discord::asUser($user)->getJson('/fake-request');

        Http::assertSentCount(1);
        $this->assertEquals('successful', $response['status']);
    }

    /** @test */
    public function it_automatically_renews_the_tokens_and_retries_the_request_when_the_access_token_is_expired(): void
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

        $response = Discord::asUser($user)->getJson('/fake-request');

        Http::assertSentCount(3);
        Http::assertSent(function (Request $request) {
            return $request->isForm()
                && $request->method() === 'POST'
                && $request->url() === 'https://discord.com/api/oauth2/token'
                && $request->body() === 'client_id=012&client_secret=123&grant_type=refresh_token&refresh_token=old-refresh-token';
        });

        $this->assertEquals('successful', $response['status']);
        tap($user->fresh(), function (DiscordUser $user) {
            $this->assertEquals('new-access-token', $user->access_token);
            $this->assertEquals('new-refresh-token', $user->refresh_token);
        });
    }

    /** @test */
    public function it_automatically_renews_the_tokens_and_throws_an_exception_when_the_user_does_not_have_access_to_the_resource(): void
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
            Discord::asUser($user)->getJson('/fake-request');
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

    /** @test */
    public function it_clears_out_the_tokens_and_throws_an_exception_if_it_could_not_automatically_renew_the_access_token(): void
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
            Discord::asUser($user)->getJson('/fake-request');
        } catch (InvalidAuthorizationException $exception) {
            Http::assertSentCount(2);
            $this->assertEquals('invalid-token', $exception->originalException->response->body());
            tap($user->fresh(), function (DiscordUser $user) {
                $this->assertNull($user->access_token);
                $this->assertNull($user->refresh_token);
            });

            return;
        }

        $this->fail('RequestException was expected.');
    }
}
