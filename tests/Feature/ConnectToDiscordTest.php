<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;
use Tests\TestCase;

class ConnectToDiscordTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function the_user_is_redirected_to_discord_in_order_to_authorize(): void
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
}
