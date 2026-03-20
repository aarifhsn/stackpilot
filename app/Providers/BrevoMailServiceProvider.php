<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Symfony\Component\Mailer\Bridge\Brevo\Transport\BrevoTransportFactory;
use Symfony\Component\Mailer\Transport\Dsn;

class BrevoMailServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->afterResolving('mail.manager', function ($manager) {
            $manager->extend('brevo', function () {
                $factory = new BrevoTransportFactory();
                return $factory->create(new Dsn(
                    'brevo+api',
                    'default',
                    config('services.brevo.key')
                ));
            });
        });
    }
}