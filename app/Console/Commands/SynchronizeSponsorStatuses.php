<?php

namespace App\Console\Commands;

use App\Jobs\SynchronizeSponsorStatus;
use App\Models\User;
use Illuminate\Console\Command;

class SynchronizeSponsorStatuses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sponsors:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Syncs the current sponsor status of all users.';

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
        User::chunk(25, function ($users) {
            $users->each(fn (User $user) => SynchronizeSponsorStatus::dispatch($user));
        });

        return 0;
    }
}
