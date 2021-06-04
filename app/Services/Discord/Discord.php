<?php

namespace App\Services\Discord;

use App\Models\DiscordUser;
use App\Services\Discord\Clients\BotClient;
use App\Services\Discord\Clients\UserClient;

class Discord
{
    protected function __construct()
    {
        // This class cannot be instantiated.
    }

    public static function asUser(DiscordUser $user): UserClient
    {
        return new UserClient($user);
    }

    public static function asBot(): BotClient
    {
        return new BotClient();
    }
}
