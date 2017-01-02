#Control  

[TOC]

##Groups  

Control is a component for users' resources rights service. The panel is available at the address below:

```php
/{area}/control/roles/index

```

e.g. /administrators/control/roles/index or when you choose the *Staff* position in the *Configuration* menu. It consists of the *Groups* and *Users* sections. *Groups* - which is groups of users (in other words - role). To find more about groups go to the [ACL](https://inbssoftware.atlassian.net/wiki/pages/viewpage.action?pageId=21856278) section. The list of available groups is the following:

  ![AT_CTRL01.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/core_modules/control/AT_CTRL01.PNG)
  
In order to edit a group, click twice on a row and choose the *Edit* position in the context menu. Edition of a group consists of the form:

  ![AT_CTRL02.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/core_modules/control/AT_CTRL02.PNG)
  
Description of fields:

* Group name - name of a group
* Group description - description
* Group level - area (level) ascribed to a group
* Api - determining access through api

The remaining part of the form is determining group's availability for particular system sections divided into the components:

  ![AT_CTRL03.PNG](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/core_modules/control/AT_CTRL03.PNG)
  
Checking/ unchecking the checkboxes is equivalent to activating/ deactivating the access to resource within the component.

##Users  

The 'users' section which is available at the level of left menu publishes a list containing administrative users. Administrative user's edition is identical with *My Account* form. At the level of the list it is possible to add a new user similarly as in the case of main menu 'Users' section. The difference is that there is a possibility of choosing the group where the user will belong.
