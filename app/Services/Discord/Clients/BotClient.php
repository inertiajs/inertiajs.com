<?php

namespace App\Services\Discord\Clients;

use App\Models\DiscordUser;
use Illuminate\Support\Facades\Http;

class BotClient
{
    public function assignSponsorRole(DiscordUser $user): bool
    {
        Http::baseUrl('https://discord.com/api')
            ->withToken(config('services.discord.bot_token'), 'Bot')
            ->put(sprintf('/guilds/%s/members/%s/roles/%s', config('services.discord.guild_id'), $user->discord_id, config('services.discord.sponsor_role_id')))
            ->throw()
            ->json();

        return true;
    }

    public function revokeSponsorRole(DiscordUser $user): bool
    {
        Http::baseUrl('https://discord.com/api')
            ->withToken(config('services.discord.bot_token'), 'Bot')
            ->delete(sprintf('/guilds/%s/members/%s/roles/%s', config('services.discord.guild_id'), $user->discord_id, config('services.discord.sponsor_role_id')))
            ->throw()
            ->json();

        return true;
    }
}
