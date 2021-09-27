<?php

namespace Database\Factories;

use App\Models\Sponsor;
use Illuminate\Database\Eloquent\Factories\Factory;

class SponsorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Sponsor::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'github_api_id' => $this->faker->unique()->randomNumber(),
        ];
    }

    /**
     * Mark the Sponsor as a Github Organization.
     *
     * @return SponsorFactory
     * @see HttpFakes::githubOrganizations()
     */
    public function organization(): self
    {
        return $this->state([
            'github_api_id' => 39676034,
        ]);
    }
}
