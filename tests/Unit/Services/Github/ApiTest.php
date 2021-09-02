<?php

namespace Tests\Unit\Services\Github;

use App\Services\Github\Api as GithubApi;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\Fixtures\HttpFakes;
use Tests\TestCase;

class ApiTest extends TestCase
{
    /** @test */
    public function the_github_user_is_being_sponsored_by_the_token_owner(): void
    {
        HttpFakes::githubSponsorsViewerIsSponsoringUser();

        $response = app(GithubApi::class)->isSponsoring('bar', 'foo');

        $this->assertTrue($response);
        Http::assertSentCount(1);
        Http::assertSent(function (Request $request) {
            $this->assertSame('Bearer foo', $request->header('Authorization.0'));
            $this->assertSame('bar', $request->data()['variables']['account']);

            return true;
        });
    }
}
