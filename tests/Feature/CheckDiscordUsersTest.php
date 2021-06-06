<?php

namespace Tests\Feature;

use App\Console\Commands\CheckDiscordUsers;
use App\Models\DiscordUser;
use Artisan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class CheckDiscordUsersTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_checks_whether_all_discord_user_connections_are_still_up_to_date_and_updates_them_if_needed(): void
    {
        Http::fake([
            'https://discord.com/api/users/@me/connections' => Http::sequence()
                ->push([
                    [
                        'type' => 'github',
                        'id' => '1752195',
                        'name' => 'claudiodekker',
                        'visibility' => 1,
                        'friend_sync' => false,
                        'show_activity' => true,
                        'verified' => true,
                    ],
                ])
                ->push([
                    [
                        'type' => 'github',
                        'id' => '1752195',
                        'name' => 'monalisa',
                        'visibility' => 1,
                        'friend_sync' => false,
                        'show_activity' => true,
                        'verified' => true,
                    ],
                ])
                ->push('asd', 401),
            'https://discord.com/api/guilds/*' => Http::response(),
            'https://discord.com/*' => Http::response('invalid', 401),
        ]);

        $userA = DiscordUser::factory()->create(['github_login' => 'claudiodekker', 'access_token' => 'foo', 'refresh_token' => 'foo2', 'has_sponsor_role' => true]);
        $userB = DiscordUser::factory()->create(['github_login' => 'claudiodekker', 'access_token' => 'bar', 'refresh_token' => 'bar2', 'has_sponsor_role' => true]);
        $userC = DiscordUser::factory()->create(['github_login' => 'claudiodekker', 'access_token' => 'baz', 'refresh_token' => 'baz2', 'has_sponsor_role' => true]);

        Artisan::call(CheckDiscordUsers::class);

        tap($userA->fresh(), function (DiscordUser $user) {
            $this->assertEquals('claudiodekker', $user->github_login);
            $this->assertEquals('foo', $user->access_token);
            $this->assertEquals('foo2', $user->refresh_token);
            $this->assertTrue($user->has_sponsor_role);
        });

        tap($userB->fresh(), function (DiscordUser $user) {
            $this->assertEquals('monalisa', $user->github_login);
            $this->assertEquals('bar', $user->access_token);
            $this->assertEquals('bar2', $user->refresh_token);
            $this->assertFalse($user->has_sponsor_role);
        });

        tap($userC->fresh(), function (DiscordUser $user) {
            $this->assertNull($user->github_login);
            $this->assertNull($user->access_token);
            $this->assertNull($user->refresh_token);
            $this->assertFalse($user->has_sponsor_role);
        });
    }
}
