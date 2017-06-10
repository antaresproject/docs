# Filters  

[TOC]

## Introduction  

Filters are used to limit the query results that are data providers within the Datatables operation. More details about Datatables can be found [here](datatables.md). 

> Filters' classes should be placed in `src/modules/<module_name>/src/Http/Filters/` (e.g. `src/modules/<sample_module>/src/Http/Filters/GroupFilter.php`).

## Class structure

Structure of class responsible for filter's operation is the following:

```php
<?php
     
    namespace Antares\Foo\Http\Filters;
     
    use Yajra\Datatables\Contracts\DataTableScopeContract;
    use Antares\Datatables\Filter\AbstractFilter;
    use Antares\Support\Collection;
    use Illuminate\Support\Fluent;
    use Antares\Foo\Model\FooRow;
    use Foundation;
     
    class FooFilter extends AbstractFilter implements DataTableScopeContract
    {
     
        /**
         * The name of the filter
         *
         * @var String
         */
        protected $name = 'Foo Names';
     
        /**
         * A unique name of the column - the key which will be saved in the session
         *
         * @var String
         */
        protected $column = 'foo';
     
        /**
         * Pattern of data display in the filter
         *
         * @var String
         */
        protected $pattern = '%value';
     
        /**
         * Provider of data that shall be included by the filter
         *
         * @return Collection
         */
        protected function dataProvider()
        {
            $foos         = Foundation::make(FooRow::class)->get();
            $dataProvider = new Collection();
            foreach ($foos as $foo) {
                $dataProvider->push(new Fluent([
                    'name' => $foo->name,
                    'icon' => 'zmdi-accounts'
                ]));
            }
            return $dataProvider;
        }
     
        /**
         * Displays the filter's content
         *
         * @return String
         */
        public function render()
        {
            publish('foo', ['js/foo-filter.js']);
            return view('datatables-helpers::partials._filter_list', [
                'dataProvider' => $this->dataProvider(),
                'title'        => $this->column,
                'name'         => $this->name]);
        }
     
        /**
         * Filters the data based on the data saved in the session
         *
         * @param mixed $builder
         */
        public function apply($builder)
        {
            $params = $this->getParams();
            if (is_null($params) or $builder instanceof EloquentCollection) {
                return false;
            }
            if (!empty($values = array_get($params, $this->column . '.values'))) {
                $builder->whereIn('name', $values);
            }
        }
     
    }
```
    
As shown above, the filter has to inherit from the abstract base class `Antares\Datatables\Filter\AbstractFilter`. It also has to implement the interface `Yajra\Datatables\Contracts\DataTableScopeContract` used by the 'Datatables' object.

### Attributes  

* **name** - the name of the filter that can be considered a title as well. It is used to present the filter on the filters' list (dropdown), as outlined below:
  ![AT_FILT01](../img/docs/services/filters/AT_FILT01.png)
  
* **column** - the attribute being the name of the key where the filter's data in session are located. It is crucial that the name of the column is unique in order to avoid any repetition. 
* **pattern** - the attribute that defines the pattern of a title after the filter is chosen. An example:
  ```php
  protected $pattern = 'Foo %value Foo';
  ```
  It will result in the filter's data display in the following format:

  ![AT_FILT02](../img/docs/services/filters/AT_FILT02.png)
  
### Methods  

* **dataProvider** - the method used by the `render` method. In the above mentioned case, it is a data provider for the purpose of a list displayed in the filter's dropdown menu, as shown below:

  ![AT_FILT03](../img/docs/services/filters/AT_FILT03.png)
  
* **render** - the method responsible for filter's presentation on the list. It may use the publication of assets that take part in the interface support. **You need to remember that filters placed in the application are only a pattern and they cannot be used in the dedicated applications. Each filter should possess its own implementation of scripts responsible for the interface support.** Implementation of the `render` method itself is simple. It is responsible for delivery of a view that the filter is presented with. 
* **apply** - the method responsible for the filtering logic. In this method, the narrowing of the query is supported. An argument of this method is usually the builder's instance (`\Illuminate\Database\Eloquent\Builder`) sql delivered with the Laravel's environment. The `getParams()` method provides the data included in session. In the above mentioned case, the code shown below is responsible for downloading the data assigned to the filter:
  ```php
  if (!empty($values = array_get($params, $this->column . '.values'))) {
     $builder->whereIn('name', $values);
  }
  ```
Remember that using the `whereIn` method in the example above takes place on the object's instance of the `Illuminate\Database\Eloquent\Builder` type which is responsible for creating a query to database. In case dataProvider is defined as a collection (`Illuminate\Database\Eloquent\Collection` or `Illuminate\Support\Collection`), the use of the `whereIn` method will have no result. In case of the collection the methods described in the [documentation](https://laravel.com/docs/5.1/collections) should be applied.

### Forms  

In the filters, apart from the list, the forms narrowing the query results can be defined. Here is an example:

```php
<?php
     
    namespace Antares\Foo\Http\Filters;
     
    use Yajra\Datatables\Contracts\DataTableScopeContract;
    use Antares\Datatables\Filter\AbstractFilter;
    use Antares\Html\Form\FormBuilder;
    use Antares\Html\Form\Fieldset;
    use Antares\Html\Form\Grid;
     
    class FooFormFilter extends AbstractFilter implements DataTableScopeContract
    {
     
        /**
         * The name of the filter
         *
         * @var String
         */
        protected $name = 'Foo Form Filter';
     
        /**
         * A unique name of the column - the key that will be saved in session
         *
         * @var String
         */
        protected $column = 'foo_form';
     
        /**
         * Pattern of data display in the filter
         *
         * @var String
         */
        protected $pattern = 'Registered at %created_at_range';
     
        /**
         * Displays the filter's content
         *
         * @return String
         */
        public function render()
        {
            publish('foo', ['js/foo-form-filter.js']);
            $form = $this->form();
            return view('datatables-helpers::partials._filter_form')->with(['form' => $form]);
        }
     
        /**
         * Filters the data based on the data saved in the session
         *
         * @param mixed $builder
         */
        public function apply($builder)
        {
            $params = $this->getParams();
            if (is_null($params) or $builder instanceof EloquentCollection) {
                return false;
            }
            if (!empty($values = array_get($params, $this->column . '.values'))) {
                $collection = current($values);
                foreach ($collection as $item) {
                    if ($item['name'] !== 'created_at_range') {
                        continue;
                    }
                    $builder->where('created_at_range', $item['value']);
                }
            }
        }
     
        /**
         * Definition of the form inside the filter
         *
         * @return \Antares\Html\Form\Builder
         */
        protected function form()
        {
            $grid = app(Grid::class);
            $grid->name('foo_filter_created_date');
            $grid->simple('#');
            $grid->layout('antares/foo::admin.partials._filter_form');
     
            $grid->fieldset(function (Fieldset $fieldset) {
     
                $value = !empty($this->data) ? $this->data->where('name', 'created_at_range')->pluck('value')->first() : null;
     
                $fieldset->control('input:text', 'created_at_range')
                        ->attributes(['placeholder' => "from date...", 'required' => 'required', 'data-datepicker' => true])
                        ->value($value);
     
                $fieldset->control('button', 'button')
                        ->attributes(['type' => 'submit', 'class' => 'btn btn--submit btn--md btn--primary mdl-button mdl-jsb mdl-re'])
                        ->value(trans('Set'));
            });
            return new FormBuilder($grid);
        }
    }
```

In the example above, the `form` method is responsible for providing the form's object that will be displayed in the filter. More information about the work with forms can be found [here](form_builder.md). Worth noting is the name of the value in the `pattern` attribute - that is `%created_at_range` - which is the same as the name of the field in the form. The layout's file used by the form has the following syntax:

<pre><code>antares/foo::admin.partials._filter_form</code></pre>

```html
{{ Form.open(form)|raw }}
    {% for fieldset in fieldsets %}
        <fieldset name="inputs">               
            {% for control in fieldset.controls() %}
                <div class="form-block">
                    {{ control.getField(row, control, [])|raw }}
                </div>
            {% endfor %}
        </fieldset>
    {% endfor %}
    {% if buttons|length>0 %}       
        {% for button in buttons %}
            {{ button.getField(row, button, [])|raw }}
        {% endfor %} 
    {% endif %}
{{ Form.close()|raw }}
```

The example above has the following result:

![AT_FILT04](../img/docs/services/filters/AT_FILT04.png)
  
Once the filter is chosen, the effect is as shown below:

![AT_FILT05](../img/docs/services/filters/AT_FILT04.png)
  
In case of filters that use the forms, the query, i.e. the `apply` method is of great importance.

```php
if (!empty($values = array_get($params, $this->column . '.values'))) {
    $collection = current($values);
    foreach ($collection as $item) {
        if ($item['name'] !== 'created_at_range') {
            continue;
        }
        $builder->where('created_at_range', $item['value']);
    }
}
```

The code scans the set of form's fields saved in the session through the loop and in case the found key is identical with the one specified in the form's field, the results of a query are narrowed down.
