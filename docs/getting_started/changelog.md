# Change Log (0.9.2)

[TOC]

## Antares Application

**New**

* Backend integration, add rwd. 
* Support for laravel 5.5.* 
* Missing of .env.example file. 
* Packages version. 
* Initial commit for laravel 5.5. 
* Backend integration with new frontend. 
* Installer scripts fixes. 
* Installation. 
* Post install commands. 
* Htaccess. 
* Change default versions. 
* Missing js files, nginx support. 
* Missing vue JS files CHG: auth user model provider. 
* Backend integration. 
* Backend integration with new frontend. 
* Frontend integration. 
* Add tooltips to menu. 
* Modules separation. 
* Views. 
* Travis code coverage config file. 
* New logos. 
* Sample module to minimal requirements. 
* Missing assets files. 
* Code mirror repos. 
* Installation steps with codemirror. 
* Remove missing repo. 
* Composer.json dependencies. 
* Composer update. 
* Stash apply. 

**Changes**

* Update of components version. 
* Update of composer.json. 
* Remove unused files. 
* Refactoring files position. 
* Module files name. 
* Update of composer.json. 
* Update breadcrumb version in composer.json. 
* New layout integration. 
* Removed unused service provider. 
* :book: update of README.md. 
* Composer.json update. 
* Travis configuration. 
* Change module names in composer.json. 
* Remove codemirror. 
* Change application requirements. 

**Fixes**

* Missing icons in main menu. 
* Invalid logos path. 
* Installation fixes. 
* Breadcrumbs view. 
* Breadcrumbs view. 
* Fixes for backend integration. 
* Components.php - invalid version, ADD: .htaccess. 
* README.MD. 
* Installation. 
* Add styles for code mirror while installation. 
* Components and modules requirements. 
* Manual merge with 0.9.2.2. 
* Scrolling in extension preview console. 
* Scrolling for installation preview INT: configured gitignore for storage directory in testing component. 
* Composer.json. 
* Remove src directory. 
* Area names. 

**Internal**

* Updated core dependencies. 
* Components and configuration changes. 

**Other**

* Merge branch '0.9.2' of https://github.com/antaresproject/project into 0.9.2. 
* Rename env.example to .env.example. 
* Merge pull request #59 from antaresproject/0.9.2-laravel5.5. 
* Merge branch '0.9.2' of https://github.com/antaresproject/project into 0.9.2. 
* Update .htaccess. 
* Update composer.json. 
* Update CODE_OF_CONDUCT.md. 
* Merge pull request #54 from antaresproject/add-code-of-conduct-1. 
* Create CODE_OF_CONDUCT.md. 
* Merge pull request #53 from antaresproject/0.9.2. 
* Merge branch '0.9.2' of https://github.com/antaresproject/project into 0.9.2. 
* Merge remote-tracking branch 'origin/0.9.2' into 0.9.2. 
* Update .env.example. 
* Update .htaccess. 
* Merge branch '0.9.2' of https://github.com/antaresproject/project into 0.9.2. 
* Merge with master. 
* Create .env.example. 
* Merge pull request #52 from antaresproject/0.9.2.2. 
* Merge branch '0.9.2' of https://github.com/antaresproject/project into 0.9.2. 

## Core

**New**

* Review project for missing frontend changes. 
* Env config for application bootstrap file (fix for root) 
* Env config for application bootstrap file. 
* Access to notifications helpers inside Module Service Provider. 
* Backend integration with new frontend. 
* Alert notification type to seed. 
* Backend integration with new frontend. 
* Response helper CHG: vue form JS assets. 
* Notification recipients field. 
* Vue form builder ADD: database actions context builder helper FIX: PHP docs CHG: database migration for notification CHG: form fieldset FIX: database wrong method construct ADD: for form builders which have v-model attribute the value should not be pass to value attribute. 
* Asset publisher links for symbolic assets. 
* Backend integration. 
* Dt filters. 
* Frontend integration. 
* Frontend integration. 
* Exception column to failed_jobs table. 
* Set position method to asset publisher. 
* Custom type for controls. 
* Twig functions to check who is authenticated. 
* Resolve display form errors for multiple tabular input. 
* Form errors for tabular input. 
* Deletes controls from fieldset. 
* Middleware for dashboard routing. 
* Support for modular css files. 
* Support for time and date formatters based on brand settings. 
* Support for date formatter based on brand. 
* Support for separated route files. 
* Subject column for notifications. It will be used as a subject for emails. 
* Form error twig extension for tabular input validation. 
* Support for reordering tables row, support for area contexts. 
* Datatables - support for reordering rows. 
* Menu tooltips descriptions. 
* Switch type for forms and dynamic errors for VUE forms. 
* New navigation system to handling breadcrumbs. 
* Remove unused presenter argument. 
* Url helper for create links without area. 
* Support for multiple filters in datatables. 
* Extend notification with messages. 
* Post helper method. 
* Html label in form controls. 
* Phpunit tests. 
* Phpunit per module. 
* Assets symlinker for local, router. 
* Assets symlinker for local, router. 
* Phpunits refactoring. 
* Readme.md, FIX: small fixes. 
* Add categories to acl. 
* Acl core module. 
* More usuable installation process. 
* Merge with 0.9.2.2. 
* .gitignore. 
* Gitsubmodules. 
* Add modules dir. 
* Ui components, structure refactoring. 
* Initial commit. 
* Added unit tests for Control Types ADD: A few new Control Types CHG: Minor fixes and changes in Control Types CHG: Minor changes in form layout templates. 
* Log to extension operations FIX: tests for extensions and area (fix in config file) 
* Installation step with components selection. 
* Countries sql, multiuser. 
* Added decorators for controls CHG: Changes in control AbstracType. 
* LabelWrapper, inputWrapper CHG: Container for hidden type is hidden too. 
* When any label added to control, generates from name FIX: temporary fix for firing BeforeFormRender event. 
* Controls for Files and Dates. 
* New contrl types: Hidden, Password, Range CHG: Changed and new options added to Select. 
* SetSearch() feature for selects ADD: TimezoneType, LanguageType. 
* Info tooltip for labels. 
* Added support for Option groups for Select. 
* Base contracts and traits ADD: prependHtml, appendHtml to control ADD: Country select with flags. 
* New form control types. 
* Input wrapper. 
* New form control type: SelectType. 
* Validation messages. 
* Default label view. 
* Labels are separated objects. 
* Added view template files for Form control types CHG: Changes in Fieldset/Form renderers to support new Form control types. 
* AbstractDecorator for Form controls, Text and Textarea control CHG: changes in Form control AbstractType. 
* Abstract Types for Form controls. 
* Text translation. 
* Option to skip composer for installation command from artisan. 
* Support custom URL for extension settings form. 
* Artisan command to flush core ACL FIX: extension ACL command signature. 
* Listener for failed composer when installing extension. 
* Activation operations for installing extensions.

**Changes**

* Updated notification migration for stacks CHG: add property attributes to form labels. 
* Update of version. 
* Update of area implementation. 
* Unit tests application path CHG: notification seeder and migration. 
* Commented phone number. 
* Backend integration with frontend. 
* Fast SMS adapter. 
* "booted" method for all service providers. 
* Possibility to set manually current area. 
* Removed Vue form builder. 
* Notification types seed (typo) 
* Notification types seed. 
* Removed PHP 7 strict type. 
* Added runtime cache for languages ADD: PHPDoc for extension repository. 
* Removed unnecessary query for user roles CHG: phpdoc for data table builder. 
* Some fixes for tests, CHG: dropzone control behaviour and template, CHG: removed deprecated notifier CHG: password reset service CHG: notifications CHG: some minor fixes or changes. 
* Optimization changes #2. 
* Optimization changes. 
* Slugging names for ACL with runtime cache CHG: disabled database crypt for increase performance FIX: PHPDoc for some classes. 
* Remove php 7.1 code occurences. 
* Area manager refactorization #2 ADD: area tests. 
* Area manager refactorization. 
* Small code reorganization. 
* Moved date and time formatter from helper to class. Performance improvements for date formatter. 
* Removed unused commented lines. 
* Removed subject from notification. 
* Change for resolving form controls values. 
* Changes quotes for form views. 
* New layout integration. 
* Update of notifications migration files. 
* Router fixes. 
* Notifier - notification channels. 
* Db cryptor disable config check. 
* Prerelease updated. 
* Minor and major changes. 
* Minor and major refactorings. 
* Minor refactoring. 
* :eyes: major changes. 
* Remove unsued .gitmodules file. 
* :book: update of README.md. 
* Database.sqlite3 - add two factor auth. 
* Changes for phpunit tests. 
* Phpunit tests - update of sqlite. 
* Jobs class inside foundation and AbstractNotificationTemplate.php use. 
* Code coverage and phpunit tests. 
* Changes of database.sqlite3. 
* Relocating ui components. 
* Move components to modules. 
* Installer views. 
* Antares Project -> Antares. 
* Composer json structure resolve. 
* Core composer.json. 

**Fixes**

* More fixes for RWD in release. 
* Looking for app file for unit tests during travis building (removed due wrong loop) 
* Looking for app file for unit tests during travis building. 
* Accessing to DI key in array. 
* Checking if current route is not null FIX: installation contract parameters CHG: extra method for module service provider which is similar to boot method but is executing after booted all extensions. 
* Breadcrumbs submenu path. 
* Datatable constructor CHG: removed commented code. 
* Fixes for backend integration. 
* Setting area from user. 
* Variable assignation CHG: refactored module service provider ADD: variable adapter of foundation for notification CHG: assetic refactoring and performance. 
* Restore widgets routes for client area. 
* Password reset notification (without editable notification message yet) 
* Required service provider for tests. 
* For raw notification message (fetched from database) content type must be html instead of plain text. 
* Retrive brand date options. 
* Fix for fetching form errors. 
* Quick search - update for url response param. 
* Module name resolver for root path. 
* Fix for helpers. 
* Module name resolver. 
* Acl will be properly setup for modules. 
* Breadcrumb class namespace. 
* After laravel update. 
* Removed invalid class for notification provider; updated method for user role. 
* Support for ajax form validation. 
* Twig tooltip extension. 
* :fire: minor and major fixes. 
* Remove throw exception. 
* Remove invalid service providers. 
* Fixed paths for themes. 
* Remove unused ExampleTest, remove registration controller test. 
* Migration file for ui components, fix location. 
* Fixes for installation. 
* Installer fixes. 
* Antares/control -> antares/acl.  

**Internal**

* Clear repo. 
* Merge. 
* Resolved conflicts. 
* Merged conflicts. 
* Resolved conflicts. 
* Fixed data typing. 
* Refactorization and comments fixes. 
* Merged 0.9.2 branch INT: return types for methods. 
* Updated core from branch for Laravel 5.4. 

**Other**

* Merge branch '0.9.2' of https://github.com/antaresproject/core into 0.9.2. 
* Merge remote-tracking branch 'origin/0.9.2' into 0.9.2. 
* Merge pull request #16 from antaresproject/0.9.2-laravel5.5. 
* Merge remote-tracking branch 'origin/0.9.2' into 0.9.2. 
* Update composer.json. 
* Merge remote-tracking branch 'origin/0.9.2' into 0.9.2. 
* Update composer.json. 
* Update DashboardController.php. 
* Add files via upload. 
* Update composer.json. 
* Update ApplicationTestCase.php. 
* Update composer.json. 
* Add files via upload. 
* Update composer.json. 
* Merge with master. 
* Merge pull request #14 from antaresproject/0.9.2.2. 
* Merge pull request #9 from antaresproject/0.9.2-dev2. 
* Merge remote-tracking branch 'composer/0.9.2' into 0.9.2. 

## Acl

**New**

* Packages version. 
* Review project for missing frontend changes. 
* Backend integration with new frontend. 
* Readme.md, FIX: small fixes. 
* Acl categorization. 
* Description of module in composer.json. 
* Initial commit. 

**Changes**

* Integration for new grid layout and frontend improvements. 
* :book: update of README.md. 
* Composer.json for travis-vi builds. 
* Update composer.json. 
* Module preview. 
* Description of README.md. 

**Fixes**

* Rwd for lists in mobile. 
* More fixes for RWD in release. 
* :fire: minor and major fixes. 
* ControlServiceProvider, fixes for route. 
* Control vs acl naming. 

**Other**

* Update composer.json. 
* Merge pull request #2 from antaresproject/0.9.2-laravel5.5. 
* Merge branch '0.9.2' of https://github.com/antaresproject/acl into 0.9.2.  

## Api

**New**

* Packages version. 
* Backend integration with new frontend. 
* Backend integration with new frontend. 
* Readme.md, FIX: small fixes. 
* Composer installer. 
* Phpunit tests refactoring. 
* Unit tests refactoring. 
* Travis configuration file. 
* Laravel 5.4 integration. 
* Laravel 5.3 integration. 
* Release 0.9.2. 
* Session datatbales and ordering. 
* Release 0.9.2. 
* Minor fixes. 

**Changes**

* Update of barryvdh/laravel-cors version. 
* Module api integration. 
* :book: update of README.md. 
* Phpunit tests refactoring. 
* Composer.json update, phpunit.xml configuration, ADD: coveralls. 
* Auth drivers descriptions, ADD: screenshot. 
* Composer.json - description of module. 
* Composer.json - add description of module, reorder in README.md. 
* Antares Project -> Antares. 
* Namespace. 
* Composer json structure resolve. 
* Composer installer. 
* Readme and changelog files. 
* Readme.md structure change. 
* Removed old ACL method form service provider. 
* Updated ACL file. 
* Change used Router. 

**Fixes**

* More fixes for RWD in release. 
* Uri fixes. 
* After laravel update. 
* Invalid module name. 
* Installation fixes. 
* Extensions modal. 
* Replace route to handles. 
* Empty providers list fix. 

**Internal**

* Changes of module name. 

**Other**

* Update composer.json. 
* Merge pull request #4 from antaresproject/0.9.2-laravel5.5. 
* Merge branch '0.9.2' of https://github.com/antaresproject/api into 0.9.2. 
* Update composer.json. 
* Merge pull request #2 from antaresproject/0.9.2.1. 
* Fix for new composer handler. DEV version. 

## Automation

**New**

* Initial commit for laravel 5.5 integration. 
* Initial commit for laravel 5.5 integration. 
* Backend integration with new frontend. 
* Review project for missing frontend changes. 
* Merge branch. 
* Backend integration. 
* Resolve phpunit tests. 
* Composer.json update. 
* Readme.md, FIX: small fixes. 
* Documenation supplemenation. 
* Laravel 5.4 integration. 
* Laravel 5.3 integration. 
* New composer.json structure. 
* New composer.json structure. 
* Api V1 automation controller. 
* Session datatbales and ordering. 

**Changes**

* New layout integration. 
* :book: update of README.md. 
* Phpunit refactoring and code coverage. 
* Phpunit.xml update. 
* Composer.json. 
* Description of README.md. 
* Remove queue:start command after installation. 
* Composer.json - add description of module, reorder in README.md. 
* Preview screenshot. 
* Composer.json - installer plugin version update. Description of module in README.md. 
* Antares Project -> Antares. 
* Installer plugin version. 
* Readme and changelog files. 
* Readme.md structure change. 
* Change automation synchronization command. 
* Added homepage and friendly names to components. 
* Unit tests refactoring. 
* Unit tests refactoring. 
* Refactoring unit tests. 
* Unit tests refactoring after laravel 5.4 release. 
* Updated ACL file. 
* Old extension finder class. 
* Remove unused scripts. 
* Main menu title. 

**Fixes**

* Minor and major fixes. 
* Automation ordering. 
* Automation timeout queue process. 

**Other**

* Update composer.json. 
* Merge pull request #5 from antaresproject/0.9.2-laravel5.5. 
* Update composer.json. 
* Merge pull request #3 from antaresproject/0.9.2.1. 

## Ban Management

**New**

* Unit tests refactoring.
* Custom URL for settings form.

**Changes**

* Readme.md structure change.
* Added homepage and friendly names to components.
* Updated ACL file.

**Fixes**

* Wrong method name.
* Settings form.
* Fixes for named routes.

**Other**

* Update composer.json.

## Branding

**New**

* Packages version. 
* Review project for missing frontend changes. 
* Backend integration with new frontend. 
* Brands styler update. 
* Support for time and date formatters based on brand settings. 

**Changes**

* Remove unused lines. 
* Added to gitignore /.idea directory. 
* Fixed phpdoc comments. 
* Remove comments. 
* Integration for new grid layout and frontend improvements. 
* Minor refactoring. 
* :book: update of README.md.

**Fixes**

* More fixes for RWD in release. 
* Date format label.  

**Other**

* Update composer.json. 
* Merge pull request #1 from antaresproject/0.9.2-laravel5.5. 
* Merge branch '0.9.2' of https://github.com/antaresproject/branding into 0.9.2.ing

## Custom fields

**New**

* Packages version. 
* Review project for missing frontend changes. 
* Support for nginx. 
* Backend integration with new frontend. 
* Frontend integration. 
* Installation steps. 

**Changes**

* Update of barryvdh/laravel-cors. 
* Integration for new grid layout and frontend improvements. 
* :book: update of README.md. 
* Phpunit refactoring. 

**Fixes**

* Remove unused command. 
* Installation progress. 
* Regex password validation. 

**Other**

* Update composer.json. 
* Merge pull request #3 from antaresproject/0.9.2-laravel5.5. 
* Merge branch '0.9.2' of https://github.com/antaresproject/installation into 0.9.2. 
* Merge pull request #1 from antaresproject/improvements. 
* Create _form.twig. 

## Installer

**New**

* Packages version. 
* Review project for missing frontend changes. 
* Backend integration with new frontend. 
* Support for nginx. 
* Backend integration with new frontend. 

**Changes**

* Update of barryvdh/laravel-cors. 
* Integration for new grid layout and frontend improvements. 
* :book: update of README.md. 

**Fixes**

* Remove unused command. 

**Other**

* Update composer.json. 
* Merge pull request #3 from antaresproject/0.9.2-laravel5.5. 
* Merge branch '0.9.2' of https://github.com/antaresproject/installation into 0.9.2. 

## Logger

**New**

* Packages version. 
* Review project for missing frontend changes. 
* Backend integration with new frontend. 
* Backend integration with new frontend. 
* Backend integration. 
* Frontend integration. 
* Frontend integration. 
* Restrict logs for defined type and entities. 
* Able to register log definition as class. 
* Object which helps finds differences in log values. ADD: PHPDoc comments to Logs model. 
* Readme.md, FIX: small fixes. 
* Documenation supplemenation. 
* From stash. 
* Laravel 5.4 integration, composer packgas. 
* Laravel 5.4 integration. 
* Laravel 5.3 integration. 
* New composer.json structure. 
* New composer.json structure. 
* Release 0.9.2. 
* Release 0.9.2. 
* Add css asset as default report view style. 
* Activity logs with type and search. 
* Extend activity logs. 

**Changes**

* Removed unused any more type declaration. 
* Recipients. 
* Backend integration with frontend. 
* Removed unused log. 
* Location object. 
* Moved notifications to "booted" method. 
* Removed old route line from components routes CHG: commented unused route from widget CHG: route namespace. 
* Integration for new grid layout and frontend improvements. 
* Notification. 
* Logger widget. 
* Change route closure to controller string. 
* Pre release updates. 
* Minor and major changes. 
* :book: update of README.md. 

**Fixes**

* More fixes for RWD in release. 
* Fixes for backend integration. 
* Missing location data for test notification. 
* Users online widget. 
* Remove var dumps.  

##### Internal

* Remove unused code.  

**Other**

* Update composer.json. 
* Merge pull request #7 from antaresproject/0.9.2-laravel5.5. 
* Merge remote-tracking branch 'origin/0.9.2' into 0.9.2. 
* Merge branch '0.9.2' of https://github.com/antaresproject/logger into 0.9.2. 
* Update composer.json. 
* Merge branch 'master' into 0.9.2. 
* Update LogRecorder.php. 
* Merge pull request #4 from antaresproject/0.9.2.2. 
* Merge pull request #3 from antaresproject/0.9.2.1. 
* Merge branch '0.9.2' of https://github.com/antaresproject/logger into 0.9.2.1. 
* Update composer.json. 

## Notifications
 
 **New**
 
 * Descriptions to notification form. 
 * Packages version. 
 * Comments to methods and properties, license to files. 
 * Backend integration with new frontend. 
 * Unit tests ADD: check event class type FIX: get handler type. 
 * Review project for missing frontend changes. 
 * Notification validation message for content. 
 * Notifiable event builder as helper.   
 * Backend integration with new frontend. 
 * Back to the previous variable handle logic. Without this the twig variables are not passed correctly.  
 * Some unit tests
 * Frontend integration. 
 * Backups. 
 * Support for alerts, sms and simple notifications channels. 
 * Support for Laravel notifications. 
 * Add notification listeners. 
 * Notificaitons import command. 
 * Notification channels. 
 * Extend notification templates. 
 * New module structure.
 
 **Changes**
 
 * Commented code for later investigation. 
 * Store system notifications as compiled. 
 * Link to create a new notification template as zero data for datatables.
 * Removed static properties from services CHG: moved notification listener to the "booted" method.
 * Unused method arguments, clean code.  
 * Removed redundant type declarations CHG: widget notification CSS classes. 
 * Notification data table filter. 
 * Changes in recipients logic, helpers to build notifications ADD: events categories CHG: removed old categories from notifications. 
 * Travis config file. 
 * Only text editor for notifications and alerts FIX: send exception alert only for notifications which are not testable. 
 * Removed invalid unit tests ADD: alert notification report for exceptions. 
 * Preview modal changes in styles and title. 
 * Preview as VUE component. 
 * Form controls ADD: simple text for SMS type. 
 * Save notifications for other locales if controls are empty. 
 * Moved errors. 
 * Brand template decorator for emails. 
 * Execute notifications and alerts sidebar after send tests. 
 * Notification widget, form controls. 
 * Moved vue form builder from core FIX: content attribute for notification without source. 
 * Removed PHP 7 strict type. 
 * Remove returning types. 
 * Form view CHG: namespaces for external classes. 
 * Integration for new grid layout and frontend improvements. 
 * No commit message. 
 * Refactorization to handle own events which can be chosen in notification form.
 * Assign own configured recipients to event.
 * Form built with Vue JS.
 * Possibility to built custom handler for notification event.
 * Minor fixes.
 * Notifications synchronizer - update of notification content. 
 * Remove unused classes. 
 * Minor and major changes. 
 * :book: update of README.md. 
 * Large refactorization about building notification templates which includes variables declaration, Laravel notification class structure, fixes for datatables. 
 
 
 **Fixes**
 
 * Fade timeout for dropdowns FIX: send notification or alert when source is null. 
 * Exception notification. 
 * Breadcrumb CHG: notification data method accessibility. 
 * Styles for form. 
 * Long fade effect for dropdowns. 
 * Should send only notification object. 
 * Wrong category passed on form. 
 * JS error for CKEditor. 
 * Poor performance between notification editors. 
 * Dispatching events for notifications FIX: notification sending CHG: event label will be get from class name. 
 * Padding for widget. 
 * JS wrong method. 
 * Empty template FIX: error for not found extension in import command ADD: unit tests for HTTP (broken due core right now) 
 * Cke editor instance rebuild. 
 * Exception notification FIX: wrong alert type checker. 
 * Config. 
 
 **Other**
 
 * Update composer.json. 
 * Merge pull request #7 from antaresproject/0.9.2-laravel5.5. 
 * Merge remote-tracking branch 'origin/0.9.2' into 0.9.2. 
 * Merge branch '0.9.2' of https://github.com/antaresproject/notifications into 0.9.2.  
 * Update composer.json. 
 * Merge pull request #5 from antaresproject/0.9.2.2. 
 * Merge pull request #3 from antaresproject/0.9.2.1. 
 * Merge branch '0.9.2' of https://github.com/antaresproject/notifications into 0.9.2.1.  

## Sample module

**New**

* Packages version. 
* Review project for missing frontend changes. 
* Backend integration with new frontend. 
* Dt filters. 
* Frontend integration.

**Changes**

* Removed unused any more type declaration. 
* Up versions in licenses CHG: events as objects CHG: new notification with removing old seed files. 
* Module integration for new grid layout. 
* :book: update of README.md.

**Fixes**

* More fixes for RWD in release. 
* Installation fixes. 

**Other**

* Merge branch '0.9.2' of https://github.com/antaresproject/sample_module into 0.9.2. 
* Merge remote-tracking branch 'origin/0.9.2' into 0.9.2. 
* Update composer.json. 
* Merge pull request #2 from antaresproject/0.9.2-laravel5.5.  

## Search

**New**

* Packages version. 
* Frontend integration.

**Changes**

* Search integration. 
* :book: update of README.md.  

**Other**

* Update composer.json. 
* Merge pull request #1 from antaresproject/0.9.2-laravel5.5. 

## Tester

**New**

* Packages version. 
* Backend integration with new frontend.

**Changes**

* Add param for customized js scripts. 
* Integration for new grid layout and frontend improvements. 
* Change message when code is not available. 
* :book: update of README.md. 

**Fixes**

* More fixes for RWD in release. 
* Checking email. 
* Getting component model. 

**Other**

* Update composer.json. 
* Merge pull request #6 from antaresproject/0.9.2-laravel5.5. 
* Merge branch '0.9.2' of https://github.com/antaresproject/tester into 0.9.2. 
* Merge pull request #5 from antaresproject/0.9.2. 
* Merge pull request #3 from antaresproject/0.9.2.2. 

## Translations

**New**

* Packages version. 
* PHPDoc for Languages model. ADD: icon_code attribute for languages flags. 
* Review project for missing frontend changes. 
* Backend integration with new frontend. 

**Changes**

* Update of area implementation. 
* Backend integration with frontend. 
* Integration for new grid layout and frontend improvements. 
* :book: update of README.md. 

**Fixes**

* More fixes for RWD in release. 

**Other**

* Update composer.json. 
* Merge pull request #3 from antaresproject/0.9.2-laravel5.5. 

## Two factor auth

**New**

* Packages version. 
* Backend integration with new frontend. 

**Changes**

* Change cols from max 16 to 24. 
* :book: update of README.md. 

**Fixes**

* Fixes for backend integration. 
* Fix for AreaContract. 
* Installation fixes. 

**Other**

* Update composer.json. 
* Merge pull request #4 from antaresproject/0.9.2-laravel5.5. 
* Merge branch '0.9.2' of https://github.com/antaresproject/two_factor_auth into 0.9.2.

## Users

**New**

* Packages version. 
* Client recipient for part of events. 
* Review project for missing frontend changes. 
* Backend integration with new frontend. 
* Notifications CHG: service provider. 
* Support for api. 

**Changes**

* Removed unused any more type declaration. 
* Update of version. 
* Updated licenses and PHP docs. 
* Backend integration with frontend. 
* Events. 

**Fixes**

* More fixes for RWD in release. 
* Event labels for notifications.  

**Other**

* Merge branch '0.9.2' of https://github.com/antaresproject/users into 0.9.2. 
* Update composer.json. 
* Merge pull request #1 from antaresproject/0.9.2-laravel5.5.  
