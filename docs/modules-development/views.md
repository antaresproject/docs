# Views  

[TOC]

## Introduction

Antares uses [Twig template engine](http://twig.sensiolabs.org/documentation) to generate user interfaces. More information you can find [here](http://twig.sensiolabs.org/documentation). 

The controller is responsible for handling request that comes into a Antares. 
In next step, the controller delegates computing work to other places (eg: [Processors](../modules-development/controllers-and-processors.md), Models, Repositories). 
This solution allows to reuse the code. When a controller needs to generate HTML it passes whole decoration process to templating engine.


Views contains the HTML served by your application and separate your controller / application logic from your presentation logic. 
More information about views you can fin in [Laravel documentation](https://laravel.com/docs/5.4/views).
In Antares, views can be divided into following types:

- menus
- placeholders
- panes

All of those types of view belong to Antares Base Templates.

> The path of views is `src/modules/<module_name>/resources/views/` (e.g. `src/modules/sample_module/resources/views/index.twig`).

## How to create new view

A view is text file that generates text-based format (HTML) using [Twig](http://twig.sensiolabs.org/documentation) as template engine. 
The most familiar type of template is a PHP template - a text file parsed by PHP that contains a mix of text and PHP code: 

```html
<ul id="navigation">
    <?php foreach ($navigation as $item): ?>
        <li>
            <a href="<?php echo $item->getHref() ?>">
               <?php echo $item->getCaption() ?>
            </a>
        </li>
    <?php endforeach ?>
</ul>
```

More information about controllers, processors and presenters you can find in section [Controllers and Processors](../modules-development/controllers-and-processors.md).

[Twig](http://twig.sensiolabs.org/documentation) allows you to write readable templates that are more friendly and powerful than PHP templates:

```twig
<ul id="navigation">
    {% for item in navigation %}
        <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
    {% endfor %}
</ul>
```

To create new view within module you have to declare the place in service provider:

```php
$path  = __DIR__ . '/../';
$this->addViewComponent('antares/foo', 'antares/foo', "{$path}/resources/views/foo");
```

First argument is the name of package, second is the namespace and last is the location of view.

Please note that method `addViewComponent()` is declared in `Antares\Foundation\Support\Providers\ModuleServiceProvider`, so your service provider must inherit after this class.

```twig
{% extends "antares/foundation::layouts.antares.index" %}
{% block content %}    
    /** add you content here **/
{% endblock %}
```

In the example above view inherits from template called `antares/foundation::layouts.antares.index` which is placed at
`resources\views\default\layouts\antares\index.twig`. Section within

```twig
{% block content %}    
    /** add you content here **/
{% endblock %}
```
is responsible for generating content which you should implement. For example:
```twig
{% extends "antares/foundation::layouts.antares.index" %}
{% block content %}    
    <ul id="navigation">
        {% for item in navigation %}
            <li><a href="{{ item.url }}">{{ item.label }}</a></li>
        {% endfor %}
    </ul>
{% endblock %}
```

## How to define where the view should be placed

Antares uses following view templates:
 
* `antares/foundation::layouts.antares.index` - default template with gridstack support
* `antares/foundation::layouts.antares.index-no-grid` - template without gridstack support 
* `antares/foundation::layouts.antares.form` - template with form decoration support
* `antares/foundation::layouts.antares.dashboard` - dashboard template
* `antares/foundation::layouts.antares.clear` - empty template
* `antares/foundation::layouts.antares.main` - main template
 
All of those templates are placed in `resources\views\default\layouts\antares`. Every template has blocks. It means that you are able to declare what kind of components should be placed in user interface sections.
The main template is the `antares/foundation::layouts.antares.main`:

```twig
<!DOCTYPE html>
<html lang="en" >             
    <head>
        {% block head %}
            
        {% endblock %}        
    </head>    
    <body>

        <div id="app-wrapper">
            <aside class="main-sidebar">
                <nav>
                    {% block navigation %}
                        
                    {% endblock %}                              
                    <div class="mobile-ddowns">
                        {% block navigation_mobile %}
                        
                        {% endblock %} 
                    </div>                
                </nav>
            </aside> 
            
            <div class="app-content">
                {% block app_content %}
                    <section class="main-head">
                        {% block breadcrumbs %}
                            
                        {% endblock %} 
                        {% block sidebar_top %}
                            {% block sidebar_top_panes %}
                                                        
                            {% endblock %}
                            <div class="item-grp item-grp--40 mr16">        
                                {% block sidebar_top_widgets %}   
                                                             
                                {% endblock %}                                                    
                            </div>                                                
                        {% endblock %}
                    </section>
                    {% block sidebar_notifications %}
                                       
                    {% endblock %}
                    {% block sidebar_alerts %}
                                       
                    {% endblock %}
                    {% block main_content %}
    
                    {% endblock %}
                {% endblock %}
            </div>
        </div>  
        {% block footer %}
                                                            
        {% endblock %}
    </body>
</html>
```
The default template is `antares/foundation::layouts.antares.index`:

```twig
{% extends  app.request.isXmlHttpRequest() ? "antares/foundation::layouts.antares.clear":  "antares/foundation::layouts.antares.main" %}   
{% block main_content %}
    <section class="main-content">        
        <div>
                {% block content %}
                {% endblock %}     
        </div>
    </section>            
{% endblock %} 
```

The `index` template inherits from `clear` template when ajax request is send to Antares. Otherwise `main` template will be used. 
As you can see `index` template overwrites `main_content` block from `main` template, as follows:

```twig
<section class="main-content">        
   <div>
        {% block content %}
        {% endblock %}     
   </div>
</section>
```
Using above, your module view will be included in:
```twig
{% block content %}
{% endblock %}
``` 
so it will generate following code:

```twig
{% extends  app.request.isXmlHttpRequest() ? "antares/foundation::layouts.antares.clear":  "antares/foundation::layouts.antares.main" %}   
{% block main_content %}
    <section class="main-content">        
        <div>
             <ul id="navigation">
                  {% for item in navigation %}
                      <li><a href="{{ item.url }}">{{ item.label }}</a></li>
                  {% endfor %}
              </ul>
        </div>
    </section>            
{% endblock %} 
```

If you want to overwrite other sections from base template, you have to declare it in the module view file, for example:

```twig
{% extends "antares/foundation::layouts.antares.main" %}
{% block app_content %}        
        {% block breadcrumbs %}
              /** this is my custom breacrumb **/              
        {% endblock %}
        {% block main_content %}
            <ul id="navigation">
                {% for item in navigation %}
                   <li><a href="{{ item.url }}">{{ item.label }}</a></li>
                {% endfor %}
            </ul>
        {% endblock %}
{% endblock %}
``` 

## How to include view to others

Insertion content in other sections of Antares UI can be divided as following:

* [Views](../modules-development/module-events.md#views)
* [Placeholder](../modules-development/module-events.md#placeholder)
* [Menu](../modules-development/module-events.md#main-menu)
* [Breadcrumb](../modules-development/module-events.md#breadcrumb)
* [Pane](../modules-development/module-events.md#pane)
* [Pane Menu](../modules-development/module-events.md#pane-menu)
* [Datatables](../services/events.md#widgets)
* [Forms](../services/events.md#forms)
* Widgets
   * [Widget Views](../services/ui-component.md#views)
   * [Widget Layouts](../services/ui-component.md#layouts)
   * [Widget Events](../services/events.md#widgets)

If you want to include any content to custom template position, use event [Twig](http://twig.sensiolabs.org/documentation) extension:
```php
event($name)
```
and fire it within view: 
```twig
{% extends "antares/foundation::layouts.antares.main" %}
{% block app_content %}        
        {% block breadcrumbs %}
              {{ event('foo.view.breadrumb')|raw }}              
        {% endblock %}
        {% block main_content %}
            {{ event('foo.view.navigation.before') }}
            <ul id="navigation">
                {% for item in navigation %}
                   <li><a href="{{ item.url }}">{{ item.label }}</a></li>
                {% endfor %}
            </ul>
            {{ event('foo.view.navigation.after') }}
        {% endblock %}
{% endblock %}
``` 

In the example above, three events will be fired when view composition will by launched by Laravel:

* foo.view.breadrumb
* foo.view.navigation.before
* foo.view.navigation.after


To attach content to fired event, you have to implement listener:
 
```php
listen('foo.view.breadrumb',function(){
    return 'Foo breadcrumb event has been launched.';
});
```

or using event object in service provider (inherited from `Antares\Foundation\Support\Providers\ModuleServiceProvider`):

```php
<?php
protected $listens=[
    'foo.view.breadrumb'=>BreadcrumbListener::class
]
```

and the BreadcrumbListener class:

```php
<?php

namespace Antares\Foo\Listener;

class BreadcrumbListener
{   
    
    /**
     * Handles breadcrumb event from view
     * 
     * @return String
     */
    public function handle()
    {
        return 'Foo breadcrumb event has been launched.';
    }
}
```

## Menus  


#### Attributes  

A structure of the class responsible for main menu's generation can be depicted in the following manner:

```bash
Antares\Foo\Http\Handler\FooMainMenu
```


```php

<?php

namespace Antares\Foo\Http\Handler;

use Antares\Foundation\Support\MenuHandler;

class FooMainMenu extends MenuHandler
{

    /**
     * Configuration
     *
     * @var array
     */
    protected $menu = [
        'id'    => 'foo',
        'title' => 'Foo',
        'link'  => 'antares::foo/index',
        'icon'  => 'zmdi-format-color-text',
    ];

    /**
     * Position's designation
     * 
     * @return string
     */
    public function getPositionAttribute()
    {
        return '>:reports';
    }

    /**
     * Acl access verification
     * 
     * @return bool
     */
    public function authorize()
    {
        return app('antares.acl')->make('antares/foo')->can('index-action');
    }

}
```

Menu attribute consists of:

* id - menu's identificator, which should be unique within the whole application
* title - title of a position
* link - the url address where the menu's position will be directed after clicking
* icon - icon's css class

Menu's parameters are constituents of the **Fluent** object. Thanks to such a solution there is a possibility for free parameters' manipulation.

#### Position  

The **getPositionAttribute()** method enables menu positioning within already existing main menu. 
The following position's quantifiers can be distinguished:
  
'>:' - behind the element  
'<:' - before the element  
'^:' - inside the element (sub menu)  
  
##### Behind  

Position: 

```php
public function getPositionAttribute()
{
        return '>:reports';
}
```    
Menu's position will be placed behind the 'reports' element, just like on the screen below:

  ![AT_VIS01](../img/docs/modules_development/views/AT_VIS01.png)
  
##### Before  

Position:
```php
public function getPositionAttribute()
{
        return '<:reports';
}
```

Menu's position will be placed before the 'reports' element, just like on the screen below:

  ![AT_VIS02](../img/docs/modules_development/views/AT_VIS02.png)
  
##### Inside (Submenu)  

Position:
```php
public function getPositionAttribute()
{
        return '^:reports';
}
```    
The position will be placed inside the 'reports' element and is established as submenu:

  ![AT_VIS03](../img/docs/modules_development/views/AT_VIS03.png)
  
##### Behind/ Before in Submenu  

Position:

```php
public function getPositionAttribute()
{
        return '>:system.sandboxes';
}
```    
The element will be placed behind the 'sandboxes' element, inside the 'system' menu:

  ![AT_VIS04](../img/docs/modules_development/views/AT_VIS04.png)
  
##### Conditioning  

There is a possibility of conditioning the menu position, depending on the installed components:

```php
public function getPositionAttribute()
{
        return $this->handler->has('settings') && extension_active('automation') ? '>:settings.automation' : '>:dashboard';
}
```    
The code above verifies whether the 'settings' position is available and the component 'automation' is installed. If so, the position will be placed behind the 'automation' position, otherwise it will be placed in the main menu behind the 'dashboard' position.

The code used for downloading the list of available positions:

```php
var_dump(app('antares.platform.menu')->items());
```    
Another way is inside the **getPositionAttribute()** method:

```php
var_dump($this->handler->items());
```    

##### Access' Control   

The method:

```php
public function authorize()
{
        return app('antares.acl')->make('antares/foo')->can('index-action');
}
```    
verifies whether the logged in user has access to the specific resource. If not, the menu's position will not be displayed.

##### Translation of a Title  

The method:

```php
public function getTitleAttribute($value)
{
    return trans("antares/foo::messages.menu_" . $value);
}
```

will translate title's position according to the selected language.

#### Start  

To make the position visible, add menu's class to global configuration `/resources/config/menu.php`.
This file is a general configuration created for the needs of custom solutions. 
The content of the file:

```php
<?php
return [
    'antares.started: admin'                     => [
        \Antares\Foundation\Http\Handlers\DashboardMenu::class      => 1000,       
    ],
    'antares.ready: menu.after.general-settings' => [
        \Antares\foundation\src\Http\Handlers\SecurityMenu::class,        
    ],
    'antares.ready: menu.after.logger'           => [
        \Antares\Logger\Http\Handlers\System::class => 993
    ]
];
```

determines in which events in the system specific menu positions will be presented. The number being key's value is the priority - order of start.

### Breadcrumbs Menu  

#### Attributes  

Breadcrumb is a type of menu started during the 'composing' event. Syntactically, menu's class is very similar to the class from main menu. The differences rely on the form of start and attributes.

The code:

```php
    /**
     * Configuration
     *
     * @var array
     */
    protected $menu = [
        'id'    => 'foo-breadcrumb',
        'title' => 'Foo Menu',
        'link'  => 'antares::foo',
        'icon'  => null,
        'boot'  => [
            'group' => 'menu.top.foo',
            'on'    => 'antares/foo::admin.foo.index'
        ]
    ];
```

contains additional 'boot' attribute, defining start's parameters:

* group - name of the group that has the menu presented within. This attribute is essential due to the fact that positions coming from other components can pin to a group.
* on - name of a view identified with a menu means that during rendering of the view 'antares/foo::admin.foo.index' (composition) the menu must be started.

#### Submenu  

Adding a submenu within the breadcrumbs menu is associated with the 'handle' method, as in the example below:

```php
	
    /**
     * The method released during the rendering of a view, adding and building menu as breadcrumbs submenu
     * 
     * @return void
     */
    public function handle()
    {
        if (!$this->passesAuthorization()) {
            return;
        }
        $this->createMenu();
        if (!app('antares.acl')->make('antares/foo')->can('index-action')) {
            return;
        }
        $this->handler
                ->add('foo-add', '^:foo')
                ->title('Menu Item')
                ->icon('zmdi-plus-circle')
                ->link(handles('antares::foo/create'));
    }
```

The method not only verifies whether the user has acces to the position, but also responds to adding a position.

#### Start  

The start is done through the agency of the code:

```php
$this->attachMenu(FooBreadcrumbMenu::class);
```

placed in the 'boot' method of the component's service provider.

The efect of the created menu, is depicted by the picture below:

  ![AT_VIS05](../img/docs/modules_development/views/AT_VIS05.png)


## Pane  

Pane is a type of a widget which can be placed in view's component. It enables for separation of view's section in order to separate the data section, separating one section from another, creating personalized menu for section etc.
An example of implementation is the following:

```php
<?php

namespace Antares\Foo\Http\Handler;

use Antares\Foundation\Http\Composers\LeftPane;

class FooPane extends LeftPane
{

    /**
     * Pane composition
     *
     * @return void
     */
    public function compose($name = null, $options = array())
    {
        $this->widget->make('pane.left')
                ->add('foo')
                ->content(view('antares/foo::admin.partials._pane'));
    }

}
```

The FooPane object contains the 'compose' method which is resumed during the 'composing' event. This means that widget's composition will be realized during rendering of the indicated view.
Indicating of the view:

```php
view()->composer(['antares/foo::admin.foo.index'], FooPane::class);
```

should be placed in service provider, in the 'boot' method and it is the start of the widget.

**Result**:

  ![AT_VIS06](../img/docs/modules_development/views/AT_VIS06.png)
  
The menu can be ascribed to the pane object and the example is the following:

```php
        $menu = $this->widget->make('menu.brands.pane');
        $menu->add('foo-item')
                ->link('#')
                ->title('Foo item')
                ->icon('zmdi-settings');

        $menu->add('foo-item-submenu')
                ->link('#')
                ->title('Foo item with submenu')
                ->icon('zmdi-settings');

        $menu->add('foo-item-submenu-element', '^:foo-item-submenu')
                ->link('#')
                ->title('Foo Submenu item');

        $this->widget->make('pane.left')
                ->add('foo')
                ->content(view('antares/foundation::components.placeholder_left')->with('menu', $menu));
```

The effect:

  ![AT_VIS07](../img/docs/modules_development/views/AT_VIS07.png)
  
Please remember that contents coming from other components and modules can be pinned to the pane objects.

## Placeholder  

As opposed to pane type widget, the placeholder's task is to present partial type view in any place at the system. As opposed to the pane object, the example:

```php
<?php

namespace Antares\Foo\Http\Handler;

class FooPlaceholder
{

    /**
     * Placeholder composition
     * 
     * @return void
     */
    public function handle()
    {
        app('antares.widget')
                ->make('placeholder.foo')
                ->add('foo')
                ->value(view('antares/foo::admin.partials._foo_placeholder'));
    }

}
```

consist of the `handle` method listening out for appearing of the right event and does not depend on the view which is being presented. The 'handle' method adds to the widget's object a new object of the 'placeholder' type and ascribes a name to it and value in the form of the view. If the event with an ascribed placeholder is picked out, the view will be rendered. Ascribing to an event is usually made in service provider:

```php
    protected $listen = [
            'antares.ready: admin' => [FooPlaceholder::class],
    ];
```

**The placeholder will be displayed in a place, where the helper twig will be placed:**

```html
    {{ placeholder('foo') }}
```

which will render the content declared by the 'handle' method. The effect:

  ![AT_VIS08](../img/docs/modules_development/views/AT_VIS08.png)
  
Please remember that the contents coming from other components and modules may be pinned to the `placeholder` objects.
