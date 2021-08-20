<?php

namespace Tests\Feature;

use App\Models\GithubUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;
use SocialiteProviders\Manager\OAuth2\User;
use Tests\TestCase;

class GithubAuthTest extends TestCase
{
    use RefreshDatabase;

    protected function mockSocialiteUserResponse(): void
    {
        $mockUser = (new User())
            ->setToken('gho_INVALIDxq3Ly5ca88vy9aUKjLIXdqr')
            ->setRaw([
                'login' => 'claudiodekker',
                'id' => 1752195,
                'node_id' => '5ca88vy9aUKjLIIXdqr=',
                'avatar_url' => 'https://avatars.githubusercontent.com/u/1752195?v=4',
                'gravatar_id' => '',
                'url' => 'https://api.github.com/users/claudiodekker',
                'html_url' => 'https://github.com/claudiodekker',
                'followers_url' => 'https://api.github.com/users/claudiodekker/followers',
                'following_url' => 'https://api.github.com/users/claudiodekker/following{/other_user}',
                'gists_url' => 'https://api.github.com/users/claudiodekker/gists{/gist_id}',
                'starred_url' => 'https://api.github.com/users/claudiodekker/starred{/owner}{/repo}',
                'subscriptions_url' => 'https://api.github.com/users/claudiodekker/subscriptions',
                'organizations_url' => 'https://api.github.com/users/claudiodekker/orgs',
                'repos_url' => 'https://api.github.com/users/claudiodekker/repos',
                'events_url' => 'https://api.github.com/users/claudiodekker/events{/privacy}',
                'received_events_url' => 'https://api.github.com/users/claudiodekker/received_events',
                'type' => 'User',
                'site_admin' => false,
                'name' => 'Claudio Dekker',
                'company' => null,
                'blog' => 'https://dekker.io',
                'location' => 'Amsterdam, The Netherlands',
                'email' => null,
                'hireable' => null,
                'bio' => 'Artisan @laravel ❯ Maintainer @inertiajs  ❯ Open-source enthusiast ❯ VILT is my stack.',
                'twitter_username' => 'claudiodekker',
                'public_repos' => 27,
                'public_gists' => 5,
                'followers' => 144,
                'following' => 12,
                'created_at' => '2012-05-18T12:06:13Z',
                'updated_at' => '2021-06-05T18:34:12Z',
            ])
            ->map([
                'id' => 1752195,
                'nickname' => 'claudiodekker',
                'name' => 'Claudio Dekker',
                'avatar' => 'https://avatars.githubusercontent.com/u/1752195?v=4',
            ]);

        Socialite::shouldReceive('driver->user')->andReturn($mockUser);
    }

    /** @test */
    public function it_redirects_to_github_in_order_to_authorize(): void
    {
        Socialite::shouldReceive('driver->setScopes->redirect')->andReturn(Redirect::to('socialite-redirect.test'));

        $this->get('/github/authorize')->assertRedirect('socialite-redirect.test');
    }

    /** @test */
    public function it_redirects_back_to_github_when_the_authorization_callback_was_invalid(): void
    {
        Socialite::shouldReceive('driver->user')->andThrow(InvalidStateException::class);

        $this->get('/github/authorize/callback?code=123&state=456')
            ->assertRedirect(URL::to('/github/authorize'));

        $this->assertEmpty(GithubUser::all());
    }

    /** @test */
    public function it_creates_the_github_user(): void
    {
        $this->mockSocialiteUserResponse();

        $this->get('/github/authorize/callback?code=123&state=456')
            ->assertRedirect('https://inertiajs.com');

        $user = GithubUser::where('github_api_id', 1752195)->firstOrFail();
        $this->assertNull($user->github_sponsor_id);
        $this->assertEquals('claudiodekker', $user->github_api_login);
        $this->assertEquals('gho_INVALIDxq3Ly5ca88vy9aUKjLIXdqr', $user->github_api_access_token);
    }
}
