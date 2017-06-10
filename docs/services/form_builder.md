# Form Builder  

[TOC]

## Introduction  

The application supports the use of tools for building flexible forms. The object responsible for their presentation is **form builder** defined in the space `Antares/Html/Form` in the package of a core system. Contrary to standard solutions offered by the Laravel, the form builder enables the attaching of fieldsets, controls and static contents through other components as well as the separation from the layer of a view. Functionally, the form builder is similar to the solution offered by the [Symfony 2 framework](http://symfony.com/doc/current/book/forms.html). Below an example of basic form is presented:

> Form classes should be placed in `src/modules/<module_name>/src/Http/Forms/` (e.g. `src/modules/<sample_module>/src/Http/Forms/SampleForm.php`).

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


In the example above, the form that consists of several most important controls is built. Such a form's declaration enables 'attaching' to the form by other components. The components have the permission to add, edit, and remove all form's elements: from fieldsets, through layouts to validation rules. A unique name of a statement that can be used by other components is taken by the `of` method from the example as the first parameter. The second argument is the anonymous function responsible for the actual form's production. It is essential to determine the name of the form with the use of the `name` method within the anonymous function.

The implementation above will create the following form:

![AT_FORMB01.PNG](../img/docs/services/form_builder/AT_FORMB01.PNG)
  
## Form's Attributes  

The following types of attributes that determine the form's initial parameters can be enumerated:

### Url And Parameters  

#### Simple  

```php
$form->simple('#', ['method' => 'POST']);
```

The method in attributes has the URL address which data from the form and attributes (e.g. method) will be send to.

#### Complex  

```php
$form->resourced($url, Model $model, array $attributes = []);
```

The method takes the URL address as the first parameter. Model is an instance of the object the data of which will be used to fill the form. The type of the model has to be connected with the Eloquent database object (`\Illuminate\Database\Eloquent\Model`).

The final parameter is optional. It can be used to transfer the form's method - if not delivered manually, it will be determined automatically. Other attributes are for instance the css class of the `<form>` tag.

#### Connected With A Presenter  

```php
$form->setup(Presenter $listener, $url, $model, array $attributes = []);
or
$form->resource(Presenter $listener, $url, $model, array $attributes = []);
```

The presenters may have their own methods that define the form's URL address by using `handles()` and `setupForm()` that interferes in grid of which the form is composed.
### Layout  

The following method:

```php
$form->layout('antares/foundation::components.form');
```

Enables the determination of the view that will be used to display the form. If it is not specified, the following one will be used by default: `antares/html::form.horizontal`.

## Fieldsets  

Each system's form consists of fieldsets. The fieldsets are used to put in order (group) the controls of the form.

```php
$form->fieldset('Fieldset one', function (Fieldset $fieldset) {
                         
});
```

The first argument of the `fieldset` method is a conventional name of the fieldset. There is also a possibility to replace the tag `<legend></legend>` with the value of this argument. Implementation lacking the first attribute as a name is also correct:

```php
$form->fieldset(function (Fieldset $fieldset) {
                         
});
```

The second argument is the anonymous function. The controls that will belong to the fieldset are defined in this function. The form may consist of any number of fieldsets. Here is an example:

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

#### Fieldset Legend  

The legend, visible above the fieldset in a view, defines the name of the controls' group:

```php
$fieldset->legend('Fieldset legend 1');
```

#### Fieldset Layout  

The layout determines a dedicated view of the fieldset:

```php
$fieldset->layout('antares/foo::admin.partials._fieldset');
```

Therefore, the implementation above will result in the display of the following form:

![AT_FORMB02.PNG](../img/docs/services/form_builder/AT_FORMB02.PNG)
  
## Controls  

The controls are the fields of a form (e.g. the *textarea* field). All the controls are created and attached to the fieldset by means of the `control` method. The `control` method has two attributes:

#### Structure  

```php
$fieldset->control('select', 'name');
```
The first one is the type. The second one is the name. Therefore, the code above will produce:

```html
<select name="name"></select>
```

#### Attributes  

The attributes of a control are defined by means of the `attributes` method:

```php
$fieldset->control('select', 'name')->attributes(['class' => 'foo-select']);
```
Which, in turn, will create:

```html
<select name="name" class="foo-select"></select>
```

#### Value
  
The `value` method is used to give value to the control, i.e. fill the `value` attribute in the html. An example:

```php
$fieldset->control('input:text', 'text_field')->value('test');  
```

The html effect:
```html
<input type="text" name="text_field" value="text" />
```

#### Label  
The `label` method is used to determine the name of the label that belongs to the field's structure:
```php
$fieldset->control('select', 'select')->options([0 => 'Option 1', 1 => 'Option 2'])->attributes(['class' => 'foo-select'])->label('Foo select'); 
```

It will create the segment of the code based on the control's view defined by default:

```html
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

#### Wrapper  

The `wrapper` method is used to wrap the control's structure in the additional html tag (div). An example: 

```php
$fieldset->control('select', 'select')
->options([0 => 'Option 1', 1 => 'Option 2'])
->attributes(['class' => 'foo-select'])
->label('Foo select')
->wrapper(['class' => 'w100']);
```

It will perform the wrapping as shown below:

```html
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

### Types Of Controls  

#### Select  

Parameters:

Options - contains the list of values assigned to a control. It may contain an array as in the example below:

```php
$fieldset->control('select', 'select')->options(['option 1','option 2'])
```
It may contain the anonymous function responsible for setting the value (e.g. downloading the value from the base):

```php
$fieldset->control('select', 'select')
       ->options(function() {
             return [0 => 'Option 1', 1 => 'Option 2'];
        })
       ->label('Foo Select')
       ->wrapper(['class' => 'w200']);                                    
```

The effect is shown below:

![AT_FORMB03.PNG](../img/docs/services/form_builder/AT_FORMB03.PNG)
  
#### Textfield  

Textfield of the `input:text` type:

```php
$fieldset->control('input:text', 'foo_text')->label('Foo text')->attributes(['class' => 'foo-text'])->wrapper(['class' => 'w200']);
```
The effect:

![AT_FORMB04.PNG](../img/docs/services/form_builder/AT_FORMB04.PNG)
  
#### Textarea  

Textfield of the textarea type:

```php
$fieldset->control('textarea', 'foo_textarea')
       ->label('Foo textarea')
       ->attributes(['class' => 'foo-text', 'rows' => 3, 'cols' => 10])
       ->wrapper(['class' => 'w900']);
```

The effect:

![AT_FORMB05.PNG](../img/docs/services/form_builder/AT_FORMB05.PNG)
  
#### Checkbox  

A control of the checkbox type, `input:checkbox:`:

```php
$fieldset->control('checkbox', 'foo_checkbox')
       ->label('Foo checkbox')
       ->attributes(['class' => 'foo-checkbox'])
       ->value(1);                                
```

The effect:

![AT_FORMB06.PNG](../img/docs/services/form_builder/AT_FORMB06.PNG)

Optionally, it is possible to select the control:

```php
$fieldset->control('checkbox', 'foo_checkbox')
       ->label('Foo checkbox')
       ->attributes(['class' => 'foo-checkbox'])
       ->value(1)
       ->checked();                                
```

Multiple checkboxes are typical for this type of fields:

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

![AT_FORMB07.PNG](../img/docs/services/form_builder/AT_FORMB07.PNG)
  
#### Radio  

Fields of the radio type, `input:radio:`:

```php
$fieldset->control('checkbox', 'foo_checkbox')
       ->label('Foo checkbox')
       ->value(1)
       ->attributes(['class' => 'foo-checkbox']);                                
```

The effect:

![AT_FORMB08.PNG](../img/docs/services/form_builder/AT_FORMB08.PNG)

Selection is done similarly as in the case of checkbox:

```php
$fieldset->control('checkbox', 'foo_checkbox')
         ->label('Foo checkbox')
         ->attributes(['class' => 'foo-checkbox'])
         ->value(1)
         ->checked();                                
```

The multi variant:

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

![AT_FORMB09.PNG](../img/docs/services/form_builder/AT_FORMB09.PNG)
  
The specific type of a radio control is a form that contains buttons instead of options. The definition of this type of a control is described below:

```php
$fieldset->control('radio_btns', 'name')
       ->label('Radio Buttons')
       ->options(['0' => 'Element 1', '1' => 'Element 2', '2' => 'Element 3', '3' => 'Element 4'])
       ->value('1');         
```

The result will be the following:

![AT_FORMB10.PNG](../img/docs/services/form_builder/AT_FORMB10.PNG)
  
#### Tabular Inputs  

It is possible to group the controls based on the control's 'name' attribute. Here is an example:

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

![AT_FORMB11.PNG](../img/docs/services/form_builder/AT_FORMB11.PNG)
  
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

#### Dropzone  

Dropzone is a field used to add files. It uses the well-known javascript library named [dropzone](http://www.dropzonejs.com). The use:

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

Attributes are the reflection of the parameters described in the [dropzone documentation](http://www.dropzonejs.com/#configuration). Furthermore, the 'container' attribute determines ID diva used by the dropzone. It is important due to the possibility of having many dropzone instances on a single website. By default, the control's structure uses the file of a view from the location: antares/foundation::widgets.forms.dropzone. If necessary, another appearance of dropzone container can be defined by adding the 'view' attribute. In addition to this, it is possible to determine the behavior in case the file's upload ends with success.

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

The implementation above provides the following result:

![AT_FORMB12.PNG](../img/docs/services/form_builder/AT_FORMB12.PNG)
  
After the upload:

![AT_FORMB13.PNG](../img/docs/services/form_builder/AT_FORMB13.PNG)
  
#### Remote Select  

Remote Select is used to build the controls of the select type with the independently obtained values (ajax). An example of implementation:

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

The `fieldname` attribute determines the name of the search field. If it is not specifed, the name parameter is used by default. In the example above, it will be `select_name` . The remaining parameters of use are in accordance with the parameters used by the '**select2**' javascript library. The description of parameters can be found [here](https://select2.github.io/examples.html#data-ajax). The effect of the code shown in the last example:

![AT_FORMB14.PNG](../img/docs/services/form_builder/AT_FORMB14.PNG)
  
#### Ckeditor  

Ckeditor is a complex editor of the '**wysiwyg**' type. Use the code below:

```php
$fieldset->control('ckeditor', 'content')
         ->label('Foo content')
         ->attributes(['id' => 'foo-content']);        
```

To generate the following textfield:

![AT_FORMB15.PNG](../img/docs/services/form_builder/AT_FORMB15.PNG)
  
The parameters of this control are identical with parameters of the textarea field.

#### Customfields  

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

Will create:

![AT_FORMB16.PNG](../img/docs/services/form_builder/AT_FORMB16.PNG)
  
##Form Layouts  

Forms may use views in order to define a dedicated view. Currently, two types of views operated by forms are available:

* vertical
* horizontal

Vertical view is a default one.

The difference between the vertical view and the horizontal one lies in the layout of the block's structure. The block usually consists of a label field, a control, and additional fields in the form of a container with errors and fields of the `inline - help` type. An example of such a structure may be textfield's block `input:text:`:

```html
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

In order to set the appropriate outline of a view, you need to transfer the short name of the view by means of the `layout` method to the form builder's object.
For the horizontal view:

```php
$form->layout('horizontal');
```

For the vertical view:

```php
$form->layout('vertical');
```

Your own form's layout, in turn, is passing a path to the view's file:

```php
$form->layout('antares/foo::partials.form.my_foo_form_layout');
```

Fields' layout for the horizontal view is the following, an example:

![AT_FORMB17.PNG](../img/docs/services/form_builder/AT_FORMB17.PNG)
  
The vertical view:

![AT_FORMB18.PNG](../img/docs/services/form_builder/AT_FORMB18.PNG)
  
##Validation  

Information concerning validation can be found [here](validation.md).

## An alternative to the Controls - Control Types

Instead of `control()` method, you can use `addType()`. This method has one parameter: object which extends the class `Antares\Form\Controls\AbstractType`.

#### Structure

```php
$fieldset->addType(new TextType('text_input'));
```

The code above will create:

```html
<input type='text' name='text_input'></select>
```

#### Attributes

Control Type's attributes can be set using method `setAttributes()` or `setAttribute()`.

Both codes:
```php
$control = (new TextType('text_input'))->setAttributes(['class' => 'some-class']);
```
```php
$control = (new TextType('text_input'))->setAttribute('class', 'some-class');
```
Will provide the same result:

```html
<input type='text' name='text_input' class='some-class'/>
```

You can also use the method `addAttribute()` to add a new value to the exisitng attribute, especially useful for the `class` attribute:

```php
$control = new TextType('text_input');
$control->addAttribute('class', 'class1');
$control->addAttribute('class', 'class2');
```

It will generate:
```html
<input type='text' name='text_input' class='class1 class2'/>
```

Some of the Control Types have dedicated methods for most used attributes, for example `setRows` for the textarea input type, `setMinValue()` and `setMaxValue()` for the number input or `setMultiple()` for the select type.

#### Label

Each Control Type has its own label, even if it is not set - it will be generated automatically based on the Control Type name.

Using the `setLabel()` method you can simply pass the string or object that extends `Antares\Form\Labels\AbstractLabel` class.
In the second case you can add attibutes for a label, e.g. `class` or `id`.

Passing only a string to the `setLabel()` method:
```php
$fieldset->addType((new RangeType('range'))
    ->setLabel('Range slider')
);
```
In this case the default Label class is used: `Antares\Form\Labels\Label`.

As explained, you can pass the Label object instead:
```php
$fieldset->addType((new RangeType('range'))
    ->setLabel((new Label('Range slider'))
        ->setAttribute('class', 'label-class')
));
```

#### Decorators
Each Control Type has its own Decorator responsible for rendering the Control Type.
Decorators have been designed to the rendering of each Control Type separately.

You can use the method `setDecorator()` to set a decorator. This method has one parameter: string with the decorator class namespace or just the decorator's object itself.

By default, each Control Type uses `Antares\Form\Decorators\HorizontalDecorator`.

Methods `setLabelWrapper()` and `setInputWrapper()` allow you to wrap the structure of a control and label structure in the additional html tag.  

### Types Of Controls  

#### ALTDateType / DateType

Control with Date Picker:

```php
$fieldset->addType(new ALTDateType('date');
```

#### ALTDatetimeType / DatetimeType

Control with Date-Time Picker:

```php
$fieldset->addType(new ALTDatetimeType('date');
```

#### ALTTimeType / TimeType

Control with Time Picker:

```php
$fieldset->addType(new ALTTimeType('date');
```

#### CheckboxType / MulticheckboxType

A Control Type for the checkbox input.

```php
$fieldset->addType((new CheckboxType('checkbox')
    ->setCheckedValue(10)
    ->setUncheckedValue(0)
    ->setUseHiddenElement(true)
);
```

You can define checkbox's checked value (`setCheckedValue()`) and unchecked (`setUncheckedValue()`).
Method `setUseHiddenElement()` has been created to allow you to define the value that will appear in the request when the form is sent and checkbox is not checked (this will be the value set by the `setUncheckedValue()` method, by default it is 0).

If you want create Multicheckbox, use the `MulticheckboxType`. For this Control Type you can define the array of options:
```php
$fieldset->addType((new MultiCheckboxType('multicheckbox'))
    ->setValueOptions([
        1 => 'One',
        2 => 'Two',
        5 => 'Five',
    ])
);
```

The effect is shown below:
![AT_FORMB19.PNG](../img/docs/services/form_builder/AT_FORMB19.PNG)

#### CKEditorType

CKEditor is a complex editor of the '**WYSIWYG**' type. Use the code below:

```php
$fieldset->addType(new CKEditorType('richtext');
```

#### CountryType

Use this control to render `select` input with all countries defined in the system.

```php
$fieldset->addType((new CountryType('country'))
    ->setLabel('Select Country')
);
```

The effect is shown below:
![AT_FORMB20.PNG](../img/docs/services/form_builder/AT_FORMB20.PNG)

#### DataRangeType

Control with Date Picker allows you to pick the period of time.

```php
$fieldset->addType((new DataRangeType('data_range'))
    ->setLabel('Choose Dates')
);
```

#### DropzoneType

Code below will render the dropzone field where you can drag & drop files and upload them.

```php
$fieldset->addType((new DropzoneType('files'))
    ->setLabel('Upload Files')
);
```

The effect is shown below:
![AT_FORMB21.PNG](../img/docs/services/form_builder/AT_FORMB21.PNG)

#### EmailType

A Control Type for the HTML5 `email` input.

```php
$fieldset->addType((new EmailType('email'))
    ->setLabel('Email Address')
);
```

#### FileType

A Control Type for the `file` input.

```php
$fieldset->addType((new FileType('file'))
    ->setLabel('Upload File')
);
```

#### HiddenType

A Control Type for the `hidden` input.

```php
$fieldset->addType(new HiddenType('id');
```
Please note that this control uses `Antares\Form\Decorators\HiddenDecorator` instead of default `HorizontalDecorator` to avoid rendering the Label.

#### LanguageType

The code below will render the `select` input with languages available in the system.

```php
$fieldset->addType((new LanguageType('language'))
    ->setLabel('Choose language')
);
```

#### NumberType

A Control Type for the HTML5 `number` input.

```php
$fieldset->addType((new NumberType('number'))
    ->setLabel('Some value')
    ->setMinValue(1)
    ->setMaxValue(10)
    ->setStep(1)
);
```
There are `setMinValue()`, `setMaxValue()` and `setStep()` dedicated methods available for this control. Alternatively, you can use the `setAttributes()` method to set this attribute.

#### PasswordType

A Control Type for the `password` input.

```php
$fieldset->addType((new PasswordType('password'))
    ->setLabel('Type your password')
);
```

#### RadioType

A Control Type for the `radio` input.

```php
$fieldset->addType((new RadioType('radio'))
    ->setValueOptions([
        1 => 'One',
        2 => 'Two',
        5 => 'Five',
    ])
);
```

Similarly to the `MultiCheckboxType` you can use `setValueOptions` method to set possible values.
If you want to check some value by default use the `setValue()` method.

The effect is shown below:
![AT_FORMB22.PNG](../img/docs/services/form_builder/AT_FORMB22.PNG)

#### RangeType

A Control Type for the HTML5 `range` input.

```php
$fieldset->addType((new RangeType('range'))
    ->setLabel('Select range')
);
```

#### SearchType

A Control Type for the HTML5 `search` input.

```php
$fieldset->addType((new SearchType('search_phrase'))
    ->setLabel('Type antything to search...')
);
```

#### SelectType

A Control Type for the `select` input.

```php
$fieldset->addType((new SelectType('select'))
    ->setValueOptions([
        1 => 'One',
        2 => 'Two',
        5 => 'Five',
    ])
    ->useSelect2(true)
    ->setSearch(true)
    ->setMultiple(false)
    ->setLabel('Select')
    ->setEmptyValue('Choose some option')
    ->setValue(5)
);
```

This Control Type has a few useful methods:
* Method `useSelect2()` turns on/off select2 for the `select`.
* Method `setSearch()` truns on/off search feature in select2.
* Method `setEmptyValue()` allows you to define an empty value (the option without value). This will be a default value of the select if there is no other selected option.
* Method `setMultiple()` allows the user to choose more than one option. Please note that there is no need to add `[]` in the control name.

Similarly to the `MultiCheckboxType` you can use `setValueOptions` method to set possible values.

The effect is shown below:
![AT_FORMB23.PNG](../img/docs/services/form_builder/AT_FORMB23.PNG)

In case you want use `OptGroups` in your select:

![AT_FORMB24.PNG](../img/docs/services/form_builder/AT_FORMB24.PNG)

You should pass to the `setValueOptions()` array that looks like this:

```php
[
    1 => 'One',
    2 => 'Two',
    5 => 'Five',
    'Hundreds' => [
        100 => 'One hundred',
        200 => 'Two houndreds',
        500 => 'Five houndreds'
    ],
]
```

#### TextareaType

A Control Type for the `textarea` input.

```php
$fieldset->addType((new TextareaType('textarea'))
    ->setLabel('Description')
    ->setRows(10)
);
```

You can use `setRows()` method to set the number of rows.

#### TextType

A Control Type for the `text` input.

```php
$fieldset->addType((new TextType('text_input'))
    ->setLabel('Title')
);
```

#### TimezoneType

The code below will render the `select` input with all timezone identifiers.

```php
$fieldset->addType((new TimezoneType('timezone'))
    ->useSelect2(true)
    ->setSearch(true)
    ->setLabel('Set your timezone')
);
```

In this example select2 with the search feature is used to show more user-friendly results.

#### UrlType

A Control Type for the HTML5 `url` input.

```php
$fieldset->addType((new UrlType('url'))
    ->setLabel('URL')
);
```

#### Buttons

There are three types of buttons that you can add to the form:
* button
* submit
* reset

The code below shows how to do that:

```php
$fieldset->addType((new ButtonType('submit'))
    ->setValue('I will submit this form')
    ->setLabel('Simply click me')
    ->addClass('btn btn--md btn--primary')
    ->setButtonType(ButtonType::BUTTON_SUBMIT)
);
```

The method `setButtonType()` allows you to specify the type of a button you want to get. As explained before, you can use: `button`, `submit` or `reset` button. Pass one of these values to the method simply as string or use the `ButtonType` class constants.

The effect is shown below:
![AT_FORMB25.PNG](../img/docs/services/form_builder/AT_FORMB25.PNG)
