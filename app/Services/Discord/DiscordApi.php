<?php

namespace App\Services\Discord;

use App\Models\DiscordUser;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

class DiscordApi
{
    protected DiscordUser $user;

    protected function __construct(DiscordUser $user)
    {
        $this->user = $user;
    }

    public static function actingAs(DiscordUser $user): self
    {
        return new self($user);
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

    /**
     * @throws RequestException
     */
    public function getJson(string $endpoint)
    {
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

            $this->renewTokens();

            return $request();
        }
    }
}
