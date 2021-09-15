<?php

namespace Tests\Unit\Listeners;

use App\Events\DiscordConnectionUpdated;
use App\Jobs\SynchronizeDiscordSponsorRole;
use App\Models\DiscordUser;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class ScheduleDiscordSponsorRoleSyncTest extends TestCase
{
    /** @test */
    public function it_queues_a_job_to_synchronize_the_discord_user_role(): void
    {
        Queue::fake();
        $discordUser = DiscordUser::factory()->make();

        DiscordConnectionUpdated::dispatch($discordUser);

        Queue::assertPushed(SynchronizeDiscordSponsorRole::class, fn ($job) => $job->discordUser->is($discordUser));
    }
}
