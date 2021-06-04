<?php

namespace App\Jobs;

use App\Models\DiscordUser;
use App\Services\Discord\DiscordApi;
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
    public $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(DiscordUser $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     * @throws \Illuminate\Http\Client\RequestException
     */
    public function handle()
    {
        $response = DiscordApi::actingAs($this->user)->getJson('/users/@me/connections');

        $connections = Collection::make($response)
            ->filter(fn ($connection) => ! ($connection['revoked'] ?? false))
            ->filter(fn ($connection) => $connection['verified'])
            ->mapWithKeys(fn ($item) => [$item['type'] => $item['name']]);

        $this->user->github_account = $connections->get('github');
        $this->user->save();
    }
}
