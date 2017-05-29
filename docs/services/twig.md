# Twig  

[TOC]

## Introduction  

Twig is a system of templates that support designing the presentation layer of applications. It is characterized by reliability, simplicity, and complex configuration. More information can be found on the [website](http://twig.sensiolabs.org/documentation).

> The [Twig](https://twig.sensiolabs.org/) extensions defined by module should be placed in `src/modules/<module_name>/src/Twig/` directory (e.g. `src/modules/sample_module/resources/lang/en/messages.php`). Predefined extensions is located in `src/core/src/utils/twig/`.

## Configuration  

The configuration file which is responsible for the twig's setup can be found in the location:

```bash
resources\config\twigbridge.php
```

Implementation in the system is using a [vendor](https://github.com/rcrowe/TwigBridge) where the detailed description of full functionality can be found.

## Functions  

To meet the requirements, the following extensions are available in the system:

### assetm  

```php
assetm('jquery','https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js')
```    
Provides assets' operation in application's head section. The code causes adding a jquery gripper to the head section in the application. More information about the assets can be found [here](assets.md).

### profile_picture  

```php
profile_picture($email, $width = 40, $height = 40)
```

Displays gravatar ascribed to an e-mail address. Synonym of extension is also 'gravatar'.

### extension_active  

```php
extension_active($name)
```

Verifies whether a module is installed or active.

### memorize  

```php
memorize($key,$default)
```

Downloads the value to the one ascribed to the $key key from application's main memory.

### view  

```php
view($view = null, $data = [], $mergeData = [])
```

Builds view's object, an activity identical with Laravel's helper view.

### base_path  

```php
base_path($path=null)
```

Provides an absolute path to the application.

### unset  

```php
unset($data, $keynames)
```

Removes the keys determined in `$keynames` from `$data` board.

### handles  

```php
handles($url, $attributes = null)
```

Provides wrapped url address which is recognizable in the system.

### call_user_func  

```php
call_user_func($callable, $row)
```

Synonym of the php call_user_func function.

### fluent  

```php
fluent($arguments)
```

Creates Laravel's fluent object.

### set_meta  

```php
set_meta($name)
```

Sets meta tags in application's head section.

### get_meta  

```php
get_meta($name)
```

Downloads meta tags in application's head section.

### placeholder  

```php
placeholder($name)
```

It is responsible for injecting placeholder's object into the view. More information about placeholders can be found [here](../modules_development/views.md#placeholder).

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

Verifies whether the `$control` control has forms' errors transferred in the $errors board.

### event  

```php
event($name)
```

Starts the event on the view level.

### event_gridable  

```php
event_gridable()
```

Starts the event `widgets:render.{path}.right` during widget generation. It is used to fill optionally the widget's content.

### control_error  

```php
control_error($errors, $control)
```

Displays form's errors which are ascribed to the `$control` control on the basis of the `$errors` board.

### format_x_days  

```php
format_x_days($date, $html = true)
```

Displays date in the 'humanized' format. It uses the [helper](formatters.md).

### hostname  

```php
hostname()
```

Provides a name of the application's host.

### user_meta  

```php
user_meta($name, $default = null)
```

Provides metadata, ascribed to the $name key, of the currently logged in user.

### isAjaxRequest  

```php
isAjaxRequest()
```

Provides information whether the request which has been sent from a browser is an ajax request.

### anchor  

```php
anchor($url, $title, $attributes = [])
```

Provides the html reference to the address defined in the `$url` parameter.

### url_external  

```php
url_external($to)
```

Provides the url address containing the domain connected with the application.

### remote_select  

```php
remote_select($params = null)
```

Provides the wrapped select control in the form of html. More information about the control's structure can be found [here](form_builder.md).

### tooltip  

```php
tooltip($params = null)
```

Provides the html containing the zmdi-info-outline information icon with tooltip.

## Filters  

### wordwrap  

```php
str|wordwrap ($width = 75,$break = "\n",$cut = false)
```

Makes the assigned string cut to the size defined in the parameters. The filter uses the [wordwrap](http://php.net/manual/en/function.wordwrap.php) function which is build in php.

### str_*  

```php
'foo object'|str_contains('foo')
```

It operates all Laravel helpers which in turn operate on strings. More information can be found [here](https://laravel.com/docs/5.2/helpers).

### array_*  

```php
products|array_get('products.desk')
```

It operates all Laravel helpers which in turn operate on boards. More information can be found [here](https://laravel.com/docs/5.2/helpers).

### stringify  

```php
{'foo'=>'string'}|stringify
```

Provides board data conversion to the string in the 'key1-value1 key2-value2' format.

## Tests  

### instanceof  

```php
FooObject is instanceof('Antares\\Foo\\FooObject')
```

Executes the test which checks whether the class object is an object's instance whose name (class) is being transmitted in the argument.

## Function's Structure  

Due to the project's needs it may be essential to implement dedicated twig function which extends engine's functionality. An example of a basic class defining such an extension is the code below:

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

Name of the function (which is later used in a view) is the first constructor's argument of the class `Twig_SimpleFunction`, the second parameter is anonymous function which should contain function's operating logic. Remember about the name of the method defining twig function known as `getFunctions`, and once the extension's class is created, in the configuration file:

```bash
resources\config\twigbridge.php
```

in the section 'extensions.enabled' you have to point the created class:

```php
Antares\Foo\Twig\FooTwigExtension
```

Calling the function in the view is realized by the following code:

```html
{{ foo(params)|raw }}
```

## Filter's Structure  

The filter has a structure which is similar to the function, and its use predominantly focuses on reduction of results in saved variables, strings' decoration, etc. An exemplary method defining a new filter:

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

Do not forget about the name of the method defining the filters which is `getFilters`. Similarly as in the case of the function the name of the class must be pointed in the twigbridge configuration file.
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

Do not forget about name of the method defining the filters which is `getTests`, and that the returned value is the value of the boolean type. Similarly as in the case of the function the name of the class must be pointed in the twigbridge configuration file.
Usage in the view:

```html
{% if(user is instanceof('Antares\\Model\\User') %}                   
<div>User is instance of Antares user</div>
{% endif %}
```


