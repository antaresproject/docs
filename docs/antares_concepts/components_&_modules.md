#Components & Modules  

[TOC]

##Structure  

###Minimal Structure  

A component should consist of the minimal structure:

  ![AT_COMP&MODS1](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/antares_concepts/components_and_modules/AT_COMP&MODS1.PNG)
  
**composer.json** file's content:

```php
{
    "name": "components/foo",
    "description": "Antares Foo Component",
    "authors": [
        {
            "name": "Łukasz Cirut",
            "email": "lukasz.cirut@inbs.software"
        }
    ],
    "require": {
        "php": ">=5.5.9"
    }
}
```

* name - determines the name - identifier of a component in a repository. The name must be unique within a repository group.

A description of the remaining variables can be found [here](https://getcomposer.org/doc/04-schema.md).

**manifest.json** file's content:

```php
{
    "name": "foo",
    "full_name": "Foo Component",
    "description": "Foo Component",
    "author": "Łukasz Cirut",
    "url": "https://antares.com/docs/foo",
    "version": "0.5",
    "provides": [
        "Antares\\Foo\\FooServiceProvider"
    ]
}
```

* name - determines a component's name abbreviation. It cannot contain special characters, spaces.
* full_name - full name of a component
* description - a component's operation description
* provides - a register of service providers used by a component.

Service provider's file structure:

```php
<?php

namespace Antares\Foo;

use Antares\Foundation\Support\Providers\ModuleServiceProvider;
use Illuminate\Routing\Router;

class FooServiceProvider extends ModuleServiceProvider
{

public function boot(Router $router)
{
parent::boot($router);
}
}
```

In the abovementioned example service provider must inherit from the class ModuleServiceProvider.

###Full Structure  

The full component's catalogue structure should be determined in a manner depicted below:

  ![AT_COMP&MODS2](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/antares_concepts/components_and_modules/AT_COMP&MODS2.PNG)
  
4 main subcatalogues may be distinguished: public, resources, src, tests.

###Public  

In this catalogue can be found all essential javascript, css, and img files used by a component. Preprocessors such less, sass, scss may be equally used for conversion [(click here for details)](https://github.com/kriswallsmith/assetic).

An example of the content:

  ![AT_COMP&MODS3](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/antares_concepts/components_&_modules/AT_COMP&MODS3.PNG)
  
###Resources  

The files that are used by a component, or to which it refers during its operation are located in this catalogue.

  ![AT_COMP&MODS4](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/antares_concepts/components_&_modules/AT_COMP&MODS4.PNG)
  
* config - the very name of this catalogue indicates its purpose. It stores files configuring a component
* database - contains the migration files for creating (and removing) the tables used by a component and filling them with data
 * migrations - strictly speaking, these files build an appropriate table scheme
 * seeds - class' files for filling the tables with the data
* lang - it consist of files with phrases' translation used by a component. The subcatalogue is always the language code.
* views - views' files used by a component. The subcatalogue is controller's name, while file's name is the name of the action in a controller.

###Src  

In this catalogue, component's business logic is placed.

  ![AT_COMP&MODS5](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/antares_concepts/components_&_modules/AT_COMP&MODS5.PNG)
  
Please notice that in this folder, catalogues' names start with a capital letter.

* Console - classes responsible for commands which are made accessible by a component. They are usually launched by means of: php artisan <name_of_the_component>:<name_of_the_command>,
* Contracts - interfaces used by a component,
* Exception - exception's classes',
* Facades - facades as a popular form of referring to a class,
* Http - stores incoming request's processing logic and data preparation for display,
* Model - contains models' classes (from the mapped tables) within the framework of Eloquent engine (Active Record),
* Notifications - contains the notification templates (e.g. email, sms) which the component will send to the users,
* Observers - observers' definitions applied to other classes (usually to models)
* Processor - processor's classes, which interpret and process incoming data,
* Repositories - repositories classes (combining several models into one),
* Traits - traits used by a component,
* Twig - extension classes for Twig view engine,
* Validation - forms' dedicated validator classes,
* Widgets - component's widget classes

Http catalogue (within src catalogue):

  ![AT_COMP&MODS6](https://raw.githubusercontent.com/antaresproject/docs/master/docs//img/docs/antares_concepts/components_&_modules/AT_COMP&MODS6.PNG)
  
Description of the content:
* Controllers - component controllers' classes. It is worth noticing that for readability's sake, the controller available in the administrative panel has been placed in a subcatalogue,
* Datatables - tables' presenting classes within datatables,
* Filters - data filters used in a component,
* Form - component's forms classes,
* Handler - event class service thrown by other applications' components as well as by the framework itself. In this catalogue, equal classes are placed, responsible for breadcrumb, main menu, left beam and placeholder presentation,
* Middleware - middleware’s classes i.e. filters serving the events before sending a request to the action and after receiving the processed data,
* Presenters - presenters’ classes, i.e. the layer responsible for data return into a view and presentation in a browser

###Tests  

A catalogue containing component’s unit tests. Usually, the structure of such a catalogue is identical with src catalogue.

##Compatibility  

The project consists of packs - components which have their own repositories in git.

Within the project's framework the following types of repositories can be distinguished in which the components of the whole system are stored:  

**app** - the repository contains official application's versions (branch master), which in turn determine components'' and vendors' versions which are a part of the whole system  

  ![AT_COMP&MODS7](https://raw.githubusercontent.com/antaresproject/docs/master/docs//img/docs/antares_concepts/components_&_modules/AT_COMP&MODS7.PNG)
  
**core** - the repository contains main system component's source code which is used by the whole application and treated as main library. Branch master is always the most stable version, whereas minor branches can be core modification depending on target system's needs. Other branches such as master can be repository's source in the composer.json file determined within app repository group, e.g.:  
  
```
php
"repositories": [
        {
            "type": "git",
            "url": "http://git.mglocal/core/core.git"
        },
...
"require": {
        "antares/core": "master", --> default branch name
```

After the personalization:

```php
"repositories": [
        {
            "type": "git",
            "url": "http://git.mglocal/core/core.git"
        },
...
"require": {
        "antares/core": "product-1", --> personalized branch for specific product having modifications which are not available in the official version
```
          
**components** - a repository group containing the components which can be a part of target product pack.
  
  ![AT_COMP&MODS8](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/antares_concepts/components_&_modules/AT_COMP&MODS8.PNG)
    
Similarly, as in the case of the core here is a possibility of configuring product's pack, pointing which components' branches must be taken into consideration during the project's creation
  
**modules repositories' group** containing the modules which similarly to components can become a part of target product
  
  ![AT_COMP&MODS9](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/antares_concepts/components_&_modules/AT_COMP&MODS9.PNG)
  
**antares-frontend** - a repository containing realization's frontend project. It consist of javascript and css files which are used by the application. Master version contains the most actual default version. Other versions can become dedicated solutions created for separate projects. During installation process, the files from this repository are copied to public catalogue.

In order to create a new component which will be compatible with master component's packs and core and frontend, you should:

1. Create a new project repository in the [components](http://git.mglocal/groups/components) group
2. Add component's file to the repository
3. Add a configuration in the composer.json file. 
composer.json file's example:

```php
{
    "type": "project",
    "repositories": [
        {
            "type": "git",
            "url": "http://git.mglocal/components/foo.git"
        }       
    ],
    "require": {
        "components/foo": "master"
        "mnsami/composer-custom-directory-installer": "1.1.*"       
    },
    "extra": {
        "installer-paths": {
            "./src/components/foo": ["components/foo"]           
        }
    },   
    "config": {
        "preferred-install": "dist",
        "secure-http": false
    },
    "prefer-stable": true,
    "minimum-stability": "dev"   
}
```

In the abovementioned example, the component named as 'foo' has been added from the [repository](http://git.mglocal/components/foo.git) and project's branch master. Thus, if several developers work on  the 'foo' component and save its changes, the command

```
composer update
```

will always download the latest components version. The same procedure concerns 'core' and the remaining components and vendors which belong to application. Please remember about adding a vendor

```
mnsami/composer-custom-directory-installer
```

which will download to the catalogue:

```
./src/components/foo
```

the 'foo' component's source code. In the case when several developers work on one file, the command

```
composer update
```

will ask you about file's migration.

An example of the whole file defining project's settings is depicted below:

```php
{
    "description": "Antares Platform Provides Functionalities For Custom Products Development",
    "homepage": "http://example.com/docs/latest/",
    "keywords": [
        "framework",
        "laravel",
        "antares-platform",
        "antares"
    ],
    "license": "MIT",
    "type": "project",
    "repositories": [
        {
            "type": "git",
            "url": "git@github.com:jamisonvalenta/Laravel-4-Generators.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/core/core.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/tags.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/logger.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/updater.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/updater.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/translations.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/widgets.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/tester.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/tickets.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/reports.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/notifications.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/customfields.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/control.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/content.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/comments.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/brands.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/automation.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/search.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/api.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/ban_management.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/two_factor_auth.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/components/tags.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/modules/playground.git"
        },
        {
            "type": "git",
            "url": "http://git.mglocal/modules/dns.git"
        },
        {
            "type": "package",
            "package": {
                "name": "antares-frontend",
                "version": "master",
                "source": {
                    "url": "http://git.mglocal/billevo/antares-frontend.git",
                    "type": "git",
                    "reference": "master"
                }
            }
        }
    ],
    "require": {
        "antares-frontend": "dev-master",
        "antares/core": "master",
        "components/logger": "master",
        "components/updater": "master",
        "components/translations": "master",
        "components/widgets": "master",
        "components/tester": "master",
        "components/tickets": "master",
        "components/reports": "master",
        "components/notifications": "master",
        "components/customfields": "master",
        "components/control": "master",
        "components/content": "master",
        "components/comments": "master",
        "components/brands": "master",
        "components/automation": "master",
        "components/search": "master",
        "components/api": "master",
        "components/ban_management": "master",
        "components/two_factor_auth": "master",
        "components/tags": "master",
        "modules/playground": "master",
        "modules/dns": "master",
        "laravel/framework": "5.2.*",
        "mnsami/composer-custom-directory-installer": "1.1.*",
        "laravie/html": "~5.2.1",
        "laravelcollective/html": "5.2.*",
        "barryvdh/laravel-ide-helper": "^2.0@dev",
        "jimbolino/laravel-model-builder": "dev-master",
        "barryvdh/laravel-debugbar": "^2.2@dev",
        "phpunit/phpunit": "5.0.*",
        "way/generators": "dev-feature/laravel-five-stable",
        "doctrine/dbal": "master",
        "tymon/jwt-auth": "1.0.*",
        "brainboxlabs/brain-socket": "^1.0",
        "kriswallsmith/assetic": "^1.3"
    },
    "require-dev": {
        "symfony/security-core": "master",
        "fzaninotto/faker": "master",
        "mockery/mockery": "0.9.*",
        "laracasts/generators": "dev-master"
    },
    "autoload": {
        "classmap": [
            "resources/database",
            "src/core",
            "src/components",
            "src/modules",
            "src/vendor"
        ],
        "psr-0": {
            "Spatie": "src/vendor/spatie/laravel-backup/src",
            "Davispeixoto\\TestGenerator\\": "src/vendor/davispeixoto/src",
            "TwigBridge": "src/vendor/rcrowe/twigbridge/src"
        },
        "psr-4": {
            "App\\": "app/",
            "Installer\\": "app/Installer/src",
            "Antares\\Control\\": "src/components/control/src",
            "Antares\\Brands\\": "src/components/brands/src",
            "Antares\\Content\\": "src/components/content/src",
            "Antares\\Playground\\": "src/modules/playground/src"
        }
    },
    "autoload-dev": {
        "classmap": [
            "src/core/tests/TestCase.php"
        ]
    },
    "extra": {
        "installer-paths": {
            "./builds/antares": ["antares-frontend"],
            "./src/core": ["antares/core"],
            "./src/components/logger": ["components/logger"],
            "./src/components/updater": ["components/updater"],
            "./src/components/translations": ["components/translations"],
            "./src/components/widgets": ["components/widgets"],
            "./src/components/tester": ["components/tester"],
            "./src/components/tickets": ["components/tickets"],
            "./src/components/reports": ["components/reports"],
            "./src/components/notifications": ["components/notifications"],
            "./src/components/customfields": ["components/customfields"],
            "./src/components/control": ["components/control"],
            "./src/components/content": ["components/content"],
            "./src/components/comments": ["components/comments"],
            "./src/components/brands": ["components/brands"],
            "./src/components/automation": ["components/automation"],
            "./src/components/search": ["components/search"],
            "./src/components/api": ["components/api"],
            "./src/components/ban_management": ["components/ban_management"],
            "./src/components/two_factor_auth": ["components/two_factor_auth"],
            "./src/components/tags": ["components/tags"],
            "./src/modules/addons/playground": ["modules/playground"],
            "./src/modules/domains/dns": ["modules/dns"]
        }
    },
    "scripts": {
        "pre-update-cmd": [
            "Installer\\EnvironmentScripts::preInstall"
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
            "Installer\\ComposerScripts::postUpdate",
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
    },
    "prefer-stable": true,
    "minimum-stability": "dev",
    "authors": [{
            "name": "Łukasz Cirut",
            "email": "lukasz.cirut@inbs.software",
            "homepage": "http://modulesgarden.com",
            "role": "developer"
        }
    ],
    "name": "Antares Platform"
}
```

In the file composer.json which belongs to a project you can control the components which you want to be installed in your application. You can also control component's versions by specifying the branches, as it was described above.
