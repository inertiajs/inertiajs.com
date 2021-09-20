<?php

namespace Tests\Unit\Listeners;

use App\Events\DiscordConnectionUpdated;
use App\Events\UserStartedSponsoring;
use App\Events\UserStoppedSponsoring;
use App\Jobs\SynchronizeDiscordSponsorRole;
use App\Models\DiscordUser;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class ScheduleDiscordSponsorRoleSyncTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_queues_a_job_when_the_discord_connection_was_updated(): void
    {
        Queue::fake();
        $discordUser = DiscordUser::factory()->make();

        DiscordConnectionUpdated::dispatch($discordUser);

        Queue::assertPushed(SynchronizeDiscordSponsorRole::class, fn ($job) => $job->discordUser->is($discordUser));
    }

    /** @test */
    public function it_queues_a_job_when_the_user_started_sponsoring_while_having_a_discord_connection(): void
    {
        Queue::fake();
        $user = User::factory()->sponsoring()->withDiscord()->create();
        $discordUser = $user->discordUser;

        UserStartedSponsoring::dispatch($user);

        Queue::assertPushed(SynchronizeDiscordSponsorRole::class, fn ($job) => $job->discordUser->is($discordUser));
    }

    /** @test */
    public function it_queues_nothing_when_the_user_started_sponsoring_without_a_discord_connection(): void
    {
        Queue::fake();
        $user = User::factory()->sponsoring()->create();

        UserStartedSponsoring::dispatch($user);

        Queue::assertNothingPushed();
    }

    /** @test */
    public function it_queues_a_job_when_the_user_stopped_sponsoring_while_having_a_discord_connection(): void
    {
        Queue::fake();
        $user = User::factory()->expiredSponsor()->withDiscord()->create();
        $discordUser = $user->discordUser;

        UserStoppedSponsoring::dispatch($user);

        Queue::assertPushed(SynchronizeDiscordSponsorRole::class, fn ($job) => $job->discordUser->is($discordUser));
    }

    /** @test */
    public function it_queues_nothing_when_the_user_stopped_sponsoring_without_a_discord_connection(): void
    {
        Queue::fake();
        $user = User::factory()->expiredSponsor()->create();

        UserStoppedSponsoring::dispatch($user);

        Queue::assertNothingPushed();
    }
}
