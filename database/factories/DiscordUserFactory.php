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
    public function definition()
    {
        return [
            'discord_id' => $this->faker->randomNumber(8),
            'nickname' => $this->faker->name,
            'access_token' => $this->faker->uuid,
            'refresh_token' => $this->faker->uuid,
            'github_login' => $this->faker->userName,
            'has_sponsor_role' => $this->faker->boolean,
        ];
    }
}
