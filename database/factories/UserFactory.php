<?php

namespace Database\Factories;

use App\Models\Sponsor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'github_api_id' => 2,
            'github_api_login' => 'monalisa',
            'github_api_access_token' => 'gho_INVALIDtKCYSjZIDrejZHOC0B8s4ds',
        ];
    }

    /**
     * The Github User details used in our tests.
     *
     * @return UserFactory
     */
    public function withGithub(): self
    {
        return $this->state([
            'github_api_id' => 1752195,
            'github_api_login' => 'claudiodekker',
            'github_api_access_token' => 'gho_INVALIDxq3Ly5ca88vy9aUKjLIXdqr',
        ]);
    }

    /**
     * The Discord User details used in our tests.
     *
     * @return UserFactory
     */
    public function withDiscord(): self
    {
        return $this->state([
            'discord_api_id' => '696628666183975013',
            'discord_api_nickname' => 'Claudio Dekker#3220',
            'discord_api_access_token' => 'INVALIDxq3Ly5ca88vy9aUKjLIXdqr',
            'discord_api_refresh_token' => 'INVALIDb8yS0e3Iau0Pn6Q96yUHr9T',
        ]);
    }

    /**
     * The User's Sponsor.
     *
     * @param array $attributes
     * @return UserFactory
     */
    public function sponsoring(array $attributes = []): self
    {
        return $this->afterMaking(function (User $instance) use ($attributes) {
            $instance->sponsor_id = Sponsor::factory()
                ->state(['github_api_id' => $instance->github_api_id])
                ->state($attributes)
                ->create()
                ->id;
        });
    }
}
