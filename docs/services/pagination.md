# Pagination  

[TOC]

## Introduction  

When explaining the pagination in the project, the use of solutions provided by the Laravel environment are stressed. More information can be found [here](https://laravel.com/docs/5.2/pagination). There is a dedicated decorator in the project that wraps the paginator's object with a view for the customization purposes. This means that paginator's appearance and behavior may be defined depending on the target product's expectations.

## Presenter

The class responsible for this definition is:

```php
Antares\Pagination\PaginationAjaxPresenter
```

It can be found in the system's core.

"Render" is a crucial class method and it is responsible for the paginator's presentation:

```php
public function render()
{
    $hasMorePages = $this->paginator->hasMorePages();
    $hasPages     = $this->paginator->hasPages();
    $total        = count($this->paginator->items());
    if (!$hasMorePages && !$hasPages && !$total) {
        return '';
    }
 
    if ($this->currentPage() == 1 && $total < 10) {
        return '';
    }
 
    return view('antares/foundation::layouts.antares.partials.pagination._pagination', [
                'previousButton' => strip_tags($this->getPreviousButton('<i class="zmdi zmdi-chevron-left"></i>'), '<a><i>'),
                'links'          => $this->getLinks(),
                'nextButton'     => strip_tags($this->getNextButton('<i class="zmdi zmdi-chevron-right"></i>'), '<a><i>'),
                'perPage'        => $this->paginator->perPage(),
                'url'            => $this->paginator->url($this->paginator->currentPage()),
                'perPageUrl'     => $this->paginator->url(1),
                'perPageScale'   => $this->perPageScale
            ])->render();
}
```

It is worth noting that the method uses the following view for the presentation:

```php
antares/foundation::layouts.antares.partials.pagination._pagination
```

This view should be edited depending on the product demand. The source code of the view:

```html
<div class="pagination mb16 mt16">
    <div class="pagination-pages">
        <div class="pagination-pages__prev">
            {{ previousButton|raw }}
        </div>
        <ul class="pagination-pages__list">
            {{ links|raw }}
        </ul>
        <div class="pagination-pages__next">
            {{ nextButton|raw }}
        </div>
    </div>
    <div class="pagination-filter">
        <ul>
            <li class="{{ perPage==10?'pagination-filter__sgl--active':'' }}">
                <a class="mdl-js-button mdl-js-ripple-effect pagination-ajax" href="{{ url~'&per_page=10' }}">
                    10
                </a>
            </li>
            <li class="{{ perPage==20?'pagination-filter__sgl--active':'' }}">
                <a class="mdl-js-button mdl-js-ripple-effect pagination-ajax" href="{{ url~'&per_page=20' }}">
                    20
                </a>
            </li>
            <li class="{{ perPage==30?'pagination-filter__sgl--active':'' }}">
                <a class="mdl-js-button mdl-js-ripple-effect pagination-ajax" href="{{ url~'&per_page=30' }}">
                    30
                </a>
            </li>
            <li class="{{ perPage==50?'pagination-filter__sgl--active':'' }}">
                <a class="mdl-js-button mdl-js-ripple-effect pagination-ajax" href="{{ url~'&per_page=50' }}">
                    50
                </a>
            </li>
        </ul>
    </div>
</div>
```

## Usage  

If data are obtained from the database, it is advised to use the `paginate` method in order to create the paginator's object:

```php
/**
 * Creates customized pagination, using eloquent
 *
 * @return View
 */   
public function paginationEloquent() {
    $paginator = User::where('active', 1)->paginate(15);
    $links = $paginator->links(new PaginationAjaxPresenter($paginator));
    return view('antares/foo::index.index', compact('paginator', 'links'));
}
```

If a dataprovider is a collection, the construction is somewhat different:

```php
/**
 * Creates customized pagination, using collection
 *
 * @return View
 */   
public function paginationCollection() {
 
    $collection = new Collection(['foo'=>'bar']);
    $perPage = request()->input('per_page', 15);
    $page    = LengthAwarePaginator::resolveCurrentPage('page');
    $items   = $collection->slice(($page * $perPage) - $perPage, $perPage, true);
    $paginator = new LengthAwarePaginator($items, $collection->count(), $perPage, $page);       
    $links      = $paginator->links(new PaginationAjaxPresenter($paginator));
    return view('antares/foo::index.index', compact('paginator', 'links'));       
}
```

In both cases, the view's object is the value of methods:

```php
antares/foo::index.index
```

The source code of the view's object is the following:

```html
{% extends "antares/foundation::layouts.antares.index" %}  
{% block content %}    
    <div class="col-16">
        <div class="card card--chart-small card--primary-light">
            <div class="card__content">                  
                {% if paginator.count() > 0  %}                   
                    <ul class="search-rows">        
                        {% for element in paginator %}                             
                            <li class="timeline__entry--ok">
                                <div class="timeline__padding">
                                    {{ element|raw }}
                                </div>
                            </li>  
                        {% endfor %}
                    </ul>
                {% else %} 
                    <div class="alert alert--bg alert--glow alert--info alert--lg alert--border mb20">
                        <i class="alert__icon zmdi zmdi-info"></i>
                        <span>
                            {{ trans('antares/foo::messages.no_results') }}
                        </span>
                    </div>
                {% endif %}       
                {{ links|raw }}
            </div>                           
        </div>
    </div>
{% endblock %}
```

In the example above, the following calling should be given special attention:

```html
{{ links|raw }}
```

As it is responsible for the display of the pagination's section.
