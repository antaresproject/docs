#Controllers and Processors  

[TOC]

##Controllers  

Controllers are used to process the requests coming from a browser and declare the behavior according to the parameters. An example defining a controller:

```php
    <?php
     
    namespace Antares\Foo\Http\Controllers;
     
    use Antares\Foundation\Http\Controllers\BaseController;
     
    class FrontController extends BaseController
    {
     
        /**
         * Directions for access rules to the controller's action
         */
        public function setupMiddleware()
        {
            ;
        }
     
        /**
         * Usually a list presentation
         */
        public function index()
        {
             
        }
     
        /**
         * Usually a data presentation of a single record
         */
        public function show($id)
        {
             
        }
     
        /**
         * Saving the new record
         */
        public function store()
        {
             
        }
     
        /**
         * An update of the existing record
         */
        public function update()
        {
             
        }
     
        /**
         * Removal of the record
         */
        public function destroy()
        {
             
        }
     
    }
```    
    
It is worth noticing that the (frontend) controller inherits from the BaseController class.
A file defining routing is with the abovementioned controller's actions:

<pre><code>frontend.php</code></pre>

```php
    <?php
     
    $router->resource('foo', 'FrontController');
```
    

In case we deal with admin area controller should inherit from AdminController class:

```php
    use Antares\Foundation\Http\Controllers\AdminController;
     
    class FooController extends AdminController{
    ...
```

##Processors  

A processor is used to operate the processing of a request coming from the controller's action. Usually, such an
##Processors  

A processor is used to operate the processing of a request coming from the controller's action. Usually, such an operation takes place in the action itself, but such a solution is not the best idea. The processor may be understood as a layer mediating between a controller and a view (or relatively, a presenter). It mostly operates forms' validation, as well as creates models' entity objects, on the basis of given parameters, it executes initial data formatting before transmitting it to a view or to a presenter.

###Definition  

A code of illustrative processor may be the following:

```php
    <?php
     
    namespace Antares\Foo\Processor;
     
    use Antares\Foo\Http\Repositories\FooRepository;
     
    class FooProcessor
    {
     
        /**
         * Repository instance
         *
         * @var FooRepository
         */
        protected $repository;
     
        /**
         * Processor's construction
         *
         * @param FooRepository $repository
         */
        public function __construct(FooRepository $repository)
        {
            $this->repository = $repository;
        }
     
        /**
         * Index action operation
         */
        public function index()
        {
            $data=$this->repository->findAll();
            return $data;
             
            /** or directly view's presentation **/       
            return view('antares/foo::admin.foo.index', compact('data'));
                     
        }
     
    }
```

In the abovementioned example the processor possesses injected repository's instance responsible for operation on database. In the example, the 'findAll' method downloads all the rows of the database belonging to the table. The 'index()' method corresponds to the 'index()' method in the controller. It may reply directly with the data, which in turn need to be transferred to the view in action, or it may reply directly with the view itself with transferred data. The choice of the actual method depends on a programmer.

###Operation In A Controller  

An example of implementation, injection of a processor to a controller:

```php    
    <?php
     
    namespace Antares\Foo\Http\Controllers\Admin;
     
    use Antares\Foundation\Http\Controllers\AdminController;
    use Antares\Foo\Processor\FooProcessor;
     
    class FooController extends AdminController
    {
        /**
         * Processors' instance
         *
         * @var FooProcessor
         */
        protected $processor;
        /**
         * construction of a controller with an injected processor
         */
        public function __construct(FooProcessor $processor)
        {
            parent::__construct();
            $this->processor=$processor;
        }
        /**
         * Directions for access rules to the controller's action
         */
        public function setupMiddleware()
        {
            ;
        }
     
        /**
         * Usually a list presentation
         */
        public function index()
        {
            return $this->processor->index();
             
        }
     
    }
```    
    
In the case above, it is the processor which is responsible for index's action operation. The abovementioned implementation may also be executed by injecting the processor directly to action's method, so:

```php
public function index(FooProcessor $processor)
{
    return $processor->index();       
}
```

The index action may also operate the view which will be sent to a browser, so:

```php
public function index(FooProcessor $processor)
{
    $data=$processor->index();
    return view('antares/foo::admin.foo.index',  compact('data'));       
}
```

The choice of the actual method of transmitting the data to the controller depends on a programmer.

##Presenters (Option)  

A presenter - as the name suggests - is an object responsible for presentation's operation - the view. **It is totally optional and there is no requirement connected with necessity of its use.** It is another layer (behind the processor) of data processing, before sending them to a view. The advantage of its use is a separation of computational layer from presentation's layer, but the drawback is unnecessary degree of simple solutions' complexity. In the case of more complex applications, the existence of the presenter may be helpful.

An example of a definition:

```php  
  <?php
     
    namespace Antares\Foo\Http\Presenters;
     
    use Antares\Foundation\Http\Presenters\Presenter;
    use Illuminate\Support\Collection;
     
    class FooPresenter extends Presenter
    {
        /**
         * The index method is identical with index action in the controller and responds with a view
         *
         * @param Collection $collection
         * @return \Illuminate\View\View
         */
        public function index(Collection $collection)
        {
            return view('antares/foo::admin.foo.index', ['data' => $collection]);
        }
    }
```

As it is shown, the presenter's definition is very simple. Its function focuses on data presentation. In the presenter the data processing is not executed. The presenter's methods may return the objects of the 'Response' type (e.g. JsonResponse).

###Presenter's Operation In The Processor  

A presenter, similarly to repository is injected to the processor's object:

```php
    <?php
     
    namespace Antares\Foo\Processor;
     
    use Antares\Foo\Http\Repositories\FooRepository;
    use Antares\Foo\Http\Presenters\FooPresenter;
     
    class FooProcessor
    {
     
        /**
         * Repository's instance
         *
         * @var FooRepository
         */
        protected $repository;
         
        /**
         * Presenter's instance
         *
         * @var FooPresenter
         */
        protected $presenter;
     
        /**
         * Processor's construction
         *
         * @param FooRepository $repository
         * @param FooPresenter $presenter
         */
        public function __construct(FooRepository $repository, FooPresenter $presenter)
        {
            $this->repository = $repository;
            $this->presenter=$presenter;
        }
     
        /**
         * Index action operation
         */
        public function index()
        {
            $data=$this->repository->findAll();
            return $this->presenter->index($data);               
        }
    }
```    
    
There is no requirement concerning the injection use. Thus, processor's class constructor may be the follwoing:

```php
public function __construct(FooRepository $repository)
{
        $this->repository = $repository;
        $this->presenter=app(FooPresenter::class);
}
```

However, it is good to use the same solutions everywhere, for the sake of readability.

In the processor, the **index()** method refers to the index() method in the presenter, which in turn is responisble for data presentation.

The view's file applied in the example has the following structure:

```php
{% extends "antares/foundation::layouts.antares.index" %}
{% block content %}   
    <h1>Hello World from Foo Component</h1>
{% endblock %}
```

The result:

  ![AT_CONTRS&PROCS1](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/modules_development/controllers_and_processors/AT_CONTRS&PROCS1.PNG)
  
