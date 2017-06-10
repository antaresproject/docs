# Breadcrumbs  

## Introduction

Breadcrumbs are the element of a website intended for helping users to navigate through the website effectively. Thanks to the additional navigation in the form of breadcrumbs, the users can see the section they are currently in and easily return to the main section of the website.

> The breadcrumbs classes should be placed in `src/modules/<module_name>/Http/Breadcrumbs/` (e.g. `src/modules/<module_name>/Http/Breadcrumbs/Breadcrumb.php`). The path of breadcrumb source code is `src/core/src/ui/base/src/Breadcrumb/`.

## An example

A class that defines a new breadcrumb is as follows:

```php
<?php
     
    namespace Antares\Foo\Http\Breadcrumb;
     
    use Illuminate\Database\Eloquent\Model;
    use Antares\Breadcrumb\Navigation;
     
    class Breadcrumb extends Navigation
    {
     
        /**
         * on brands list
         */
        public function onFooList()
        {
            $this->breadcrumbs->register('foo', function($breadcrumbs) {
                $breadcrumbs->push(trans('antares/foo::messages.foo_list'), handles('antares::foo/index'));
            });
     
            $this->shareOnView('foo');
        }
     
        /**
         * on brand create or edit
         *
         * @param Model $model
         */
        public function onFooCreateOrEdit(Model $model)
        {
            $this->onFooList();
     
            $this->breadcrumbs->register('foo-action', function($breadcrumbs) use($model) {
                $name = $model->exists ? trans('antares/foo::messages.foo_update', ['name' => $model->name]) : trans('antares/foo::messages.foo_create');
                $breadcrumbs->parent('foo');
                $breadcrumbs->push($name);
            });
            $this->shareOnView('foo-action');
        }
    }
```    
    
This type of implementation should be performed in the class responsible for providing a view (e.g. in a processor, a presenter, or a controller). An example is the following:

```php
/**
 * Breadcrumb instance
 *
 * @var Breadcrumb
 */
protected $breadcrumb;
 
/**
 * Construct
 *
 * @param Breadcrumb $breadcrumb
 */
public function __construct(Breadcrumb $breadcrumb)
{
    $this->breadcrumb = $breadcrumb;
}
 
/**
 * Foo items list
 *
 * @param Collection $collection
 * @return \Illuminate\View\View
 */
public function index(Collection $collection)
{
    $this->breadcrumb->onFooList();
    return view('antares/foo::admin.foo.index', ['data' => $collection]);
}
```

The result:

![AT_BREAD1](../img/docs/services/breadcrumbs/AT_BREAD1.png)
  
For edition:

![AT_BREAD2](../img/docs/services/breadcrumbs/AT_BREAD2.png)
  
The breadcrumbs configuration is located in the following file:

```php
resources\config\breadcrumbs.php
```

