# Change Log

This project follows [Semantic Versioning](contributing.md).

[TOC]

## Change Log

- [0.9.2](changelog.md) - 2017-03-22
- [0.9.0](changelog.md) - 2017-02-02

## Version 0.9 {#v0-9}

### v0.9.2

#### Antares Project Application Skeleton

##### New

* Sample module as optional.
* Remove unused directories.
* Missing field views.
* Updates assets, FIX: select field in horizontal.
* Laravel 5.4 integration, composer.json validation.
* Laravel 5.3 integration.
* Horizontal form view as default.
* Project fixes and improvements for 0.9.2 release.
* Refresh application assets and views.
* Missing js files, views refactoring.
* Configuration for version 0.9.2.
* Notification logs menu handlers.
* Twig block for notification logs preview.
* Dependable actions menu trigger, notification logs menu item.
* Coveralls configuration, code coverage badge.
* Travis coverage, phpunits refactoring.
* Application configuration before release 0.9.2.
* Phpunit configuration.
* Core as git submodule.
* Git submodules configuration.
* Code climate custom config.
* Missing repository vcs.
* Missing files.
* Components menu item, CHG: change env.example filename.
* Project installation updates.
* Readme, contributing, changelog, units.

##### Changes

* Change main readme.md.
* Remove unused component.
* Changes for default components config.
* Quick search engine based on datatables results.
* Simplify installation process, FIX: change css animations for noty and modals, CHG: remove unused twig partials.
* Unit tests refactoring.
* Refactoring unit tests after laravel 5.4 integration.
* Composer.json changes, add coverage vendor.
* Javascript files.
* Assets and views for release 0.9.2.
* Travis configuration.
* Core change submodule path.
* Package readme & composer updates.

##### Fixes

* Scrolling console preview during installation FIX: removed key:generate command from composer update script.
* Scrolling console preview during installation FIX: stop progress installation and AJAX requests after close preview window.
* Sample module composer fixes.
* Remove modules directory autoload from composer.json file.
* Composer.json order of command php artisan key:generate.
* _env.example invalid copying, ADD: missing composer vendors.

##### Internal

* Components and configuration changes.

##### Other

* Added submodule src/components/api.
* Updated submodule src/core.
* Update composer.json.
* Create .travis.yml.
* Removed unnecesary ignores into gitignore.
* Added gitignore files.
* Update README.md.
* Update composer.json.



#### Core

##### New

* Installation step with components selection.
* Countries sql, multiuser.
* Added decorators for controls CHG: Changes in control AbstracType.
* LabelWrapper, inputWrapper CHG: Container for hidden type is hidden too.
* When any label added to control, generates from name FIX: temporary fix for firing BeforeFormRender event.
* Controls for Files and Dates.
* New contrl types: Hidden, Password, Range CHG: Changed and new options added to Select.
* SetSearch() feature for selects ADD: TimezoneType, LanguageType.
* Info tooltip for labels.
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
* Activation operations for installing extensions FIX: console outputs FIX: path resolver for extension finder.
* Unit tests refactoring.
* Testing  - add custom service providers, remove unused class.
* Assets publisher from component namespace, FIX: migrating component files.
* Laravel 5.4 integration.
* Laravel 5.3 integration.
* Horizontal form view as default.
* Routes->handles replacement, route naming with area, datatables order adapter.
* Important:Filters/sorting in datatables should be saved (browser cache) and be remembered after refreshing the page.
* Notification logs.
* Notification templates.
* Dependable activity actions.
* Phpunit refactoring.
* Travis configuration file, phpunit.
* Datatables filtering columns.
* Datatable natvive column filter.
* Default settings on fresh install.
* Session datatables per page saver.

##### Changes

* Readme.md structure change.
* Improved rendering hidden type FIX: Fixed wrappers.
* Changes in Antares Form Builder to handle new form control types.
* Authors ordering for extensions datatable.
* Output errors for composers ADD: filtering extensions by type.
* Extensions types moved to model ADD: filter search by extension type.
* Show configuration for only for active components.
* Added extensions.js to the public directory.
* Acl migration facades and added tests.
* Acl migration tests FIX: added ginignore to view cache directory.
* Refactored ACL importer FIX: foundation and kernel files to handle the laravel 5.4 version.
* Composer output FIX: dispatcher method for Laravel 5.4 ADD: extension tests CHG: installer config facade FIX: installation worker.
* Quick search engine based on datatables results.
* SIMPLIFY installation process, FIX: multiple same buttons in mass actions.
* Phpunits for modules.
* Refactoring unit tests after laravel 5.4 integration.
* Brands breadcrumbs changes, asset webpack ignore minify, customfield protection, datatables - force disable scripting, FIX: exception 500 & 404 logos.
* Core phpunit configuration changes.
* Datatables pre init html builder, ADD: phpunit configuration file.

##### Fixes

* Installation process - add defered activation events.
* Installation fixes.
* Scrolling console preview during installation FIX: stop progress installation and AJAX requests after close preview window.
* Unable to reload acl permissions.
* Unable to reload acl permissions.
* Add logs to installation process,installing custom modules.
* Invalid command on windows oses.
* Fixes for widgets finder.
* Components table view.
* Installer and extension unit test fixes.
* Templates after adding decorators.
* Country and Language fix.
* Fileupload fix.
* Unit tests.
* Extension autoloader.
* Resolving component name based on short one.
* Installation progress for system and extensions FIX: components datatables ADD: type, friendly name, homepage for components FIX: do not allow to uninstall core components.
* Removed the backup:db artisan console due to invalid configuration ADD: composer vendor directory validation for installation FIX: removed generating key for .env file after composer update command.
* Artisan console which uninstall a whole application FIX: installation stuck during progress.
* Changed old function getToken() to token(0 for session object in Kernel INT: removed step from installer in which user can select components.
* Wrong directory name for extension contracts INT: added more tests for extension module ADD: acl command first of all flush permissions and then import default permissions FIX: wrong name for activator/deactivator for publisher.
* Steps numbers, url to create admin.
* Saving acl of extensions with old names CHG: added command to refresh extensions ACL.
* Progress and installation logic CHG: removed license step from installation CHG: additional methods for extension manager FIX: extensions events FIX: components branches.
* Wrong route names in extension settings form FIX: extension name for asset manager.
* Composer installation.
* Installer service provider - invalid booting.
* Geoip invalid location resolver, invalid providers parameter in test benchamrk.
* Cssinline convertion in notifier.
* Staff -> Users has wrong main menu visible.
* Builder headers.
* Phpunits core pre release refactoring.
* Datatables table builder, ADD: phpunit configuration file.
* User add with customfields.

##### Internal

* Fixed data typing.
* Refactorization and comments fixes.

##### Other

* Fixes for composers and installer.
* Fixed wrong config facade.
* Removed composer custom installer.
* Adapted to new extensions installation. Init.
* Update composer.json.



#### Api

##### New

* Unit tests refactoring.
* Travis configuration file.
* Laravel 5.4 integration.
* Laravel 5.3 integration.
* Session datatbales and ordering.
* Minor fixes.

##### Changes

* Readme.md structure change.
* Removed old ACL method form service provider.
* Updated ACL file.
* Change used Router.

##### Fixes

* Extensions modal.
* Replace route to handles.
* Empty providers list fix.
* Fix for new composer handler. DEV version.

##### Other

* Update composer.json.



##### Other

- Update composer.json. [Marcin Kozak]
- Update composer.json. [Marcin Kozak]
- Fix for new composer handler. DEV version. [Marcin Kozak]
- Update composer.json. [mountstone]
- INITIAL ANTARES COMMIT. [mountstone]
- Initial commit. [mountstone]

#### Automation

##### New

* Laravel 5.4 integration.
* Laravel 5.3 integration.
* New composer.json structure.
* Session datatbales and ordering.

##### Changes

* Readme.md structure change.
* Change automation synchronization command.
* Added homepage and friendly names to components.
* Unit tests refactoring.
* Unit tests refactoring after laravel 5.4 release.
* Updated ACL file.
* Old extension finder class.
* Remove unused scripts.
* Main menu title.

##### Fixes

* Automation ordering.
* Automation timeout queue process.

##### Other

* Fix for composer handler.
* Update composer.json.


#### Ban Management

##### New

* Unit tests refactoring.
* Custom URL for settings form.
* Laravel 5.4 integration.
* Laravel 5.3 integration.
* Breadcrumb and inputs helps.

##### Changes

* Readme.md structure change.
* Added homepage and friendly names to components.
* Updated ACL file.

##### Fixes

* Wrong method name.
* Settings form.
* Fixes for named routes.
* Fix for new composer handler. Fix for options. DEV version.

##### Other

* Update composer.json.
* Changed underscore by middle-score.


#### Control

##### New

* Laravel 5.4 integration.
* Laravel 5.3 integration.
* New composer.json structure.
* Session datatbales and ordering.

##### Changes

* Readme.md structure change.
* Change form fields dimensions.
* Added homepage and friendly names to components.
* Updated ACL file.
* Breadcrumbs in stuff.
* Acl tree view.

##### Fixes

* Composer.json.
* Staff -> Users has wrong main menu visible.
* Fix for new composer handler.

##### Internal

* Updated for Laravel 5.4.

##### Other

* Update composer.json.



#### Custom fields

##### New

* New composer.json structure.
* Laravel 5.4 integration.
* Laravel 5.3 integration.
* Custom fields tabs should be the same like for the configuration page.

##### Changes

* Readme.md structure change.
* Added homepage and friendly names to components.
* Updated ACL file.
* Quick search engine based on datatables results.
* Customfields refactoring.
* Unit tests refactoring.
* Horizontal default form view, langs.

##### Fixes

* Fix for new composer handler.

##### Other
* Update composer.json.



#### Logger

##### New

* Laravel 5.4 integration, composer packgas.
* Laravel 5.4 integration.
* Laravel 5.3 integration.
* New composer.json structure.
* Release 0.9.2.
* Add css asset as default report view style.
* Activity logs with type and search.
* Extend activity logs.

##### Changes

* Readme.md structure change.
* Change default notification areas.
* Remove unnecesary lib.
* Added homepage and friendly names to components.
* Updated ACL file.
* Laravel 5.3 update.
* Quick search engine based on datatables results.
* Avatar classname change.
* Refactoring unit tests after laravel 5.4 integration.
* Main menu title.

##### Fixes

* Activity logs ordering.
* Staff -> Users has wrong main menu visible, #35.
* Activity logs #37.
* Activity logs datatables columns width.
* Fix for new composer handler.

##### Internal

* Remove unused code.
* Updated for Laravel 5.4.

##### Other

* Update composer.json.


#### Notifications
 
 ##### New
 
 * Missing translations.
 * Refactoring unit tests.
 * Laravel 5.4 integration.
 * Laravel 5.3 integration.
 * New composer.json structure.
 * Notification logs auto remover.
 * Notification logs.
 
 ##### Changes
 
 * Readme.md structure change.
 * Change form fields dimensions, DEL: remove unused watchdog after install.
 * Change default notification areas.
 * Added homepage and friendly names to components.
 * Notifications unit tests refactoring.
 * Updated ACL file.
 * Main menu title.
 
 ##### Fixes
 
 * Depracated 'lists' method to new one - 'pluck'
 
 ##### Other
 
 * Update composer.json.
 * Fix for new composer handler.
 * Notifications configuration should be moved to the System configuration page.

#### Sample module

##### New

* Sample more email notification template, notification seeder and automation.
* Sample datatables and events.

##### Changes

* Readme.md structure change.
* Change module name.

##### Fixes

* Change module name with prefix component-

#### Search

##### New

* New composer.json structure.
* Laravel 5.3 integration.

##### Changes

* Readme.md structure change.
* Search engine changes, hide unwanted tabs when no results.
* Extension finder change classname.
* Added homepage and friendly names to components.
* Updated ACL file.
* Quick search engine based on datatables results.

##### Fixes

* Remove console log, add total search tabs.

##### Other

* Update composer.json.
* Fix for new composer handler.
* Changed project name on composer.

#### Tester

##### New

* New composer.json structure.
* Refactoring unit tests.
* Laravel 5.4 integration.

##### Changes

* Readme.md structure change.
* Added homepage and friendly names to components.
* Updated ACL file.
* Quick search engine based on datatables results.
* Tester unit tests refactoring.

##### Fixes

* Getting component model.

##### Other

* Update composer.json.
* Fix for new composer handler.
* Changed project name on composer.

#### Translations

##### New

* Laravel 5.4 integration.
* Laravel 5.3 integration.
* New composer.json structure.
* Right controls.
* Release 0.9.2.
* Add key-value translation, delete and change item, CHG: view.
* Translations view for version 0.9.2.

##### Changes

* Readme.md structure change.
* Added homepage and friendly names to components.
* Updated ACL file.
* Remove unused html divs.

##### Other

* Update composer.json.
* Fix for new composer handler.

#### Two factor auth

##### New

* Unit tests refactoring.
* Laravel 5.4 integration.
* Laravel 5.3 integration.

##### Changes

* Readme.md structure change.
* Added homepage and friendly names to components.
* Updated ACL file.

##### Other

* Update composer.json.
* Update composer.json.
* Fix for new composer handler.
* Changed project name on composer.

#### Updater

##### New

* Refactoring unit tests.
* Laravel 5.4 integration.
* New composer.json structure.
* New composer.json structure.
* Creating new backup improvements.

##### Changes

* Readme.md structure change.
* Added homepage and friendly names to components.
* Updated ACL file.
* Change minimal width of widget.
* Change default sys version.

##### Fixes

* Remove backup when in pending status.
* Fix for new composer handler.

##### Other

* Update composer.json.

#### Widgets

##### New

* Refactoring unit tests.
* Laravel 5.4 integration.
* Laravel 5.3 integration.
* New composer.json structure.
* Default dashboard widgets after fresh install.

##### Changes

* Readme.md structure change.
* Remove initial widgets migaration.
* Added homepage and friendly names to components.
* Updated ACL file.

##### Fixes

* Fixes for widgets finder.
* Deferred providers.
* Gridstack init after js updates.
* Enlarge of the widget doesn’t work.

##### Internal

* Setup service provider as not deferred.

##### Other

* Update composer.json.
* Fixes for new composer handler.
* Changed project name on composer.


### v0.9.0 {#v0-9-0}

FIRST ANTARES RELEASE

---