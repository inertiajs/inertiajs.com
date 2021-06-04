<?php

namespace App\Services\Discord\Clients;

use App\Models\DiscordUser;
use App\Services\Discord\Exceptions\InvalidAuthorizationException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

class UserClient
{
    protected DiscordUser $user;

    public function __construct(DiscordUser $user)
    {
        $this->user = $user;
    }

    protected function renewTokens(): void
    {
        $freshToken = Http::baseUrl('https://discord.com/api')
            ->asForm()
            ->post('/oauth2/token', [
                'client_id' => config('services.discord.client_id'),
                'client_secret' => config('services.discord.client_secret'),
                'grant_type' => 'refresh_token',
                'refresh_token' => $this->user->refresh_token,
            ])
            ->throw()
            ->json();

        $this->user->access_token = $freshToken['access_token'];
        $this->user->refresh_token = $freshToken['refresh_token'];
        $this->user->save();
    }

    protected function revokeTokens(): void
    {
        $this->user->access_token = null;
        $this->user->refresh_token = null;
        $this->user->save();
    }

    /**
     * @throws RequestException
     */
    public function getJson(string $endpoint)
    {
        if (is_null($this->user->refresh_token)) {
            throw new InvalidAuthorizationException('User does not have any OAuth tokens.');
        }

        $request = fn () => Http::baseUrl('https://discord.com/api')
            ->withToken($this->user->access_token)
            ->get($endpoint)
            ->throw()
            ->json();

        try {
            return $request();
        } catch (RequestException $exception) {
            if (! in_array($exception->response->status(), [400, 401])) {
                throw $exception;
            }
        }

        try {
            $this->renewTokens();
        } catch (RequestException $exception) {
            if (in_array($exception->response->status(), [400, 401])) {
                $this->revokeTokens();
                throw InvalidAuthorizationException::fromRequestException($exception);
            }

            throw $exception;
        }

        return $request();
    }
}
