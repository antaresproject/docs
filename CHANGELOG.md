# Change Log

This project follows [Semantic Versioning](CONTRIBUTING.md).

## Change Log

- [0.9.2](CHANGELOG.md) - 2017-03-22
- [0.9.0](CHANGELOG.md) - 2017-02-02

## Version 0.9 {#v0-9}

### v0.9.2 {#v0-9-2}

##### Add:
* Activate/deactivate user
* Notification logs
* Staff management frontend implementation
* Filters/sorting in datatables saving (browser cache) and remembered after refreshing the page
* Translations improvements - frontend implementation
* 50% code coverage of unit tests for core  

##### Updates:

* Updates Antares pre configuration and installation guides
* Recent activity widget: 
    + There shouldn’t be any scrolling available
    + There shouldn’t be grey linRecent activity widget looks bad with the empty data e below filter/search
    + Actually, there shouldn’t be filter/search available
    + The empty data message should be centered properly
* Deactivate of user shouldn’t ask for confirmation - it’s non-invasive operation so by default I suggest to remove it as it’s pretty annoying
* SUGGESTION: Alert messages should have OK/Confirm (positive action) on the LEFT side. I may be wrong, but I think it’s more intuitive
* Mass selection on custom branding has too intense color - with the default blue color it looks much better
* Send notification widget UI should be simplified

* User Edit Breadcrumbs - Editing user should have “Edit: username” breadcrumb label and shouldn’t have any actions in the dropdown

* Mail Configuration UI improvements
  + Fields should have tips 
    + Typical values (if possible) - especially for port and sendmail command
    + Example values (if possible)
  + SMTP -> Encryption - cannot this field be a dropdown?
  + Test connection button
    + Should be in the middle between submit and cancel
    + Should be white in the middle with coloured border and text
    + Should have branded colors
* Notifications configuration should be moved to the System configuration page as a new sub-section. No need to create a new configuration page for one field
    + Additionally, the tip should be next to the field, not below the field

* Set default value of  “Automatically ban IP on X failed login attempts” to 5
* Additionally, next to the section label (“Ban Management Configuration”) should be a link “Go to Ban Management” that redirects to the Ban Management page
* IP Whitelist field should have explanation how to put multiple ips (separated by comma?) and example values
* IP Whitelist/Bans should support wildcards (with * character. E.g. 192.168.*)
* Branding 
    + In the main menu, it should be named “Branding”, not “Brand Settings”
    + Same for the breadcrumbs (right now it’s “Brand Edit Antares”)
    + Subpages (like email branding) should have Branding > Section Name breadcrumbs
    + Composition field (in area settings) is not having branding colors
    + When on the area settings, the pointer in the menu is a square
* Creating New Custom Field
    + Creating new Fieldset for a custom field is not possible - providing a text to the field doesn’t take the effect
    + Field type should be in the “Field Options” section
    + Naming:
        + Select field validators -> Validation
        + Regarding the previous note - if the “value” goes for the previous field (like the second “Value” goes for “Maximum” property):
            + Invisible if the checkbox is not selected
            + Have better label!! Or, it may just not have a label but appear next to the checkbox
    + Submit and cancel buttons should be just like on the other sections
* Staff breadcrumbs - should be Staff -> Groups and Staff -> Users    
* Logs naming
  + Api Logs -> API Log
  + Automation Logs -> Automation Log
  + Notification Logs -> Notification Log
* Activity logs
  + Operation field on the list shouldn’t be bold
* ALL the system components (core category) should have blue color in the “type” column and everywhere in the system. Otherwise we will quickly run out of the colors
* API Log - should provide main filter only for the components that offer API (not all like now)
* Creating new backup improvements
  + Creating new backup should add a backup to the list, with status “Pending” if there is a task created for the automation,
  + It should be also possible to remove a pending task which will remove the task from the queue,
  + If the backup is already in progress, it should be visible as “in progress” status without an option to remove/delete it,
  + Once the backup is complete, the status should be “completed”
        
    
##### Fixes:
* 40x i 50x errors have bad placement of the default logo
* Widgets: Changes to the widgets order are NOT saved. Refreshing the page gets back the initial order of the widgets
* Enlarge of the widget doesn’t work
* Automation -> Category filter should be “Category: ….” - it is missing colon
* Automation page marks Logs link as active (same for Notification Templates)
* Custom fields tabs should be the same like for the configuration page (it lacks pointer and additional background)
* Staff -> Users has wrong main menu visible
  + Same for Editing/adding staff group
  + Same for error log
* Created At row seems to not sort properly (it’s the default sorting)
* No breadcrumbs in API Log
* Creating sandbox throws Twig Error Runtime


### v0.9.0 {#v0-9-0}

FIRST ANTARES RELEASE

---