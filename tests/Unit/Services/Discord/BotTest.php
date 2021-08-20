<?php

namespace Tests\Unit\Services\Discord;

use App\Models\DiscordUser;
use App\Services\Discord\Discord;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class BotTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Http::fake();
        config([
            'services.discord.bot_token' => '012',
            'services.discord.guild_id' => '123',
            'services.discord.sponsor_role_id' => '234',
        ]);
    }

    /** @test */
    public function it_assigns_the_sponsor_role(): void
    {
        $user = DiscordUser::factory()->create(['discord_api_id' => 345]);

        Discord::asBot()->assignSponsorRole($user);

        Http::assertSentCount(1);
        Http::assertSent(function (Request $request) {
            return $request->method() === 'PUT'
                && $request->url() === 'https://discord.com/api/guilds/123/members/345/roles/234'
                && $request->hasHeader('Authorization', 'Bot 012');
        });
    }

    /** @test */
    public function it_revokes_the_sponsor_role(): void
    {
        $user = DiscordUser::factory()->create(['discord_api_id' => 345]);

        Discord::asBot()->revokeSponsorRole($user);

        Http::assertSentCount(1);
        Http::assertSent(function (Request $request) {
            return $request->method() === 'DELETE'
                && $request->url() === 'https://discord.com/api/guilds/123/members/345/roles/234'
                && $request->hasHeader('Authorization', 'Bot 012');
        });
    }
}
