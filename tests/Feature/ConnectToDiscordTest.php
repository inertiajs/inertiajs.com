<?php

namespace Tests\Feature;

use App\Events\DiscordConnectionUpdated;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;
use SocialiteProviders\Manager\OAuth2\User as OAuthUser;
use Tests\TestCase;

class ConnectToDiscordTest extends TestCase
{
    use RefreshDatabase;

    protected function mockSocialiteUserResponse(): void
    {
        $mockUser = (new OAuthUser())
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
    public function users_are_redirected_to_discord_to_authorize_the_connection(): void
    {
        Socialite::shouldReceive('driver->setScopes->redirect')->andReturn(Redirect::to('socialite-redirect.test'));

        $response = $this->actingAs(User::factory()->create())
            ->get('/connections/discord/authorize');

        $response->assertRedirect('socialite-redirect.test');
    }

    /** @test */
    public function guests_are_redirected_to_the_github_authorization_page(): void
    {
        $response = $this->get('/connections/discord/authorize');

        $response->assertRedirect('/auth/github');
    }

    /** @test */
    public function users_can_connect_their_discord_account_by_authorizing_the_connection(): void
    {
        Event::fake(DiscordConnectionUpdated::class);
        $this->mockSocialiteUserResponse();
        $user = User::factory()->claudiodekker()->create();

        $this->actingAs($user)
            ->get('/connections/discord/authorize/callback?code=123&state=456')
            ->assertRedirect('https://discord.com/channels/592327939920494592/592327939920494594');

        tap($user->fresh(), function (User $user) {
            $this->assertSame(696628666183975013, $user->discord_api_id);
            $this->assertSame('Claudio Dekker#3220', $user->discord_api_nickname);
            $this->assertSame('INVALIDxq3Ly5ca88vy9aUKjLIXdqr', $user->discord_api_access_token);
            $this->assertSame('INVALIDb8yS0e3Iau0Pn6Q96yUHr9T', $user->discord_api_refresh_token);
        });
        Event::assertDispatched(DiscordConnectionUpdated::class, function ($event) use ($user) {
            return $event->user->is($user);
        });
    }
}
