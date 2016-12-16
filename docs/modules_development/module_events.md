#Module Events  

[TOC]

Below is the list of available events connected with the components only. More information about event's operations in a system can be found in the [services](https://inbssoftware.atlassian.net/wiki/display/AS/Services) section.

##Views  

The creation of all the foo component's views:

<pre><code>composing: antares/foo::*</code></pre>

The creation of the foo component's admin.foo.index view:

<pre><code>composing: antares/foo::admin.foo.index</code></pre>

##Component's Start  

A registration of a component (the **register()** method in a service provider):

<pre><code>extension.started: components/foo</code></pre>

Component's start (the **boot()** method in a service provider):

<pre><code>extension.booted: components/foo</code></pre>

##Placeholder  

The creation of the placeholder's view:

<pre><code>creating: antares/foo::admin.partials._foo_placeholder</code></pre>

Before the foo component's placeholder:

<pre><code>placeholder.before.foo</code></pre>

After the foo component's placeholder:

<pre><code>placeholder.after.foo</code></pre>

##Main Menu  

Before the creation of an element in the main menu:

<pre><code>antares.ready: menu.before.foo</code></pre>

After the creation of an element in the main menu:

<pre><code>antares.ready: menu.after.foo</code></pre>

##Breadcrumb  

Before the creation of an element in a breadcrumb:

<pre><code>antares.ready: menu.before.foo-breadcrumb</code></pre>

After the creation of an element in a breadcrumb:

<pre><code>antares.ready: menu.after.foo-breadcrumb</code></pre>

Before the creation of a submenu's element in a breadcrumb:

<pre><code>antares.ready: menu.before.foo-add</code></pre>

After the creation of a submenu's element in a breadcrumb:

<pre><code>antares.ready: menu.after.foo-add</code></pre>

##Pane Menu  

Before the creation of a menu's element in a pane:

<pre><code>antares.ready: menu.before.foo-item</code></pre>

After the creation of a menu's element in a pane:

<pre><code>antares.ready: menu.after.foo-item</code></pre>

Before the creation of a menu's element in a pane containing submenu:

<pre><code>antares.ready: menu.before.foo-item-submenu</code></pre>

After the creation of a menu's element in a pane containing submenu:

<pre><code>antares.ready: menu.after.foo-item-submenu</code></pre>

Before the creation of a submenu's element in a pane:

<pre><code>antares.ready: menu.before.foo-item-submenu-element</code></pre>

After the creation of a submenu's element in a pane:

<pre><code>antares.ready: menu.after.foo-item-submenu-element</code></pre>

##Pane  

Before the creation of a pane's view:

<pre><code>creating: antares/foundation::components.placeholder_left</code></pre>

After the creation of a pane's view:

<pre><code>composing: antares/foundation::components.placeholder_left</code></pre>

##Eloquent  

Before the start of the Foo component's Eloquent model:

<pre><code>eloquent.booting: Antares\Foo\Model\FooRow</code></pre>

After the start of the Foo component's Eloquent model:

<pre><code>eloquent.booted: Antares\Foo\Model\FooRow</code></pre>


