<?php

namespace Database\Factories;

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
     * The Github User details for 'claudiodekker'.
     *
     * @return UserFactory
     */
    public function claudiodekker(): self
    {
        return $this->state([
            'github_api_id' => 1752195,
            'github_api_login' => 'claudiodekker',
            'github_api_access_token' => 'gho_INVALIDxq3Ly5ca88vy9aUKjLIXdqr',
        ]);
    }
}
