#Translator  

[TOC]

##Configuration  

The platform supports application's multilingualism through language files determined in component's or module's space. Determining the location of a language file usually happens in module's service provider 'boot' method by calling:

```php
$this->addLanguageComponent('antares/foo', 'antares/foo', "{$path}/lang");
```

where the $path variable determines the location of language files' catalogue. You have to remember about retaining the correct structure as below:

  ![AT_TRANS01.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/services/translator/AT_TRANS01.PNG)
  
It is also possible to use a global catalogue located in:

```console
resources/lang
```

or user's per level:

```console
resources/lang/administrators
```

Remember that such solution will cause that translations will no longer be available in the 'translations' component and may be overwritten by publication.

##Usage  

Referring to the translation contained in the configuration file is possible with the use of:

```html
{{ trans('antares/foo::messages.foo_test') }}
```

where 'antares/foo' is the name of the module, 'messages' is the name of the file, whereas 'foo_test' is the translated phrase. More information about how the translator works can be found [here](https://laravel.com/docs/5.2/localization).
