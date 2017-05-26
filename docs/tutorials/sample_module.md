# Sample Module  

[TOC]

An example module may be downloaded from 
the [git location](https://github.com/antaresproject/sample_module.git) or installation appearance may be added using composer:

```bash
composer require antaresproject/module-sample_module:0.9.2.2-dev
```
More information about using composer you can find in official [documenation](https://getcomposer.org/doc/).


## Module structure

Before starts read this article, it is recommended to get info about [module base](../modules_development/module_base.md).

### Base structure

Following files are minimal requirements for module to work:

#### Acl

Create file `acl.php` in base path of your module:

```php
<?php

use Antares\Acl\RoleActionList;
use Antares\Model\Role;
use Antares\Acl\Action;

$presentationActions = [
    new Action('sample_module.items.index', 'Items List'),   //'Allows user to preview items list.',
];
$actions             = [
    new Action('sample_module.item.add', 'Item Add'),        //'Allows user to add item.',
    new Action('sample_module.item.update', 'Items Update'), //'Allows user to update item.',
    new Action('sample_module.item.delte', 'Items Delete'),  //'Allows user to delete item.',
];


$permissions = new RoleActionList;
$permissions->add(Role::admin()->name, array_merge($presentationActions, $actions));
$permissions->add(Role::member()->name, $presentationActions);
return $permissions;
```

This file determines which roles (for example admins, users, members, reporters etc.) should have access to action.
Action is the name of resource (endpoint) where logic is implemented.  For example, viewing any items list or updating is an operation with name. This name is called an action.
First argument of class constructor is the name of route which will be used to specify valid urls.

By example above, member has access to view list of items, but not to add, update or delete any of items:
 
```php
$permissions->add(Role::member()->name, $presentationActions);
```
 
 Only admin is able to have full access to all operations:
  
```php
$permissions->add(Role::admin()->name, array_merge($presentationActions,$actions));
``` 

More details about acl you find [here](../modules_development/acl.md).
 
#### Providers
 
Create file `providers.php` in base path of your module:
 
```php
<?php

return [
    Antares\Modules\SampleModule\SampleModuleServiceProvider::class,
]; 
```

As you can see, this file returns class names of [service providers](../modules_development/service_providers.md) used by module. Service provider is the most important file within module. 
It's like a bootstrap where module starts its work.
 
#### Composer
 
Create file `composer.json` in base path of module:
 
```php
{
    "name": "mountstone/module-sample_module",
    "description": "My first sample module",
    "type": "antaresproject-module",
    "version": "0.1",
    "homepage": "http://example.foo",
    "authors": [
        {
            "name": "Antares developer",
            "email": "developer@antaresproject.io"
        }
    ],
    "require-dev": {
        "antaresproject/component-installer-plugin": "*"
    },
    "autoload": {
        "psr-4": {
            "Antares\\Modules\\SampleModule\\": "src/"
        }
    },
    "extra": {
        "friendly-name": "My Module"
    }
}
``` 
Description of keys in `composer.json` file is [here](../modules_development/module_base.md#composerjson-schema).

#### Service provider

Create file `SampleModuleServiceProvider.php` in src subdirectory within module base path:
 
```php
<?php

namespace Antares\Modules\SampleModule;

use Antares\Foundation\Support\Providers\ModuleServiceProvider;

class SampleModuleServiceProvider extends ModuleServiceProvider
{

    /**
     * Controller's namespace
     *
     * @var String
     */
    protected $namespace = 'Antares\Modules\SampleModule\Http\Controllers\Admin';

    /**
     * Route group name
     *
     * @var String
     */
    protected $routeGroup = 'antares/sample_module';

    /**
     * {@inheritdoc}
     */
    protected function bootExtensionComponents()
    {
        $path = __DIR__ . '/../resources';
        $this->addViewComponent('antares/sample_module', 'antares/sample_module', "{$path}/views");
        $this->bootMemory();
    }

    /**
     * Boot extension routing.
     *
     * @return void
     */
    protected function loadRoutes()
    {
        $this->loadBackendRoutesFrom(__DIR__ . "/backend.php");
    }

    /**
     * Booting memory
     * 
     */
    protected function bootMemory()
    {
        $this->app->make('antares.acl')->make('antares/sample_module')->attach($this->app->make('antares.platform.memory'));
    }
}
```
If you want to know more about working service providers, please go to [Service Providers](../modules_development/service_providers.md) section.

#### Routes

Your module should display any content via route. To define route names, create `backend.php` file which determine endpoints for controller's actions:

```php
<?php

use Illuminate\Routing\Router;

$router->group(['prefix' => 'my_module'], function (Router $router) {    
    $router->get('index', 'ModuleController');
});
```
Details about routing in Antares you can find [here](../modules_development/routing.md). 
In the example above your module will be available under the endpoint `/{area}/my_module/index`. 

> `{area}` is the name of access layer where user is assigned (for example admin, user, redactor, etc.).

#### Controller

Controllers are used to process the requests coming from a browser and declare the behavior according to the parameters.
Create to file `ModuleController.php` in the `src\Http\Controllers\Admin\` location in module base path:

```php
<?php

namespace Antares\Modules\SampleModule\Http\Controllers\Admin;

use Antares\Foundation\Http\Controllers\AdminController;

class ModuleController extends AdminController
{

    /**
     * {@inheritdoc}
     */
    public function setupMiddleware()
    {
        $this->middleware('antares.auth');
        $this->middleware("antares.can:antares/sample_module::items-list", ['only' => ['index']]);
    }

    /**
     * Default action od module controller
     * 
     * @return View
     */
    public function index()
    {
        return view('antares/sample_module::admin.module.index');
    }

}
```
Controller class contains method `setupMiddleware()` which determines rules of access to actions.
This controller has only one action `index()` and only one rule `items-list` is assigned to it. Because of fact that
Antares is modular application, first argument of `middleware` should have the name of module in following format: 
`antares.can:antares/<module_name>::<rule_name>`. More details about middleware's in Antares you can find [here](../modules_development/acl.md#verification-at-the-controllers-level). 

#### View

In the previous example method `index()` will show view `antares/sample_module::admin.module.index` which is placed in location:
`resources/views/admin/module/index.twig`. Let's create it:

```twig
{% extends "antares/foundation::layouts.antares.index" %}   
{% block content %} 
    This is my first module
{% endblock %}    
```

As you can see we are using [Twig Engine](https://twig.sensiolabs.org/) to generate views.
The result of our module should have following structure:

![sample_module_structure](../img/docs/tutorials/sample_module_structure.PNG)

Module source should be copied to directory of modules within Antares file structure. The location of directory is in the src directory in Antares base path. 
More information about Antares files you can find [here](../antares_concepts/core_&_files_structure.md).

#### Installing and activating

Go to console and run following command:

```bash
$ php artisan extension:install antaresproject/module-sample_module --skip-composer --active
```
As you can see the name of installed module is the same with name from your `composer.json` file.
In the image below is an example of installation result:

![sample_module_install](../img/docs/tutorials/sample_module_install.PNG)

You can also install a module using "component" section with is described [here](../modules_development/module_base.md#user-interface).

## Add module to project

### Using GIT 

#### Create a new project git repository
 
You can use [github](https://github.com), [bitbucket](https://bitbucket.org/) or different git-based version control system.
    
![git_repo](../img/docs/tutorials/git_repo.PNG)
     
#### Clone repository files into local

Using following command:

```bash
$ git clone https://github.com/mountstone/sample_module.git
```  

#### Commit files into repository

Firstly you have to copy module source to directory where repository has been cloned. Then add files before commit:

```bash
$ git add *
```

commit new files:

```bash
$ git commit -am "ADD: initial commit"
```

and push:

```bash
$ git push
```

#### Add repository to composer

If you want to add you module to project it's good practice to extends main `composer.json` file of Antares. The file is located in base path of application.
Typically the source of this file should have following content:

```json
{
    "name": "antaresproject/project",    
    "description": "Create management system for your employees, your customers and for yourself. Experience a completely new way of building standalone and SaaS applications.",
    "homepage": "http://antaresproject.io",
    "keywords": [
        "php",
        "laravel",
        "composer",
        "automation",
        "updater",
        "material-design",
        "rest-api",
        "logger",
        "installer",
        "logger",
        "user-management",
        "twofactorauth",
        "laravel-admin",
        "laravel-application",
        "updaters",
        "two-factor-authentication",
        "access-control",
        "updater",
        "antares",
        "antares-project",
        "boilerplate"
    ],        
    "license": "BSD-3-Clause",
    "type": "project",
    "prefer-stable": true,
    "minimum-stability": "dev",
    "authors": [{
            "name": "Antares Team",
            "email": "contact@antaresproject.io",
            "homepage": "http://antaresproject.io",
            "role": "developer"
        }
    ],    
    "repositories": [
        {
            "type": "git",
            "url": "https://github.com/antaresproject/core.git"
        },       
        {
            "type": "git",
            "url": "https://github.com/antaresproject/component-installer-plugin.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/search.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/api.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/ban_management.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/two_factor_auth.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/logger.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/translations.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/tester.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/notifications.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/customfields.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/acl.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/automation.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/users.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/installation.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/branding.git"
        }
    ],          
    "require": {
        "antaresproject/core": "0.9.2.x-dev",
        "laravel/framework": "5.4.*",
        "laravie/html": "5.4.*",
        "mnsami/composer-custom-directory-installer": "1.1.*",
        "antaresproject/component-installer-plugin": "0.9.2.1-dev",

        "antaresproject/module-api": "0.9.2.x-dev",
        "antaresproject/module-ban-management": "0.9.2.x-dev",
        "antaresproject/module-two-factor-auth": "dev-master",
        "antaresproject/module-search": "dev-master",        

        "antaresproject/component-logger": "0.9.2.x-dev",
        "antaresproject/component-translations": "dev-master",
        "antaresproject/component-tester": "0.9.2.x-dev",
        "antaresproject/component-notifications": "0.9.2.x-dev",
        "antaresproject/component-customfields": "0.9.2.x-dev",
        "antaresproject/component-acl": "dev-master",
        "antaresproject/component-automation": "0.9.2.x-dev",    

        "antaresproject/component-installer": "dev-master",
        "antaresproject/component-brands": "dev-master",
        "antaresproject/component-users": "dev-master",            

        "barryvdh/laravel-debugbar": "^2.2@dev",
        "regulus/activity-log": "^0.6.7",
        "arcanedev/log-viewer": "^4.3",
        "prettus/laravel-request-logger": "^1.0",
        "davejamesmiller/laravel-breadcrumbs": "dev-master"
    },        
    "autoload": {
        "classmap": [
            "resources/database",
            "src/core/src/modules",
            "src/modules"
        ],
        "psr-4": {
            "App\\": "app/",
            "Installer\\": "app/Installer/src"        
        }
    },
    "extra": {
        "installer-paths": {
            "./src/core": ["antaresproject/core"]
        }
    },    
    "scripts": {
        "post-root-package-install": [
            "php -r \"file_exists('.env') || copy('.env.example', '.env');\""
        ],
        "post-create-project-cmd": [
            "php artisan key:generate"
        ],
        "post-install-cmd": [
            "php artisan clear-compiled"
        ],
        "post-update-cmd": [
            "php artisan clear-compiled"
        ]        
    },
    "config": {
        "preferred-install": "dist",
        "secure-http": false
    }    
}
```
Section "repositories" contains information about where every part of system is located. For example:
 
```json
{
    "type": "git",
    "url": "https://github.com/antaresproject/branding.git"
}
```

Include information that branding is a git repository located at `https://github.com/antaresproject/branding.git`. 
Composer will download source file of "branding" from that, specified location. Section named "require" contains information
which version of repository should be user, for example:

```json
{
    "antaresproject/component-automation": "0.9.2.x-dev"
}
```

Will use version of 0.9.2 (branch) which is placed in github.

Going this route, you have to add following lines into `composer.json` file:

Section "repositories":

```json
{
    "type": "git",
    "url": "https://github.com/antaresproject/sample_module.git"
}
```

Section "require":

```bash
{
    "antaresproject/module-sample_module": "0.9.2.2-dev"
}
```

> Remember that presented example using a [Github](https://github.com) as pattern. 

> You are able to use any other git repository such as https://\<username\>@bitbucket.org/\<username\>/sample_module.git. 
To find out more about composer, go to [Composer Documentation](https://getcomposer.org/doc/).

### Using standalone files
 
You can create module which will be part of your application without using git. Just create module directory in `src/modules`
and copy module source files. Module will be available in "Modules" from "System" main menu:
 
![sample_module_result](../img/docs/tutorials/modules.png)
 
Right click on module will show context menu with install option. After click on it, modal dialog will be showed:
  
![module_install_web](../img/docs/tutorials/module_install_web.png)  
    
## Run first module action

As is mentioned previously we have created a file called `backend.php` which contain route definition.
The location of index action for you module include: `/<area>/<prefix>/<name>`   
The area is typically "admin", prefix is "my_module" and the name is "index", so our url is: /admin/my_module/index. 
Let's open it in the browser:

![sample_module_result](../img/docs/tutorials/sample_module_result.PNG)

After install module, browser will be refreshed automatically. That's all. You have created your own first Antares module with acl. 

## Create migrations

### Table schemas

Migrations are files containing scripts to create database schema which your module will use. It should be placed in following location:
`src/modules/<module_name>/resources/database/migrations`. To create migration file you can use predefined Laravel command:

```bash
php artisan make:migration sample_module
```

This command will generate the file in location `resources/database/migrations`. The filename has the following format:
`<YYYY>_<mm>_<dd>_<numeric>_sample_module.php`, for example: `2017_05_26_115716_sample_module.php`. You can just copy this file into module `migrations` directory.
Command to generate migrations within module namespace is not yet implemented. The migration file may contain following structure:

```php
<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CustomModuleTable extends Migration
{

    /**
     * Run the migrations.
     * 
     * @return void
     */
    public function up()
    {

        $this->down();

        Schema::create('tbl_custom_module', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index('user_id');
            $table->string('name');
            $table->text('value')->nullable();
        });

        Schema::table('tbl_custom_module', function(Blueprint $table) {
            $table->foreign('user_id', 'tbl_custom_module_ibfk_1')->references('id')->on('tbl_users')->onUpdate('NO ACTION')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     * 
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Schema::dropIfExists('tbl_custom_module');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
```
Above class contains two methods:
 - `up()` - is responsible for create tables in database. It is executed while installing module from web interface or from command line. More info about module commands is in [Module Base](../modules_development/module_base.md) section.  
 - `down()` - which is responsible for typically deletes tables from database. Is is executed while uninstalling module.

### Seeds
  
Little different type of migrations are seeds. 
Seeds, as the name suggests, are responsible for filling database with data. The location of seed files is the same as migrations: `resources/database/seeds`.
You can use Laravel command to create simple data seeder class:

```bash
php artisan make:seed sample_module
```
The file will be placed in the directory of `resources\database\seeds`, just copy created file to module namespace. Sample file of seeder class:

```php
<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ModuleSampleDataSeeder extends Seeder
{

    /**
     * Run the database seeding.
     *
     * @return void
     */
    public function run()
    {
        $users = users('member');
        if (empty($users)) {
            return;
        }
        $user = $users->first();

        $this->down();
        $faker  = Faker::create();
        $insert = [];
        for ($i = 0; $i < 2; $i++) {
            array_push($insert, [
                'user_id' => $user->id,
                'name'    => $faker->text(20),
                'value'   => '{"field_1":"1"}'
            ]);
        }
        DB::table('tbl_custom_module')->insert($insert);
        $widgetParamsSchemaPath = __DIR__ . '/schemas/widget_params.sql';
        if (file_exists($widgetParamsSchemaPath)) {
            DB::unprepared(file_get_contents($widgetParamsSchemaPath));
        }
    }
    /**
     * Delete all database occurences for sample module
     */
     public function down()
     {
         DB::statement('SET FOREIGN_KEY_CHECKS=0;');
         DB::table('tbl_custom_module')->truncate();
         DB::statement('SET FOREIGN_KEY_CHECKS=1;');
     }
}
```

It contains two method:

- `run()` - which is responsible for begin the seeding and executed while module installation is on the way
- `down()` - responsible for deletes data from database, and fires when uninstalling.

As you can see, the `run()` method has implementation of execution sql script from external file. It is sometime better solution than writing thousands of code lines in php.

### Notification seeds

Notification seed is specific type of Antares seed. 
It fill database tables (which is responsible for agregate notification templates) with information about notifications.
The file of notification seed should be placed in the same place as standard seed file - `resources/database/seeds` within module directory space.
The simple file of seeder:

```php
<?php


use Antares\Notifier\Seeder\NotificationSeeder;
use Illuminate\Support\Facades\DB;

class ModuleEmailNotification extends NotificationSeeder
{

    /**
     * Creates module notifications
     *
     * @return void
     */
    public function run()
    {
        DB::beginTransaction();
        try {
            $this->down();
            $this->addNotification([
                'category' => 'default',
                'severity' => 'high',
                'type'     => 'email',
                'event'    => 'email.sample-module-notification',
                'contents' => [
                    'en' => [
                        'title'   => 'Sample Email Template',
                        'content' => file_get_contents(__DIR__ . '/../../views/notification/module_sample_notification.twig')
                    ],
                ]
            ]);
        } catch (Exception $ex) {
            DB::rollback();
            throw $ex;
        }

        DB::commit();
    }

    /**
     * Deletes notifications while uninstalling
     *
     * @return void
     */
    public function down()
    {
        return $this->deleteNotificationByEventName([
                    'email.sample-module-notification',
        ]);
    }
}
```

Method `run()` is responsible for create new notification, and `down()` for delete.  More details is described in [Notifications](../core_modules/notifications.md#migration-files) core module. 

> Please note. The migration section of this article only presents an example of migrations. More information about migrations you can find in Antares [Migration](../modules_development/migrations.md) section and [Laravel documentation](https://laravel.com/docs/5.4/migrations).
  
## Create module item

Let's create some entries in database. First of all we have to overwrite `__contruct()` constructor with `ModuleProcessor` as argument:
```php
/**
 * Module processor instance
 *
 * @var ModuleProcessor
 */
 protected $processor;

 /**
  * Constructing
  * 
  * @param ModuleProcessor $processor
  */
public function __construct(ModuleProcessor $processor)
{
    parent::__construct();
    $this->processor = $processor;
}
```   
and create new method in our `ModuleController.php`:

```php
/**
 * Creates view with form to add new item
 * 
 * @return View
 */
  public function create()
  {
        $data = $this->processor->create();
        if (isset($data['errors'])) {
            return $this->redirectWithErrors(handles('antares::sample_module/create'), $data['errors']);
        }
        return view('antares/sample_module::admin.module.create', $data);
  }
```
Method `create()` will deliver the view with form to create new item. How about `ModuleProcessor` ? 
ModuleProcessor will operate the processing of a request coming from the controller’s action. 

To get more details about using other Antares functionalities, please read [Modules Development](../modules_development/module_base.md) and [Services](../services/assets.md).
All source code of sample module can be download from [Github](https://github.com/antaresproject/sample_module.git).