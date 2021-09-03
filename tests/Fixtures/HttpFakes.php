<?php

namespace Tests\Fixtures;

use Illuminate\Support\Facades\Http;

class HttpFakes
{
    public static function githubSponsorsViewerIsSponsoringUser(): void
    {
        Http::fake([
            'https://api.github.com/graphql' => Http::response([
                'data' => [
                    'user' => [
                        'viewerIsSponsoring' => true,
                    ],
                    'organization' => null,
                ],
                'errors' => [
                    [
                        'type' => 'NOT_FOUND',
                        'path' => [
                            'organization',
                        ],
                        'locations' => [
                            'line' => 5,
                            'column' => 3,
                        ],
                        'message' => "Could not resolve to an Organization with the login of 'reinink'.",
                    ],
                ],
            ]),
        ]);
    }

    public static function githubSponsorsViewerIsSponsoringOrganization(): void
    {
        Http::fake([
            'https://api.github.com/graphql' => Http::response([
                'data' => [
                    'user' => null,
                    'organization' => [
                        'viewerIsSponsoring' => true,
                    ],
                ],
                'errors' => [
                    [
                        'type' => 'NOT_FOUND',
                        'path' => [
                            'user',
                        ],
                        'locations' => [
                            'line' => 2,
                            'column' => 7,
                        ],
                        'message' => "Could not resolve to a User with the login of 'laravel'.",
                    ],
                ],
            ]),
        ]);
    }
}
