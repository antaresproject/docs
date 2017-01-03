#Form Builder  

[TOC]

##Introduction  

The application supports the use of tools in building flexible forms. The object responsible for their presentation is **form builder** determined in the space '**Antares/Html/Form**' in the core system's package. As opposed to standard solutions which are rendered available by the Laravel the form builder enables the pinning of fieldsets, controls, as well as static contents through other components, and separation from view's layer. Functionally, the form builder is similar to the solution made available by the [Symfony 2 framework](http://symfony.com/doc/current/book/forms.html). Below an example of basic form is presented:

```php
/**
 * Generating new form's object
 *
 * @return \Antares\Html\Form\FormBuilder
 */
protected function form()
{
    return app('antares.form')->of('awesome-foo-form', function(FormGrid $form) {
                $form->name('My Awesome Foo Form');
                $form->simple('#', ['method' => 'POST']);
                $form->fieldset('Fieldset one', function (Fieldset $fieldset) {
 
                    $fieldset->legend('Foo Fieldset 1');
 
                    $fieldset->control('input:checkbox', 'checkbox')
                            ->label('Foo checkbox');
 
                    $fieldset->control('input:radio', 'radio')
                            ->label('Foo radio');
 
                    $fieldset->control('select', 'select')
                            ->label('Foo textarea')
                            ->options([0 => 'Option 1', 1 => 'Option 2']);
 
                    $fieldset->control('input:text', 'text')
                            ->label('Foo text');
 
                    $fieldset->control('textarea', 'textarea')
                            ->label('Foo textarea');
 
                    $fieldset->control('button', 'button')
                            ->attributes(['type' => 'submit', 'class' => 'btn btn-primary'])
                            ->value('Submit button');
                });
            });
}

```


In the preceding example a form comprising several most important controls is being built. Such a form declaration enables 'pinning' to the form by other components. The components have the right to add, edit, and remove all form's elements: from fieldsets, through layouts and validation rules. The 'of ' method - used in the example - takes a (unique) name of statement which can be used by other components as the first parameter. The second argument is anonymous function which is responsible for the actual form's production. It is essential to determine the name of the form with the use of the '**name**' method within the anonymous function.

The implementation above will create the following form:

  ![AT_FORMB01.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB01.PNG)
  
##Form's Attributes  

The following types of attributes which determine the form's initial parameters can be distinguished:

###Url And Parameters  

####Simple  

```php
$form->simple('#', ['method' => 'POST']);

```

The method in attributes has url address where data from the form and attributes (e.g. method) will be send.

####Complex  

```php
$form->resourced($url, Model $model, array $attributes = []);

```

The method takes the url address as the first parameter. Model is an instance of the object whose data will be used to fill the form. The type of model must be connected with the Eloquent database object (\Illuminate\Database\Eloquent\Model).

The final parameter is optional. It can be used to transfer the form's method - if it is not delivered by hand, it will be determined automatically. Other attributes are for instance css class of tag `<form`

####Connected With A Presenter  

```php
$form->setup(Presenter $listener, $url, $model, array $attributes = []);
or
$form->resource(Presenter $listener, $url, $model, array $attributes = []);

```

The presenters may have their own methods determining the form's url by using **handles()** and **setupForm()** which interferes in grid which in turn may be perceived as form's building material.

###Layout  

The following method:

```php
$form->layout('antares/foundation::components.form');

```

enables determining of the view which will be used to display the form. If it is not given, the following one will be used by default: '**antares/html::form.horizontal**'.

##Fieldsets  

Each system's form consists of fieldsets. The fieldsets are used to put in order (group) the controls belonging to the form.

```php
$form->fieldset('Fieldset one', function (Fieldset $fieldset) {
                         
});

```

The first argument of the 'fieldset' method is the conventional name of the fieldset. There is also a possibility to replace the tag `<legend></legend>` with the value of this argument. Implementation lacking the first attribute as a name is also correct:

```php
$form->fieldset(function (Fieldset $fieldset) {
                         
});

```

The second argument is the anonymous function and within this function it is established which controls will belong to the fieldset. The form may also comprise any number of fieldsets. Here is an example:

```php
$form->fieldset('Fieldset 1', function (Fieldset $fieldset) {
    $fieldset->legend('Fieldset legend 1');
 
    $fieldset->layout('antares/foo::admin.partials._fieldset');
 
    $fieldset->control('input:text', 'foo_text1')
            ->label('Foo textarea 2');
});
 
$form->fieldset('Fieldset two', function (Fieldset $fieldset) {
    $fieldset->legend('Fieldset legend 2');
    $fieldset->control('input:text', 'foo_text2')
            ->label('Foo textarea 1');
});

```

The basic parameters of the fieldset are:

###Fieldset Legend  

A legend is visible above the fieldset in a view and determines the name of the controls' group:

```php
$fieldset->legend('Fieldset legend 1');

```

###Fieldset Layout  

Layout determines fieldset's dedicated view:

```php
$fieldset->layout('antares/foo::admin.partials._fieldset');

```

Therefore, the implementation above will cause the display of the following form:

  ![AT_FORMB02.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB02.PNG)
  
##Controls  

The controls constitute form's areas (e.g. the 'textarea' box). All the controls are invoked by means of the '**control**' method. The 'control' method takes two attributes:

###Structure  

```php
$fieldset->control('select', 'name');

```

The first one is type. The second one is name. Therefore, the code above will create:

```php
<select name="name"></select>

```

###Attributes  

Control's attributes are determined by means of the '**attributes**' method:

```php
$fieldset->control('select', 'name')->attributes(['class' => 'foo-select']);

```

Which in turn will create:

```php
<select name="name" class="foo-select"></select>

```

###Value  

The 'value' method is used to grant value to the control that is filling the 'value' attribute in html. An example:

```php
$fieldset->control('input:text', 'text_field')->value('test');

```

The html effect:

```php
<input type="text" name="text_field" value="text" />

```

###Label  

The '**label**' method is used to determine the name of the label belonging to area's structure:

```php
$fieldset->control('select', 'select')->options([0 => 'Option 1', 1 => 'Option 2'])->attributes(['class' => 'foo-select'])->label('Foo select');

```

It will create code's segment on the basis of defined by default control's view:

```
<div class="col-16 mb2">
        <label for="select" class="form-block__name">Foo select</label>   
</div>
<div class="col-16">
        <div class="input-field input-field--desc">
            <select class="foo-select" data-selectar="1" id="select" name="select"><option value="0">Option 1</option><option value="1">Option 2</option></select>
            <div class="col-16"></div>
        </div>
</div>
<span id="select_error" class="error col-13 col-mb-11"></span>

```

###Wrapper  

The '**wrapper**' method is used to wrap the control's structure in additional html tag (div). An example: 

```php
$fieldset->control('select', 'select')->options([0 => 'Option 1', 1 => 'Option 2'])->attributes(['class' => 'foo-select'])->label('Foo select')->wrapper(['class' => 'w100']);

```

It will wrap as below:

```
<div class="w100">
    <div class="col-16 mb2">
        <label for="select" class="form-block__name">Foo select</label>   
    </div>
    <div class="col-16">
        <div class="input-field input-field--desc">
            <select class="foo-select" data-selectar="1" id="select" name="select"><option value="0">Option 1</option><option value="1">Option 2</option></select>
            <div class="col-16"></div>
        </div>
    </div>
    <span id="select_error" class="error col-13 col-mb-11"></span>
</div>

```

Keep in mind that css wxx classes (e.g. w100, w200) are used to control the width of the control's structure.

###Types Of Controls  

####Select  

Parameters:

Options - contains a list of values ascribed to a control. It may contain a board as in the example below:

```php
$fieldset->control('select', 'select')->options(['option 1','option 2'])

```

It may contain the anonymous function and its task is to set the value (e.g. downloading the value from base):

```php
$fieldset->control('select', 'select')
                                ->options(function() {
                                    return [0 => 'Option 1', 1 => 'Option 2'];
                                })
                                ->label('Foo Select')
                                ->wrapper(['class' => 'w200']);
                                
```

The effect is shown below:

  ![AT_FORMB03.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB03.PNG)
  
####Textfield  

Textfield of the input:text type:

```php
$fieldset->control('input:text', 'foo_text')->label('Foo text')->attributes(['class' => 'foo-text'])->wrapper(['class' => 'w200']);

```

The effect:

  ![AT_FORMB04.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB04.PNG)
  
####Textarea  

Textfield of the textarea type:

```php
$fieldset->control('textarea', 'foo_textarea')->label('Foo textarea')->attributes(['class' => 'foo-text', 'rows' => 3, 'cols' => 10])->wrapper(['class' => 'w900']);

```

The effect:

  ![AT_FORMB05.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB05.PNG)
  
####Checkbox  

A control of the checkbox type, input:checkbox:

```php
$fieldset->control('checkbox', 'foo_checkbox')
                                ->label('Foo checkbox')
                                ->attributes(['class' => 'foo-checkbox'])
                                ->value(1);
                                
```

The effect:

  ![AT_FORMB06.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB06.PNG)
  
Optionally it is possible to select the control:

```php
$fieldset->control('checkbox', 'foo_checkbox')
                                ->label('Foo checkbox')
                                ->attributes(['class' => 'foo-checkbox'])
                                ->value(1)
                                ->checked();
                                
```

Multi checkboxes are characteristic for this type of areas:

```php
$fieldset->control('checkbox', 'foo_checkbox[]')
                                ->label('Option 1')
                                ->value(1)
                                ->attributes(['class' => 'foo-checkbox']);
 
$fieldset->control('checkbox', 'foo_checkbox[]')
                                ->label('Option 2')
                                ->value(2)
                                ->attributes(['class' => 'foo-checkbox']);
                                
```

The effect:

  ![AT_FORMB07.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB07.PNG)
  
####Radio  

Areas of the radio type, input:radio:

```php
$fieldset->control('checkbox', 'foo_checkbox')
                                ->label('Foo checkbox')
                                ->value(1)
                                ->attributes(['class' => 'foo-checkbox']);
                                
```

The effect:

  ![AT_FORMB08.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB08.PNG)

Selection is done similarly as in the case of checkbox:

```php
$fieldset->control('checkbox', 'foo_checkbox')
                                ->label('Foo checkbox')
                                ->attributes(['class' => 'foo-checkbox'])
                                ->value(1)
                                ->checked();
                                
```

The multi version:

```php
$fieldset->control('radio', 'foo_radio[]')
         ->label('Foo radio 1')
         ->attributes(['class' => 'foo-radio'])
         ->value(1);
 
$fieldset->control('radio', 'foo_radio[]')
         ->label('Foo radio 2')
         ->attributes(['class' => 'foo-radio'])
         ->value(2);
 
$fieldset->control('radio', 'foo_radio[]')
         ->label('Foo radio 3')
         ->attributes(['class' => 'foo-radio'])
         ->value(3)
         ->checked();
         
```

The effect:

  ![AT_FORMB09.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB09.PNG)
  
Specific type of a radio control is a form containing buttons instead of options. Definition of this type of control is described below:

```php
$fieldset->control('radio_btns', 'name')
         ->label('Radio Buttons')
         ->options(['0' => 'Element 1', '1' => 'Element 2', '2' => 'Element 3', '3' => 'Element 4'])
         ->value('1');
         
```

The result will be the following:

  ![AT_FORMB10.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB10.PNG)
  
####Tabular Inputs  

It is possible to group the controls on the basis of the control's 'name' attribute. Here is an example:

```php
$fieldset->control('input:text', 'text[foo][]')
                                ->label('Foo text 1')
                                ->attributes(['class' => 'foo-radio']);
 
$fieldset->control('input:text', 'text[foo][]')
                                ->label('Foo text 2')
                                ->attributes(['class' => 'foo-radio']);
$fieldset->control('checkbox', 'checkbox[foo][]')
                                ->label('Foo checkbox 1')
                                ->attributes(['class' => 'foo-radio'])
                                ->value(1);
 
$fieldset->control('checkbox', 'checkbox[foo][]')
                                ->label('Foo checkbox 2')
                                ->attributes(['class' => 'foo-radio'])
                                ->value(2);
                                
```

The effect:

  ![AT_FORMB11.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB11.PNG)
  
The form will send data divided in a tabular manner, an example:

```php
[text] => Array
        (
            [foo] => Array(
                    [0] => just test
                    [1] =>
                )
 
        )
[checkbox] => Array
        (
            [foo] => Array
                (
                    [0] => 1
                )
 
        )
        
```

####Dropzone  

Dropzone is an area used to add files. It uses the well-known javascript library named as [dropzone](http://www.dropzonejs.com). The use:

```php
$attributes = [
    "container"       => "dropzoneLogo",
    "paramName"       => "logo",
    'thumbnailWidth'  => 220,
    'thumbnailHeight' => 121,
    "url"             => handles("antares::foo/upload"),
    'destination'     => public_path('img/logos'),
    'rules'           => [
        "acceptedFiles" => ['jpg', 'png', 'jpeg'],
        "maxFilesize"   => 9.76,
        "minFilesize"   => 0.0009,
]];
 
$fieldset->control('dropzone', $attributes['container'])
        ->attributes($attributes)
        ->label('Logo')
        ->value(public_path('img/logos/foo.png'));
        
```

Attributes are the reflection of the parameters described in the [dropzone documentation](http://www.dropzonejs.com/#configuration). Furthermore, the 'container' attribute determines id diva used by the dropzone. It is important because of the possibility of having many dropzone instances on a single website. By default, the control's structure uses the view's file from the location: antares/foundation::widgets.forms.dropzone. If there is a necessity of defining another dropzone container appearance, it is possible to determine your own view by adding the 'view' attribute. In addition to this, it would be possible to determine the behavior if the file's upload had succeeded, so:

```php
$attributes = [
    "container"       => "dropzoneLogo",
    "paramName"       => "logo",
    'thumbnailWidth'  => 220,
    'thumbnailHeight' => 121,
    "url"             => handles("antares::foo/upload"),
    'destination'     => public_path('img/logos'),
    'rules'           => [
        "acceptedFiles" => ['jpg', 'png', 'jpeg'],
        "maxFilesize"   => 9.76,
        "minFilesize"   => 0.0009,
    ],
    'view'=>'antares/foo::partials._dropzone',
    'onSuccess'       => '$('.main-sidebar .main-sidebar__logo').css('background-image','url(/img/logos/'+response.path+')');',
];
 
$fieldset->control('dropzone', $attributes['container'])
        ->attributes($attributes)
        ->label('Logo');
        
```

The implementation above gives the following result:

  ![AT_FORMB12.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB12.PNG)
  
After the upload:

  ![AT_FORMB13.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB13.PNG)
  
####Remote Select  

Remote Select is used to build the controls of the select type with independently obtained values (ajax). An example of implementation:

```php
$fieldset->control('remote_select', 'select_name')
        ->label('Remote Select')
        ->options([
            ['0' => 'please select option...']
        ])
        ->attributes([
            'fieldname'     => 'fullname',
            'id'            => 'select-infinity',
            'options'       => ['placeholder' => 'Search for a foo ...'],
            'pluginOptions' => [
                'allowClear'              => true,
                'minimumInputLength'      => 1,
                'minimumResultsForSearch' => 'Infinity',
                'ajax'                    => [
                    'url'      => handles('antares/foo::elements'),
                    'dataType' => 'json',
                    'delay'    => 250,
                    'cache'    => true
                ],
            ],
]);

```

The '**fieldname**' attribute determines the name of the search field. If it is not determined, the name parameter is used by default that is 'select_name' in the case above. The remaining parameters of use are in accord with the parameters which are used by the '**select2**' javascript library. The description of parameters can be found in the [link](https://select2.github.io/examples.html#data-ajax). The effect of the code shown in the last example:

  ![AT_FORMB14.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB14.PNG)
  
####Ckeditor  

Ckeditor is a complex editor of the '**wysiwyg**' type. Use the code below:

```php
$fieldset->control('ckeditor', 'content')
        ->label('Foo content')
        ->attributes(['id' => 'foo-content']);
        
```

To generate the following textfield:

  ![AT_FORMB15.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB15.PNG)
  
The parameters of this control are identical with parameters of the textarea textfield.

####Customfields  

It is possible to create fully dedicated structure inside a form. The code:

```php
$fieldset->control('placeholder', 'custom_field')
        ->field(function() {
            return '<div class="col-group">'
                    . '<div class="col-16">' . '<input type="text" name="foo_customfield" />' . '</div>'
                    . '<div class="col-16">' . app('html')->link(handles("#"), 'Custom Field') . '</div>'
                    . '</div>';
        });
        
```

will create:

  ![AT_FORMB16.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB16.PNG)
  
##Form Layouts  

Forms may use views in order to define a dedicated view. Currently, two types of views which are operated by forms are available:

* vertical
* horizontal

Vertical is the default one.

The difference between the vertical view and the horizontal one lies in the block's structure layout. The block usually consist of label field, a control, and auxiliary fields in the form of container with  errors and fields of the inline - help type. An example of such a structure may be textfield's block input:text:

```
<div class="col-dt-2 col-3 col-mb-5 {{ control.getLabelWrapper('class') }}">
    {{ Form.label(control.name, control.label,{'class':'form-block__name'})|raw }}   
</div>
<div class="col-dt-14 col-13 col-mb-11 {{ control.getWrapper('class') }}">
    <div class="input-field {{ (control.inlineHelp|length>1 or control.help|length>1) ? 'input-field--desc' : ''  }}">       
        {{ control.getField(row, control, [])|raw }}
        {% if control.inlineHelp|length>1 or control.help|length>1 %}
            {% include 'antares/foundation::layouts.antares.partials.form.horizontal._description' %}            
        {% endif %}
    </div>
    <span id="{{ control.id }}_error" class="error col-13 col-mb-11">
        {{ errors.first(control.name, format)|raw }}
    </span>
</div>

```

In order to set appropriate view's scheme you need to transmit short name of the view by means of the 'layout' method to the form builder object.
For the horizontal view:

```
$form->layout('horizontal');

```

For the vertical view:

```
$form->layout('vertical');

```

Your own form's layout in turn is passing a path to the view's file:

```
$form->layout('antares/foo::partials.form.my_foo_form_layout');

```

Fields' layout for the horizontal view is the following, an example:

  ![AT_FORMB17.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB17.PNG)
  
The vertical view:

  ![AT_FORMB18.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/form_builder/AT_FORMB18.PNG)
  
##Validation  

Information concerning validation can be found [here](https://inbssoftware.atlassian.net/wiki/display/AS/Validation).

