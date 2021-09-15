<?php

namespace Database\Factories;

use App\Models\DiscordUser;
use Illuminate\Database\Eloquent\Factories\Factory;

class DiscordUserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = DiscordUser::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'discord_api_id' => '696628666183975013',
            'discord_api_nickname' => 'Claudio Dekker#3220',
            'discord_api_access_token' => 'INVALIDxq3Ly5ca88vy9aUKjLIXdqr',
            'discord_api_refresh_token' => 'INVALIDb8yS0e3Iau0Pn6Q96yUHr9T',
        ];
    }
}
