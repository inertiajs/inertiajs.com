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

    public static function githubSponsorsViewerIsNotSponsoringUser(): void
    {
        Http::fake([
            'https://api.github.com/graphql' => Http::response([
                'data' => [
                    'user' => [
                        'viewerIsSponsoring' => false,
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

    public static function githubSponsorsViewerIsNotSponsoringOrganization(): void
    {
        Http::fake([
            'https://api.github.com/graphql' => Http::response([
                'data' => [
                    'user' => null,
                    'organization' => [
                        'viewerIsSponsoring' => false,
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

    public static function githubSponsorsInvalidTokenError()
    {
        Http::fake([
            'https://api.github.com/graphql' => Http::response([
                'message' => 'Bad credentials',
                'documentation_url' => 'https://docs.github.com/graphql',
            ], 401),
        ]);
    }

    public static function discordBotInvalidToken()
    {
        Http::fake([
            'https://discord.com/api/*' => Http::response([
                'message' => '401: Unauthorized',
                'code' => 0,
            ], 401),
        ]);
    }

    public static function discordManageRole()
    {
        Http::fake([
            'https://discord.com/api/guilds/invalid-guild/members/*/roles/*' => Http::response([
                'message' => 'Unknown Guild',
                'code' => 10004,
            ], 404),
            'https://discord.com/api/guilds/*/members/invalid-member/roles/*' => Http::response([
                'user_id' => ['Value "invalid-member" is not snowflake.'],
            ], 400),
            'https://discord.com/api/guilds/*/members/*/roles/invalid-role' => Http::response([
                'message' => 'Unknown Role',
                'code' => 10011,
            ], 404),
            'https://discord.com/api/guilds/*/members/*/roles/*' => Http::response(null, 204),
        ]);
    }
}
