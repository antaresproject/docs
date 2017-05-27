# Modules  

[TOC]

## Introduction

Antares has been designed to help developers deliver a modular and scalable application. 
In order to fulfill that condition, Antares functionality has been separated into packages called **modules**. 

Modules are like mini-applications within the system, they can be treated like the blocks from which the whole application is built.

Additional benefit of having modular architecture is to reuse the code written once.

## Modular applications

Modular applications require a slightly different approach than classic, non-modular ones:
* Modules must keep a similar form
* Data flow between the modules must be controlled by dedicated interfaces, implemented on the main system engine

The key is to design the module to be used in multiple projects, not only the particular one, so you and other contributors will avoid the code duplication and reinventig the wheel. This approach in a long term will make your and others life easier.

Every module in Antares can interact/handle following aspects:
* Navigation control ([breadcrumbs](../services/breadcrumbs.md), [menus](../modules_development/views.md#menus), [placeholders](../modules_development/views.md#placeholder), [panes](../modules_development/views.md#pane) etc.) - which provides browsing between the module views and other modules.
* [Views](../modules_development/views_and_ui_components.md) - presentation layer which is responsible for deliver graphical user interface (GUI).
* Actions - working with data, classic CRUD (create, read, update, delete).
* Data binding - a separated data layer to maintain independence between views and database.


## Antares modules

In Antares, modules are divided into two groups:

 - **Core modules** 
    
    This group includes modules which are responsible for delivering functionalities within the application core - the heart of Antares. **These modules are required for every Antares environment.**
    
    Currently there are 5 core modules:
    
      - [Automation](../core_modules/automation.md) - used to execute cyclic operations based on laravel task scheduler.
      - [Acl](../core_modules/acl.md) - designed to manage users' access to resources.
      - [Logger](../core_modules/logger.md) - responsible for gathering the logs coming from different parts of the system.
      - [Notifications](../core_modules/notifications.md) - used in order to execute the process of sending notifications to end users.
      - [Translations](../core_modules/translations.md) - language and translations manager.
                   
 - **Additional modules**   
    Extending the application functionality which is not a part of main Antares branch and **are not required**. You may want to use them or not, depending on the project type.


**Please note:** The Antares Module structure is following [Laravel package](https://laravel.com/docs/5.4/packages) standard with very slight improvements. If you know how to make a package for Laravel, then it will be super easy for you to build modules for Antares.

## Making your own module
If you'd like to make your own Antares Module, we suggest you to follow one of the following paths:
* Read the **Module Development** documentation articles. Start with the [Module Base](../modules_development/module_base.md).    
* Follow step by step tutorial of building a [Sample Module](../tutorials/sample_module.md).  
