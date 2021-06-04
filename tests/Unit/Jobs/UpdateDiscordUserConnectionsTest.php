<?php

namespace Tests\Unit\Jobs;

use App\Jobs\UpdateDiscordRoleAssignment;
use App\Jobs\UpdateDiscordUserConnections;
use App\Models\DiscordUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class UpdateDiscordUserConnectionsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Queue::fake();
    }

    protected function prepareFakeResponse($overrides = [])
    {
        $payload = [
            array_merge([
                'type' => 'github',
                'id' => '1752195',
                'name' => 'claudiodekker',
                'visibility' => 1,
                'friend_sync' => false,
                'show_activity' => true,
                'verified' => true,
            ], $overrides),
            [
                'type' => 'twitter',
                'id' => '78721809',
                'name' => 'ClaudioDekker',
                'visibility' => 1,
                'friend_sync' => false,
                'show_activity' => true,
                'verified' => true,
            ],
        ];

        Http::fake(['https://discord.com/api*' => Http::response($payload)]);
    }

    /** @test */
    public function it_attaches_a_github_account(): void
    {
        $this->prepareFakeResponse();
        $user = DiscordUser::factory()->create([
            'github_account' => null,
        ]);

        (new UpdateDiscordUserConnections($user))->handle();

        $this->assertEquals('claudiodekker', $user->fresh()->github_account);
        Queue::assertPushed(UpdateDiscordRoleAssignment::class);
    }

    /** @test */
    public function it_removes_an_attached_github_account(): void
    {
        $this->prepareFakeResponse(['type' => 'google']);
        $user = DiscordUser::factory()->create([
            'github_account' => 'claudiodekker',
        ]);

        (new UpdateDiscordUserConnections($user))->handle();

        $this->assertNull($user->fresh()->github_account);
        Queue::assertPushed(UpdateDiscordRoleAssignment::class);
    }

    /** @test */
    public function it_does_not_attach_an_unverified_github_account(): void
    {
        $this->prepareFakeResponse(['verified' => false]);
        $user = DiscordUser::factory()->create([
            'github_account' => null,
        ]);

        (new UpdateDiscordUserConnections($user))->handle();

        $this->assertNull($user->fresh()->github_account);
        Queue::assertNothingPushed();
    }

    /** @test */
    public function it_does_not_attach_a_revoked_github_account(): void
    {
        $this->prepareFakeResponse(['revoked' => true]);
        $user = DiscordUser::factory()->create([
            'github_account' => null,
        ]);

        (new UpdateDiscordUserConnections($user))->handle();

        $this->assertNull($user->fresh()->github_account);
        Queue::assertNothingPushed();
    }
}
