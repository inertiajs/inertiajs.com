<?php

namespace Tests\Unit\Services\Github;

use App\Services\Github\Api as GithubApi;
use App\Services\Github\Exceptions\BadCredentialsException;
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

    /** @test */
    public function the_github_user_is_not_being_sponsored_by_the_token_owner(): void
    {
        HttpFakes::githubSponsorsViewerIsNotSponsoringUser();

        $response = app(GithubApi::class)->isSponsoring('bar', 'foo');

        $this->assertFalse($response);
        Http::assertSentCount(1);
        Http::assertSent(function (Request $request) {
            $this->assertSame('Bearer foo', $request->header('Authorization.0'));
            $this->assertSame('bar', $request->data()['variables']['account']);

            return true;
        });
    }

    /** @test */
    public function the_github_organization_is_being_sponsored_by_the_token_owner(): void
    {
        HttpFakes::githubSponsorsViewerIsSponsoringOrganization();

        $response = app(GithubApi::class)->isSponsoring('bar', 'foo');

        $this->assertTrue($response);
        Http::assertSentCount(1);
        Http::assertSent(function (Request $request) {
            $this->assertSame('Bearer foo', $request->header('Authorization.0'));
            $this->assertSame('bar', $request->data()['variables']['account']);

            return true;
        });
    }

    /** @test */
    public function the_github_organization_is_not_being_sponsored_by_the_token_owner(): void
    {
        HttpFakes::githubSponsorsViewerIsNotSponsoringOrganization();

        $response = app(GithubApi::class)->isSponsoring('bar', 'foo');

        $this->assertFalse($response);
        Http::assertSentCount(1);
        Http::assertSent(function (Request $request) {
            $this->assertSame('Bearer foo', $request->header('Authorization.0'));
            $this->assertSame('bar', $request->data()['variables']['account']);

            return true;
        });
    }

    /** @test */
    public function it_retrieves_a_list_of_github_organization_ids_that_the_token_owner_is_a_part_of(): void
    {
        HttpFakes::githubOrganizations();

        $response = app(GithubApi::class)->organizationIds('foo');

        $this->assertCount(3, $response);
        $this->assertSame(958072, $response[0]);
        $this->assertSame(39676034, $response[1]);
        $this->assertSame(47703742, $response[2]);
        Http::assertSentCount(1);
        Http::assertSent(function (Request $request) {
            $this->assertSame('Bearer foo', $request->header('Authorization.0'));
            $this->assertEmpty($request->data()['variables']);

            return true;
        });
    }

    /** @test */
    public function it_throws_an_exception_when_an_invalid_token_is_used_when_checking_the_sponsor_status(): void
    {
        HttpFakes::githubSponsorsInvalidTokenError();

        $this->expectException(BadCredentialsException::class);

        app(GithubApi::class)->isSponsoring('bar', 'foo');
    }

    /** @test */
    public function it_throws_an_exception_when_an_invalid_token_is_used_when_checking_the_user_organizations(): void
    {
        HttpFakes::githubSponsorsInvalidTokenError();

        $this->expectException(BadCredentialsException::class);

        app(GithubApi::class)->organizationIds('bar');
    }
}
