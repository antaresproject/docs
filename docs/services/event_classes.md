# Event Classes

[TOC]

## Introduction

Antares System allows to listen to most of system events using event class instead of event name. For example:
```php
use Antares\Events\Datatables\Order;
Event::listen(Order::class, function(Order $event) {
    $column = $event->column;
    $builder = $event->queryBuilder;
    $direction = $event->direction;
    //...
});
```

## Classes

### Authentication
Events for authentication process.
##### namespace: Antares\Events\Authentication
##### classes:
* __AuthCheck__- Runs when authentication is checked

### Components
Events for components.
##### namespace: Antares\Events\Compontents
##### classes:
* __ComponentActivated__ - Runs after component activation
* __ComponentActivating__ - Runs before component activation
* __ComponentBooted__ - Runs after component has booted
* __ComponentDeactivated__ - Runs after component deactivation
* __ComponentDeactivating__ - Runs before component deactivation
* __ComponentInstallationFailed__ - Runs after component intallation failed
* __ComponentInstalled__ - Runs after component intallation
* __ComponentInstalling__ - Runs before component intallation
* __ComponentSaved__ - Runs after component settings has been saved
* __ComponentSaving__ - Runs before saving component settings
* __ComponentsBooted__ - Runs after all components are booted
* __ComponentsDetecting__ - Runs before components detecting
* __ComponentStarted__ - Runs after compontent has booted
* __ComponentTemplatesDetecting__ - Runs before component templates detecting
* __ComponentUninstalled__ - Runs beofre component uninstallation
* __ComponentUninstalling__ - Runs beofre component uninstallation

### Composer
Events for composer commands.
##### namespace: Antares\Events\Composer
##### classes:
* __Failed__ - Runs after composer command failed
* __Success__ - Runs after composer command succeeded

### Customfields
Events for custom fields.
##### namespace: Antares\Events\Customfields
##### classes:
* __AfterSearch__ - Runs after custom fields search is being executed
* __BeforeSearch__ - Runs before custom fields search is being executed

### Datatables
Events for Datatables.
##### namespace: Antares\Events\Datatables
##### classes:
* __AfterColumn__ - Runs after column is added
* __AfterFilters__ - Runs after filter is added
* __AfterMassActionsAction__ - Runs after Datatable Mass Action is rendered
* __AfterTableAction__ - Runs after adding table action
* __BeforeFilters__ - Runs before filter is added
* __BeforeMassActionsAction__ - Runs before Datatable Mass Action is rendered
* __BeforeTableAction__ - Runs before adding table action
* __Column__ - Allows user to change column attributes (e.g. title)
* __Order__ - Runs on Datatable column order
* __TopCenterContent__ - Runs when Datatable is rendered, allows to change content of table (search field etc.)
* __Value__ - Allows user to change datatable

### Eloquent
Events for Eloquent models.
##### namespace: Antares\Events\Eloquent
##### classes:
* __AfterFind__ - Runs after finding (using method `find()`) model from database
* __BeforeFind__ - Runs before finding (using method `find()`) model from database

### Form
Events for Form.
##### namespace: Antares\Events\Form
##### classes:
* __BeforeFormRender__ - Runs before form is rendered
* __Form__ - Runs when form is created
* __FormReady__ - Runs when form is ready
* __FormRender__ - Runs when form is rendered
* __FormValidate__ - Runs when form is validated

### Installation
Events triggered during installation process.
##### namespace: Antares\Events\Installation
##### classes:
* __EntityInstalled__ - Runs after entity (e.g. user) installed
* __Schema__ - Runs after schema's installation start
* __SchemaInstalled__ - Runs after table schema installed

### Placeholder
Events for Placeholders.
##### namespace: Antares\Events\Placeholder
##### classes:
* __After__ - Runs after placeholder is rendered
* __Before__ - Runs before placeholder is rendered

### SystemReady
Events tiggered when Antares System are ready.
##### namespace: Antares\Events\SystemReady
##### classes:
* __AdminDone__ - Runs after Antares is done
* __AdminReady__ - Runs after Antares is ready
* __AdminStarted__ - Runs after Antares started
* __AfterGeneralSettingsMenu__ - Runs after general settings menu element is added
* __AfterLoggerMenu__ - Runs after logger menu element is added
* __AfterMenu__ - Runs after menu element is added
* __AntaresDone__ - Runs after Antares is ready
* __AntaresReady__ - Runs after Antares is ready
* __AntaresStarted__ - Runs after Antares started
* __BeforeMenu__ - Runs before menu element is added
* __ClientDone__ - Runs after Antares is done
* __ClientReady__ - Runs after Antares is ready
* __ClientStarted__ - Runs after Antares started
* __LoadServiceProviders__ - Runs after all service providers are loaded
* __MenuReady__ - Runs after Antares is ready
* __VersionCheck__ - Runs on dashboard

### Views
Events for view elements.
##### namespace: Antares\Events\Views
##### classes:
* __AfterRenderComponent__ - Runs after component is rendered
* __AfterRenderTemplate__ - Runs after template is rendered
* __BeforeRenderComponent__ - Runs before component is rendered
* __BeforeRenderTemplate__ - Runs before template is rendered
* __BreadcrumbBeforeRender__ - Runs before bredcrumb is rendered
* __TemplateHeaderLeft__ - Runs after left part of header is rendered
* __TemplateHeaderRight__ - Runs after right part of header is rendered
* __ThemeBoot__ - Runs when the theme is loaded
* __ThemeResolving__ - Runs when the theme is resolving
* __ThemeSet__ - Runs when the theme is set
* __ThemeUnset__ - Runs when the theme is unset
* __WidgetActions__ - Runs after widget actions are rendered