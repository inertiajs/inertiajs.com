<?php

namespace Tests\Unit\Models;

use App\Models\Sponsor;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SponsorTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function the_sponsorship_has_expired(): void
    {
        Carbon::setTestNow('2021-01-01 00:00:00');
        $sponsor = Sponsor::factory()->create(['expires_at' => now()]);

        $this->assertTrue($sponsor->hasExpired);
        Carbon::setTestNow();
    }

    /** @test */
    public function the_sponsorship_did_not_expire_when_no_expiration_date_is_known(): void
    {
        $sponsor = Sponsor::factory()->create(['expires_at' => null]);

        $this->assertFalse($sponsor->hasExpired);
    }

    /** @test */
    public function the_sponsorship_did_not_expire_when_the_expiration_date_is_in_the_future(): void
    {
        Carbon::setTestNow('2021-01-01 00:00:00');
        $sponsor = Sponsor::factory()->create(['expires_at' => now()->addSecond()]);

        $this->assertFalse($sponsor->hasExpired);
        Carbon::setTestNow();
    }
}
