# Service Providers  

[TOC]

Service Provider is a class responsible for the component's initialization. It contains essential methods  enabling object's initialization within dependency injection. An example of Service Provider for the component's needs is depicted below:

```php
    <?php
     
    namespace Antares\Foo;
     
    use Antares\Foundation\Support\Providers\ModuleServiceProvider;
    use Antares\Foo\Http\Handler\FooBreadcrumbMenu;
    use Antares\Foo\Http\Handlers\FooPlaceholder;
    use Antares\Acl\RoleActionList;
    use Illuminate\Routing\Router;
    use Antares\Acl\Action;
    use Antares\Model\Role;
     
    class FooServiceProvider extends ModuleServiceProvider
    {
     
        /**
         * Names' space for the controllers
         *
         * @var String
         */
        protected $namespace = 'Antares\Foo\Http\Controllers';
     
        /**
         * Name of the routing group where the component will operate
         *
         * @var string|null
         */
        protected $routeGroup = 'antares/foo';
     
        /**
         * List of the events which listen out for the component's class
         *
         * @var array
         */
        protected $listen = [
            /** in this case the placeholder's class is launched after administrative panel's initialization * */
            'antares.ready: admin' => [FooPlaceholder::class],
        ];
     
        /**
         * Registration of the service provider
         */
        public function register()
        {
            parent::register();
        }
     
        /**
         * Service provider's start
         *
         * @param Router $router
         */
        public function boot(Router $router)
        {
            parent::boot($router);
     
            /** ascribing the menu in the breadcrumb position * */
            $this->attachMenu(FooBreadcrumbMenu::class);
             
            $path = __DIR__ . '/../';
            /** ascribing the configuration files to the component's name space **/       
            $this->addConfigComponent($this->routeGroup, $this->routeGroup, "{$path}/resources/config");
             
            /** ascribing the language files to the component's name space **/
            $this->addLanguageComponent($this->routeGroup, $this->routeGroup, "{$path}/resources/lang");
                     
            /** ascribing the views to the language components to the component's name space **/
            $this->addViewComponent($this->routeGroup, $this->routeGroup, __DIR__ . '/../resources/views');
      
            if (!$this->app->routesAreCached()) {
                /** ascribing the routing for actions executed at clienet's side **/
                $this->loadFrontendRoutesFrom(__DIR__."/frontend.php");
                /** ascribing the routing for actions executed at administrative side **/
                $this->loadBackendRoutesFrom(__DIR__."/backend.php");       
            }
             
        }
     
        /**
         * Definitions of the access rules used by the migration file
         *
         * @return RoleActionList
         */
        public static function acl()
        {
            /** actions and their names * */
            $actions = [
                /** the first argument denotes routing's name, the second argument is the conventional action's name * */
                new Action('admin.foo.index', 'Index Action'),
                new Action('admin.foo.add', 'Add Action'),
                new Action('admin.foo.update', 'Update Action'),
                new Action('admin.foo.destroy', 'Delete Action'),
            ];
     
            $permissions = new RoleActionList;
            /** adding the administrator's and reseller's role to the collection and assigning the full  access * */
            $permissions->add(Role::admin()->name, $actions);
            $permissions->add(Role::reseller()->name, $actions);
            return $permissions;
        }      
    }
```

## Namespace Attribute  

```php
protected $namespace = 'Antares\Foo\Http\Controllers';
```

Determines controller's name space in the component.

## routeGroup Attribute  

```php
protected $routeGroup = 'antares/foo';
```

Determines routing's name which must be unique within all components.

## The Listen Attribute  

```php
protected $listen = [
        'antares.ready: admin' => [FooPlaceholder::class],
];
```

This is the events' list where the component's objects will listen out.

## The 'register' Method  

```php
public function register()
{
    parent::register();
}
```

Registers service provider in the application's memory. Usually, in this method, other objects and aliases belonging to the application's environment are registered, just like in the example below:

```php
public function register()
{
    parent::register();
    /** Singleton **/
    $this->app->singleton(FooSingleton::class);
 
    /** Alias **/
    $this->app->alias(Foo::class, 'foo');
 
    /** ascribing the Closure function to the "antares.foo" alias **/
    $this->app->bind('antares.foo', function () {
         return new Foo;
    });
 
    /** ascribing the interface to the processor's class **/
    $this->app->bind('Antares\Foo\Contracts\FooContract', 'Antares\Foo\Processor\FooProcessor');
}
```

## The 'boot' Method  

### Routing  

It is started after the `register` method. Once it is started, the component is ready to work. Within the `boot` method routing's definition takes place, where the component will refer.

The methods: `loadFrontendRoutesFrom` and `loadBackendRoutesFrom` are predefined in `ModuleServiceProvider`. They can be overwritten:

```php
if (!$this->app->routesAreCached()) {
   require "frontend.php";
}
```

### Configuration  

In the `boot` method, definition of configuration file ascribed to the component also occures. The code:

```php
$this->addConfigComponent($this->routeGroup, $this->routeGroup, "{$path}/resources/config");
```

will register component's configuration in the application, so referring to it will be possible through:

```php
$value=config('antares/foo::keyname');
```

The configuration files will be downloaded from the path `{$path}/resources/config`.

### Translations  

The visibility of the translations available for the component are enabled by the code:

```php
$this->addLanguageComponent($this->routeGroup, $this->routeGroup, "{$path}/resources/lang");
```

which will download the language files from the location `{$path}/resources/lang`.

Referring to the translated phrase will be possible through:

```php
$messageTranslated = trans('antares/foo::messages.user_updated');
```

The translator is searching for the file named as messages.php in the location `{$path}/resources/lang/<current_language_code>`. An example of the *messages.php* file:
```bash
/resources/lang/en/messages.php
```
```php
    <?php
    return ['user_updated' => 'User has been updated.'];
```    

## Views  

To make the component work with the views, insert to the `boot` method the code:

```php
$this->addViewComponent($this->routeGroup, $this->routeGroup, __DIR__ . '/../resources/views');
```

which will ascribe to the component the path where the *twig* view files will be read. Referring to, as well as rendering the view file is possible with the use of:

```bash
resources/views/index/index.twig
```

```php
view('antares/foo::admin.foo.index');
```
