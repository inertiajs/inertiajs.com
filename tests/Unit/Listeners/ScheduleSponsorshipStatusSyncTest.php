<?php

namespace Tests\Unit\Listeners;

use App\Events\GithubCredentialsUpdated;
use App\Jobs\SynchronizeSponsorStatus;
use App\Models\User;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class ScheduleSponsorshipStatusSyncTest extends TestCase
{
    /** @test */
    public function it_queues_a_job_to_synchronize_the_sponsorship_status(): void
    {
        Queue::fake();
        $user = User::factory()->make();

        GithubCredentialsUpdated::dispatch($user);

        Queue::assertPushed(SynchronizeSponsorStatus::class, function ($job) use ($user) {
            return $job->user->is($user);
        });
    }
}
