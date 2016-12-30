#Events  

[TOC]

##System Events  

Events constitute system events delegated in different parts of the system which belong to a planned mechanism of some services' realization. Therefore, an event is logging the user in to the system and treating as an action, but the authorization process is not an event at all. A register of events activated within a component's structure can be found [here](https://inbssoftware.atlassian.net/wiki/display/AS/Module+Events). The following base events excited by the system can be:

###General  

* antares.ready
* antares.started: {area} (e.g. antares.started: admin)
* antares.ready: {area}
* antares.done: {area}

###Installation  

* antares.install.schema
* antares.install.schema: {name} (e.g. antares.install.schema: multibrand)
* antares.install: {name}
* antares.install: {name}

###Modules And Components  

* extension.started
* extension.started: {name}  (e.g. extension.started: multibrand)
* extension.done
* extension.done: {name}
* antares.form: extension.{name}
* antares.validate: extension.{name}
* antares.saving: extension.{name}
* antares.saved: extension.{name}
* antares.activating: {name}
* antares.deactivating: {name}

###Users  

* antares.list: users
* antares.form: users
* antares.validate: users
* antares.creating: users
* antares.updating: users
* antares.deleting: users
* antares.saving: users
* antares.created: users
* antares.updated: users
* antares.deleted: users
* antares.saved: users

###User's Account Service  

* antares.form: user.account
* antares.validate: user.account
* antares.creating: user.account
* antares.updating: user.account
* antares.deleting: user.account
* antares.saving: user.account
* antares.created: user.account
* antares.updated: user.account
* antares.deleted: user.account
* antares.saved: user.account

###System's Settings  

* antares.form: settings
* antares.validate: settings
* antares.saved: settings

Furthermore, the system renders available closely related to services:

##Datatables  

More information about how datatables operate as a service can be found [here](https://inbssoftware.atlassian.net/wiki/display/AS/Datatables).
A list of events activated within the service:

Adding a column after a column: datatables:{route}:after.{column}. An example:

```php
Event::listen('datatables:admin/users/index:after.id', function($datatables) {
            if ($datatables instanceof Builder) {
                $datatables->collection->push(new Column([
                    'data'  => 'playground',
                    'name'  => 'playground',
                    'title' => 'from playground module'
                ]));
            }
});
```

Adding a column before a column: datatables:{route}:before.{column}. An example:

```php
Event::listen('datatables:admin/users/index:before.id', function($datatables) {
            if ($datatables instanceof Builder) {
                $datatables->collection->push(new Column([
                    'data'  => 'playground',
                    'name'  => 'playground',
                    'title' => 'from playground module'
                ]));
            }
});
```

Changing the value of the already existing column: datatables:{route}:column.{column}. An example:

```php
Event::listen('datatables:admin/users/index:column.id', function(&$attributes) {
            if (isset($attributes['title'])) {
                $attributes['title'] = $attributes['title'] . ' - from playground module';
            }
});
```

Adding an action before the existing position in the row's context menu: datatables:{route}:before.action.{action}. An example:

```php
Event::listen('datatables:admin/users/index:before.action.edit', function($actions, $row) {
            $actions->push(app('html')->link(handles("antares::users/{$row->id}/playground"), 'From playground module'));
});
```

Value's modification within the row's cell: datatables:rows.{route}. An example:

```php
Event::listen('datatables:rows.admin/users/index', function($row) {
            $row->fullname   = $row->fullname . ' Appends Fullname from Playrgound Module';
            $row->playground = 'Row From Playground Module';
});
```

Adding a filter to datatables instance: datatables:filters.{route}.{filter}.before. An example:

```php
Event::listen('datatables:filters.admin/users/index.userstatusfilter.before', function($filter) {
            $filter->add(Filter\StatusFilter::class);
});
```

##Widgets  

Adding the value before the content rendered by a widget: widgets:render.before.{widget}. An example:

```php
Event::listen('widgets:render.before.userswidget', function() {
                echo '<img src="http://dummyimage.com/600x100/DDD/fff&text=from+playground+module+-+before+widget" />';
    });
```

Adding the value after the content rendered by a widget: widgets:render.after.{widget}. An example:

```php
Event::listen('widgets:render.after.userswidget', function() {
      echo '<img src="http://dummyimage.com/600x100/DDD/fff&text=from+playground+module+-+after+widget" />';
    });
```

Adding an action to the action list ascribed to a widget: widgets:render.widget-actions.{widget}. An example:

```php
Event::listen('widgets:render.widget-actions.userswidget', function() {
                            echo '<li>
                                <a class="mdl-js-button mdl-js-ripple-effect ajaxable widget-refresh" href="#" title="">
                                    <i class="zmdi zmdi-star"></i>
                                    Im action from playground module
                                </a>
                            </li> ';
    });
```
    
Adding the value before the content published by a widget template: widgets:render.before.template.{template}. An example:

```php
Event::listen('widgets:render.before.template.ajax', function() {
    echo 'before render template from module playground';
});
```

Adding the value after the content published by a widget template: widgets:render.after.template.{template}. An example:

```php
Event::listen('widgets:render.after.template.ajax', function() {
       echo 'after render template from module playground';
});
```

Pinning a widget into the right gridstack segment: widgets:render.{route}.right. An example:

```php
Event::listen('widgets:render.admin.right', function() {
     $object = app(\Antares\Playground\Widgets\PlaygroundWidget::class);
     $object->setView('antares/widgets::admin.partials._base');
     echo $object;
});
```

##Forms  

Pinning a fieldset before the first fieldset in a form: forms:{form_name}.fieldsets.0.before. An example:

```php
Event::listen('forms:user-form.fieldsets.0.before', function($form) {
            $form->fieldset('Playground fieldset before first fieldset', function (\Antares\Html\Form\Fieldset $fieldset) {
                $fieldset->legend('Playground fieldset before first fieldset');
                $fieldset->control('input:text', 'playground_text_field')->label('Playground text field');
            });
});
```

Pinning a fieldset after the first fieldset in a form: forms:{form_name}.fieldsets.0.after. An example:

```php
Event::listen('forms:user-form.fieldsets.0.after', function($form) {
            $form->fieldset('Appends as last fieldset from playrgound', function (\Antares\Html\Form\Fieldset $fieldset) {
                $fieldset->legend('Appends as last fieldset from playground');
                $fieldset->control('textarea', 'playground_textarea_field')
                        ->label('Playground textarea field');
            });
});
```

Adding a button before all the buttons in a form: forms:{form_name}.controls.button.before. An example:

```php
Event::listen('forms:user-form.controls.button.before', function($fieldset) {
            $fieldset->control('button', 'before submit')
                    ->value(trans('Before submit button from playground module'))
                    ->attributes(['class' => 'btn btn--md btn--red mdl-button mdl-js-button mdl-js-ripple-effect']);
});
```

Adding a button after all the buttons in a form: forms:{form_name}.controls.button.after. An example:

```php
Event::listen('forms:user-form.controls.button.after', function($fieldset) {
            $fieldset->control('button', 'after submit')
                    ->value(trans('After submit button from playground module'))
                    ->attributes(['class' => 'btn btn--md btn--orange mdl-button mdl-js-button mdl-js-ripple-effect']);
});
```
Adding a control after the already existing control: forms:{form_name}.controls.{control_name}.after. An example:

```php
Event::listen('forms:user-form.controls.password.after', function($fieldset) {
            $fieldset->control('select', 'sample-text')
                    ->label('After password field from playground module')
                    ->options(function() {
                        return [
                            '0' => 'First option',
                            '1' => 'Second option',
                            '2' => 'Last option'
                        ];
                    });
});
```

Adding a control before the already existing control: forms:{form_name}.controls.{control_name}.before. An example:

```php
Event::listen('forms:user-form.controls.email.before', function($fieldset) {
            $fieldset->control('checkbox', 'checkboxes')
                    ->label('Before email field from playground module');
});
```

##Notifications  

Adding variables to the notification: notifications:{notification_name}.variables. An example:

```php
Event::listen('forms:user-form.controls.email.before', function($fieldset) {
            $fieldset->control('checkbox', 'checkboxes')
                    ->label('Before email field from playground module');
});
```

Adding the value before the notification's content: notifications:{notification_name}.render.before. An example:

```php
Event::listen('notifications:new_device_notification.render.before', function() {
                return '<img src="http://dummyimage.com/600x200/DDD/fff&text=from+playground+module+-+prepends+notification+content"/>';
    });
```

Adding the value after the notification's content: notifications:{notification_name}.render.after. An example:

```php
Event::listen('notifications:new_device_notification.render.after', function() {
                return '<img src="http://dummyimage.com/600x200/DDD/fff&text=from+playground+module+-+appends+notification+content"/>';
    });
```

##Analyzer  

Adding a tab before the already existing tab in the analyzer's report content (e.g. a module has been installed which increases the memory need): analyzer:before.{tab_name}. An example:

```php
Event::listen('analyzer:before.components', function() {
            return [
                'url'         => handles('antares::logger/analyze/playground', ['csrf' => true]),
                'description' => 'Playground analyzer description',
            ];
});
```

