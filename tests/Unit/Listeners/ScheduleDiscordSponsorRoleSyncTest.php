<?php

namespace Tests\Unit\Listeners;

use App\Events\DiscordConnectionUpdated;
use App\Jobs\SynchronizeDiscordSponsorRole;
use App\Models\User;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class ScheduleDiscordSponsorRoleSyncTest extends TestCase
{
    /** @test */
    public function it_queues_a_job_to_synchronize_the_discord_user_role(): void
    {
        Queue::fake();
        $user = User::factory()->withGithub()->withDiscord()->make();

        DiscordConnectionUpdated::dispatch($user);

        Queue::assertPushed(SynchronizeDiscordSponsorRole::class, fn ($job) => $job->user->is($user));
    }

    /** @test */
    public function it_does_not_queue_anything_when_there_are_no_connected_discord_credentials(): void
    {
        Queue::fake();
        $user = User::factory()->withGithub()->make();

        DiscordConnectionUpdated::dispatch($user);

        Queue::assertNothingPushed();
    }
}
