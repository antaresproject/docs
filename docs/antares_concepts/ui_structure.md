# UI Structure 

[TOC]

## The basics

Except Dashboard, which is pretty much always available, every module in the system can have it's own Page Views. Dashboard is a Page View itself as well.
  
Every Page View contains:

* **Template Base** - which includes:

  * Menu
  * Breadcrumbs
  * Actions of the section
  * Additional tools
    * Account icon with account menu
    * Search
    * Notifications
    * Edit Widgets toggle
        
* **UI Components Container** - the area where all the UI Compoents (widgets) are loaded by the module.  

Some of the visible elements are not available or different for non-logged users. The only exception is login page which is currently containing only the login form.

## Template Layouts 

There are several template layouts that you can set up in the Antares per each user level (e.g. can be different for admin and different for user):

* Small Side Menu
* Big Side Menu
* Top Menu Simple (better for end-customers)
* Top Menu Advanced (rather for administrators/advanced users)

## UI Components Container

The module defines what widgets are visible in it's page view. What is more, one module can add/modify the widgets on other's module page view. This gives the developer full control on the displayed pages in the system depending on the modules installed in Antares.

There are two types of UI Components:

* HTML - using classic TWIG template engine, loaded by the Ajax request.
* Vue2 - loaded with costam od vue

Additionally, if enabled by developer, each view can have widgets edit option. User can use it to manually configure what UI components are visible or not and move/scale them depending on the component possibilities.

> **Please note:** You can use predefined UI Components (documentation soon), customize them or make your own UI Components.

Just like for the page views, a module [can hook up into another module's widget](../modules_development/views_and_ui_components.md#how-to-include-view-to-others) displayed on different view. You can add your own content or even interfere with the data returned by JSON to the vue component.