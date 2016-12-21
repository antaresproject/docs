#Assets  

[TOC]

##Introduction  

Assets is a set of tools enabling a programmer to manage efficiently resources' files (scripts, javascripts, css, etc.) which belong to the system. Additionally, the application uses a very complex vendor named 'Assetic'. More information about the capabilities of this package can be found on the [website](https://github.com/kriswallsmith/assetic).
An example of use:

<pre><code>foo/public/css/foo.css</code></pre>

<pre><code>.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}</code></pre>

<pre><code>foo/public/css/foo_test.css</code></pre>

<pre><code>body {
    margin: 0;
}</code></pre>

Merge:

<pre><code>use Assetic\Asset\AssetCollection;
use Assetic\Asset\GlobAsset;
  
public function assets()
{
    $css = new AssetCollection([
        new GlobAsset(extension_path('foo/public/css/*'))
    ]);
 
    dump($css->dump());
}</code></pre>

The effect:

<pre><code>.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
body {
    margin: 0;
}</code></pre>

Scripts' files are gathered globally in the 'public' catalogue, where all the files participating in the user's interface building are also placed.
Here are the profiles of the most important catalogues:

* _dist - the catalogue contains a series of scripts which are the result of grunt/gulp tools type which aims at user's interface components files optimization (e.g. js minification). Click [here](http://gruntjs.com/) for more information.
* assets - the catalogue contains a series of libraries belonging to user's interface. It is the effect of bower tool operation, more information can be found [here](https://bower.io/)
* avatars - stores the avatars' files for the widgets' needs
* js - javascript scripts type
* packages - the catalogue consists of subcatalogues - packages creating user's interface. It consist of the 'packages' subcatolgue where assets' files created by particular components are placed. Assets' files (js, css) are the symbolic links to the files in the components
* templates - it consists of views' drops for the needs of widget templates

##Components  

Each component using its own assets should contain the '**public**' catalogue consisting of the properly placed files of the js or css type. A separation of these catalogues facilitates the obtaining of the clear structure responsible for the proper component's operation. In order to publish the assets  belonging to the component, use the '**publish**' helper created for this purpose. 
An example:

<pre><code>publish('foo', ['js/foo.js']);</code></pre>

The first argument is the component's name, the second is the table containing paths to the assets, beginning from the '**public**' catalogue. Publication will make the asset belong to all the assets creating user's interface and it will be placed before locking the <**body**> section of the html document. 

There is also a possibility of publishing the assets with the use of configuration file. Component's configuration:

    <?php
     
    return [
        'scripts' => [
            'foo-js' => 'js/foo.js'
        ]
    ];
    
And the use of:

<pre><code>publish('foo', 'scripts');</code></pre>

Will cause the publication of all the assets defined in the 'foo' key.

The helper publishing the assets is using the call:

<pre><code>app('antares.asset.publisher')->publish($extension, $options)</code></pre>

Whereas the call:

<pre><code>app('antares.asset.publisher')</code></pre>

Is an instance of the 'Antares\Asset\AssetPublisher' object.

##Containers  

Quite frequently, there is a situation when publishing of the assets not always occurs before the end of the <body&gt; section. In such a situation use the AssetFactory, an example:

<pre><code>app('antares.asset')->container('foo')->add('login-js', 'public/js/login.js');</code></pre>

This will cause the publication of the 'login.js' file in the 'foo' container. The 'add' method is used to add an asset to a container. The first argument is the shortened name, unique within the whole application, the second one is the path to the asset. The 'foo' container is an overt indication of the position in the html document, for example the <head&gt; section, so:

    <head>
        {% block head %}
            {% include 'antares/foundation::layouts.antares.partials._head' %}
        {% endblock %}       
        {% block javascripts %}
            {{  app('antares.asset').container('foo').scripts()|raw }}
        {% endblock %}
    </head>

Consequently this will cause the development of the <head&gt; section enlarged by assets from the 'foo' container:

    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="user-scalable=no,width=device-width,initial-scale=1,maximum-scale=1">
                        <script src="http://billevo.local/_dist/js/dropdowns.js"></script>
                        <script src="http://billevo.local/js/login.js"></script>
    </head>

##Order  

Assets' downloading order management, is a fundamental issue because of the visibility of particular packages. An example:

<pre><code>main.twig</code></pre>

<pre><code>$container = app('antares.asset')->container('foo');
$container->add('bootstrap-js', 'js/bootstrap.min.js');
          ->add('login-js', 'js/login.js', ['bootstrap-js']);</code></pre>
          
It will download the 'js/login.js' file after the 'js/bootstrap.min.js' file in the 'foo' container, thanks to determining the third parameter of the 'add' method. There is a possibility of determining more than one interrelation (the table).

##Additional Parameters  

Many a time the assets require parameterization (e.g. media queries). An example:

<pre><code>app('antares.asset')->container('foo')->add('foo-css', 'css/foo.css', ['media' => 'all', 'rel' => 'stylesheet']);</code></pre>

It will create:

    <link media="all" type="text/css" rel="stylesheet" href="http://billevo.local/css/foo.css">
    
##Support for CDN  

The implementation:

<pre><code>app('antares.asset')->container('foo')
                ->add('modernizr-cdn', '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js');</code></pre>
                
will cause adding the asset in the 'foo' container which will be downloaded from the CDN repository, so:

    <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
    
##Inline Scripting  

Frequently, there is a situation when the created component or widget must directly interfere in the user's interface behavior (e.g. dedicated notification), so:

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

It will add to the 'foo' container the javascript code:

    <script type="text/javascript" >          
            $(document).ready(function(){                        
                    noty($.extend({}, APP.noti.successFM("lg", "full"), {
                        text: "More awesome"
                    }));
            });
    </script>
    
which as a result will cause notification's display:

  ![AT_ASS01](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/assets/AT_ASS01.png)
  
##Versioning  

The application provides versioning of the assets, an example:

<pre><code>app('antares.asset')->container('foo')->add('login-js', 'js/login.js')->addVersioning();</code></pre>

The **addVersioning()** method, will cause the creation of:

    <script src="http://billevo.local/js/login.js?1465211833"></script>
    
adding to the asset a unique number as a date of latest modification in the timestamp form. The removal of versioning is done by the **removeVersioning()** method.

##RequireJs  

###Introduction  

[RequireJS](http://requirejs.org/) is a JavaScript framework created for the effective interrelation management between the modules. It allows you to create a faster code of better quality. All you need to start the work with RequireJS can be found on the [website](http://requirejs.org/). The system uses the aforementioned library in order to obtain better readability and scripts' modularity which belong to the application.

In order to start the work with RequireJS, add script's declaration 'require.js' to the HTML website's code as shown below:

    <script data-main="scripts/main" src="/scripts/require.js"></script>
    
As visible the declaration has an additional attribute 'data-main' which is used to indicate the script that is a starting point of a given view. What this file should look like will be explained in the further part of the post, but before the modules declaration with the use of RequireJS will be shown, you need to recall what JavaScript module is.

###Pattern  

Since there is no syntax allowing for package creation in the JavaScript, a module's pattern has been created which allows for an appropriate structuring and separation of large amount of code.

When creating a module, the first step is to define the 'namespace' which is a simulation of the namespaces' known from the other programming languages (in JavaScript there is no appropriate syntax). It is done by declaring a single global variable which is a 'root' of all namespaces' and then appropriate containers for objects (specific 'namespaces') are created. Take a look at the example below ('init.js' file):

<pre><code>var APP = window.APP || {}; // create namespace for our app
APP.modules = {}; // namespace for modules</code></pre>

Within the first line the global variable is defined and then a container for modules must be added - in this manner 'APP.modules' namespace is created. Having a namespace, you can create another modules. To begin with, the 'mod' module (in a separate 'mod.js' file):

<pre><code>// create module in 'APP.modules' namespace
APP.modules.mod = (function () {
  
    function showModule() {
        alert('hello from module');
    }
  
    return {
        showModule: showModule
    };
} ());</code></pre>

As it can be seen, while creating a module, instant functions are used (the module's function is wrapped in brackets and shortly after the closing brace round brackets are placed). Thanks to that the module's function is executed instantly after the defining and all the variables used within remain in the local range, whereas to the 'APP.modules.mod' attribute only the returned object is ascribed and not the function (the expression 'APP.modules.mod()' will not be correct).

Take a look at the second module (the 'show.js' file) which uses the one shown above:

<pre><code>// another module which uses "mod"
APP.modules.show = (function () {
    // declaration of dependecies
    var mod = APP.modules.mod;
  
    function useModule() {
        mod.showModule(); // use module
    }
  
    return {
        useModule: useModule
    };
} ());</code></pre>

In the fourth line you can notice that the 'APP.modules.mod' attribute has been ascribed to the 'mod' local variable. This is the manner which should always have been applied when defining all the interrelations to other modules and in the further part of the module using the local variables. Thanks to that the users are informed about what functionalities are required for the modules proper operation. Furthermore, the use of local variables is always faster than the use of global variables and especially global variables' attributes (as in this case).

Once you have all the required modules for your application, you are ready to use them - but first of all - scripts' declaration:

    <script src="/Scripts/init.js"></script>
    <script src="/Scripts/mod.js"></script>
    <script src="/Scripts/show.js"></script>
    
Notice that it is essential in what order the files are loaded because the individual modules depend on each other.
In the end the use of 'APP.modules.show' module:

    <input type="button" onclick="APP.modules.show.useModule()" value="Click!"/>
    
The above example should not be treated as a pattern because it uses the 'onclick' parameter in the 'in-line' mode.

###Backend  

A configuration file wherein JavaScript files are determined (used by the system) is placed in the location:

<pre><code>\resources\config\require_js.php</code></pre>

Configuration file's content:

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
    
The description of configuration table's keys:

**cache** - JavaScript scripts caching. If it is on, the application is not adding an additional parameter in the url address determining timestamp, as in the example below:

    <script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="jquery-ui" src="/gzip_assets/jquery-ui/ui/minified/jquery-ui.min.gz.js"></script>
    
In case when the following cache is on:

    <script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="jquery-ui" src="/gzip_assets/jquery-ui/ui/minified/jquery-ui.min.gz.js?antares=1477570617320"></script>
    
 the *antares* parameter is added.

**main** - it determines the location of the file containing the individual scripts' paths configuration:

<pre><code>define("jquery", [], function () {
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
});</code></pre>

In the code above note that when determining the location, the (*.js) files' extensions are not given.

**default** - determines the default set of packages which the application uses. The names contained in this table are an equivalent of the keys with the ascribed paths from the /js/require/main.js file.

**childs** - a set of scripts which will be loaded when scripts determined in default are loaded. The result is the following:

<pre><code>require(['/js/require/main.js'], function () {
                require(["jquery", "jquery-ui", "datetimepicker"], function ($) {
                    require(['moment','datetimepicker','globalize',[...]], function () {
                        require(['app_material','app_forms',[...]], function () {
             
                        });
                    });
                });
});</code></pre>

The code above is a cascade of scripts and their order of loading is dependent on others. It is connected with a situation when functionality of one can use the functionality of another, as in the example below:

<pre><code>require(["jquery", "ckeditor"], function ($) {
        CKEDITOR.replace('#textarea',{
        width:'100%'
    });
});</code></pre>

In the example above the code's fragment:

<pre><code>CKEDITOR.replace('#textarea',{
    width:'100%'
});</code></pre>

starts when '*jquery*' and '*ckeditor*' scripts are read. Then the '*CKEDITOR*' and '*jQuery*' instances are visible within the script.

There is a possibility of determining the configuration for the read library, e.g.:

<pre><code>require.config({
    packages: [{
            name: "ckeditor",
            location: "/packages/ckeditor",
            main: "ckeditor"
        }]
});</code></pre>

The code above determines that the package named as *ckeditor* is placed in the /packages/ckeditor location, whereas the main package's file is *ckeditor.js* (the value ascribed to the main key, without the '*js*' end).
