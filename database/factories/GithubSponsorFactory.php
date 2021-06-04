<?php

namespace Database\Factories;

use App\Models\GithubSponsor;
use Illuminate\Database\Eloquent\Factories\Factory;

class GithubSponsorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = GithubSponsor::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'login' => $this->faker->userName,
        ];
    }
}
