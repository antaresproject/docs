# Routing  

[TOC]

## Introduction

By creating even a small web application we need to take care of "friendly" links. They increase user comfort as well as have a significant impact on SEO.
One solution is to write the appropriate rules in the .htaccess file. However, this solution is not very comfortable. In case you change the address structure, you usually need to improve links in many places.
The link router works similarly to routers known from the network infrastructure. In a web application, it is responsible for calling the appropriate controller method based on the URL of the page what is typically named as *routing*.
Routing in Antares app is based on [Laravel Routing](https://laravel.com/docs/5.4/routing).

> The path of routes definition file is `src/modules/<module_name>/src/` or `src/modules/<module_name>/src/Http/` (e.g. `src/modules/sample_module/src/routes.php`).

## Frontend  

To make a module work within its own routing, insert the configuration in the Service provider's 'boot' method. More information can be found [here](service-providers.md).
If a module is using client's panel, it is good to split routers into two files, in order to increase readability. So, to exemplify a file defining frontal (client's) routing, may be the following:


```bash
frontend.php
```

```php
<?php
     
    use Illuminate\Routing\Router;
     
    Foundation::namespaced('Antares\Foo\Http\Controllers', function (Router $router) {
        $router->group(['prefix' => 'foo'], function (Router $router) {
            $router->resource('/', 'IndexController');
        });
    });
```

The abovementioned definition will ascribe routing to the controller `IndexController` in the space `Foo\Http\Controllers`. The following set of endpoints will be created:

* /foo/index
* /foo/show
* /foo/update
* /foo/store
* /foo/destroy

## Backend  

```bash
backend.php
```

```php
  
<?php
     
    use Illuminate\Routing\Router;
     
    $router->group(['prefix' => 'foo'], function (Router $router) {
        $router->resource('index', 'Admin\IndexController');   
    });
```
 
The abovementioned definition will ascribe routing to the controller `IndexController` in the space `Foo\Http\Controllers\Admin`. The following set of endpoints will be created:

* /admin/foo/index
* /admin/foo/show
* /admin/foo/update
* /admin/foo/store
* /admin/foo/destroy
