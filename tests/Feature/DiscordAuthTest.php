<?php

namespace Tests\Feature;

use App\Models\DiscordUser;
use App\Models\GithubSponsor;
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
    public function it_assigns_the_sponsor_role_to_the_user_immediately_if_a_sponsorship_exists_already(): void
    {
        Http::fake([
            'https://discord.com/api/users/@me/connections' => Http::response([
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
            ]),
            '*' => Http::response('Fake Response'),
        ]);
        $this->mockSocialiteUserResponse();
        GithubSponsor::factory()->create(['login' => 'claudiodekker', 'cancelled_at' => null]);

        $this->get('/discord/authorize/callback?code=123&state=456')
            ->assertRedirect('https://discord.com/channels/592327939920494592/592327939920494594');

        Http::assertSentCount(2);
        $user = DiscordUser::where('discord_id', 696628666183975013)->firstOrFail();
        $this->assertEquals('Claudio Dekker#3220', $user->nickname);
        $this->assertEquals('INVALIDxq3Ly5ca88vy9aUKjLIXdqr', $user->access_token);
        $this->assertEquals('INVALIDb8yS0e3Iau0Pn6Q96yUHr9T', $user->refresh_token);
        $this->assertEquals('claudiodekker', $user->github_login);
        $this->assertTrue($user->has_sponsor_role);
    }

    /** @test */
    public function it_does_not_assign_the_sponsor_role_if_no_sponsorship_exists(): void
    {
        Http::fake([
            'https://discord.com/api/users/@me/connections' => Http::response([
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
            ]),
            '*' => Http::response('Fake Response'),
        ]);
        $this->mockSocialiteUserResponse();

        $this->get('/discord/authorize/callback?code=123&state=456')
            ->assertRedirect('https://discord.com/channels/592327939920494592/592327939920494594');

        Http::assertSentCount(1);
        $user = DiscordUser::where('discord_id', 696628666183975013)->firstOrFail();
        $this->assertEquals('Claudio Dekker#3220', $user->nickname);
        $this->assertEquals('INVALIDxq3Ly5ca88vy9aUKjLIXdqr', $user->access_token);
        $this->assertEquals('INVALIDb8yS0e3Iau0Pn6Q96yUHr9T', $user->refresh_token);
        $this->assertEquals('claudiodekker', $user->github_login);
        $this->assertFalse($user->has_sponsor_role);
    }

    /** @test */
    public function it_does_not_assign_the_sponsor_role_to_the_user_if_a_cancelled_sponsorship_exists(): void
    {
        Http::fake([
            'https://discord.com/api/users/@me/connections' => Http::response([
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
            ]),
            '*' => Http::response('Fake Response'),
        ]);
        $this->mockSocialiteUserResponse();
        GithubSponsor::factory()->create(['login' => 'claudiodekker', 'cancelled_at' => '2020-01-01 00:00:00']);

        $this->get('/discord/authorize/callback?code=123&state=456')
            ->assertRedirect('https://discord.com/channels/592327939920494592/592327939920494594');

        Http::assertSentCount(1);
        $user = DiscordUser::where('discord_id', 696628666183975013)->firstOrFail();
        $this->assertEquals('Claudio Dekker#3220', $user->nickname);
        $this->assertEquals('INVALIDxq3Ly5ca88vy9aUKjLIXdqr', $user->access_token);
        $this->assertEquals('INVALIDb8yS0e3Iau0Pn6Q96yUHr9T', $user->refresh_token);
        $this->assertEquals('claudiodekker', $user->github_login);
        $this->assertFalse($user->has_sponsor_role);
    }

    /** @test */
    public function it_does_not_assign_the_sponsor_role_if_the_discord_user_has_no_github_account_connected(): void
    {
        Http::fake([
            'https://discord.com/api/users/@me/connections' => Http::response([
                [
                    'type' => 'twitter',
                    'id' => '78721809',
                    'name' => 'ClaudioDekker',
                    'visibility' => 1,
                    'friend_sync' => false,
                    'show_activity' => true,
                    'verified' => true,
                ],
            ]),
            '*' => Http::response('Fake Response'),
        ]);
        $this->mockSocialiteUserResponse();
        GithubSponsor::factory()->create(['login' => 'claudiodekker', 'cancelled_at' => null]);

        $this->get('/discord/authorize/callback?code=123&state=456')
            ->assertRedirect('https://discord.com/channels/592327939920494592/592327939920494594');

        Http::assertSentCount(1);
        $user = DiscordUser::where('discord_id', 696628666183975013)->firstOrFail();
        $this->assertEquals('Claudio Dekker#3220', $user->nickname);
        $this->assertEquals('INVALIDxq3Ly5ca88vy9aUKjLIXdqr', $user->access_token);
        $this->assertEquals('INVALIDb8yS0e3Iau0Pn6Q96yUHr9T', $user->refresh_token);
        $this->assertNull($user->github_login);
        $this->assertFalse($user->has_sponsor_role);
    }
}
