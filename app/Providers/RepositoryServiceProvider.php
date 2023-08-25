<?php

namespace App\Providers;

use App\Interfaces\Clients\ClientRepositoryInterface;
use App\Interfaces\Commands\CommandRepositoryInterface;
use App\Repository\Clients\ClientRepository;
use App\Repository\Commands\CommandRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(ClientRepositoryInterface::class, ClientRepository::class);
        $this->app->bind(CommandRepositoryInterface::class, CommandRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
