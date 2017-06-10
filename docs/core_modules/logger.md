# Logger  

[TOC]


## Introduction

Logger is a component responsible for gathering the logs coming from different parts of the system.
It provides activity logger for monitoring users and processes used by the application. It logs the activity priority level and class, the remote user identifier (if logged), its computer details and many more. 
In addition, there is the application's error logger and request logger to collect data about the state of the system.      

## Activity Logs  

Activity logs are the logs about the activities of the system's users. Depending on the role (group) of the logged in user, not every log may be presented. For instance, a logged in user who belongs to the *resellers* group will not be able to see the activity logs of users who are assigned to the *administrators* group. Nevertheless, the users who belong to the *administrators* group will have access to the *resellers'* logs because the former group is the superior one.

  ![AT_LGGR01.PNG](../img/docs/core_modules/logger/AT_LGGR01.PNG)
  
The details of each log are available once you click the right mouse button and choose the 'Show details' position under the table's row. It is also possible to go directly into details by clicking twice on a row:

  ![AT_LGGR02.PNG](../img/docs/core_modules/logger/AT_LGGR02.PNG)
  
The '*Action Properties*' section is responsible for presenting the information connected with the taken action. The '*Custom Fields and Messages*' section contains information about dedicated fields assigned to the model (models) - the one that the action is taken for. '*Change history*' contains the history of the model's updates.

Each of the rows presented on the log list can be deleted. It is also possible to download the logs in the form of the CSV file:

  ![AT_LGGR03.PNG](../img/docs/core_modules/logger/AT_LGGR03.PNG)
  
You can also delete the logs for a given date range:

  ![AT_LGGR04.PNG](../img/docs/core_modules/logger/AT_LGGR04.PNG)
  
### Usage  

In order to connect activity log with the operation, you have to indicate the Trait occurrence (`Antares\Logger\Traits\LogRecorder`) in the Eloquent model:

```php
<?php
 
namespace Antares\Foo\Model;
 
use Antares\Logger\Traits\LogRecorder;
use Antares\Model\Eloquent;
 
class FooRow extends Eloquent
{
 
    use LogRecorder;
...

```

Trait fills the log table during the actions executed on base models (in this case it is FooRow). Recognized actions:

* insert
* update
* delete


  ![AT_LGGR05.PNG](../img/docs/core_modules/logger/AT_LGGR05.PNG)
  
Additional configuration of activity logs includes the following parameters under the Eloquent model:

```php
//Disables the log record in this model.
protected $auditEnabled   = true;

// Disables the log record after 500 records.
protected $historyLimit   = 500;

// Fields you do NOT want to register.
protected $dontKeepLogOf  = ['created_at', 'updated_at', 'deleted_at'];

// Specifies what actions you want to audit.
protected $auditableTypes = ['created', 'saved', 'deleted'];

```

* auditEnabled - determines whether a log should be activated or not for a given model (default value: true)
* historyLimit - the history data limit, currently this value is not supported
* dontKeepLogOf - determines which columns should be ignored when saving the data
* auditableTypes - the types of events basing on which the saving action will be taken


### Translations  

By default, the content of the executed action is subject to attempt of translation based on the language file found in the location:

```bash
src\components\logger\resources\lang\en\operations.php
```

After adding the translations:

```php
'FOOROW_CREATED'=> 'Foo item :owner_id has been created by :user',
'FOOROW_UPDATED'=> 'Foo item :owner_id has been updated by :user',
'FOOROW_DELETED'=> 'Foo item :owner_id has been deleted by :user',
```

![AT_LGGR06.PNG](../img/docs/core_modules/logger/AT_LGGR06.PNG)
  
As you can notice, translations may use variables. Below, the list of predefined variables placed in the translated content:

* :owner_id - entity occurrence in the form of the string. If entity table contains a column named 'name', the value of this column is taken as first. Columns' order arrangement: name, value, email, version, domain, message, hostname, company_name, ip_address, id.

* :user_id - object's entity of the currently logged in user that executes the given action (also projected on string basing on the *firstname* and *lastname* columns).

More inromation about the basis of the activity logs' functionality can be found [here](https://github.com/Regulus343/ActivityLog). The functionalities are also developed according to the system's guidelines.

## Request Logs  

Logs contain information about requests coming to the system and the types of these requests. The list can be found at the address /:area/logger/request (e.g. /administrators/logger/request). It is a register of files where the logs are saved (they are not saved in the database contrary to the activity logs).
![AT_LGGR07.PNG](../img/docs/core_modules/logger/AT_LGGR07.PNG)
  
Request logs have been implemented for security and safety purposes. Request logs are gathered automatically and saved in files grouped per day separately. The location of logs: */storage/logs*. Each line in the register is a mapping of physical file which is in the server. The details of a file are shown on the screen:
![AT_LGGR08.PNG](../img/docs/core_modules/logger/AT_LGGR08.PNG)
  
## Error Logs  

These are application's error logs in the form of files' register where the details of error occurrences are saved. They are divided into categories according to the type and they are added automatically during the application's operation:
![AT_LGGR09.PNG](../img/docs/core_modules/logger/AT_LGGR09.PNG)
  
The code used to save the error occurrence manually in a file:
```php
Log::warning('Unable to show user: '.$id);
```

or:
```php
try{
    //sample logic 
}catch(Exception $e){
    Log::error('Unable to show user: '.$id);
}
```

More information concerning the logs can be found [here](../services/logs.md).
Below you can find the details of a log (a file) available once the *View* position is chosen in the row's context menu or by clicking twice on the row:

![AT_LGGR10.PNG](../img/docs/core_modules/logger/AT_LGGR10.PNG)
  
Each log may be removed or downloaded.

##Automation Logs  

Logs which are closely related to the [automation](automation.md) component are called automation logs. They are a register of scripts' and processes' operation results:
![AT_LGGR11.PNG](../img/docs/core_modules/logger/AT_LGGR11.PNG)
  
