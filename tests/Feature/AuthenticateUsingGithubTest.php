<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;
use Tests\TestCase;

class AuthenticateUsingGithubTest extends TestCase
{
    /** @test */
    public function it_redirects_to_github_in_order_to_sign_in(): void
    {
        Socialite::shouldReceive('driver->setScopes->redirect')->andReturn(Redirect::to('socialite-redirect.test'));

        $this->get('/auth/github')->assertRedirect('socialite-redirect.test');
    }
}
