# Modules  

[TOC]

## Introduction

Antares has been designed to deliver modular and scalable application. 
This technique separates the functionality of a system into independent packages called **modules**. 

The purpose behind this type of application architecture is to reuse the once-written code. 
In the case of modularity we are entering a slightly higher level of code reuse.
Module is like a mini-application, which can be completely imported into a "closed" system.
Modules can be treated like the blocks from which application is build.

## Modular applications

Modular applications require a slightly different approach than classic,non-modular applications. 
The premise is to use sometime very large fragments of existing applications to avoid code or design duplication. 

Modules must have a similar form, data flow between modules must be controlled by dedicated interfaces, typically implemented in main system engine.

The application module can be broken into four main components, which depends on:

* Navigation ([breadcrumbs](../services/breadcrumbs.md), [menus](../modules_development/views.md#menus), [placeholders](../modules_development/views.md#placeholder), [panes](../modules_development/views.md#pane) etc.) - which provides moving within the module as well as between modules.
* [Views](../modules_development/views_and_ui_components.md) - presentation layer which is responsible for deliver graphical user interfaces (GUI).
* Actions - work with data - create, read, update, delete (CRUD).
* Data binding - a separated data layer to allow make independence between views and data.


## Antares way

In Antares, modules are divided into two groups:

 - **Core modules** 
    
    This group contains modules which are responsible for deliver functionalities within application core - the heart of Antares.
    
    Currently there are 5 core modules:
    
      - [Automation](../core_modules/automation.md) - used to execute cyclic operations based on laravel task scheduler.
      - [Acl](../core_modules/acl.md) - designed to manage users' access to resources.
      - [Logger](../core_modules/logger.md) - responsible for gathering the logs coming from different parts of the system.
      - [Notifications](../core_modules/notifications.md) - used in order to execute the process of sending notifications to end users.
      - [Translations](../core_modules/translations.md) - language and translations manager.
                   
 - **Additional modules**   
    Responsible for extends application functionality which is not a part of main Antares branch. 
    Typically used for build dedicated software. 


> The structure of module in Antares is almost the same as standard [Laravel package](https://laravel.com/docs/5.4/packages). 
  More information about structure, you can find [here](../modules_development/module_base.md).    
     