# Translations  

[TOC]

## Introduction
Translations is a component dedicated to the management of the Antares translation files. It does not replace the translation system, only the automated import / export of the PHP files to a database and makes them editable through a web interface. 
It allows to manage app languages as CRUD with the text comparsion feature. 

##Basis

The module is used to operate translations in the system. 
The module can be accessed by means of the url: `/{area}/translations/index/{area}/{lang}` (e.g. /admin/translations/index/administrators/en). The component enables the change of translations' content of particular system's phrases, depending on the added languages. The translation list is the following:

The upper menu consists of positions that enable:

  ![AT_TRANSS01.PNG](../img/docs/core_modules/translations/AT_TRANSS01.PNG)
  
* adding a new language
* import the csv file with translations
* export of the translation file to the file
* translations' publishing

Below you can find a division into areas (levels) connected with the groups of users which they belong to. This means that a translation concerning a single phrase may be different at the `administrators` level and the `users` level.

The table contains a register of particular phrases, the first column is the translated phrase, the second is a translation into a chosen language, the third is a field of the translation's edition. Worth mentioning is that translations take account of variables placed into phrase during the system's operation. The menu above the table consists of the field of the component's choice (on the left), the currently chosen language can be found on the right. Fields in the table's heading are used for searching (in the first column). The second column contains the select that enables comparing the content with other language, the second field is used for searching. 

In order to add a new language, choose the 'Add new language' option in the upper menu:

![AT_TRANSS02.PNG](../img/docs/core_modules/translations/AT_TRANSS02.PNG)
  
Description of the form's fields:

* Code - determines the language code (e.g. en, de)
* Name - the name of the language (e.g. Polish, Dutch)

## Languages  

Adding a language results in the synchronization of the former translations (adding) with the newly added language. Once it is added, the field of choice is updated:

![AT_TRANSS03.PNG](../img/docs/core_modules/translations/AT_TRANSS03.PNG)
  
## Export  

The export of translations takes place through choosing an option in the menu on the website with the list. Export concerns currently chosen language and level. An exemplary line which is export's result:

```php
Segment;Locale;Key;Translation
foundation;de;"email.forgot.request";"[:site] Reset your password11"
```

* Segment - it is a name of component that the phrase concerns. Note that phrases may be duplicated for different components.
* Locale - language code
* Key - the key as a phrase which will be translated
* Translation - the translated content

## Import  

Similarly to export, translation's import is available by means of choosing the position in menu on the website with the list. The import file must be the csv file and format must be compatible with the export file format.

## Publication  

Publication enables providing translated phrases to the application. As long as translations are not published, the system does not use them. Publication downloads translations from the database and saves them to files, depending on the component which they concern. The directory below is the saving location:

```php
\resources\lang\{area}\antares\
```

e.g. \resources\lang\administrators\antares

Full structure of access to the file with the translation is the following:

```php
\resources\lang\{area}\antares\{compoentn}\{lang}\{filename}
```

e.g. \resources\lang\administrators\antares\automation\de\messages.php

## Synchronization  

Synchronization of translations is responsible for correct recognition of translation files' paths in respective components and modules, and the register of changes in the database. Translations presented on the list are downloaded from the database from the `tbl_translations` table. Synchronization is perfromed automatically each time you enter the translations' list provided that the translations have not been published. Removal of the translation files from the directory `resources\lang\{area}\antares\` will result in the necessity of another publication.
