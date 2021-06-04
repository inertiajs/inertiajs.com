<?php

namespace App\Console\Commands;

use App\Jobs\UpdateDiscordUserConnections;
use App\Models\DiscordUser;
use Illuminate\Console\Command;

class CheckDiscordUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'discord:check-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Checks all active Discord users for profile changes.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        DiscordUser::active()->chunk(25, function ($users) {
            foreach ($users as $user) {
                dispatch(new UpdateDiscordUserConnections($user));
            }
        });

        return 0;
    }
}
