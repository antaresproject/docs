# Routing  

[TOC]

To make a component work within its own routing, insert the configuration in the Service provider's 'boot' method. More information can be found [here](service_providers.md).

## Frontend  

If a component is using client's panel, it is good to split routers into two files, in order to increase readability. So, to exemplify a file defining frontal (client's) routing, may be the following:
```console
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

```console
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
