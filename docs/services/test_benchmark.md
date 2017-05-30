# Benchmark Test  

[TOC]

## Introduction  

Benchmark test (Testbench) is a set of tools which support unit tests writing. In order to apply testing environment it is necessary to inherit from the following class:

> The default path of test benchmark sources is `src/core/src/utils/testbench/`.

```php
\Antares\Testbench\TestCase
```

in the test class instead of `PHPUnit_Framework_TestCase`. Such a solution enables loading the application prepared for unit tests (fixture) and serves as a basic application's framework in Laravel so:

```php
<?php
 
class TestCase extends \Antares\Testbench\TestCase
{
    //
}
```

The whole solution has been taken from the [github website](https://github.com/orchestral/testbench) and developed for the project's purposes.

## Service Providers  

In order to add your own service provider you have to overwrite the `getPackageProviders` method as in the case below:

```php
protected function getPackageProviders($app)
{
    return ['Foo\FooServiceProvider'];
}
```

## Aliases  

In order to add an alias you have to overwrite the `getPackageAliases` method as below:

```php
protected function getPackageAliases($app)
{
    return [
        'Acme' => 'Foo\Facade'
    ];
}
```

## Setup  

Due to the fact that the class `Antares\Testbench\TestCase` overwrites the class `Illuminate\Foundation\Testing\TestCase` there might be a need to implement logic in the `setUp` method. In order to achieve this you have to call the base class' `setUp` method as it is shown below:

```php
/**
 * Setup the test environment.
 */
public function setUp()
{
    parent::setUp();
 
    // Your code here
}
```

## Environment  

There might be a need to set the boot environment data for a unit test. In order to achieve this you have to overwrite the `getEnvironmentSetup` method as below:

```php
/**
 * Define environment setup.
 *
 * @param  \Illuminate\Foundation\Application  $app
 * @return void
 */
protected function getEnvironmentSetUp($app)
{
    // Setup default database to use sqlite :memory:
    $app['config']->set('database.default', 'testbench');
    $app['config']->set('database.connections.testbench', [
        'driver'   => 'sqlite',
        'database' => ':memory:',
        'prefix'   => '',
    ]);
}
```

## Kernel Consoles  

It is possible that you will need to overwrite the console's instance. Then, you have to overwrite the `resolveApplicationConsoleKernel` method:

```php
/**
 * Resolve application Console Kernel implementation.
 *
 * @param  \Illuminate\Foundation\Application  $app
 * @return void
 */
protected function resolveApplicationConsoleKernel($app)
{
    $app->singleton('Illuminate\Contracts\Console\Kernel', 'Foo\Testbench\Console\Kernel');
}
```

## Http Kernel  

It might be necessary to overwrite the HTTP kernel's instance. Then, overwrite the `resolveApplicationHttpKernel` method:

```php
/**
 * Resolve application HTTP Kernel implementation.
 *
 * @param  \Illuminate\Foundation\Application  $app
 * @return void
 */
protected function resolveApplicationHttpKernel($app)
{
    $app->singleton('Illuminate\Contracts\Http\Kernel', 'Foo\Testbench\Http\Kernel');
}
```

## Timezone  

In order to overwrite the application's default time zone (UTC) you have to overwrite the `getApplicationTimezone` method:

```php
/**
 * Get application timezone.
 *
 * @param  \Illuminate\Foundation\Application  $app
 * @return string|null
 */
protected function getApplicationTimezone($app)
{
    return 'Europe/Warsaw';
}
```

## Migrations  

Quite frequently there is a need to use a database or its prototype in the form of sqllite base. Therefore, the environment provides the command which supports an absolute path instead of a relative one, in order to facilitate migration files' boot during the testing, as a parameter containing module's or component's path to the migration file:

```php
$this->artisan('migrate', [
    '--database' => 'testbench',
    '--realpath' => realpath(__DIR__.'/../migrations'),
]);
```

## 3rd Party  

Additional extensions which develop testbench functionality are available:

* [Testbench with CodeCeption](https://bitbucket.org/aedart/testing-laravel/wiki/Home)
* [Testbench with PHPSpec](https://github.com/Pixelindustries/phpspec-testbench)

## Troubleshoot  

When writing the tests draw your attention to the following error:

```php
RuntimeException: No supported encrypter found. The cipher and / or key length are invalid.
```

This error is connected with the lack of `APP_KEY`. Therefore, you have to point this key in the *phpunit.xml* file:

```xml
<phpunit>
 
    // ...
 
    <php>
        <env name="APP_KEY" value="AckfSECXIvnK5r28GVIWUAxmbBSjTsmF"/>
    </php>
 
</phpunit>
```

Another error:

```php
Session not set on request
```

The error above is connected with the use of the `old()` method for the *request* object and lack of middleware which is responsible for starting the session. The code below is a solution for the problem:

```php
$app->make('Illuminate\Contracts\Http\Kernel')->pushMiddleware('Illuminate\Session\Middleware\StartSession');
```

