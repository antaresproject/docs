# Views and UI Components  

[TOC]

## How to create new view

Antares uses [Twig template engine](http://twig.sensiolabs.org/documentation) to generate user interfaces. More information you can find [here](http://twig.sensiolabs.org/documentation). 

The controller is responsible for handling request that comes into a Antares. 
In next step, the controller delegates computing work to other places (eg: [Processors](../modules_development/controllers_and_processors.md), Models, Repositories). 
This solution allows to reuse the code. When a controller needs to generate HTML it passes whole decoration process to templating engine.
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

More information about controllers, processors and presenters you can find in section [Controllers and Processors](../modules_development/controllers_and_processors.md).

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

* [Views](../modules_development/module_events.md#views)
* [Placeholder](../modules_development/module_events.md#placeholder)
* [Menu](../modules_development/module_events.md#main-menu)
* [Breadcrumb](../modules_development/module_events.md#breadcrumb)
* [Pane](../modules_development/module_events.md#pane)
* [Pane Menu](../modules_development/module_events.md#pane-menu)
* [Datatables](../services/events.md#widgets)
* [Forms](../services/events.md#forms)
* Widgets
   * [Widget Views](../services/widget.md#views)
   * [Widget Layouts](../services/widget.md#layouts)
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




## How to create UI Component
 
UI Component is a structure creating decoration of existing view component instance. This means that, if there is a need for constructing a view component containing 'Datatables', one can use a set of predefined solutions known as ui components.     
The following ui components (that are currently supported) can be distinguished:  
   
* [Default](views_and_ui_components.md#Default)  
* [Datatables](views_and_ui_components.md#Datatables)
* [Ajax](views_and_ui_components.md#Ajax)
 
### Default  
 A template used for general destination content's publication:
 
```php
<?php   
    namespace Antares\Foo\Widgets;
       
    use Antares\Widgets\Adapter\AbstractWidget;
     
    class DefaultFooWidget extends AbstractWidget
    {
     
       /**
       * Name of the widget
       *
       * @var String
       */
       public $name = 'Default Foo Widget';
       
       /**
       * Render method is responsible for component's content publication
       *
       * @return String
       */
       public function render()
       {
          return 'default widget template';
       }
    }
``` 
And the result is:
 
![AT_widtemp1](../img/docs/antares_concepts/widget_templates/AT_widtemp1.PNG)
   
 Main Component's layout is located in  `src\components\widgets\resources\views\templates\default\index.twig` with following source:
 
 
```html
 {% extends 'antares/widgets::templates.layouts.template' %}
 {% block content %}
     <div class="card card--info card--padding24">
         {% if titlable %}
             <div class="card__header">
                 <div class="card__header-left">
                     <span>
                         {{ name }}
                     </span>
                     {{ event('widgets:render.header-left.'~name)|raw }}
                 </div>        
                 <div class="card__header-right">
                     {{ event('widgets:render.header-right.'~name)|raw }}
                 </div>
             </div>
         {% endif %}
         <div class="card__content">
             {{ content|raw }}
         </div>
     </div>
 {% endblock %}
```
 
### Datatables  
 
Template is used for showing data in table. An example of the structure:
 
```php
<?php
namespace Antares\Foo\Widgets;
 
use Antares\Widgets\Templates\DatatablesWidget as WidgetTemplate;
use Antares\Foo\Http\Datatables\FooDatatable;
use Illuminate\Support\Facades\Route;
 
class TableFooWidget extends WidgetTemplate
{
 
    /**
     * @var String
     */
    public $name = 'Foo Table Widget';
     
    /**
     * Routing's definition within the widget
     * 
     * @return \Symfony\Component\Routing\Router
     */
    public static function routes()
    {
        Route::post('foo-list', ['middleware' => 'web', function() {
            return app(FooDatatable::class)->ajax();
        }]);
    }
     
    /**
     * Widget's content publication
     * 
     * @return View
     */
    public function render()
    {
        $table = app(FooDatatable::class)->html('/foo-list');
        return view('antares/foo::widgets.datatable', ['dataTable' => $table]);
    }
}
```

And the result: 
![AT_widtemp2](../img/docs/antares_concepts/widget_templates/AT_widtemp2.PNG)
   
It is worth noticing that the pointed object '**TableFooWidget**' inherits from `WidgetTemplate` that is '**Antares\Widgets\Templates\DatatablesWidget**'. The 'render' method will cause widget's data publication, that is the view containing 'Datatables' instance in this case. The file's structure which is responsible for widget's content rendering, is the following:
 
```html
{{ dataTable.scripts()|raw }}
{{ dataTable.tableDeferred()|raw }}
```
The `Datatables` object is transferred to the view and in such a situation the `scripts()` method is done which generates javascript responsible for correct datatables operation according to parameters. The 'tableDeferred()' method creates table's prototype, filled with data in initialization mode. Template uses 'datatables' layout by default. Structure of this layout is the following:
 
```html
 {% extends 'antares/widgets::templates.layouts.template' %}
 {% block content %}
     {{ content|raw }}
 {% endblock %}
```
 
 Thus, only the content is generated, which is widget's response. Setting of individual sections responsible for displaying the buttons such as 'Filter' or 'Mass actions' are done by Datatables' definition. More information about Datatables objects' construction can be found [here](https://inbssoftware.atlassian.net/wiki/display/AS/Datatables). 
 Layout file's content located in `src\components\widgets\resources\views\templates\datatables\index.twig`:
 
```html
 {% extends 'antares/widgets::templates.layouts.template' %}
 {% block content %}
     <div class="card card--info card--padding24">
         {% if titlable %}
             <div class="card__header">
                 <div class="card__header-left">
                     <span>
                         {{ name }}
                     </span>
                     {{ event('widgets:render.header-left.'~name)|raw }}
                 </div>        
                 <div class="card__header-right">
                     {{ event('widgets:render.header-right.'~name)|raw }}
                 </div>
             </div>
         {% endif %}
         <div class="card__content">
             {{ content|raw }}
         </div>
     </div>
 {% endblock %}
```
 
### Ajax  
 
 Ajax widget template is a group of widgets in which, as the name suggests, content is loaded dynamically. This means that once the main container appears (its parameters are determined by widget's attributes) it will be downloaded by the ajax way.
 Widget's example which uses a template:
 
```php
 <?php
 
 namespace Antares\Foo\Widgets;
 
 use Antares\Widgets\Templates\AjaxWidget as WidgetTemplate;
 use Illuminate\Support\Facades\Route;
 
 class AjaxFooWidget extends WidgetTemplate
 {
 
     /**
      * Name of the widget
      * 
      * @var String
      */
     public $name = 'Foo Ajax Widget';
 
     /**
      * widget attributes
      * 
      * @var array
      */
     protected $attributes = [
         'remote'   => 'foo-widget-content'
     ];
 
     /**
      * Routing definition
      * 
      * @return \Symfony\Component\Routing\Router
      */
     public static function routes()
     {
         return Route::get('/foo-widget-content', function() {
                     return view('antares/foo::widgets.ajax-sample-widget-content');
                 });
     }
 
     /**
      * Widget's content publication, which will be downloaded by ajax
      * 
      * @return String | mixed
      */
     public function render()
     {
         return view('antares/foo::widgets.ajax')->render();
     }
 
 }
```
 
 Please notice widget's attributes. The **remote** attribute defines url address and its content will be downloaded. The class inherits from `Antares\Widgets\Templates\AjaxWidget` that is from template class of the ajax type. File's view in the 'render' method has the following syntax `antares/foo::widgets.ajax`:
 
```html
 <div class="widget-content">
     <div class="alert alert--glow alert--info alert--lg alert--border mb20" >
         <i class="alert__icon zmdi zmdi-info"></i>
         <span>Loading widget content...</span>
         <i class="alert__close zmdi zmdi-close"></i>
     </div>
 </div>
```
 
 It will cause content's display before the loading of the ajax content:
 

![AT_widtemp3](../img/docs/antares_concepts/widget_templates/AT_widtemp3.PNG)
   
 View's file within the 'routes' method, is the content downloaded by ajax `antares/foo::widgets.ajax`:
 
 
```html
 <p>
         Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
         The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
 </p>
```
 
As a result, a widget will be created:
 
![AT_widtemp4](../img/docs/antares_concepts/widget_templates/AT_widtemp4.PNG)
   
 
layout file's content, located in `src\components\widgets\resources\views\templates\ajax\index.twig`:
 
```html
 {% extends 'antares/widgets::templates.layouts.template' %}
 {% block content %}
     <div class="card card--info card--padding24">
         {% if titlable %}
             <div class="card__header">
                 <div class="card__header-left">
                     <span>
                         {{ name }}
                     </span>
                     {{ event('widgets:render.header-left.'~name)|raw }}
                 </div>        
                 <div class="card__header-right">
                     {{ event('widgets:render.header-right.'~name)|raw }}
                 </div>
             </div>
         {% endif %}
         <div class="card__content widget-content-{{widgetId}}">
             {{ content|raw }}
             <script type="text/javascript">
                 {{ script|raw }}
             </script>
         </div>
     </div>
 {% endblock %}
```   