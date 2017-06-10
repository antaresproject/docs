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
This will lead to the extension of the `<head>` section with the assets from the `foo` container:

```html
<head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="user-scalable=no,width=device-width,initial-scale=1,maximum-scale=1" />
        <script src="http://localhost/_dist/js/dropdowns.js"></script>
        <script src="http://localhost/js/login.js"></script>
</head>
```    

## Order  

Management of the assets' loading order is important because of the visibility of particular packages. For example:

`main.twig`

```php
$container = app('antares.asset')->container('foo');
$container->add('bootstrap-js', 'js/bootstrap.min.js');
          ->add('login-js', 'js/login.js', ['bootstrap-js']);
```
          
It will load the *js/login.js* file after the *js/bootstrap.min.js* file in the `foo` container, thanks to defining the third parameter of the `add` method. It is possible to determine more than one relation (the table).

## Additional Parameters  

The assets often require parameterization (e.g. media queries). For example:
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

                
It will result in adding the asset in the `foo` container that will be loaded from the CDN repository, therefore:
```html
<script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
```
   
## Inline Scripting  

There is often a situation when the created component or widget directly affects the user's interface behavior (e.g. dedicated notification), therefore:
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

    

It will add the javascript code to the `foo` container:

```html
<script type="text/javascript" >          
            $(document).ready(function(){                        
                    noty($.extend({}, APP.noti.successFM("lg", "full"), {
                        text: "More awesome"
                    }));
            });
</script>
```
        
Which, in result, will display the following notification:

![AT_ASS01](../img/docs/services/assets/AT_ASS01.png)
  
## Versioning  

The application provides versioning of the assets, for example:

```php
app('antares.asset')->container('foo')->add('login-js', 'js/login.js')->addVersioning();
```

The `addVersioning()` method will cause the creation of:

```html
<script src="http://localhost/js/login.js?1465211833"></script>
```

It will also add a unique number to the asset, being the date of the latest modification in the timestamp form. The removal of versioning is done by the `removeVersioning()` method.

## RequireJs  

### Introduction  

[RequireJS](http://requirejs.org/) is a JavaScript framework created for the effective management of relations between the components. It allows you to produce faster code of better quality. Everything you need to start the work with RequireJS can be found on the [website](http://requirejs.org/). The system uses the aforementioned library in order to ensure better transparency and modularity of scripts that belong to the application.

In order to start the work with RequireJS, add script's declaration *require.js* to the HTML website's code as shown below:

```html
<script data-main="scripts/main" src="/scripts/require.js"></script>
```
    
    
As you can see, the declaration has an additional attribute `data-main` which is used to indicate the script that is a starting point of a given view. What this file should look like will be explained in the further part of the post. But before the components' declaration with the use of RequireJS will be presented, you need to understand what the module in JavaScript is.

### Pattern  

Since there is no syntax that enables the package creation in the JavaScript, a module's pattern has been created that ensures an appropriate structuring and separation of large amounts of code.

When creating the module, the first step is to define the 'namespace' which is a simulation of the namespaces known from the other programming languages (there is no appropriate syntax in JavaScript). It is completed by declaring a single global variable being a 'root' of all namespaces and then creating appropriate containers for objects (specific 'namespaces'). Take a look at the example below ('init.js' file):

```js
var APP = window.APP || {}; // create namespace for our app
APP.modules = {}; // namespace for modules
```

The mentioned global variable is defined in the first line and then a container for modules has to be added - this is how the `APP.modules` namespace is created. Once you have a namespace, you can create another modules. Let's start with the 'mod' module (from the separate 'mod.js' file):

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

As can be seen, instant functions are used to create the module (the entire module's function is wrapped in brackets and round brackets are placed right after the curly brackets). Thanks to this, the module's function is executed instantly after it is defined and all the variables used in it remain in the local scope. Moreover, only the object returned by the `APP.modules.mod` attribute is assigned to it and not the function (the expression `APP.modules.mod()` will not be correct).

Below you can see the second module (the 'show.js' file) that uses the module shown above:

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

In the fourth line, you can notice that the '`APP.modules.mod` attribute is assigned to the `mod` local variable. This is the way in which all the relations with other modules should be defined. Afterwards, only the local variables should be used in the further part of the module. Thanks to this, the users are informed about which functionalities are required for the proper operation of the module. Furthermore, the use of local variables is always faster than the use of global variables and especially global variables' attributes (as in this case).

Once you have all the required modules of your application, you are ready to use them. But first a look at the scripts' declaration:

```html
<script src="/Scripts/init.js"></script>
<script src="/Scripts/mod.js"></script>
<script src="/Scripts/show.js"></script>

```
    
    
Note that the order in which the files are loaded is important because the individual modules depend on each other.
Lastly, take a look at the use of `APP.modules.show` module:
```html
<input type="button" onclick="APP.modules.show.useModule()" value="Click!"/>
```
    
    
The example above should not be considered a pattern because it uses the 'onclick' parameter in the 'in-line' mode.

### Backend  

A configuration file in which JavaScript files used by the system are determined is placed in the location:

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

**cache** - JavaScript scripts' caching. If it is enabled, the application does not add an additional parameter that defines timestamp in the url address, as in the example below:

```html
<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="jquery-ui" src="/gzip_assets/jquery-ui/ui/minified/jquery-ui.min.gz.js"></script>
```
In case the following cache is on:
```html
<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="jquery-ui" src="/gzip_assets/jquery-ui/ui/minified/jquery-ui.min.gz.js?antares=1477570617320"></script>
```
the *antares* parameter is added.

**main** - specifies the location of the file that contains the configuration of individual scripts' paths:
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
In the code above, note that the (*.js) files' extensions are not provided when determining the location.

**default** - defines the default set of packages used by the application. The names contained in this table are an equivalent of the keys which the paths from the */js/require/main.js* file are assigned to.

**childs** - a set of scripts which will be loaded after the scripts determined in default are loaded. The result is as follows:
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
The code above is a cascade of scripts and their order of loading depends on others. It is connected with a situation when functionality of one can use the functionality of another, as in the example below:
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
Starts after '*jquery*' and '*ckeditor*' scripts are loaded. Then, the '*CKEDITOR*' and '*jQuery*' instances are visible within the script.

It is possible to define the configuration for the loaded library, e.g.:
```js
  require.config({
      packages: [{
              name: "ckeditor",
              location: "/packages/ckeditor",
              main: "ckeditor"
          }]
  });
```
The code above specifies that the package named *ckeditor* is placed in the `/packages/ckeditor` location, whereas the main file of the package is *ckeditor.js* (the value assigned to the main key, without the '*js*' extension).
