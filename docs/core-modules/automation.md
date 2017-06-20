# Automation  

[TOC]

## Introduction

Automation is a module used to execute cyclic operations based on [laravel task scheduler](https://laravel.com/docs/5.4/scheduling). It relieves you of the necessity of setting up your own cron jobs and makes the entire process easier to manage. It provides an intuitive control interface on the admin level. Automation can run tasks every few minutes, hourly, daily or weekly - depending on how you set it up. Scheduled data are stored in the system's database.

## Basis

The operation is defined as a class that inherits from the `Antares\View\Console\Command` object, thanks to which it can be correctly recognized and interpreted in the system. A type of operation is usually a process running in the background (e.g. sending of e-mail notifications), or reports' generation which usually affects the application's efficiency. The component as a whole is a cron's substitute in a server and it is based on the activation of the command:

```bash
php artisan queue:start
```

Activation of the command results in launching all operations (jobs) from the *jobs* table. The process assigned to the command is a demon and operates in a continuous mode while monitoring the *jobs* table in terms of new operations.
An example of a class that executes the task within *automation*:

```php
<?php
 
namespace Antares\Foo\Console;
 
use Antares\View\Console\Command;
 
class FooCommand extends Command
{
 
    /**
     * human readable command name
     *
     * @var String
     */
    protected $title = 'Sample Foo Command';
 
    /**
     * when command should be executed
     *
     * @var String
     */
    protected $launched = 'daily';
 
    /**
     * when command can be executed
     *
     * @var array
     */
    protected $availableLaunches = [
        'everyMinute',
        'everyFiveMinutes',
        'everyTenMinutes',
        'everyThirtyMinutes',
        'hourly',
        'daily'
    ];
 
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'foo';
 
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sample foo command';
 
    /**
     * whether command can be disabled
     *
     * @var boolean
     */
    protected $disablable = true;
 
    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->line('Sample foo command has been launched.');
    }
}
```

To make the command visible in the *automation* space, execute the following command:

```bash
php artisan automation:sync
```

It is responsible for synchronization of all commands' instances in the system. This process is usually launched automatically when the system works within the *WatchDog* service. The command leads to adding an instance to the *tbl_jobs* table which is responsible for preserving all system commands:

  ![AT_AUTO01.PNG](../img/docs/core_modules/automation/AT_AUTO01.PNG)
  
There is a possibility to launch only the command from the console. To this end, you have to inform the Laravel environment about such a command (the *boot* method) in the service provider:

```php
$this->commands(FooCommand::class);
```

Then, based on the command's example shown above, the launching is:

```bash
php artisan foo
```

And the result:

  ![AT_AUTO02.PNG](../img/docs/core_modules/automation/AT_AUTO02.PNG)
  
The table responsible for preserving the results of particular commands' operations is *tbl_job_results*, in case of errors it is: *tbl_job_errors*. The table responsible for commands' categories is *tbl_jobs_category*. Categories are added automatically if they were not defined earlier under the *automation:sync* process.

## Parameters

The *automation* command consists of the following parameters:

* title - determines the title of a command, it should be concise, comprehensible, and should determine the command's intended use
* launched - determines the default frequency of launching the command
* availableLaunches - determines the abilities of changing the launch frequency, it is available during the edition of the command under the automation. It accepts the following default values:

```php
/**
 * when command can be executed
 *
 * @var array
 */
protected $availableLaunches = [
    'everyFiveMinutes',
    'everyTenMinutes',
    'everyThirtyMinutes',
    'hourly',
    'daily',
    'dailyAt'    => '13:00',
    'twiceDaily' => [1, 13],
    'weekly',
    'monthly',
    'quarterly',
    'yearly'
];

```

* description - description of the command
* disablable - defines whether the command can be deactivated at the GUI interface level by a user (default value: true)
* category - a category that the command belongs to (default value: system), created solely for the grouping purposes

Each command may overwrite the edition form that enables full configuration flexibility of a command. By default the edition form appears in the following manner:

  ![AT_AUTO03.PNG](../img/docs/core_modules/automation/AT_AUTO03.PNG)
  
Overwriting of the form is possible through the overwriting of the *form()* method - its definition can be found in the base class. The following options are available on a particular line that is a command in automation:

  ![AT_AUTO04.PNG](../img/docs/core_modules/automation/AT_AUTO04.PNG)
  
'Show logs' is used to preview the results of commands' operation, 'Run' activates the command at the interface level (adding to he task execution queue), whereas 'Edit' displays the edition form of command's parameters.
