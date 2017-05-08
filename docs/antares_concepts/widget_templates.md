# UI Structure 

[TOC]

# Every module has its own page view to define ui components
# Every view includes
## Template Base
### Menu

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

  ![AT_VIS01](../img/docs/antares_concepts/views/AT_VIS01.png)
  
##### Before  

Position:
```php
public function getPositionAttribute()
{
        return '<:reports';
}
```

Menu's position will be placed before the 'reports' element, just like on the screen below:

  ![AT_VIS02](../img/docs/antares_concepts/views/AT_VIS02.png)
  
##### Inside (Submenu)  

Position:
```php
public function getPositionAttribute()
{
        return '^:reports';
}
```    
The position will be placed inside the 'reports' element and is established as submenu:

  ![AT_VIS03](../img/docs/antares_concepts/views/AT_VIS03.png)
  
##### Behind/ Before in Submenu  

Position:

```php
public function getPositionAttribute()
{
        return '>:system.sandboxes';
}
```    
The element will be placed behind the 'sandboxes' element, inside the 'system' menu:

  ![AT_VIS04](../img/docs/antares_concepts/views/AT_VIS04.png)
  
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
### Breadcrumbs

### Actions of the section
### Additional tools
#### Account
#### Search
#### Notifications
#### Edit Widgets toggle
## UI Components (Widgets) Container

# There are few Template Layouts:
## Small Side Menu
## Big Side Menu
## Top Menu Simple (better for end-customers)
## Top Menu Advanced (rather for administrators/advanced users)
# UI Components Container includes other UI Components defined by separated modules. UI Components can use:
## HTML (Twig template) loaded with Ajax
## Vue2
# If enabled on a view, user can manually configure what components are visible or not and move/scale them depending on the component possibilities.
# You can use predefined UI Components (documentation soon) or make your own UI Components.

  
  
