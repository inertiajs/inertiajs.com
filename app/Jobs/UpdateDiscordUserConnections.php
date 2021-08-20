<?php

namespace App\Jobs;

use App\Models\DiscordUser;
use App\Services\Discord\Discord;
use App\Services\Discord\Exceptions\InvalidAuthorizationException;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class UpdateDiscordUserConnections implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * Calculate the number of seconds to wait before retrying the job.
     *
     * @return array
     */
    public function backoff()
    {
        return [1, 5, 10];
    }

    /**
     * @var DiscordUser
     */
    public $discordUser;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(DiscordUser $discordUser)
    {
        $this->discordUser = $discordUser;
    }

    /**
     * Execute the job.
     *
     * @return void
     * @throws \Illuminate\Http\Client\RequestException
     */
    public function handle()
    {
        try {
            $response = Discord::asUser($this->discordUser)->getJson('/users/@me/connections');
        } catch (InvalidAuthorizationException $exception) {
            $response = Collection::make([]);
        }

        $connections = Collection::make($response)
            ->filter(fn ($connection) => ! ($connection['revoked'] ?? false))
            ->filter(fn ($connection) => $connection['verified'])
            ->mapWithKeys(fn ($item) => [$item['type'] => $item['name']]);

        $this->discordUser->github_login = $connections->get('github');

        if ($this->discordUser->isDirty()) {
            $this->discordUser->save();

            dispatch(new UpdateDiscordRoleAssignment($this->discordUser));
        }
    }
}
