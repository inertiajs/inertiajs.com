<?php

namespace Tests\Feature\Commands;

use App\Console\Commands\SynchronizeSponsorStatuses;
use App\Jobs\SynchronizeSponsorStatus;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class SynchronizeSponsorStatusesTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_schedules_the_sponsor_status_synchronization_job_for_all_users(): void
    {
        Queue::fake();
        $userA = User::factory()->create();
        $userB = User::factory()->create();

        Artisan::call(SynchronizeSponsorStatuses::class);

        Queue::assertPushed(SynchronizeSponsorStatus::class, fn ($job) => $job->user->is($userA));
        Queue::assertPushed(SynchronizeSponsorStatus::class, fn ($job) => $job->user->is($userB));
    }
}
