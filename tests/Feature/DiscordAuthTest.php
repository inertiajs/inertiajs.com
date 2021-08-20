<?php

namespace Tests\Feature;

use App\Models\DiscordUser;
use App\Models\GithubSponsor;
use App\Models\GithubUser;
use GuzzleHttp\Promise\PromiseInterface;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;
use SocialiteProviders\Manager\OAuth2\User;
use Tests\TestCase;

class DiscordAuthTest extends TestCase
{
    use RefreshDatabase;

    protected function mockSocialiteUserResponse(): void
    {
        $mockUser = (new User())
            ->setAccessTokenResponseBody([
                'access_token' => 'INVALIDxq3Ly5ca88vy9aUKjLIXdqr',
                'expires_in' => 604800,
                'refresh_token' => 'INVALIDb8yS0e3Iau0Pn6Q96yUHr9T',
                'scope' => 'identify connections',
                'token_type' => 'Bearer',
            ])
            ->setToken('INVALIDxq3Ly5ca88vy9aUKjLIXdqr')
            ->setRefreshToken('INVALIDb8yS0e3Iau0Pn6Q96yUHr9T')
            ->setExpiresIn(604800)
            ->setRaw([
                'id' => '696628666183975013',
                'username' => 'Claudio Dekker',
                'avatar' => '32fc945e99042ce4fc6117347cb9b5b7',
                'discriminator' => '3220',
                'public_flags' => 0,
                'flags' => 0,
                'locale' => 'en-GB',
                'mfa_enabled' => true,
            ])
            ->map([
                'id' => '696628666183975013',
                'nickname' => 'Claudio Dekker#3220',
                'name' => 'Claudio Dekker',
                'email' => null,
                'avatar' => 'https://cdn.discordapp.com/avatars/696628666183975013/32fc945e99042ce4fc6117347cb9b5b7.jpg',
            ]);

        Socialite::shouldReceive('driver->user')->andReturn($mockUser);
    }

    protected function fakeDiscordApiConnectionsResponseWithGithubConnection(): PromiseInterface
    {
        return Http::response([
            [
                'type' => 'github',
                'id' => '1752195',
                'name' => 'claudiodekker',
                'visibility' => 1,
                'friend_sync' => false,
                'show_activity' => true,
                'verified' => true,
            ],
            [
                'type' => 'twitter',
                'id' => '78721809',
                'name' => 'ClaudioDekker',
                'visibility' => 1,
                'friend_sync' => false,
                'show_activity' => true,
                'verified' => true,
            ],
        ]);
    }

    protected function fakeDiscordApiConnectionsResponseWithoutGithubConnection(): PromiseInterface
    {
        return Http::response([
            [
                'type' => 'twitter',
                'id' => '78721809',
                'name' => 'ClaudioDekker',
                'visibility' => 1,
                'friend_sync' => false,
                'show_activity' => true,
                'verified' => true,
            ],
        ]);
    }

    /** @test */
    public function it_redirects_to_discord_in_order_to_authorize(): void
    {
        Socialite::shouldReceive('driver->setScopes->redirect')->andReturn(Redirect::to('socialite-redirect.test'));

        $this->get('/discord/authorize')->assertRedirect('socialite-redirect.test');
    }

    /** @test */
    public function it_redirects_back_to_discord_when_the_authorization_callback_was_invalid(): void
    {
        Http::fake();
        Socialite::shouldReceive('driver->user')->andThrow(InvalidStateException::class);

        $this->get('/discord/authorize/callback?code=123&state=456')
            ->assertRedirect(URL::to('/discord/authorize'));

        Http::assertNothingSent();
        $this->assertEmpty(DiscordUser::all());
    }

    /** @test */
    public function it_assigns_the_sponsor_role_if_a_sponsorship_exists(): void
    {
        $this->mockSocialiteUserResponse();
        GithubUser::factory()->claudiodekker()->sponsoring()->create();
        Http::fake([
            'https://discord.com/api/users/@me/connections' => $this->fakeDiscordApiConnectionsResponseWithGithubConnection(),
            '*' => Http::response('Fake Response'),
        ]);

        $this->get('/discord/authorize/callback?code=123&state=456')
            ->assertRedirect('https://discord.com/channels/592327939920494592/592327939920494594');

        Http::assertSentCount(2);
        $user = DiscordUser::where('discord_api_id', 696628666183975013)->firstOrFail();
        $this->assertEquals('Claudio Dekker#3220', $user->discord_api_nickname);
        $this->assertEquals('INVALIDxq3Ly5ca88vy9aUKjLIXdqr', $user->discord_api_access_token);
        $this->assertEquals('INVALIDb8yS0e3Iau0Pn6Q96yUHr9T', $user->discord_api_refresh_token);
        $this->assertEquals('claudiodekker', $user->github_login);
        $this->assertTrue($user->has_sponsor_role);
    }

    /** @test */
    public function it_does_not_assign_the_sponsor_role_when_a_cancelled_sponsorship_exists(): void
    {
        $this->mockSocialiteUserResponse();
        GithubUser::factory()->claudiodekker()->cancelledSponsor()->create();
        Http::fake([
            'https://discord.com/api/users/@me/connections' => $this->fakeDiscordApiConnectionsResponseWithGithubConnection(),
            '*' => Http::response('Fake Response'),
        ]);

        $this->get('/discord/authorize/callback?code=123&state=456')
            ->assertRedirect('https://discord.com/channels/592327939920494592/592327939920494594');

        Http::assertSentCount(1);
        $user = DiscordUser::where('discord_api_id', 696628666183975013)->firstOrFail();
        $this->assertEquals('Claudio Dekker#3220', $user->discord_api_nickname);
        $this->assertEquals('INVALIDxq3Ly5ca88vy9aUKjLIXdqr', $user->discord_api_access_token);
        $this->assertEquals('INVALIDb8yS0e3Iau0Pn6Q96yUHr9T', $user->discord_api_refresh_token);
        $this->assertEquals('claudiodekker', $user->github_login);
        $this->assertFalse($user->has_sponsor_role);
    }

    /** @test */
    public function it_does_not_assign_the_sponsor_role_when_no_sponsorship_exists(): void
    {
        $this->mockSocialiteUserResponse();
        GithubUser::factory()->claudiodekker()->create();
        Http::fake([
            'https://discord.com/api/users/@me/connections' => $this->fakeDiscordApiConnectionsResponseWithGithubConnection(),
            '*' => Http::response('Fake Response'),
        ]);

        $this->get('/discord/authorize/callback?code=123&state=456')
            ->assertRedirect('https://discord.com/channels/592327939920494592/592327939920494594');

        Http::assertSentCount(1);
        $user = DiscordUser::where('discord_api_id', 696628666183975013)->firstOrFail();
        $this->assertEquals('Claudio Dekker#3220', $user->discord_api_nickname);
        $this->assertEquals('INVALIDxq3Ly5ca88vy9aUKjLIXdqr', $user->discord_api_access_token);
        $this->assertEquals('INVALIDb8yS0e3Iau0Pn6Q96yUHr9T', $user->discord_api_refresh_token);
        $this->assertEquals('claudiodekker', $user->github_login);
        $this->assertFalse($user->has_sponsor_role);
    }

    /** @test */
    public function it_does_not_assign_the_sponsor_role_when_no_github_account_is_connected(): void
    {
        $this->mockSocialiteUserResponse();
        GithubSponsor::factory()->claudiodekker()->create();
        Http::fake([
            'https://discord.com/api/users/@me/connections' => $this->fakeDiscordApiConnectionsResponseWithoutGithubConnection(),
            '*' => Http::response('Fake Response'),
        ]);

        $this->get('/discord/authorize/callback?code=123&state=456')
            ->assertRedirect('https://discord.com/channels/592327939920494592/592327939920494594');

        Http::assertSentCount(1);
        $user = DiscordUser::where('discord_api_id', 696628666183975013)->firstOrFail();
        $this->assertEquals('Claudio Dekker#3220', $user->discord_api_nickname);
        $this->assertEquals('INVALIDxq3Ly5ca88vy9aUKjLIXdqr', $user->discord_api_access_token);
        $this->assertEquals('INVALIDb8yS0e3Iau0Pn6Q96yUHr9T', $user->discord_api_refresh_token);
        $this->assertNull($user->github_login);
        $this->assertFalse($user->has_sponsor_role);
    }
}
