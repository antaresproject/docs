# Sample Widget Template  

The code below is an example of a widget template:

```php

<?php

namespace Antares\Foo\Widegts;

use Antares\Widgets\Adapter\AbstractWidget;

class WidgetTemplate extends AbstractWidget
{
    /**
     * Path of template view
     *
     * @var String
     */
    protected $template = 'antares/foo::widgets.widget_template';

    /**
     * Widget attributes
     *
     * @var array
     */
    protected $attributes = [
        'resizable'      => false,
        'droppable'      => false,
        'draggable'      => false,
        'min_width'      => 3,
        'min_height'     => 6,
        'max_width'      => 12,
        'max_height'     => 52,
        'default_width'  => 3,
        'default_height' => 25
    ];
   /**
    * {@inherited}
    */
    public function render()
    {

    }
}
```

The path to the view's file which will be used by the template is determined in the `$template` attribute:

```html
{% extends 'antares/widgets::templates.layouts.template' %}
{% block content %}
    <div class="card card--info card--padding24">
        <div class="card__header">
            <div class="card__header-left">
                <span>
                    {{ title }}
                </span>
            </div>                       
        </div>
        <div class="card__content">
            <p>This is sample widget template</p>
            {{ content|raw }}
        </div>
    </div>
{% endblock %}
```
The `$attributes` attributes determine default parameters of the template. More information about the parameters can be found in the [Widget](../services/widget.md) section. The widget may use the template when it inherits from its class:
```php
<?php

namespace Antares\Foo\Widegts;

class FooWidget extends WidgetTemplate
{

    /**
     * name of widget
     *
     * @var String
     */
    public $name = 'Foo Sample Widget';

    /**
     * Renders widget content
     *
     * @return String
     */
    public function render()
    {
        return view('antares/foo::widgets.sample_widget');
    }
}
```



The effect is shown below:

![AT_SWT01.PNG](../img/docs/tutorials/sample_widget_template/AT_SWT01.PNG)
