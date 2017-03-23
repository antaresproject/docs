# Core & Files Structure  

[TOC]

## Introduction  
 
The system has been designed on the basis of **HMVC** which stands for hierarchical - model - view - controller. This type of architecture can be described with the use of the following graph:

  ![AT_C&FSTRU1](../img/docs/antares_concepts/core_and_files_structure/AT_C&FSTRU1.png)
  
The above mentioned graph describes:

**C** - controller - the layer responsible for transforming (translating) of the request coming from the browser into the presentation which will be displayed in the browser. An example of controllers operation is redirection to the specific URL after the login or display of form's bugs. The controller communicates with model (M) and sends the data to the view (V)

**M** - model - a layer responsible for processing and delivering the data to view on the basis of data coming from the controller. The model usually is identified with the table in data base.

**V** - view - a layer responsible for presentation's preparation, i.e. generation of html which will be displayed in the browser. The view may be conditioned, depending on data coming from the model or the controller itself.

The hierarchy in this type of architecture relies on data exchange between individual layer groups. One layer may (but not necessarily must) transfer the data to the next layer as long as the proper website's content is produced.  

## General System Architecture  

Error: 404

## Filesystem Structure  

Filesystem structure is the following:

  ![AT_C&FSTRU2](https://raw.githubusercontent.com/antaresproject/docs/master/img/docs/antares_concepts/core_and_files_structure/AT_C&FSTRU2.PNG)
  
It consist of catalogues divided thematically according to destination.

* app - it consist of client's application (client side) of the created target software
* bootstrap - a catalogue containing service cache which the application has at its disposal and files of bootstrap and autoload type which raise the application
* build - a catalogue containing sandbox instances created by web interface
* resources - a catalogue containing the essential components connected with resources in files form which the system uses during its work. In this catalogue there are configuration files, view files, migration files, help scripts, default language files
* src - contains the files with source code of the whole application such as components, core, modules
* storage - a catalogue in which are stored any help files such as cache, temporary files etc. It is treated as a storehouse for data which may be stored by the system in the form of the files
* public - a catalogue containing files responsible for proper website's display, contains css scripts and javascripts, graphic files, fonts as well as the .htaccess file itself and the main file index.php which the application uses to start

SRC catalogue content:
  
  ![AT_C&FSTRU3](https://raw.githubusercontent.com/antaresproject/docs/master/img/docs/antares_concepts/core_and_files_structure/AT_C&FSTRU3.PNG)
  
components - in this catalogue there are application's components, as depicted in the example below:

core - source code

  ![AT_C&FSTRU4](https://raw.githubusercontent.com/antaresproject/docs/master/img/docs/antares_concepts/core_and_files_structure/AT_C&FSTRU4.PNG)
  
The components required for system's work:

* brands
* control
* logger
* notifications
* widgets

Please turn your attention to the existence of the file .gitignore. Its presence will not allow for commitment of the core catalogue to the main project repository you work on. Thus, the changes in the core itself can be committed to other repository if you move to the catalogue /src/core.

core - contains system's main functions. Catalogue content is the following:

  ![AT_C&FSTRU5](https://raw.githubusercontent.com/antaresproject/docs/master/img/docs/antares_concepts/core_and_files_structure/AT_C&FSTRU5.PNG)
  
The description of respective catalogues:

* acl - a catalogue containing functions to control the users' access to resources (endpoints)
* area - contains functions enabling applications division into access layers, depending on a group and the rules attributed to a single user
* asset - functions connected with presentation layer's management, especially javascript and css files. The auxiliary library is [assetic framework](https://github.com/kriswallsmith/assetic) which is fully supported in designing and optimization js and css source code
* auth - functions supporting users' authorization and authentication to system
* breadcrumb - functions assisting efficient navigation in the system. [Click here](https://github.com/davejamesmiller/laravel-breadcrumbs) to see what it uses as a helping vendor
* composer - a set of post and pre installation scripts facilitating executing the operation dedicated to system's contents
* console - functions supporting building the commands in Laravel and scheduler's set-up
* contracts - a register of interfaces used in the system
* datatables - functions supporting building the datagrids, using the popular library [Datatable](https://datatables.net/) and [vendor](http://datatables.yajrabox.com)
* date - functions supporting data formatting
* extension - functions supporting the installation of extensions (components and modules) in the system
* form - helpers facilitating building personalized forms
* foundation - system's core
* generators - generators and packs assisting components' architecture design and unit tests
* geoip - geolocating library. It uses [geoip](https://github.com/Torann/laravel-geoip)
* html - contains the tools assisting in html design
* installer - system's installer
* kernel - contains extended Laravel classes
* licensing - a pack facilitating system's licensing
* messages - functions assisting in notifications flash only design (short duration messages - to the next request)
* model - contains main data base business models used by the system
* notifier - assist in sending notifications to system's users
* optimize - a set of functions having system's operation optimization in view
* performance - a set of functions used for system's operation efficiency verification
* publisher - functions facilitating executing components' and modules' migration files which are a part of the system
* registry - implementation of the registry design pattern as a base class for extending by the components and modules
* scaffolding - a register of generators used in prototyping components and modules, widgets and prototypes datatables
* security - implementation of the solutions increasing system's protection
* testbench - an environment assisting in unit tests building based on PHPUnit, without application's operation simulation mode 
* testing - an environment assisting in unit tests building working in application's simulation mode
* translation - assistance in translation
* twig - extensions of the twig engine
* url - url generator connected with acl
* users - users management
* version - current system version
* view - a support for templates and notifications' views
* widget - a set of helpers assisting in UI building

Modules - similarly to components, consist of dedicated modules. As opposed to components, the modules are a part of application and can be shared independently. They do not interfere with system work. 
Catalogue:

  ![AT_C&FSTRU6](https://raw.githubusercontent.com/antaresproject/docs/master/img/docs/antares_concepts/core_and_files_structure/AT_C&FSTRU6.PNG)
  
It consist of catalogues divided thematically, in which dedicated modules are placed.
