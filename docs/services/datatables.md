# Datatables  

[TOC]

## Introduction  

Datatables are the type of a structure that enables the automation of data presentation process in a tabular form (datagrid). A library with the same name is used in the system (click [here](https://datatables.net/) for details). The system also utilizes the functionality of a [vendor](https://datatables.yajrabox.com/) as an additional library. An example of a solution is shown below (basic implementation):

> The datatable classes should be placed in `src/modules/<module_name>/src/Http/Datatables/` (e.g. `src/modules/<sample_module>/src/Http/Datatables/SampleDatatable.php`). The path of datatable sources is `src/core/src/ui/components/datatables/`.

```php
<?php
     
    namespace Antares\Foo\Http\Datatables;
     
    use Antares\Foo\Http\Repositories\FooRepository;
    use Antares\Datatables\Services\DataTable;
     
    class FooDatatable extends DataTable
    {
     
        /**
         * A query based on which data are generated in a table (dataprovider)
         *
         * @return \Illuminate\Database\Eloquent\Builder
         */
        public function query()
        {
            return app(FooRepository::class)->findAll(['id', 'name', 'description']);
        }
     
        /**
         * Parameters' settings of particular columns
         */
        public function ajax()
        {
            return $this->prepare()->addColumn('action', function() {
                        return '<i class="zmdi zmdi-more"></i>';
                    })->make(true);
        }
     
        /**
         * Definition of the instance, the order of columns based on which a table's prototype will be generated
         *
         * @return \Antares\Datatables\Html\Builder
         */
        public function html()
        {
            return $this->setName('Foo List')
                            ->addColumn(['data' => 'id', 'name' => 'id', 'title' => trans('antares/foo::datagrid.header.id')])
                            ->addColumn(['data' => 'name', 'name' => 'name', 'title' => trans('antares/foo::datagrid.header.name'), 'bolded' => true])
                            ->addColumn(['data' => 'description', 'name' => 'description', 'title' => trans('antares/foo::datagrid.header.description')])
                            ->addColumn(['data' => 'custom', 'name' => 'custom', 'title' => trans('antares/foo::datagrid.header.custom')])
                            ->addAction(['name' => 'edit', 'title' => '', 'class' => 'mass-actions dt-actions'])
                            ->setDeferedData();
        }
    }
```
    
This is a basic version of a class that enables data presentation in a tabular form. All the methods mentioned in the example above are required. Their description is included in the further part of the article. The example will display data in the following form:

![AT_DATAS01](../img/docs/services/datatables/AT_DATAS01.png)
  
##Dataproviders  

The `query` method is defined as a dataprovider because it is responsible for providing the data to the table. The most important types are:
* queries (based on a query builder)
* collections (based on the Collection object)

### Queries  

A query provides the data to the table based on the values gathered in the database. An example:

```php
public function query()
{
   return FooRow::select(['id', 'name', 'description'])->whereNotNull('id')->where('name', 'like', 'Foo');
}
```

The method will provide the result of the query that includes the data specified on the basis of the 'where' clause. It is important that the method returns the correctly constructed object of the `\Illuminate\Database\Eloquent\Builder` type as otherwise the data will not be published. To find more information on how to build queries visit the [Laravel website](https://laravel.com/docs/5.2/queries).

### Collections  

The collection delivers the data to the table in the form of the `Antares\Support\Collection` object. An example:

```php
public function query()
{
    return new Collection([
        ['id' => 1, 'name' => 'Foo name', 'description' => 'Foo description', 'custom' => 'custom value'],
        ['id' => 2, 'name' => 'Foo name 2', 'description' => 'Foo description 2']
    ]);
}
```

### Data Decoration In The Columns  

It is possible to execute the operation on data within a single column. Having in mind the example above, the `ajax` method enables the wrapping of a data cell by means of the `editColumn` method. Here is an example:

```php
public function ajax()
{
    return $this->prepare()
                    ->editColumn('name', function($model) {
                        return '<span class="label-basic label-basic--success ui-selectee">' . $model->name . '</span>';
                    })
                    ->addColumn('action', function() {
                        return '<i class="zmdi zmdi-more"></i>';
                    })->make(true);
}
```

The `editColumn` method accepts two arguments, the first one is the name of the column (coming from the `html()` method, the value of 'data' key when specifying the particular columns) and the second one is an anonymous function that defines the value of  a cell for a column. The effect:

![AT_DATAS02](../img/docs/services/datatables/AT_DATAS02.png)
  
It is also possible to use the method to decorate the value as a component of the datatable class itself:

```php
/**
 * Parameters' settings of particular columns
 */
public function ajax()
{
    return $this->prepare()
                    ->editColumn('name', $this->decorateColumn())
                    ->addColumn('action', function() {
                        return '<i class="zmdi zmdi-more"></i>';
                    })->make(true);
}
 
/**
 * Value's decoration for a column
 *
 * @param \Illuminate\Database\Eloquent\Model $model
 * @return String
 */
protected function decorateColumn()
{
    return function($model) {
        return '<span class="label-basic label-basic--success ui-selectee">' . $model->name . '</span>';
    };
}
```

## Row-Actions  

It is possible to determine the actions that can be executed on the table's row. Start by clicking with the right mouse button on the row to be edited. The entire operation is focused on adding the `action` column that contains a set of links available after clicking the right mouse button. Take a look at the following example of implementation:

```php
/**
 * Parameters' settings of particular columns
 */
public function ajax()
{
    return $this->prepare()
                    ->editColumn('name', $this->decorateColumn())
                    ->addColumn('action', function($row) {
                        return $this->rowActions($row);
                    })->make(true);
}
 
/**
 * Defining of available actions on the table's rows
 *
 * @param \Illuminate\Database\Eloquent\Model $row
 * @return String
 */
protected function rowActions($row)
{
    $this->tableActions = [];
    $html               = app('html');
    $link               = $html->link(handles("antares::foo/{$row->id}/edit"), trans('antares/foo::messages.edit'), [
        'data-icon' => 'edit',
    ]);
    $this->addTableAction('edit', $row, $link);
    return '<i class="zmdi zmdi-more"></i>'
            . '<div class="mass-actions-menu">'
            . '<section><ul>' . implode('', $this->tableActions->toArray()) . '</ul></section>'
            . '</div>';
}
```

The functionality centers on the `rowActions`' method executed within the anonymous function assigned to the `action` column. It is worth noting that the anonymous function has an argument in the form of the current `row` row that can be used in data presentation in the context menu. The `rowActions` method creates html in the form of a bullet point list that contains the links available in the context menu of a row. The effect:

![AT_DATAS03](../img/docs/services/datatables/AT_DATAS03.png)
  
Very often a need arises to remove the data presented by the table. In such cases, confirmation request may be displayed in the form of a window to verify whether a user is certain about data removal. In order to achieve this, the link needs to be extended just like on the example below:

```php
protected function rowActions($row)
{
    $this->tableActions = [];
    $html               = app('html');
    $link               = $html->link(handles("antares::foo/{$row->id}/delete"), trans('antares/foo::messages.delete'), [
        'data-icon'        => 'delete',
        'class'            => "triggerable confirm",
        'data-title'       => trans('antares/foo::messages.are_you_sure'),
        'data-description' => trans('antares/foo::messages.delete_foo', ['name' => $row->name])
    ]);
    $this->addTableAction('edit', $row, $link);
    return '<i class="zmdi zmdi-more"></i>'
            . '<div class="mass-actions-menu">'
            . '<section><ul>' . implode('', $this->tableActions->toArray()) . '</ul></section>'
            . '</div>';
}
```

Note that the change depends solely on adding the css `triggerable confirm` class, the content of a window's title and the announcement in the form of data attributes. The effect is shown below:

![AT_DATAS04](../img/docs/services/datatables/AT_DATAS04.png)
  
## Acl

The currently logged in user cannot be permitted to every action executed on the rows.


```php
protected function rowActions($row)
{
    $this->tableActions = [];
    $html               = app('html');
    $canDelete          = can('antares/foo.delete-action');
 
    if ($canDelete) {
        $link = $html->link(handles("antares::foo/{$row->id}/delete"), trans('antares/foo::messages.delete'), [
            'data-icon'        => 'delete',
            'class'            => "triggerable confirm",
            'data-title'       => trans('antares/foo::messages.are_you_sure'),
            'data-description' => trans('antares/foo::messages.delete_foo', ['name' => $row->name])
        ]);
        $this->addTableAction('edit', $row, $link);
    }
 
    if (empty($this->tableActions)) {
        return '';
    }
 
    return '<i class="zmdi zmdi-more"></i>'
            . '<div class="mass-actions-menu">'
            . '<section><ul>' . implode('', $this->tableActions->toArray()) . '</ul></section>'
            . '</div>';
}
```

The example above verifies whether the user has access to removing:

```php
$canDelete = can('antares/foo.delete-action');
```

It is also checked whether the user is permitted to execute any actions on a table at all:

```php
if (empty($this->tableActions)) {
        return '';
}
```

## Mass Actions  

Mass actions consist in executing a single action on several rows at once. An example:

```php
public function html()
{
    $html = app('html');
    return $this->setName('Foo List')
                    ->addColumn(['data' => 'id', 'name' => 'id', 'title' => trans('antares/foo::datagrid.header.id')])
                    ->addColumn(['data' => 'name', 'name' => 'name', 'title' => trans('antares/foo::datagrid.header.name'), 'bolded' => true])
                    ->addColumn(['data' => 'description', 'name' => 'description', 'title' => trans('antares/foo::datagrid.header.description')])
                    ->addColumn(['data' => 'custom', 'name' => 'custom', 'title' => trans('antares/foo::datagrid.header.custom')])
                    ->addAction(['name' => 'edit', 'title' => '', 'class' => 'mass-actions dt-actions'])
                    ->addMassAction(
                            $html->link(handles('antares/foo::delete'), $html->raw('<i class="zmdi zmdi-delete"></i>' . trans('antares/foo::messages.delete')), [
                                'class'            => "triggerable confirm mass-action",
                                'data-title'       => trans('antares/foo::messages.are_you_sure'),
                                'data-description' => trans('antares/foo::messages.delete_mass_action')
                            ])
                    )
                    ->setDeferedData();
}
```

This is a definition of the `html` method responsible for the creation of a table's prototype (including mass actions). In the implementation, the `addMassAction` method receives in the argument the link to action which the identifiers (multiple IDs) of the marked rows are sent to. The parameterization of the link is important and should be given proper attention. The result of the code above:

![AT_DATAS05](../img/docs/services/datatables/AT_DATAS05.png)
  
You can notice that the `addMassAction` method adds a new button (dropdown) in the upper right corner of the table. If at least two rows are marked the button becomes active.

## Sorting  

By default, the sorting is enabled in all columns. In order to disable it, define the '**orderable**' attribute in the specification of a column (in the 'html' method) as in the example:

```php
$this->setName('Foo List')
     ->addColumn(['data' => 'description', 'name' => 'description', 'title' => trans('antares/foo::datagrid.header.description'), 'orderable' => false]);
```

In case the table's data are downloaded from more complex data structure, perfrorming the sorting correctly might prove troublesome. During the sorting, the event named `datatables.order.<column_name>` is triggered. An example:

```php
public function query()
{
    $query = FooRow::select(['id', 'name', 'description']);
    Event::listen('datatables.order.description', function($query, $direction) {
        $query->orderBy('description', $direction)->orderBy('name', 'desc');
    });
    return $query;
}
```

The parameters of the event are the query handler and sorting direction. A dedicated sorting order can be arranged in the anonymous function.

## Searching  

By default, the data of all columns are subject to searching. In order to change that, define the `searchable` attribute as `false` in the column's specification of the `html` method, as in the example:

```php
return $this->setName('Foo List')
            ->addColumn(['data' => 'description', 'name' => 'description', 'title' => trans('antares/foo::datagrid.header.description'), 'searchable' => false]);
```
            
In order to determine your own question that will enable the correct searching, use the `filterColumn` method in the `ajax()` method:

```php
public function ajax()
{
    return $this->prepare()
                    ->filterColumn('description', function($query, $keyword) {
                        $keywordLower = mb_strtolower($keyword);
                        $keywordUpper = mb_strtoupper($keyword);
                        return $query->where('description', 'like', "%$keywordLower%")->orWhere('description', 'like', "%$keywordUpper%");
                    })
                    ->editColumn('name', $this->decorateColumn())
                    ->editColumn('custom', function() {
                        return 'custom';
                    })
                    ->addColumn('action', function($row) {
                        return $this->rowActions($row);
                    })->make(true);
}
```

The `filterColumn` method as the first argument receives the name of the filtered column, whereas the second argument is the anonymous function that contains the current query and the key word subject to searching. The effect:

![AT_DATAS06](../img/docs/services/datatables/AT_DATAS06.png)
  
## Defered  

Defining the table as `defered` determines direct data delivery. A table without the `defered` parameter will provide the data by 'ajax' (firstly, an empty table will be displayed and the data will be downloaded to the table by 'ajax'). Such a solution is important in case of complex user interfaces when the waiting time for the website's presentation must be minimized and the data delivery may prove expensive from the processing point of view (e.g. complex queries to database). To download the data by ajax remove the `setDeferedData` position in the `html` method:

```php
public function html()
{
    $html = app('html');
    return $this->setName('Foo List')
                    ->addColumn(['data' => 'id', 'name' => 'id', 'title' => trans('antares/foo::datagrid.header.id')])
                    ->addColumn(['data' => 'name', 'name' => 'name', 'title' => trans('antares/foo::datagrid.header.name'), 'bolded' => true])
                    ->addColumn(['data' => 'description', 'name' => 'description', 'title' => trans('antares/foo::datagrid.header.description')])
                    ->addColumn(['data' => 'custom', 'name' => 'custom', 'title' => trans('antares/foo::datagrid.header.custom'), 'searchable' => false])
                    ->addAction(['name' => 'edit', 'title' => '', 'class' => 'mass-actions dt-actions'])
                    ->addMassAction(
                            $html->link(handles('antares/foo::delete'), $html->raw('<i class="zmdi zmdi-delete"></i>' . trans('antares/foo::messages.delete')), [
                                'class'            => "triggerable confirm mass-action",
                                'data-title'       => trans('antares/foo::messages.are_you_sure'),
                                'data-description' => trans('antares/foo::messages.delete_mass_action')
                            ])
    );
}
```

## Filters  

As the name suggests, filters are used for additional data filtering in the tables. In order to add a filter to datatables' instance you need to fill in the `filters` attribute in the 'Datatables' class, so:

```php
/**
 * Filters used by Datatables
 *
 * @var array
 */
protected $filters = [
    FooFilter::class
];
```

The definition shown above gives the following result:

![AT_DATAS07](../img/docs/services/datatables/AT_DATAS07.png)
  
Filters are quite a complex topic. To find more details on how to define them click [here](filters.md).

## Paging  

In this case, the configuration focuses solely on defining the number of rows per page. It is possible through the determination of the `perPage` attribute:

```php
/**
 * The attribute defining the number of rows per page
 *
 * @var mixed
 */
public $perPage = 25;
```

## View  

The presentation of 'Datatables' object's data is possible through the use of the `tableDefered` and `scripts` methods, as in the example below:

```html
{% extends "antares/foundation::layouts.antares.index" %}
{% block content %}   
    {{ dataTable.scripts()|raw }}   
    {{ dataTable.tableDeferred()|raw }}   
{% endblock %}
```

## Events  

### Column's Content 

The change of column's content: `datatables:<route_name>:column.id`, an example is the following:

```php
Event::listen('datatables:admin/users/index:column.id', function(&$attributes) {
   if (isset($attributes['title'])) {
        $attributes['title'] = $attributes['title'] . ' - from foo module';
    }
});
```

The effect:

![AT_DATAS08](../img/docs/services/datatables/AT_DATAS08.png)
  
### Actions On Rows

Attaching in actions on a row, before the action: `datatables:<route_name>:before.action.<action_name>`, after the action: `datatables:<route_name>:after.action.<action_name>`. The example:

```php
Event::listen('datatables:admin/users/index:before.action.edit', function($actions, $row) {
     $actions->push(app('html')->link(handles("antares::users/{$row->id}/foo"), 'From foo module'));
});
```

And the effect:

![AT_DATAS09](../img/docs/services/datatables/AT_DATAS09.png)
  
### Adding A New Filter  

Attaching a new filter to the current 'Datatables' instance, before: `datatables:filters.<route_name>.<filter_name>.before`, after: `datatables:filters.<route_name>.<filter_name>.after`. The example:

```php
Event::listen('datatables:filters.admin/users/index.userstatusfilter.before', function($filter) {
    $filter->add(FooFilter::class);
});
```

The effect:

![AT_DATAS10](../img/docs/services/datatables/AT_DATAS10.png)
  
### Adding A New Column  

Attaching a new column to the existing 'Datatables' instance, before: `datatables:<route_name>:before.<column_name>`, after: `datatables:<route_name>:after.<column_name>`. The example:

```php
use Antares\Datatables\Html\Builder;
use Yajra\Datatables\Html\Column;
 
 
Event::listen('datatables:admin/users/index:after.id', function($datatables) {
    if ($datatables instanceof Builder) {
        $datatables->collection->push(new Column([
            'data'  => 'foo',
            'name'  => 'foo',
            'title' => 'Foo column'
        ]));
    }
});
```

The effect:

![AT_DATA11](../img/docs/services/datatables/AT_DATAS11.png)
  
###Change Of The Cell's Value  

Attaching the value to the cell of the existing 'Datatables' instance: `datatables.value.<route_name>`. The example:

```php
Event::listen('datatables.value.admin/users/index', function($datatables) {
    $datatables->editColumn('foo', function($row) {
        return 'foo-' . $row->id;
    });
});
```

The effect:

![AT_DATAS12](../img/docs/services/datatables/AT_DATAS12.png)
  
