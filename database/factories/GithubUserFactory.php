<?php

namespace Database\Factories;

use App\Models\GithubSponsor;
use App\Models\GithubUser;
use Illuminate\Database\Eloquent\Factories\Factory;

class GithubUserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = GithubUser::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'github_api_id' => $this->faker->randomNumber(8),
            'github_api_login' => $this->faker->name,
            'github_api_access_token' => $this->faker->uuid,
        ];
    }

    /**
     * The (fake) Github API User details for 'octocat'.
     * Used when testing against the example fixtures.
     *
     * @return GithubUserFactory
     */
    public function octocat()
    {
        return $this->state([
            'github_api_id' => 5,
            'github_api_login' => 'octocat',
        ]);
    }

    /**
     * The (fake) Github API User details for 'monalisa'.
     * Used when testing against the example fixtures.
     *
     * @return GithubUserFactory
     */
    public function monalisa()
    {
        return $this->state([
            'github_api_id' => 2,
            'github_api_login' => 'monalisa',
        ]);
    }

    /**
     * The Github API User details for 'claudiodekker'.
     *
     * @return GithubUserFactory
     */
    public function claudiodekker()
    {
        return $this->state([
            'github_api_id' => 1752195,
            'github_api_login' => 'claudiodekker',
        ]);
    }

    /**
     * The Github API User details for 'inertiajs'.
     *
     * @return GithubUserFactory
     */
    public function inertiajs()
    {
        return $this->state([
            'github_api_id' => 47703742,
            'github_api_login' => 'inertiajs',
        ]);
    }

    /**
     * Creates a Sponsorship for this Github User.
     *
     * @return GithubUserFactory
     */
    public function sponsoring()
    {
        return $this->for(GithubSponsor::factory()->inertiajs());
    }

    /**
     * Creates an expired/cancelled Sponsorship for this Github User.
     *
     * @return GithubUserFactory
     */
    public function cancelledSponsor()
    {
        return $this->for(GithubSponsor::factory()->inertiajs()->state(['cancelled_at' => '2020-01-01 00:00:00']));
    }
}
