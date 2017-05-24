# Sample Module  

[TOC]

An example module may be downloaded from 
the [git location](https://github.com/antaresproject/sample_module.git) or installation appearance may be added using composer:

```bash
composer require antaresproject/module-sample_module:0.9.2.2-dev
```
More information about using composer you can find in official [documenation](https://getcomposer.org/doc/).

In order to create a new module which will be compatible with 
master module's packs, core and frontend, you should:

## Using GIT 

### Create a new project git repository
 
You can use [github](https://github.com), [bitbucket](https://bitbucket.org/) or different. 
It doesn't matter where you put your repository.
    
![git_repo](../img/docs/tutorials/git_repo.PNG)
     
### Clone repository files into local

Using following command:

```bash
git clone https://github.com/mountstone/sample_module.git
```


## Add files to module

Before starts read this article, it is recommended to get info about [module base](../modules_development/module_base.md).

### Base structure

Following files are minimal requirements for module to work:

#### Acl

Create file `acl.php` in base path of your module:

```php
<?php

use Antares\Acl\RoleActionList;
use Antares\Model\Role;

$presentationActions=[
     'Items List'  //'Allows user to preview items list.',   
];
$actions = [    
    'Item Add',     //'Allows user to add item.',
    'Item Update',  //'Allows user to update item.',
    'Item Delete'   //'Allows user to delete item.',    
];


$permissions = new RoleActionList;
$permissions->add(Role::admin()->name, array_merge($presentationActions,$actions));
$permissions->add(Role::member()->name, $presentationActions);

return $permissions;
```

This file determines which roles (for example admins, users, members, reporters etc.) should have access to action.
Action is the name of resource (endpoint) where logic is implemented.  For example, viewing any items list or updating is an operation with name. This name is called an action.

By example above, member has access to view list of items, but not to add, update or delete any of items:
 
```php
$permissions->add(Role::member()->name, $presentationActions);
```
 
 Only admin is able to have full access to all operations:
  
```php
$permissions->add(Role::admin()->name, array_merge($presentationActions,$actions));
``` 

More details about acl you find [here](../modules_development/acl.md)
 
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

AS you can see we are using [Twig Engine](https://twig.sensiolabs.org/) to generate views. 



3. Add a configuration in the composer.json file. 
composer.json file's example:

```json
{
    "type": "project",
    "repositories": [
        {
            "type": "git",
            "url": "https://github.com/antaresproject/foo.git"
        }       
    ],
    "require": {
        "antaresproject/component-foo": "master",
        "mnsami/composer-custom-directory-installer": "1.1.*"       
    },   
    "config": {
        "preferred-install": "dist",
        "secure-http": false
    },
    "prefer-stable": true,
    "minimum-stability": "dev"   
}
```

In the abovementioned example, the module named as 'foo' has been added from the [repository](https://github.com/antaresproject/foo) and project's branch master. Thus, if several developers work on  the 'foo' module and save its changes, the command

```bash
composer update
```

will always download the latest modules version. The same procedure concerns 'core' and the remaining modules and vendors which belong to application.

An example of the whole file defining project's settings is depicted below:

```json
{
    "name": "antaresproject/project",
    "type": "project",
    "prefer-stable": true,
    "minimum-stability": "dev",
    "authors": [{
            "name": "Antares Developer",
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
            "url": "https://github.com/antaresproject/module.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/logger.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/updater.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/translations.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/widgets.git"
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
            "url": "https://github.com/antaresproject/control.git"
        },
        {
            "type": "git",
            "url": "https://github.com/antaresproject/automation.git"
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
        }
    ],
    "require": {
        "antaresproject/core": "0.9.2.x-dev",
        "antaresproject/component-module": "dev-master",
        "antaresproject/component-logger": "0.9.2.x-dev",
        "antaresproject/component-updater": "0.9.2.x-dev",
        "antaresproject/component-translations": "0.9.2.x-dev",
        "antaresproject/component-widgets": "0.9.2.x-dev",
        "antaresproject/component-tester": "0.9.2.x-dev",
        "antaresproject/component-notifications": "0.9.2.x-dev",
        "antaresproject/component-customfields": "0.9.2.x-dev",
        "antaresproject/component-control": "0.9.2.x-dev",
        "antaresproject/component-automation": "0.9.2.x-dev",
        "antaresproject/component-search": "0.9.2.x-dev",
        "antaresproject/component-api": "0.9.2.x-dev",
        "antaresproject/component-ban-management": "0.9.2.x-dev",
        "antaresproject/component-two-factor-auth": "dev-master",
        "laravel/framework": "5.2.*",
        "mnsami/composer-custom-directory-installer": "1.1.*",
        "laravie/html": "~5.2.1",
        "laravelcollective/html": "5.2.*",
        "barryvdh/laravel-ide-helper": "^2.0@dev",
        "barryvdh/laravel-debugbar": "^2.2@dev",
        "phpunit/phpunit": "5.0.*",
        "doctrine/dbal": "master",
        "tymon/jwt-auth": "1.0.*",
        "brainboxlabs/brain-socket": "^1.0",
        "kriswallsmith/assetic": "^1.3",
        "predis/predis": "v1.1.*",
        "barryvdh/laravel-cors": "v0.8.*",
        "twig/twig": "v1.30.0",                                 
        "rcrowe/twigbridge": "^0.9.0",
        "satooshi/php-coveralls": "~0.7"
    },
    "require-dev": {
        "symfony/security-core": "master",
        "fzaninotto/faker": "master",
        "mockery/mockery": "0.9.*",
        "davejamesmiller/laravel-breadcrumbs": "dev-master",
        "linfo/linfo": "dev-master"
    },
    "autoload": {
        "classmap": [
            "resources/database",
            "src/core",
            "src/components",
            "src/modules"
        ],
        "psr-4": {
            "App\\": "app/",
            "Installer\\": "app/Installer/src",
            "Antares\\Control\\": "src/components/control/src",
            "Antares\\Brands\\": "src/core/brands/src",
            "Antares\\Users\\": "src/components/users/src"
        }
    },
    "extra": {
        "branch-alias": {
            "0.9.2.x-dev": "0.9.0-dev"
        },
        "installer-paths": {
            "./src/core": ["antaresproject/core"]           
        }
    },    
    "scripts": {
        "pre-update-cmd": [
            "Installer\\EnvironmentScripts::preUpdate"
        ],
        "pre-install-cmd": [
            "Installer\\EnvironmentScripts::preInstall"
        ],
        "post-install-cmd": [
            "Installer\\ComposerScripts::postUpdate",
            "php artisan clear-compiled",
            "php artisan ide-helper:generate",
            "php artisan key:generate"
        ],
        "post-update-cmd": [
            "php artisan clear-compiled",
            "php artisan ide-helper:generate"
        ],
        "post-create-project-cmd": [
            "php artisan key:generate"
        ]
    },
    "config": {
        "preferred-install": "dist",
        "secure-http": false
    }    
}
```

In the file composer.json which belongs to a project you can control the modules which you want to be installed in your application. You can also control module's versions by specifying the branches, as it was described above.

