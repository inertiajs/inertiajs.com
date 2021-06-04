<?php

namespace Tests\Unit\Jobs;

use App\Jobs\UpdateDiscordRoleAssignment;
use App\Models\DiscordUser;
use App\Models\GithubSponsor;
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
    public function it_assigns_the_sponsor_role_when_the_user_has_their_github_account_linked_and_is_sponsoring_through_github(): void
    {
        $sponsor = GithubSponsor::factory()->create(['login' => 'foo']);
        $user = DiscordUser::factory()->create([
            'github_account' => $sponsor->account,
            'has_sponsor_role' => false,
        ]);

        (new UpdateDiscordRoleAssignment($user))->handle();

        $this->assertTrue($user->fresh()->has_sponsor_role);
        Http::assertSentCount(1);
    }

    /** @test */
    public function it_revokes_the_sponsor_role_when_the_user_has_their_github_account_linked_but_stops_sponsoring_through_github(): void
    {
        $user = DiscordUser::factory()->create([
            'github_account' => 'foo',
            'has_sponsor_role' => true,
        ]);

        (new UpdateDiscordRoleAssignment($user))->handle();

        $this->assertFalse($user->fresh()->has_sponsor_role);
        Http::assertSentCount(1);
    }

    /** @test */
    public function it_revokes_the_sponsor_role_when_the_user_unlinks_their_github_account(): void
    {
        $user = DiscordUser::factory()->create([
            'github_account' => null,
            'has_sponsor_role' => true,
        ]);

        (new UpdateDiscordRoleAssignment($user))->handle();

        $this->assertFalse($user->fresh()->has_sponsor_role);
        Http::assertSentCount(1);
    }

    /** @test */
    public function it_does_nothing_when_the_user_already_has_the_sponsor_role_and_has_a_linked_github_sponsor_account(): void
    {
        $sponsor = GithubSponsor::factory()->create(['login' => 'foo']);
        $user = DiscordUser::factory()->create([
            'github_account' => $sponsor->account,
            'has_sponsor_role' => true,
        ]);

        (new UpdateDiscordRoleAssignment($user))->handle();

        $this->assertTrue($user->fresh()->has_sponsor_role);
        Http::assertNothingSent();
    }

    /** @test */
    public function it_does_nothing_when_the_user_already_has_no_sponsor_role_and_also_no_linked_github_account(): void
    {
        $user = DiscordUser::factory()->create([
            'github_account' => null,
            'has_sponsor_role' => false,
        ]);

        (new UpdateDiscordRoleAssignment($user))->handle();

        $this->assertFalse($user->fresh()->has_sponsor_role);
        Http::assertNothingSent();
    }
}
