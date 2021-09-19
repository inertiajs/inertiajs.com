<?php

namespace Tests\Unit\Services\Discord;

use App\Services\Discord\Bot as DiscordBot;
use App\Services\Discord\Exceptions\InvalidBotCredentialsException;
use App\Services\Discord\Exceptions\UnknownGuildException;
use App\Services\Discord\Exceptions\UnknownRoleException;
use App\Services\Discord\Exceptions\UnknownUserException;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\Fixtures\HttpFakes;
use Tests\TestCase;

class BotTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config([
            'services.discord.bot_token' => 'foo',
            'services.discord.guild_id' => 1234567890,
            'services.discord.sponsor_role_id' => 9876543210,
        ]);
    }

    protected function assertSponsorRoleRequestSent($method = 'PUT', $url = '/1234567890/members/123/roles/9876543210'): void
    {
        Http::assertSentCount(1);
        Http::assertSent(function (Request $request) use ($url, $method) {
            $this->assertSame('Bot foo', $request->header('Authorization.0'));
            $this->assertSame('https://discord.com/api/guilds'.$url, $request->url());
            $this->assertSame($method, $request->method());

            return true;
        });
    }

    /** @test */
    public function it_assigns_the_sponsor_role(): void
    {
        HttpFakes::discordManageRole();

        $response = app(DiscordBot::class)->assignSponsorRole(123);

        $this->assertTrue($response);
        $this->assertSponsorRoleRequestSent();
    }

    /** @test */
    public function it_fails_to_assign_the_sponsor_role_when_an_invalid_bot_token_is_configured(): void
    {
        HttpFakes::discordBotInvalidToken();

        try {
            app(DiscordBot::class)->assignSponsorRole(123);
        } catch (InvalidBotCredentialsException $exception) {
            $this->assertSponsorRoleRequestSent();

            return;
        }

        $this->fail('A valid bot token was provided');
    }

    /** @test */
    public function it_fails_to_assign_the_sponsor_role_when_an_invalid_guild_id_is_configured(): void
    {
        HttpFakes::discordManageRole();
        config(['services.discord.guild_id' => 'invalid-guild']);

        try {
            app(DiscordBot::class)->assignSponsorRole(123);
        } catch (UnknownGuildException $exception) {
            $this->assertSponsorRoleRequestSent('PUT', '/invalid-guild/members/123/roles/9876543210');

            return;
        }

        $this->fail('A valid guild id was provided');
    }

    /** @test */
    public function it_fails_to_assign_the_sponsor_role_when_an_invalid_member_id_was_provided(): void
    {
        HttpFakes::discordManageRole();

        try {
            app(DiscordBot::class)->assignSponsorRole('invalid-member');
        } catch (UnknownUserException $exception) {
            $this->assertSponsorRoleRequestSent('PUT', '/1234567890/members/invalid-member/roles/9876543210');

            return;
        }

        $this->fail('A valid member id was provided');
    }

    /** @test */
    public function it_fails_to_assign_the_sponsor_role_when_an_invalid_sponsor_role_id_is_configured(): void
    {
        HttpFakes::discordManageRole();
        config(['services.discord.sponsor_role_id' => 'invalid-role']);

        try {
            app(DiscordBot::class)->assignSponsorRole(123);
        } catch (UnknownRoleException $exception) {
            $this->assertSponsorRoleRequestSent('PUT', '/1234567890/members/123/roles/invalid-role');

            return;
        }

        $this->fail('A valid role was provided');
    }

    /** @test */
    public function it_revokes_the_sponsor_role(): void
    {
        HttpFakes::discordManageRole();

        $response = app(DiscordBot::class)->revokeSponsorRole(123);

        $this->assertTrue($response);
        $this->assertSponsorRoleRequestSent('DELETE');
    }

    /** @test */
    public function it_fails_to_revoke_the_sponsor_role_when_an_invalid_bot_token_is_configured(): void
    {
        HttpFakes::discordBotInvalidToken();

        try {
            app(DiscordBot::class)->revokeSponsorRole(123);
        } catch (InvalidBotCredentialsException $exception) {
            $this->assertSponsorRoleRequestSent('DELETE');

            return;
        }

        $this->fail('A valid bot token was provided');
    }

    /** @test */
    public function it_fails_to_revoke_the_sponsor_role_when_an_invalid_guild_id_is_configured(): void
    {
        HttpFakes::discordManageRole();
        config(['services.discord.guild_id' => 'invalid-guild']);

        try {
            app(DiscordBot::class)->revokeSponsorRole(123);
        } catch (UnknownGuildException $exception) {
            $this->assertSponsorRoleRequestSent('DELETE', '/invalid-guild/members/123/roles/9876543210');

            return;
        }

        $this->fail('A valid guild id was provided');
    }

    /** @test */
    public function it_fails_to_revoke_the_sponsor_role_when_an_invalid_member_id_was_provided(): void
    {
        HttpFakes::discordManageRole();

        try {
            app(DiscordBot::class)->revokeSponsorRole('invalid-member');
        } catch (UnknownUserException $exception) {
            $this->assertSponsorRoleRequestSent('DELETE', '/1234567890/members/invalid-member/roles/9876543210');

            return;
        }

        $this->fail('A valid member id was provided');
    }

    /** @test */
    public function it_fails_to_revoke_the_sponsor_role_when_an_invalid_sponsor_role_id_is_configured(): void
    {
        HttpFakes::discordManageRole();
        config(['services.discord.sponsor_role_id' => 'invalid-role']);

        try {
            app(DiscordBot::class)->revokeSponsorRole(123);
        } catch (UnknownRoleException $exception) {
            $this->assertSponsorRoleRequestSent('DELETE', '/1234567890/members/123/roles/invalid-role');

            return;
        }

        $this->fail('A valid role was provided');
    }
}
