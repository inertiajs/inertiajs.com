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

    /** @test */
    public function it_has_an_active_sponsor(): void
    {
        $user = User::factory()->sponsoring()->make();

        $this->assertTrue($user->hasActiveSponsor());
    }

    /** @test */
    public function it_does_not_have_an_active_sponsor_when_there_is_no_sponsor(): void
    {
        $user = User::factory()->make();

        $this->assertFalse($user->hasActiveSponsor());
    }

    /** @test */
    public function it_does_not_have_an_active_sponsor_when_the_sponsor_has_expired(): void
    {
        $user = User::factory()->sponsoring(['has_expired' => true])->make();

        $this->assertFalse($user->hasActiveSponsor());
    }
}
