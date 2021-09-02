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
                ],
            ]),
        ]);
    }
}
