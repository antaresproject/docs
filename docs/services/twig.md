# Twig  

[TOC]

## Introduction  

Twig is a system of templates that supports designing the layer of applications' presentation. It is characterized by reliability, simplicity, and complex configuration. More information can be found on the [website](http://twig.sensiolabs.org/documentation).

> The [Twig](https://twig.sensiolabs.org/) extensions defined by the module should be placed in `src/modules/<module_name>/src/Twig/` directory (e.g. `src/modules/sample_module/resources/lang/en/messages.php`). Predefined extensions are located in `src/core/src/utils/twig/`.

## Configuration  

The configuration file responsible for the twig's setup can be found in the location:

```bash
resources\config\twigbridge.php
```

Implementation in the system uses a [vendor](https://github.com/rcrowe/TwigBridge) where the detailed description of the full functionality can be found.

## Functions  

To meet the requirements, the following extensions are available in the system:

### assetm  

```php
assetm('jquery','https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js')
```    
Ensures the operation of assets' in the head section of the application. The code above leads to adding a jquery gripper to the head section in the application. More information about the assets can be found [here](assets.md).

### profile_picture  

```php
profile_picture($email, $width = 40, $height = 40)
```

Displays gravatar assigned to an e-mail address. Synonym of the extension is also 'gravatar'.

### extension_active  

```php
extension_active($name)
```

Verifies whether a module is installed or active.

### memorize  

```php
memorize($key,$default)
```

Downloads the value from the one assigned to the $key key from the application's main memory.

### view  

```php
view($view = null, $data = [], $mergeData = [])
```

Builds the object of a view, an action identical with the Laravel's helper view.

### base_path  

```php
base_path($path=null)
```

Provides an absolute path to the application.

### unset  

```php
unset($data, $keynames)
```

Removes the keys determined in `$keynames` from `$data` table.

### handles  

```php
handles($url, $attributes = null)
```

Provides the wrapped URL address recognizable in the system.

### call_user_func  

```php
call_user_func($callable, $row)
```

Synonym of the PHP call_user_func function.

### fluent  

```php
fluent($arguments)
```

Creates the fluent object of Laravel.

### set_meta  

```php
set_meta($name)
```

Sets meta tags in the head section of the application.

### get_meta  

```php
get_meta($name)
```

Downloads meta tags in the head section of the application.

### placeholder  

```php
placeholder($name)
```

It is responsible for placing the placeholder's object into the view. More information about placeholders can be found [here](../modules-development/views.md#placeholder).

### closure  

```php
closure($closure)
```

Starts the anonymous function.

###can  

```php
can($resourceName)
```

Verifies whether the currently logged in user has access to the resource determined in `$resourceName`.

### has_errors  

```php
has_error($errors, $control)
```

Verifies whether the `$control` control has forms' errors transferred in the $errors table.

### event  

```php
event($name)
```

Starts the event on the view level.

### event_gridable  

```php
event_gridable()
```

Starts the event `widgets:render.{path}.right` during the widget generation. It is used to optionally fill the widget's content.

### control_error  

```php
control_error($errors, $control)
```

Displays form's errors assigned to the `$control` control based on the `$errors` board.

### format_x_days  

```php
format_x_days($date, $html = true)
```

Displays the date in the 'humanized' format. It uses the [helper](formatters.md).

### hostname  

```php
hostname()
```

Provides a name of the application's host.

### user_meta  

```php
user_meta($name, $default = null)
```

Provides the metadata assigned to the $name key of the currently logged in user.

### isAjaxRequest  

```php
isAjaxRequest()
```

Provides information whether the request sent from a browser is an ajax request.

### anchor  

```php
anchor($url, $title, $attributes = [])
```

Provides the HTML link to the address defined in the `$url` parameter.

### url_external  

```php
url_external($to)
```

Provides the URL address that contains the domain connected with the application.

### remote_select  

```php
remote_select($params = null)
```

Provides the wrapped select control in the form of HTML. More information about the control's structure can be found [here](form-builder.md).

### tooltip  

```php
tooltip($params = null)
```

Provides the HTML containing the zmdi-info-outline information icon with a tooltip.

## Filters  

### wordwrap  

```php
str|wordwrap ($width = 75,$break = "\n",$cut = false)
```

Makes the assigned string cut to the size defined in the parameters. The filter uses the [wordwrap](http://php.net/manual/en/function.wordwrap.php) function which is built in PHP.

### str_*  

```php
'foo object'|str_contains('foo')
```

It supports all Laravel helpers that operate on strings. More information can be found [here](https://laravel.com/docs/5.2/helpers).

### array_*  

```php
products|array_get('products.desk')
```

It supports all Laravel helpers that operate on boards. More information can be found [here](https://laravel.com/docs/5.2/helpers).

### stringify  

```php
{'foo'=>'string'}|stringify
```

Provides conversion of the table data to the string in the 'key1-value1 key2-value2' format.

## Tests  

### instanceof  

```php
FooObject is instanceof('Antares\\Foo\\FooObject')
```

Executes the test checking whether the class object is an object's instance the name (class) of which is transferred in the argument.

## Function's Structure  

Due to the project's requirements, it may be essential to implement a dedicated twig function that extends the engine's functionality. An example of a basic class that defines such an extension is the code below:

```php
<?php

namespace Antares\Foo\Twig;

use Twig_Extension;

/**
* Access Laravels asset class in your Twig templates.
*/
class FooTwigExtension extends Twig_Extension
{
/**
 * {@inheritDoc}
 */
public function getName()
{
    return 'Antares_Twig_Extension_Foo';
}

/**
 * {@inheritDoc}
 */
public function getFunctions()
{
    return [
        new Twig_SimpleFunction('foo', function ($params=null) {
                    /**
                     * my own foo logic implementation
                     */
                }),
    ];
}
}
```

Name of the function (which is later used in a view) is the first constructor's argument of the class `Twig_SimpleFunction`, the second parameter is the anonymous function that should contain the operating logic of a function. Remember about the name of the method that defines the twig function known as `getFunctions`. Once the extension's class is created, in the configuration file:

```bash
resources\config\twigbridge.php
```

in the section 'extensions.enabled' you have to point the created class:

```php
Antares\Foo\Twig\FooTwigExtension
```

Calling the function in the view is performed by the following code:

```html
{{ foo(params)|raw }}
```

## Filter's Structure  

The filter has a structure similar to the function, and its use predominantly focuses on reduction of results in saved variables, strings' decoration, etc. An exemplary method that defines a new filter:

```php
/**
* {@inheritDoc}
*/
public function getFilters()
{
return [
    new Twig_SimpleFilter('foo_touppercase', function () {               
        $arguments = array_slice(func_get_args(), 1);
        return strtoupper($arguments);
    })
];
}
```

Do not forget about the name of the method that defines the filters, that is `getFilters`. Similarly to the example of the function, the name of the class has to be pointed in the twigbridge configuration file.
Usage in the view:

```html
{{ 'foo test'|foo_touppercase|raw }}
```

## Test's Structure

The twig tests are responsible for comparing two values. Here is an example of a testing method:

```php
/**
* {@inheritDoc}
*/
public function getTests()
{
return [
    'foo_test' => new Twig_Function_Method($this, function($var, $instance) {
            return $var instanceof $instance;
    })
];
}
```

Do not forget about the name of the method that defines the filters, that is `getTests` and keep in mind that the returned value is the value of the boolean type. Similarly to the example of the function, the name of the class has to be pointed in the twigbridge configuration file.
Usage in the view:

```html
{% if(user is instanceof('Antares\\Model\\User') %}                   
<div>User is instance of Antares user</div>
{% endif %}
```


