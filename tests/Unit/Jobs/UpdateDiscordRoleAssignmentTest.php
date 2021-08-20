<?php

namespace Tests\Unit\Jobs;

use App\Jobs\UpdateDiscordRoleAssignment;
use App\Models\DiscordUser;
use App\Models\GithubSponsor;
use App\Models\GithubUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class UpdateDiscordRoleAssignmentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Http::fake();
    }

    /** @test */
    public function it_assigns_the_sponsor_role_when_the_user_has_their_github_account_linked_and_is_sponsoring(): void
    {
        $sponsor = GithubSponsor::factory()->inertiajs()->create();
        $github = GithubUser::factory()->monalisa()->create(['github_sponsor_id' => $sponsor->id]);
        $discord = DiscordUser::factory()->create(['github_login' => $github->github_api_login, 'has_sponsor_role' => false]);

        (new UpdateDiscordRoleAssignment($discord))->handle();

        $this->assertTrue($discord->fresh()->has_sponsor_role);
        Http::assertSentCount(1);
    }

    /** @test */
    public function it_revokes_the_sponsor_role_when_the_user_has_their_github_account_linked_but_has_stopped_sponsoring(): void
    {
        $sponsor = GithubSponsor::factory()->inertiajs()->create(['cancelled_at' => '2020-01-01 00:00:00']);
        $github = GithubUser::factory()->monalisa()->create(['github_sponsor_id' => $sponsor->id]);
        $discord = DiscordUser::factory()->create(['github_login' => $github->github_api_login, 'has_sponsor_role' => true]);

        (new UpdateDiscordRoleAssignment($discord))->handle();

        $this->assertFalse($discord->fresh()->has_sponsor_role);
        Http::assertSentCount(1);
    }

    /** @test */
    public function it_revokes_the_sponsor_role_when_the_user_unlinks_their_github_account(): void
    {
        $discord = DiscordUser::factory()->create(['github_login' => null, 'has_sponsor_role' => true]);

        (new UpdateDiscordRoleAssignment($discord))->handle();

        $this->assertFalse($discord->fresh()->has_sponsor_role);
        Http::assertSentCount(1);
    }

    /** @test */
    public function it_does_nothing_when_the_user_already_has_the_sponsor_role_and_has_a_linked_sponsor_account(): void
    {
        $sponsor = GithubSponsor::factory()->inertiajs()->create();
        $github = GithubUser::factory()->monalisa()->create(['github_sponsor_id' => $sponsor->id]);
        $discord = DiscordUser::factory()->create(['github_login' => $github->github_api_login, 'has_sponsor_role' => true]);

        (new UpdateDiscordRoleAssignment($discord))->handle();

        $this->assertTrue($discord->fresh()->has_sponsor_role);
        Http::assertNothingSent();
    }

    /** @test */
    public function it_does_nothing_when_the_user_already_has_no_sponsor_role_and_also_no_linked_github_account(): void
    {
        $user = DiscordUser::factory()->create(['github_login' => null, 'has_sponsor_role' => false]);

        (new UpdateDiscordRoleAssignment($user))->handle();

        $this->assertFalse($user->fresh()->has_sponsor_role);
        Http::assertNothingSent();
    }
}
