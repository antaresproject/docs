
#Updater  

[TOC]

Updater is a component which provides information about present system's state, which facilitates application's update and reports' generation concerning system's state. The following sections may be distinguished within the system:
1. System information
2. Updates
3. Backups
4. Sandboxes

All these sections are available in the main menu at the 'System' heading .

The system's main configuration file can be found in the location:

```php
src\components\updater\resources\config\config.php

```

##System Information  

The section is available at the address */{area}/logger/information*, e.g. */administrators/logger/information*:

  ![AT_UPDAT01.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/core_modules/updater/AT_UPDAT01.PNG)
  
It facilitates activation of the tool for analyzing system's state (system analyzer):

  ![AT_UPDAT02.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/core_modules/updater/AT_UPDAT02.PNG)
  
Pressing the *Run system analyzer* button starts the verifying tool. The results of the analysis are divided into the following tabs:
1. Server environment - contains information about www server settings, including PHP version and configuration of the php.ini file.
2. System - contains information about the equipment used by the server, especially processors, memory, hard drive, files' systems.
3. System and modules - it is a collective register of files which comprise the system specifying individual component's and module's catalogues.
4. System version - current system version.
5. Database configuration - database configuration with the list of tables and views specifying information about the number of records and the amount of space taken up by particular tables.
6. Logs summary - it is a report concerning system logs with division into components in particular (activity logs).
7. Components and modules - it is a register of modules and components which are currently available in the system.
8. System changes - list of changes in the system based on the control sums.

Each register contains an icon with a number at the tab informing about the number of possible problems related to chance of unstable system's operation. A register of problems containing short explanations is included on the website at the right in a table named *Possible Issues*. Once a report is generated you can download it entirely as a pdf file by clicking on the *Download PDF* button in the upper beam.

##Updates  

The section is available at the address: */{area}/logger/update, e.g. /administrators/logger/update*. It contains the boxes:

  ![AT_UPDAT03.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/core_modules/updater/AT_UPDAT03.PNG)
  
The first box informs about current system version. The second one contains information about available modules' and components' updates. The third in turn facilitates executing the update of the system itself. The last box has detailed information about the update. The view above is only a prototype and in future it will be changed. Click the buttons *Update/Update all* and *Install* in order to update and upgrade to the next version.
The configuration file concerning updating the system:

```php
'service'     => [
    'adapters' => [
        'default' => [
            'model' => 'Antares\Updater\Adapter\JsonAdapter',
            'path'  => 'http://' . (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : url()->to('')) . '/service/version.php',
        ]
    ]
]

```

The *service.adapters.default* key defines the default model which is responsible for parsing the information about the new version coming from outer location. The *path* key determines this location and it is a local path for the system tests' needs. An example of response from the service determined by the *path* key:

```php
{ 
   "version":"1.0.2",
   "description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type    specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
   "path":"http://billevo.local/service/update-1.0.2.zip",
   "changelog":"<div class="list-group">                               
    <a href="#" class="list-group-item">                                 
        <h4 class="list-group-item-heading">
            List group item heading
        </h4>                                 
        <p class="list-group-item-text">
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
        </p>                               
    </a>                               
    <a href="#" class="list-group-item">                                 
        <h4 class="list-group-item-heading">
            List group item heading
        </h4>                                 
        <p class="list-group-item-text">
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
        </p>                               
    </a>                               
    <a href="#" class="list-group-item">                                 
        <h4 class="list-group-item-heading">
            List group item heading
        </h4>                                 
        <p class="list-group-item-text">
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
        </p>                               
    </a>                             
</div>",
   "modules":"http://billevo.local/service/modules.php"
}

```

Description of keys:
1. version - information about the currently available version
2. description - description of a version
3. path - this is the path where the package updating the system is located and will be downloaded
4. changelog - description of changes in new version
5. modules - the url address determining the source of information about updating the modules

In case of updating the modules (the url is available at the *modules* key) the response will be:

```php
[ 
   { 
      "name":"brands",
      "full_name":"Brands Manager",
      "description":"Billevo Brands Manager",
      "author":"\u0141ukasz Cirut",
      "url":"http://billevo.local/service/version.php",
      "version":"1.0.1",
      "provides":[ 
         "Antares\\Brands\\BrandsServiceProvider",
         "Antares\\Facile\\FacileServiceProvider"
      ],
      "update":"http://billevo.local/service/brands.zip"
   },
   { 
      "name":"tester",
      "full_name":"Module Configuration Tester",
      "description":"BillEvo Module Configuration Tester Component verifies and validates the configuration of modules",
      "author":"\u0141ukasz Cirut",
      "url":"https://billevo.local/docs/tester",
      "version":"1.0.2",
      "provides":[ 
         "Antares\\Tester\\TesterServiceProvider"
      ],
      "update":"http://billevo.local/service/tester.zip"
   }
]

```

Description of keys (based on brands):
1. name - name of the module/ component which will be updated
2. full_name - full name of the module
3. description - description of changes
4. author - author of the update
5. url - url address to, e.g. documentation
6. version - update version
7. provides - a table containing service providers' classes map
8. update - url address to the package with update

##Backups  

The section is available at the address: */{area}/logger/backups*, e.g. */administrators/logger/backups*. Backups' list:

  ![AT_UPDAT04.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/core_modules/updater/AT_UPDAT04.PNG)
  
In order to back up you have to proceed to the breadcrumb menu and choose the 'Create backup' option. Then the task of creating database and application's backup will be added to the execution task queue. Backup's default location:

```php
\storage\app\backups

```

The saved files are in the zip format. Each backup created in this manner may be restored by means of choosing the *Restore* option which is available in the backup list's line context menu or by clicking twice on the line.

##Sandboxes  

Sandbox is a (separate) application's instance where the application's tests may be conducted. All notifications (e-mail or sms notifications) are not sent from the system. The 'sandboxes' section is available at the url address: */{area}/logger/sandboxes*, e.g. */administrators/logger/sandboxes*:

  ![AT_UPDAT05.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/core_modules/updater/AT_UPDAT05.PNG)
  
Creating a new instance is possible by means of choosing the position in breadcrumb at the website containing the list of sandboxes. The process of creating a new instance may be a long-lasting one because it copies database with a new name and all files belonging to the application. Actions available at given lines are *Launch* and *Delete*. *Launch* activates the sandbox instance:

  ![AT_UPDAT06.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/core_modules/updater/AT_UPDAT06.PNG)
  
The application operating in the sandbox mode may be established as a production instance. The purpose of creating this functionality is in particular to test the system after updating. Deleting the instance causes removing all files constituting through instance (included in the */builds* catalogue, e.g. /builds/build_1_0_0) and databases.
