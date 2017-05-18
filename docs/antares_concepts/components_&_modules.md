# Modules  



Module is a part of Antares project which can easily extend it's functionality by:

- triggering events to almost every section
- defining their own ui components

Antares has been designed to deliver modular and scalable application. 
This technique separates the functionality of a system into independent packages called modules. 

The purpose behind this type of application architecture is to reuse the once-written code. 
In the case of modularity we are entering a slightly higher level of code reuse.
Module is like a mini-application, which can be completely imported into a "closed" system.
Modules can be treated like the blocks from which application is build.

Modular applications require a slightly different approach than classic,non-modular applications. 
The premise is to use sometime very large fragments of existing applications to avoid code or design duplication. 

Modules must have a similar form, data flow between modules must be controlled by dedicated interfaces, typically implemented in main system engine.

The application module can be broken into four main components, which depends on:

* Navigation ([breadcrumbs](../services/breadcrumbs.md), [menus](../modules_development/views.md#menus), [placeholders](../modules_development/views.md#placeholder), [panes](../modules_development/views.md#pane) etc.) - which provides moving within the module as well as between modules

* [Views](../modules_development/views_and_ui_components.md) - presentation layer which is responsible for deliver graphical user interfaces (GUI)

* Actions - work with data - create, read, update, delete (CRUD)

* Data binding - a separated data layer to allow make independence between views and data