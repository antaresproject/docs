# Ui Component  

[TOC]

## Introduction  

Ui Components - objects in the application which (because of their behavior and functionality) are used for data presentation only.

> The Ui Components defined by module should be placed in `src/modules/<module_name>/src/UiComponents/` directory (e.g. `src/modules/sample_module/src/UiComponents/SampleUiComponent.php`). Sources of ui components is located in `src/core/src/ui/components/templates/twig/`.

### Basic Implementation   

They work closely with user's interface. An example of a ui component may be a table presenting users' list. Widget's property is the ability of being placed on any application's website. Widgets consist of attributes which determine their behavior in the interface space. An example of an attribute can be 'resizable' which determines whether a ui component on a website will be calibrated or not. In the hierarchy of ui component's structure the ui component is placed the lowest. Widget template is above the ui component and it determines the frames of presentation and ui component's operation. This means that you can build for instance 10 different ui components with users' tables in the system but each one of them must inherit the ui component template structure named 'Datatables'. Each ui component may define its own layout which by default is ascribed by ui component template. On the top of the ui component hierarchy is an abstraction layer which determines common features and behaviors of all ui components in the system.
Minimal structure of the class defining a ui component:

```php
<?php
 
namespace Antares\Foo\Widgets;
 
use Antares\Widgets\Adapter\AbstractWidget;
 
class FooWidget extends AbstractWidget
{
 
    /**
     * Determining the ui component's name, the attribute is required
     *
     * @var String
     */
    public $name = 'Foo Widget';
 
    /**
     * Displaying (rendering) the ui component's content
     *
     * @return string
     */
    public function render()
    {
        return "foo ui component content";
    }
}
```

The basic ui component's structure consist of the `render` method and the `name` attribute. Both the attribute and the method are required for proper ui component's interpretation as a specific type of object in the system. The name attribute should be unique within all ui components. The `render` method is responsible for displaying the ui component's content. 

### Placing The Widget On A Website  

The ui component described in the case above has to be added 'manually' on a website because it does not define property of automatic presentation. In order to add the ui component, firstly, the view - which is responsible for displaying the website where the ui component will be presented - must inherit from the 'ui componentable' layout, so:

```html
{% extends "antares/foundation::layouts.antares.ui componentable" %}
{% block content %}       
{% endblock %}
```

On the top of the website, the following button ![AT_WIDG01.PNG](../img/docs/services/ui component/AT_WIDG01.PNG) is available which opens the ui component selection panel:

  ![AT_WIDG02.PNG](../img/docs/services/ui component/AT_WIDG02.PNG)
  
The 'Foo Widget' is avaialable as on the screen above. If you click the 'FW' picture (which stands for two first letters of the ui component's name), the ui component will be placed on the website as below:

  ![AT_WIDG03.PNG](../img/docs/services/ui component/AT_WIDG03.PNG)

It is worth noticing that pressing the ![AT_WIDG04.PNG](../img/docs/services/ui component/AT_WIDG04.PNG) button enables ui components' edition on the website. Apart from adding the ui components it is also possible to change ui component's parameters at any moment, so the ui component shown above can be removed, its position may be changed or scaled, as presented below:

  ![AT_WIDG05.PNG](../img/docs/services/ui component/AT_WIDG05.PNG)
  
Press the button labeled with the ![AT_WIDG06.PNG](../img/docs/services/ui component/AT_WIDG06.PNG) icon in order to remove the ui component from the website (which in turn will appear in ui component's selection bar) whereas the ![AT_WIDG07.PNG](../img/docs/services/ui component/AT_WIDG07.PNG) button enables ui component's container size change.

### Placing The Widget On A Website (The Force Mode)  

The solution described in the previous paragraph enables dynamic ui component management on the website. In case when it is necessary to determine the ui components permanently without the possibility of changing their parameters on user's website use the force mode. An example:

```html
{% extends 'antares/foundation::layouts.antares.main' %}
{% block main_content %}   
    <section class="main-content">
        {% include 'antares/foundation::components.messages' %}
        {% include 'antares/foundation::layouts.antares.partials._left_panel' %}
        {% block gridable %}       
            <div class="grid-stack">
                {{ ui component_forced('foo_ui component',{'x':10,'y':0,'width':20,'height':10})|raw }}  
            </div>
        {% endblock %}
    </section>
{% endblock %}
```

The code above will generate the following website:

  ![AT_WIDG08.PNG](../img/docs/services/ui component/AT_WIDG08.PNG)
  
The whole operation happens by means of `ui component_forced` twig engine extension. The `ui component_forced` function as a first argument takes the name of the ui component in the form of underscore (that is Foo Widget => foo_ui component), whereas the second argument are ui components' attributes. More information about ui components' attributes may be found [here](../modules-development/ui-components.md).

## Views  

The method responsible for displaying ui component's content is the `render` method. The method should respond with an object providing the `__toString` magic method or respond independently with a value of the 'String' type. Otherwise, the ui component will not be displayed. The code in the example:

```php
public function render()
{
    return "foo ui component content";
}
```

will display the content of the 'foo ui component content'. Whereas the code:

```php
public function render()
{
    publish('foo', ['js/ui component_logic.js']);
    $content = 'Sample content';
    return view('antares/foo::ui components.foo', ['content' => $content]);
}
```

will publish the content defined in the view `antares/foo::ui components.foo`

```html
{{ content|raw }}
```

and add asset's file named 'ui component_logic.js' which will be activated each time whenever the ui component will be published. The effect:

  ![ui component_1](../img/docs/services/ui component/ui component_1.png)
  
## Layouts  

Each ui component may use layout for wrapping the content presented by means of the `render` method. Such solution makes the programmer free from necessity of repeating the same activities while generating the ui component's content. Determining which layout will be used by the ui component is possible through the `template` parameter:

```php
/**
 * Determining which layout will be used by the ui component
 *
 * @var String
 */
public $template = 'dark';
```

Usually the 'default' layout is used and its structure is the following:

```bash
default/index.twig
```

```html
{% extends 'antares/ui components::templates.layouts.template' %}
{% block content %}
    <div class="card card--info card--padding24">
        {% if titlable %}
            <div class="card__header">
                <div class="card__header-left">
                    <span>
                        {{ name }}
                    </span>
                    {{ event('ui components:render.header-left.'~name)|raw }}
                </div>       
                <div class="card__header-right">
                    {{ event('ui components:render.header-right.'~name)|raw }}
                </div>
            </div>
        {% endif %}
        <div class="card__content">
            {{ content|raw }}
        </div>
    </div>
{% endblock %}
```

In the case shown above the 'dark' layout has been indicated and its use will display:

  ![AT_WIDG09.PNG](../img/docs/services/ui component/ui component_2.png)
  
The list of all available layouts is located inside the 'ui components' components, in the catalogue:

```bash
\src\components\ui components\resources\views\templates
```

The files responsible for layouts are the index.twig files.

### Creating Own Layout  

In order to add your own layout go to the catalogue:

```bash
\src\components\ui components\resources\views\templates
```

and create a subcatalogue which has a name adequate to the name of the layout. Create a manifest file (manifest.json) inside the created catalogue, an example:

```bash
\src\components\ui components\resources\views\templates\foo\index.twig
```

```php
{
    "package": "foo",
    "name": "Foo Template",
    "description": "Foo Template Description",
    "author": "Foo",
    "url": "https://antares.com/docs",
    "type": [],
    "autoload": []
}
```

Description of the parameters:

* package - determines short name of the layout,
* name - determines full name of the layout,
* description - description of the layout,
* url - usually the url address to the documentation,
* autoload - php scripts used during loading

Once the manifest file is created, create the layout main file named index.twig. Here is an illustrative structure of such a file:

```bash
\src\components\ui components\resources\views\templates\foo\index.twig
```

```html
{% extends 'antares/ui components::templates.layouts.template' %}
{% block content %}
    <div style="background-color:red;padding:10px;height:100%;">
        {{ content|raw }}
    </div>
{% endblock %}
```

As a result it will display:

  ![ui component_3](../img/docs/services/ui component/ui component_3.png)
  
In the case above the css inline has been applied for the needs of the code example only. In target solutions inline should not occur.

## Configuration  

### Title  

To make the ui component possess upper beam with a title it is necessary to set the attribute named 'titlable':

```php
/**
 * Widget's attributes
 *
 * @var array
 */
protected $attributes = [
    'titlable' => true,
];
```

The attribute will cause ui component's title display as in the example below:

![AT_WIDG11.PNG](../img/docs/services/ui component/AT_WIDG11.PNG)
  
By default, the title's content will be downloaded from the `name` parameter. However, if the `title` parameter has been determined, the value of this parameter will be taken into consideration in the first place. More information about ui component's attributes can be found [here](../modules-development/ui-components.md).

### Description  

The parameter determines ui component's description:

```php
/**
 * Widget's description
 *
 * @var String
 */
public $description = 'Foo Ajax Widget Description';
```

### Widget's Availability  

Widgets' configuration enables adapting the ui component's structure and functionality to the demand in the system. Widget may take the following parameters:

```php
/**
 * Designation of views where the ui component will be published
 *
 * @var array
 */
protected $views = [
    'antares/foo::admin.foo.index'
];
```

The `views` parameter determines on which 'views' the ui component will be available. Such solution enables ui component's availablity control by a module or a component or a programmer. In the aforementioned example during the 'index.twig' view presentation placed in the location `src\components\foo\resources\views\admin\foo` the ui component will appear in the upper ui component selection beam. When this parameter is not determined it will be available in all views (the '*' value) by default. The 'disabled' parameter is connected with this one and it is the opposite of the `views` parameter:

```php
/**
 * Designation of views where the ui component will not be published
 *
 * @var array
 */
protected $disabled = [
    'antares/foundation::dashboard.index'
];
```

It will cause ui component's availability deactivation during 'dashboard' view's rendering. Both parameters - the `views` and the `disabled` - will recognize the values of the 'wildcard' type, an example:

```php
/**
 * Designation of views where the ui component will be published
 *
 * @var array
 */
protected $views = [
    'antares/foo::*'
];
```

It will render the ui component available only during the presentation of views which belong to the 'foo' component.

## Attributes  

Attributes enables being in control of ui component's behavior on a website. The list of attributes:

* x
* y
* enlargeable
* fixed_width
* fixed_height
* min_width
* min_height
* max_width
* max_height
* default_width
* default_height
* resizable
* draggable
* nestable
* titlable
* editable
* removable
* disabled
* manually_disabled
* actions

## Forms  

A ui component may define forms belonging to website's presentation. This means that the whole content of which the website is composed may be dictated by ui components. An example of a ui component with form's definition:

```php
<?php
 
namespace Antares\Foo\Widgets;
 
use Antares\Widgets\Adapter\AbstractWidget;
use Antares\Html\Form\Grid as FormGrid;
use Antares\Html\Form\Fieldset;
use Antares\Support\Fluent;
 
class FooWidget extends AbstractWidget
{
 
    /**
     * Widget's name designation, the attribute is required
     *
     * @var String
     */
    public $name = 'Foo Widget';
 
    /**
     * Displaying (rendering) the ui component's content
     *
     * @return string
     */
    public function render()
    {
        $form = $this->form();
        return view('antares/foo::ui components.foo', ['form' => $form]);
    }
     
    /**
     * Creates form's instance assigned for displaying in the ui component
     *
     * @return \Antares\Html\Form\FormBuilder
     */
    protected function form()
    {
        return app('antares.form')->of('foo_form', function(FormGrid $form) {
                    $form->simple('#', [], new Fluent());
                    $form->name('Widget Foo Form');
                    $form->layout('antares/foo::ui components.form');
 
                    $form->fieldset(function (Fieldset $fieldset) {
 
                        $fieldset->control('input:text', 'foo_text')
                                ->label('Foo Text');
 
                        $fieldset->control('textarea', 'foo_textarea')
                                ->attributes(['cols' => 10, 'rows' => 3])
                                ->label('Foo Textarea');
 
                        $fieldset->control('select', 'foo_select')
                                ->label('Foo Select')
                                ->options(['First Option'])
                                ->attributes(['data-selectar' => true]);
                    });
                    $form->fieldset(function (Fieldset $fieldset) {
 
                        $fieldset->legend('Foo radios');
 
                        $fieldset->control('radio', 'foo_radios[]')
                                ->label('Foo Radio Option 1');
                        $fieldset->control('radio', 'foo_radios[]')
                                ->label('Foo Radio Option 2');
                    });
                    $form->fieldset(function (Fieldset $fieldset) {
 
                        $fieldset->legend('Foo checkboxes');
 
                        $fieldset->control('checkbox', 'foo_checkbox[]')
                                ->label('Foo Checkbox Option 1');
                        $fieldset->control('checkbox', 'foo_checkbox[]')
                                ->label('Foo Checkbox Option 2');
                    });
                    $form->fieldset(function (Fieldset $fieldset) {
                        $fieldset->control('button', 'cancel')
                                ->field(function() {
                                    return app('html')->link(handles("antares::/"), trans('antares/foundation::label.cancel'), ['class' => 'btn btn--md btn--default mdl-button mdl-js-button']);
                                });
                        $fieldset->control('button', 'button')
                                ->attributes(['type' => 'submit', 'class' => 'btn btn-primary',])
                                ->value(trans('antares/foundation::label.save_changes'));
                    });
                });
    }
 
}
```

Below - the effect:

  ![ui component_4](../img/docs/services/ui component/ui component_4.png)
  
In other words, this is a form placed in a ui component. Take note of form's layout syntax which is the file `antares/foo::ui components.form`:

```html
{% extends "antares/foundation::layouts.antares.partials.form.vertical" %}
{% block fieldsets %}
    {% for fieldset in fieldsets %}
        <fieldset name="inputs">
            {% if fieldset.legend|length>0 %}
                <legend>{{ fieldset.legend }}</legend>
            {% endif %}
            <div class="col-group">
                {% for control in fieldset.controls() %}
                    <div class="form-block">
                        {% include 'antares/foundation::layouts.antares.partials.form.vertical._'~control.type|replace({':': '_'}) with {control: control} %}
                    </div>
                {%endfor %}
            </div>
        </fieldset>
    {%endfor %}
{% endblock %}
{% block buttons %}
    {% for button in buttons %} 
        {{ button.getField(row, button, [])|raw }}       
    {% endfor %}
{% endblock %}
```

Form's layout inherits from the default layout and extends the individual sections in order to obtain proper appearance.

### Validation  

A form located inside a ui component may be validated. In order to achieve this goal you have to define form's validation rules, so:

```php
$form->simple(handles('antares::foo/foo_save'), [], new Fluent());
  
$form->rules([
    'foo_text'     => ['required'],
    'foo_textarea' => ['required'],
    'foo_select'   => ['required'],
]);
```

In the above-mentioned example form's action url address and the validation rules have been indicated. By means of the `routes` method it is possible to ascribe the answer once the form is sent, so:

```php
/**
* Routing's definition in ui component's section
*
* @return \Illuminate\Routing\Route
*/
public static function routes()
{
    return Route::post('/admin/foo/foo_save', ['middleware' => 'web', function() {
                    $form = self::form();
                    if (!$form->isValid()) {
                        return redirect()->back()->withErrors($form->getMessageBag())->withInput();
                    }
                }]);
}
```

The effect:

  ![ui component_5](../img/docs/services/ui component/ui component_5.png)
  
### Ajax Validation  

A form in a ui component may use ajax validation. This is a desirable solution especially when there is more than one ui component on a website. Ajax validation activation occurs by means of the code:

```php
$form->ajaxable();
```

Do not forget about proper form's data operation after the validation.

### HTML5 Validation  

The use of validation determined at the side of the browser is possible when the control's attributes are introduced in the first place, an example:

```php
$fieldset->control('input:text', 'foo_text')
        ->label('Foo Text')
        ->attributes([
            'placeholder' => 'Provide the value beginning from https...',
            'required'    => 'required', 'pattern'     => "https?://.+"
]);
```

The result:

  ![ui component_6](../img/docs/services/ui component/ui component_6.png)
  
**It is not possible** to use both the ajax validation and the validation with the use of html5 attributes on one form.

### Controls' Width Control  

By means of well-matched classes which are used to determine the width of the container in which the control is placed it is possible to adapt ui component's appearance for the needs of specification, so:

```php
$fieldset->control('input:text', 'foo_text')
        ->label('Foo Text')
        ->attributes([
            'class' => 'w200',
]);
```

or:

```php
$fieldset->control('input:text', 'foo_text')
         ->label('Foo Text')
         ->wrapper(['class' => 'w200']);         
```

It will create:

  ![ui component_7](../img/docs/services/ui component/ui component_7.png)
  

