# Widgets 

This component is used to operate widgets presented in the application. More information about the implementation of widgets can be found [here](../services/widget.md). Configuration file connected with the component is placed in the location:

```php
src\components\widgets\resources\config\config.php
```

In the configuration file at the *defaults.ignored* key a table of attributes ignored during saving widgets' settings to database is placed. Widgets' settings are saved per user and brand, which means that each user may have different widgets' settings at given brand provided that widget's attributes are not forced. 
Tables operated by the component are as follows:

* `tbl_widgets` - list of all widgets available in the system 

* `tbl_widget_params` - a table which keeps widgets' parameters according to the brand and the resource (a route without parameters) where widget is rendered available. The description of table's columns:
   1. parent_id - widget's parent identifier - within its framework other widget may be placed. In the current implementation the column is not used (lack of nested widget).
   2. wid - widget's identifier - foreign key to tbl_widgets table
   3. uid - user's identifier - foreign key to tbl_users table
   4. brand_id - brand's identifier - foreign key to tbl_brands table
   5. resource - route's name where the setting is ascribed e.g. administrators/notifications/edit/{id}
   6. position,real_depth - setting the position within the framework of nested widgets. The functionality is not used currently.
   7. name - widget's short name (slug)
   8. data - widget's settings in the form of serialized table

* `tbl_widget_types` - the table which determines widgets' types, currently it is not used.

When the system operates, the component automatically scans catalogues is search of new widgets. Thereby, changes of attributes are updated without delay. If a new widget is added to the system, it will be automatically added to the tbl_widgets table.

The following aliases may be distinguished within the component:

1. `antares.widgets`

   It is an instance of the `Antares\Widgets\Factory` class which is responsible for detection of widgets and widgets' templates.

2. `widgets`

    It is an instance of the `Antares\Widgets\Repository\WidgetsRepository` class which is responsible for actions taken on widgets' tables.
3. `widget-templates` 

    It is an instance of the `Antares\Widgets\Registry\TemplatesRegistry` class which is responsible for actions taken on templates
    
4. `antares.widgets.finder` 

    It is an instance of the `Antares\Widgets\Finder` class which is responsible for detection of widgets.
    
5. `antares.widgets.templates.finder` 

    It is an instance of the `Antares\Widgets\TemplateFinder` which is responsible for detection of widget's templates.

Within the widgets' component you can distinguish the following events:
1. antares.widgets: detecting - activated before the detection of widgets
2. antares.widgets.templates: detecting - activated before the detection of templates

