<?php

namespace App\Services\Discord;

use App\Services\Discord\Exceptions\InvalidBotCredentialsException;
use App\Services\Discord\Exceptions\UnknownGuildException;
use App\Services\Discord\Exceptions\UnknownRoleException;
use App\Services\Discord\Exceptions\UnknownUserException;
use Illuminate\Support\Facades\Http;

class Bot
{
    public function assignSponsorRole(string $discordApiId): bool
    {
        $guildId = config('services.discord.guild_id');
        $sponsorRoleId = config('services.discord.sponsor_role_id');

        $response = Http::baseUrl('https://discord.com/api')
            ->withToken(config('services.discord.bot_token'), 'Bot')
            ->asJson()
            ->put(sprintf('/guilds/%s/members/%s/roles/%s', $guildId, $discordApiId, $sponsorRoleId));

        if ($response->status() === 400 && ! is_null($response->json('user_id'))) {
            throw new UnknownUserException($discordApiId);
        }

        if ($response->status() === 401) {
            throw new InvalidBotCredentialsException();
        }

        if ($response->status() === 404 && $response->json('code') === 10004) {
            throw new UnknownGuildException($guildId);
        }

        if ($response->status() === 404 && $response->json('code') === 10011) {
            throw new UnknownRoleException($sponsorRoleId);
        }

        return $response->status() === 204;
    }
}
