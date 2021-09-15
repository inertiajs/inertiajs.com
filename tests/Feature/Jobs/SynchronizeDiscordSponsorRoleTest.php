<?php

namespace Tests\Feature\Jobs;

use App\Jobs\SynchronizeDiscordSponsorRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Fixtures\HttpFakes;
use Tests\TestCase;

class SynchronizeDiscordSponsorRoleTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_assigns_the_role_when_the_user_is_a_sponsor(): void
    {
        HttpFakes::discordManageRole();
        $user = User::factory()->withGithub()->sponsoring()->withDiscord(['has_sponsor_role' => false])->create();
        $discordUser = $user->discordUser;
        $this->assertFalse($discordUser->has_sponsor_role);

        SynchronizeDiscordSponsorRole::dispatch($discordUser);

        $this->assertTrue($discordUser->fresh()->has_sponsor_role);
    }
}
