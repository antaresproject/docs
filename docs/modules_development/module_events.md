# Module Events  

[TOC]

Below is the list of available events connected with the components only. More information about event's operations in a system can be found in the [events](../services/events.md) section.

## Views  

The creation of all the foo component's views:

```php
composing: antares/foo::*
```

The creation of the foo component's admin.foo.index view:

```php
composing: antares/foo::admin.foo.index
```

## Component's Start  

A registration of a component (the **register()** method in a service provider):

```php
extension.started: components/foo
```

Component's start (the **boot()** method in a service provider):

```php
extension.booted: components/foo
```

## Placeholder  

The creation of the placeholder's view:

```php
creating: antares/foo::admin.partials._foo_placeholder
```

Before the foo component's placeholder:

```php
placeholder.before.foo
```

After the foo component's placeholder:

```php
placeholder.after.foo
```

## Main Menu  

Before the creation of an element in the main menu:

```php
antares.ready: menu.before.foo
```

After the creation of an element in the main menu:

```php
antares.ready: menu.after.foo
```

## Breadcrumb  

Before the creation of an element in a breadcrumb:

```php
antares.ready: menu.before.foo-breadcrumb
```

After the creation of an element in a breadcrumb:

```php
antares.ready: menu.after.foo-breadcrumb
```

Before the creation of a submenu's element in a breadcrumb:

```php
antares.ready: menu.before.foo-add
```

After the creation of a submenu's element in a breadcrumb:

```php
antares.ready: menu.after.foo-add
```

## Pane Menu  

Before the creation of a menu's element in a pane:

```php
antares.ready: menu.before.foo-item
```

After the creation of a menu's element in a pane:

```php
antares.ready: menu.after.foo-item
```

Before the creation of a menu's element in a pane containing submenu:

```php
antares.ready: menu.before.foo-item-submenu
```

After the creation of a menu's element in a pane containing submenu:

```php
antares.ready: menu.after.foo-item-submenu
```

Before the creation of a submenu's element in a pane:

```php
antares.ready: menu.before.foo-item-submenu-element
```

After the creation of a submenu's element in a pane:

```php
antares.ready: menu.after.foo-item-submenu-element
```

## Pane  

Before the creation of a pane's view:

```php
creating: antares/foundation::components.placeholder_left
```

After the creation of a pane's view:

```php
composing: antares/foundation::components.placeholder_left
```

## Eloquent  

Before the start of the Foo component's Eloquent model:

```php
eloquent.booting: Antares\Foo\Model\FooRow
```

After the start of the Foo component's Eloquent model:

```php
eloquent.booted: Antares\Foo\Model\FooRow
```


