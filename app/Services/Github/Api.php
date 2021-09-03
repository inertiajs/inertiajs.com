<?php

namespace App\Services\Github;

use App\Services\Github\Exceptions\BadCredentialsException;
use Illuminate\Support\Facades\Http;

class Api
{
    /**
     * Determine whether the token owner is sponsoring the given GitHub account.
     *
     * @param string $account
     * @param string $token
     * @throws BadCredentialsException
     * @return bool
     */
    public function isSponsoring(string $account, string $token): bool
    {
        $response = Http::withToken($token)
            ->asJson()
            ->post('https://api.github.com/graphql', [
                'query' => <<<'EOF'
                    query($account: String!) {
                      user(login: $account) {
                        viewerIsSponsoring
                      },
                      organization(login: $account) {
                        viewerIsSponsoring
                      }
                    }
                EOF,
                'variables' => [
                    'account' => $account,
                ],
            ]);

        if ($response->clientError() && str_contains($response->body(), 'Bad credentials')) {
            throw new BadCredentialsException($response->body());
        }

        return $response->json('data.user.viewerIsSponsoring', false)
            || $response->json('data.organization.viewerIsSponsoring', false);
    }
}
