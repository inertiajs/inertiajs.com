<?php

namespace Tests\Unit\Models;

use App\Models\User;
use App\Services\Github\Api;
use Tests\TestCase;

class UserTest extends TestCase
{
    /** @test */
    public function it_checks_whether_the_user_is_a_github_sponsor(): void
    {
        config(['services.github.sponsor_target' => 'foo']);
        $user = User::factory()->make(['github_api_access_token' => 'bar']);
        $mock = $this->spy(Api::class);

        $user->isGithubSponsor();

        $mock->shouldHaveReceived('isSponsoring', ['foo', 'bar']);
    }
}
