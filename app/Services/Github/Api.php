<?php

namespace App\Services\Github;

use App\Services\Github\Exceptions\BadCredentialsException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class Api
{
    /**
     * Executes the GraphQL Query against the Github API.
     *
     * @param  string $token
     * @param  string $query
     * @param  array $variables
     * @throws BadCredentialsException
     * @return Response
     */
    protected function executeGraphQuery(string $token, string $query, array $variables = []): Response
    {
        $response = Http::withToken($token)
            ->asJson()
            ->post('https://api.github.com/graphql', [
                'query' => $query,
                'variables' => $variables,
            ]);

        if ($response->clientError() && str_contains($response->body(), 'Bad credentials')) {
            throw new BadCredentialsException($response->body());
        }

        return $response;
    }

    /**
     * Determine whether the token owner is sponsoring the given GitHub account.
     *
     * @param  string $account
     * @param  string $token
     * @throws BadCredentialsException
     * @return bool
     */
    public function isSponsoring(string $account, string $token): bool
    {
        $query = <<<'EOF'
            query($account: String!) {
              user(login: $account) {
                viewerIsSponsoring
              },
              organization(login: $account) {
                viewerIsSponsoring
              }
            }
        EOF;

        $response = $this->executeGraphQuery($token, $query, [
            'account' => $account,
        ]);

        return $response->json('data.user.viewerIsSponsoring', false)
            || $response->json('data.organization.viewerIsSponsoring', false);
    }

    /**
     * Retrieves the Github Organization ID's that the token owner is part of.
     *
     * @param  string $token
     * @throws BadCredentialsException
     * @return array
     */
    public function organizationIds(string $token): array
    {
        $query = <<<'EOF'
            query {
              viewer {
                organizations(first: 100) {
                  nodes {
                    databaseId
                  }
                }
              }
            }
        EOF;

        $response = $this->executeGraphQuery($token, $query);

        return Collection::make($response->json('data.viewer.organizations.nodes'))
            ->pluck('databaseId')
            ->all();
    }
}
