# Assets  

[TOC]

## Introduction  

Assets include a set of tools that enable a programmer to efficiently manage resource files (JavaScripts, CSS, LESS, SASS etc.) that are a part of the system and deliver a user interface.

> The asset directory for module should be placed in `src/modules/<module_name>/public/` (e.g. `src/modules/<sample_module>/public/js/sample.js`). The path of assets source code is `src/core/src/utils/asset/`.  

## Assetic

The application uses a very complex vendor named **Assetic**. More information about the capabilities of this package can be found on the [website](https://github.com/kriswallsmith/assetic).

An example of use:

`foo/public/css/foo.css`

```css
.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

`foo/public/css/foo_test.css`

```css
body {
    margin: 0;
}
```

Merge:

```php
use Assetic\Asset\AssetCollection;
use Assetic\Asset\GlobAsset;
  
public function assets()
{
    $css = new AssetCollection([
        new GlobAsset(extension_path('foo/public/css/*'))
    ]);
 
    dump($css->dump());
}
```
The effect:
```css
.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
body {
    margin: 0;
}
```

## Public directory

Script files are gathered globally in the *public* directory along with all files involved in the creation of a user interface.
The most important directories are explained below:

* *_dist* - contains a series of scripts resulting from the operation of grunt/gulp tools that aim at optimizing the files of a user interface (e.g. js minification). Click [here](http://gruntjs.com/) for more information.
* *assets* - contains a set of libraries that belong to a user interface. They are the effect produced by the operation of a bower tool, more information can be found [here](https://bower.io/)
* *avatars* - stores the files of avatars for widgets
* *js* - scripts of javascript type
* *packages* - consists of subdirectories, i.e. the packages that create a user interface. It includes the 'packages' subdirectory that gathers files of assets created by particular components. Assets' files (js, css) are symbolic links to the files in the components
* *templates* - includes view files used by the templates of user interface components

## Components  

Each component that uses its own assets should include the *public* directory consisting of the properly located files of the js or css type. Directiories are separated to ensure a transparent structure responsible for the proper operation of a component. In order to publish the assets that belong to the component, use the `publish` helper created for this purpose. 
An example:

```php
publish('foo', ['js/foo.js']);
```

The first argument is the name of a component, the second one is the table that contains paths to the assets, starting from the '**public**' directory. After publishing, the asset will be included in all the assets that create a user interface. It will be placed before the end of the <**body**> section of the html document.

There is also a possibility to publish the assets using a configuration file. The component's configuration:

```php
<?php     
    return [
        'scripts' => [
            'foo-js' => 'js/foo.js'
        ]
    ];
```
        
And the use of the following code:

```php
publish('foo', 'scripts');
```

Will result in the publication of all the assets defined in the `foo` key. 

The helper that publishes the assets uses the call:
```php
app('antares.asset.publisher')->publish($extension, $options);
```

Whereas the call:
```php
app('antares.asset.publisher');
```

Is an instance of the `Antares\Asset\AssetPublisher` object.

## Containers  

There is often a situation when publication of the assets does not take place before the end of the `<body>` section. In such cases, use the AssetFactory, as in the example:
```php
app('antares.asset')->container('foo')->add('login-js', 'public/js/login.js');
```

This will result in publishing the `login.js` file in the `foo` container. The `add` method is used to add an asset to a container. The first argument is the shortened name, unique within the whole application, and the second one is the path to the asset. The `foo` container is a direct indication of the position in the html document. See the example of the `<head>` section:

```html
<head>
   {% block head %}
        {% include 'antares/foundation::layouts.antares.partials._head' %}
   {% endblock %}       
   {% block javascripts %}
        {{  app('antares.asset').container('foo').scripts()|raw }}
   {% endblock %}
</head>
```   
Consequently this will cause the development of the `<head>` section enlarged by assets from the `foo` container:

```html
<head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="user-scalable=no,width=device-width,initial-scale=1,maximum-scale=1" />
        <script src="http://localhost/_dist/js/dropdowns.js"></script>
        <script src="http://localhost/js/login.js"></script>
</head>
```    

## Order  

Assets' downloading order management, is a fundamental issue because of the visibility of particular packages. An example:

`main.twig`

```php
$container = app('antares.asset')->container('foo');
$container->add('bootstrap-js', 'js/bootstrap.min.js');
          ->add('login-js', 'js/login.js', ['bootstrap-js']);
```
          
It will download the *js/login.js* file after the *js/bootstrap.min.js* file in the `foo` container, thanks to determining the third parameter of the `add` method. There is a possibility of determining more than one interrelation (the table).

## Additional Parameters  

Many a time the assets require parameterization (e.g. media queries). An example:
```php
app('antares.asset')->container('foo')->add('foo-css', 'css/foo.css', ['media' => 'all', 'rel' => 'stylesheet']);
```

It will create:
```html
<link media="all" type="text/css" rel="stylesheet" href="http://localhost/css/foo.css" />
```
    
    
## Support For CDN  

The implementation:

```php
app('antares.asset')->container('foo')
                    ->add('modernizr-cdn', '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js');
```

                
will cause adding the asset in the `foo` container which will be downloaded from the CDN repository, so:
```html
<script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
```
   
## Inline Scripting  

Frequently, there is a situation when the created module or widget must directly interfere in the user's interface behavior (e.g. dedicated notification), so:
```php
    app('antares.asset')->container('foo')->inlineScript('foo-awesome', $this->inline());
    
    /**
     * Javascript's example
     *
     * @return String
     */
    protected function inline()
    {
        return <<<EOD
           $(document).ready(function(){                        
                noty($.extend({}, APP.noti.successFM("lg", "full"), {
                    text: "More awesome"
                }));
        });
    EOD;
    }
```

    

It will add to the `foo` container the javascript code:

```html
<script type="text/javascript" >          
            $(document).ready(function(){                        
                    noty($.extend({}, APP.noti.successFM("lg", "full"), {
                        text: "More awesome"
                    }));
            });
</script>
```
        
which as a result will cause notification's display:

![AT_ASS01](../img/docs/services/assets/AT_ASS01.png)
  
## Versioning  

The application provides versioning of the assets, an example:

```php
app('antares.asset')->container('foo')->add('login-js', 'js/login.js')->addVersioning();
```

The `addVersioning()` method, will cause the creation of:

```html
<script src="http://localhost/js/login.js?1465211833"></script>
```

adding to the asset a unique number as a date of latest modification in the timestamp form. The removal of versioning is done by the `removeVersioning()` method.

## RequireJs  

### Introduction  

[RequireJS](http://requirejs.org/) is a JavaScript framework created for the effective interrelation management between the modules. It allows you to create a faster code of better quality. All you need to start the work with RequireJS can be found on the [website](http://requirejs.org/). The system uses the aforementioned library in order to obtain better readability and scripts' modularity which belong to the application.

In order to start the work with RequireJS, add script's declaration *require.js* to the HTML website's code as shown below:

```html
<script data-main="scripts/main" src="/scripts/require.js"></script>
```
    
    
As visible the declaration has an additional attribute `data-main` which is used to indicate the script that is a starting point of a given view. What this file should look like will be explained in the further part of the post, but before the modules declaration with the use of RequireJS will be shown, you need to recall what JavaScript module is.

### Pattern  

Since there is no syntax allowing for package creation in the JavaScript, a module's pattern has been created which allows for an appropriate structuring and separation of large amount of code.

When creating a module, the first step is to define the 'namespace' which is a simulation of the namespaces' known from the other programming languages (in JavaScript there is no appropriate syntax). It is done by declaring a single global variable which is a 'root' of all namespaces' and then appropriate containers for objects (specific 'namespaces') are created. Take a look at the example below ('init.js' file):

```js
var APP = window.APP || {}; // create namespace for our app
APP.modules = {}; // namespace for modules
```

Within the first line the global variable is defined and then a container for modules must be added - in this manner `APP.modules` namespace is created. Having a namespace, you can create another modules. To begin with, the 'mod' module (in a separate 'mod.js' file):

```js
// create module in 'APP.modules' namespace
APP.modules.mod = (function () {
  
    function showModule() {
        alert('hello from module');
    }
  
    return {
        showModule: showModule
    };
} ());
```

As it can be seen, while creating a module, instant functions are used (the module's function is wrapped in brackets and shortly after the closing brace round brackets are placed). Thanks to that the module's function is executed instantly after the defining and all the variables used within remain in the local range, whereas to the `APP.modules.mod` attribute only the returned object is ascribed and not the function (the expression `APP.modules.mod()` will not be correct).

Take a look at the second module (the 'show.js' file) which uses the one shown above:

```js
// another module which uses "mod"
APP.modules.show = (function () {
    // declaration of dependecies
    var mod = APP.modules.mod;
  
    function useModule() {
        mod.showModule(); // use module
    }
  
    return {
        useModule: useModule
    };
} ());
```

In the fourth line you can notice that the '`APP.modules.mod` attribute has been ascribed to the `mod` local variable. This is the manner which should always have been applied when defining all the interrelations to other modules and in the further part of the module using the local variables. Thanks to that the users are informed about what functionalities are required for the modules proper operation. Furthermore, the use of local variables is always faster than the use of global variables and especially global variables' attributes (as in this case).

Once you have all the required modules for your application, you are ready to use them - but first of all - scripts' declaration:

```html
<script src="/Scripts/init.js"></script>
<script src="/Scripts/mod.js"></script>
<script src="/Scripts/show.js"></script>

```
    
    
Notice that it is essential in what order the files are loaded because the individual modules depend on each other.
In the end the use of `APP.modules.show` module:
```html
<input type="button" onclick="APP.modules.show.useModule()" value="Click!"/>
```
    
    
The above example should not be treated as a pattern because it uses the 'onclick' parameter in the 'in-line' mode.

### Backend  

A configuration file wherein JavaScript files are determined (used by the system) is placed in the location:

`\resources\config\require_js.php`

Configuration file's content:

```php
<?php
     
    return [
        'cache'   => false,
        'main'    => '/js/require/main.js',
        'default' => [
            "moment",
            "datetimepicker",
            "globalize",
            ...
            'childs' => [
                "app_material",
                "app_forms",
                ...
            ]
        ]
    ];
```
    
    
The description of configuration table's keys:

**cache** - JavaScript scripts caching. If it is on, the application is not adding an additional parameter in the url address determining timestamp, as in the example below:

```html
<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="jquery-ui" src="/gzip_assets/jquery-ui/ui/minified/jquery-ui.min.gz.js"></script>
```
In case when the following cache is on:
```html
<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="jquery-ui" src="/gzip_assets/jquery-ui/ui/minified/jquery-ui.min.gz.js?antares=1477570617320"></script>
```
the *antares* parameter is added.

**main** - determines the location of the file containing the individual scripts' paths configuration:
```js
define("jquery", [], function () {
   return jQuery;
}), requirejs.config({
   baseUrl: "js/require/",
   paths: {
       select2: "/gzip_assets/select2/dist/js/select2.min.gz",
       ...
   },
   map: {
       "*": {
           "jquery-ui/core": "jquery-ui",
           "jquery-ui/widget": "jquery-ui",
           "jquery-ui/mouse": "jquery-ui",
           "jquery-ui/draggable": "jquery-ui",
           "jquery-ui/resizable": "jquery-ui"
       }
   }
});
```
In the code above note that when determining the location, the (*.js) files' extensions are not given.

**default** - determines the default set of packages which the application uses. The names contained in this table are an equivalent of the keys with the ascribed paths from the */js/require/main.js* file.

**childs** - a set of scripts which will be loaded when scripts determined in default are loaded. The result is the following:
```js
require(['/js/require/main.js'], function () {
    require(["jquery", "jquery-ui", "datetimepicker"], function ($) {
        require(['moment','datetimepicker','globalize',[...]], function () {
            require(['app_material','app_forms',[...]], function () {
                 
            });
        });
    });
});   
```
The code above is a cascade of scripts and their order of loading is dependent on others. It is connected with a situation when functionality of one can use the functionality of another, as in the example below:
```js
require(["jquery", "ckeditor"], function ($) {
        CKEDITOR.replace('#textarea',{
        width:'100%'
    });
});
```
In the example above the code's fragment:
```js
CKEDITOR.replace('#textarea',{
    width:'100%'
});
```
starts when '*jquery*' and '*ckeditor*' scripts are read. Then the '*CKEDITOR*' and '*jQuery*' instances are visible within the script.

There is a possibility of determining the configuration for the read library, e.g.:
```js
  require.config({
      packages: [{
              name: "ckeditor",
              location: "/packages/ckeditor",
              main: "ckeditor"
          }]
  });
```
The code above determines that the package named as *ckeditor* is placed in the `/packages/ckeditor` location, whereas the main package's file is *ckeditor.js* (the value ascribed to the main key, without the '*js*' end).
