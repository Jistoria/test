<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UserDefault extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:default';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('User default created');
        $user = new \App\Models\User();
        $user->name = 'Test';
        $user->email = 'test@gmail.com';
        $user->password = 'test';
        $user->save();
    }
}
