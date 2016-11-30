# Changelog

[TOC]
## Version 1.2.0 Stable
Oct 27th, 2016

New Features:

*    Additional IP Address field allowing to define extra IP addresses for a device 
*    Precise and highlighted position of a device on a rack with option to move to the rack quickly  
*    Traffic aggregation per server can now be also counted from the server port not only from the switch port - Ticket #523192

Improvements:

*    Unused files cleanup
*    Numerous UX improvements
*    Improved stability of the system
*    Search option has been improved in sections Inventory and Item Models
*    Standardized action buttons view in widgets
*    The process of detecting incorrect API requests has been improved
*    Traffic count is now more precise and accurate
*    Device and models lists have been redesigned and now have the 'select' form with autocomplete option

Bug Fixes:

*    The process of assigning a new part has been corrected - Ticket #435420
*    Floor is now correctly selected while being assigned to a rack
*    Performance Time field has been removed to avoid database overload

## Version 1.2.0 Beta
Sep 29th, 2016

New Features:

*    OS Installation Module Based On NOC-PS enables automatic or manual installation of required operating systems on your servers
*    Traffic Aggregation process allowing to combine traffic from multiple server ports connected to switch ports
*    API v2.0 with new methods and documentation
*    New servers provisioning flow:
*    New form with precise criteria of searching server
*    IP Address Management module integration
*    Usage Collector module integration
*    New meta tags for servers, used while ordering a matched server
*    Troubleshooting Tool solving application issues reported in the past

Improvements:

*    Rebuilt WHMCS integration allowing to order and manage servers from EasyDCIM inside your WHMCS
*    Logout confirmation dialog box
*    Access permissions to storage catalogs have been moved to a level higher
*    System logs are now stored in a newly created separate database, not in files
*    Licensing system has been improved to count devices and check license
*    New version of system documentation including information on all crucial sections in the system
*    Improved process of adding a new device model into the system form
*    Improved process of adding devices or items in bulks into the system
*    Improved SNMP and IPMI protocols with a test connection option
*    Check if configuration data are correct with a Send Test Mail option
*    Unused files cleanup
*    Major UX improvements

Bug Fixes:

*    Logs and notifications in device summary are now correctly displayed
*    Special characters in a password area are handled when a new user is created
*    Assignment tab for components item type works now correctly
*    Traffic graph is hidden when switch is not connected to server
*    Validation of the Item ID field has been corrected
*    Creating a few ACL groups with the same name is now possible
*    Turning off a notification or a warnings with 'x' button resulted in being incorrectly moved to dashboard
*    Need to refresh the page to get the dashboard back when turning off a notification is no longer required
*    End-users can now execute the Auto-Discovering process
*    Correct type of SCSI disk is created during Auto-Discovering process
*    Issue with traffic graphs displaying "ERROR: Attempting to reuse 'outoctets' " has been solved
*    Changing Inventory Status of servers, networks and power is now possible
*    Pressing the 'Click to set a value' button triggers appropriate action now
*    Issue with appearing 'Error when loading list' during assignment process in PDU Outlet has been solved
*    Metadata of servers and switches can be deleted successfully
*    Exception error appearing after typing in an ID in an invalid format when changing item unique ID has been solved
*    Issue with storage folder permissions chmod -R <777 - "failed to open stream: Permission denied" has been solved
*    Customer is now automatically moved to the next step when creating a new model
*    "404Not Found!" error that appeared when 'Fields' tab was pressed has been solved
*    Thumbnails in reports are now displayed correctly
*    No need to refresh the page to edit the Devices & Services page
*    Issue with resetting the disabled poller settings after refreshing the page has been solved
*    Adding purchase date into Additional Information section of Services & Devices is now possible
*    Log entries appear when actions on servers are performed
*    Order is correctly assigned without the need to reload the page
*    Password reminding emails are delivered without issues
*    Rack names and images are visible in the right places
*    Rack names and images are visible in the right places
*    When order is edited or transaction is about to be finished, correct actions are triggered
*    Device name is correctly displayed in notifications and warnings
*    'Remind Password' missing unassigned option in 'Switch Device' field has been added
*    Actions Logs now moves to a correct site
*    'Delivery Transaction Log: Permission denied' error message when adding new items has been solved
*    Fixed mechanism for counting devices by the system license
*    EasyDCIM is no longer blocked when 'Force to use' is selected and 'Two-Factor Authentication' use is disabled

## Version 1.1.2
Jun 20th, 2016

New Features:

*    New DNS Management Module components
*    Notifications informing about a port change

Improvements:

*    Item client field is assigned basing on its parent if any has been specified
*    Client fields are automatically filled out in the order form if the order is created for a specified user
*   After a successfully completed delivery operation a confirmation message is displayed
*    Numerous improvements in the module license verification cache

Bug Fixes:

*    Devices of blade type are automatically created when the application update command is used
*    Default polling submodules are now properly marked as active after the first installation
*   Issue with illegible device label when no device image was specified has been solved
*    Special characters validation while adding a new type field has been corrected
*    Design issues on location summary pop-up have been fixed
*    Problem with adding a new entry to the To-Do widget has been solved
*    Minor typo fixes

## Version 1.1.1 
May 19th, 2016

New Features:

*    Two-Factor Authentication Module
*    Widget responsible for the management of children devices inside of blade servers
*    Quick assignment and removal of children devices from blade devices
*    Easy removal of devices assigned to a client from the Devices tab inside a User Summary
*    New filters in Software section
*    Breadcrumbs in the Reports section

Improvements:

*    Redesigned and rewritten Monitors section
*    Button style convention has been standardized
*    Information on name and address added to the location pop-up
*    New system notifications for successful delivery actions
*    Redirection to the Item Summary page once data were edited successfully
*    Labels inside the Metadata section of template edit form have been changed
*    Adjusted button labels inside the Software section leading from Create Software to Create OS Group
*    A success confirmation message is displayed after removing any To-Do widget entry
*    Clear Module Log button is located in a new, visible position
*    Buttons in the Location section have unified colors
*    More precise placeholder of the Item Model dropdown on the delivery form

Bug Fixes:

*    Application might have crashed at some configurations when the SSH port was irrelevant - the port can be now manually specified
*    Some of panel actions of Usage Collector Widget in the client area were not performed well
*    Issues caused by missing validation of the Manager field, inside the Location creation form have been solved
*    Problem with CSS in model selector dropdown on the Delivery form has been solved
*    OS image in the Parent Device Selection dropdown is now scaled properly
*    Number of Items was not validated accurately on the Delivery form
*    Location name was not displayed properly on Location tooltip
*    QR code item image in Item Summary section is no longer missing
*    Breadcrumbs on the Admin Summary page are correct
*    Price and setup fee validation on the Product edit form has been fixed
*    Add Files button in Files widget is positioned properly
*    Corrected validation while trying to create a currency with an already existing code
*    Response shown to a user after removing a part from a device is now correct
*    Language typos corrected and missing language entries added in the Item Models section
*    Reports are now generated properly while using prefixed database tables
*    Reports widget in the location summary showed 'null' when there were no devices assigned to the location
*    Content header is now refreshed properly after a successful device discovery action
*    Incorrect title was displayed on modal when the product field was edited
*    Price filtering on the Software list has been fixed
*    Several language typos corrected

## Version 1.1.0
May 4th, 2016

New Features:

*    Support for the Two-Sided racks and ‘Half Width’ devices with advanced position validation
*    New Location Map View with a number of useful statistic data while hovering on specific location marker
*    Stats added inside the Location Summary page
*    Implemented queue processing engine for the time consuming tasks with a preconfigured beanstalk driver
*    New proxy IPMITool driver added to the IPMI Module, gives the possibility to use a remote device (via SSH) to perform the IPMI command on device, without the requirement to connect to a target device directly
*    Number of new notifications related to items, devices and other actions occurring inside the system and its environment
*    New Device Edit Form - divided into sections
*    New Single Item Edit Form
*    Monthly device traffic is now collected and stored inside the device metadata with switch port assigned to it
*    Hourly Cron Tasks Command added
*    Possibility to sort devices basing on their Uptime
*    Information about Available Storage inside the Device Metadata
*    Support for 1.5 version of IPMI protocol in the IPMI ModuleADD: System is now trying to find the connection between the devices using FDB Table (if available)
*    Quick Filters for the Device Graphs widget to let an administrator quickly see the data from the last day, week or month
*    New dedicated single graph page
*    Quick Links inside the Location summary section
*    Permission Auto Fixer
*    Console Command - automate the installation & configuration of the supervisor and the queue workers
*    New redesigned & easier to use Delivery Form
*    New Quick Discovery Form
*    Internal API Caller for the developers use
*    Manageable User Contacts with possibility to assign separate permissions for each contact
*    New Discovering submodules for Raritan & Dell Devices
*    User Custom Fields management page
*    Possibility to quickly assign an Item Type Field to a device
*    Devices specified Log Files
*    Simple ‘Configuration Verification’ widget in the Dashboard
*    Added possibility to retrieve plain text data directly from the ‘Generator’ module of the RRDTool component
*    Added methods inside the device model to retrieve the data set containing monthly bandwidth for the device
*    Reports may now register their own widgets, for example Report Widget presenting devices with the highest load is now part of the dashboard
*    Assign the environment specific variable using .env file
*    Disable polling process via the environment variable

Improvements:

*    Assets and their generation packages have been rewritten in every way giving up to 100% speed boost on the page load. Application is now less resources consuming
*    Poller Threads when finished are now closed automatically - it is no longer required to complete all the child processes
*    The file structure has been completely rewritten for better optimization and clearness of the application
*    IPAM Module has been rewritten and redesigned which made it smoother and more apparent
*    IPMI Module driver has been optimized which resulted in rapid execution of requests
*    Numerous fixes and improvements implemented inside the drivers for the Dell Drac IPMI boards
*    Usage collector module has been rewritten and optimized to be less resource and time consuming
*    Test Code Coverage Unit has been improved making the application more stable
*    Rewritten and optimized Thread Poller to be scalable and have the following options:
 *       Specify maximum number of concurrent threads
 *       Set a number of devices to process per single thread
 *       Select submodules to use for either device type or single device
 *       Automatically prevent itself from starting when the system load is too high
*    Filters are presented in a more user friendly way
*    Parts are by default assigned to the same location and rack as their parent devices
*    WHMCS Module is now compatible with the latest changes
*    Redesigned Reports Components - more reports coming soon!
*    Ping monitor is now configurable and has the ability to specify warning threshold
*    Changed the functionality & interface of the search bar at the top of the page
*    When Item Model cannot be assigned automatically, 'Generic' model is assigned
*    Notifications may now have entities assigned, which means that all of them can be linked with some data models like Item, Device, User etc.
*    Staff Board Widget has been rewritten
*    Application configuration files and base models are now decoded
*    New drivers for the ACL component have been implemented
*    Number of SQL Queries inside the application scope have been reduced
*    All Forms have been redesigned - Form Builder component has been projected to make the application forms more scalable
*    Client Area & API are now separated from the system components with their own providers
*    Composer dependencies are now preinstalled and the final package is unified
*    System asks for permission when a user tries to manually perform dangerous or suspicious actions
*    Multiple monitors of the same type but different configuration may be now assigned to a single device
*    SNMP System Component has been redesigned and it may be now expanded with custom drivers
*    GeoComplete plugin replaced with a lightweight auto-complete address based on OpenStreetMap Data
*    Changed views of the PHPInfo & Loaded Extensions sections
*    Inventory List has been modified to show a parent device inside the Location column
*    ‘Discovery Device’ and ‘Device Poller’ buttons inside the device summary section are now using queue handler to perform their tasks
*    Added possibility to dynamically register options for the item type specified fields with a dropdown type
*    Widgets Sorting Engine has been modified to store data about widgets’ positions globally
*    Device may be now automatically detected as service in case product & order relation has been specified
*    If the ‘Mountable’ property is not specified, Item is now automatically assigned to be part or device, basing on its type
*    Item position is automatically revalidated each time ‘size’ or ‘width’ of the device is changed
*    ‘Assign Part’ form has been modified to be more user friendly, with the possibility to search for the parts by providing their serial number
*    Device RRD directory is now automatically deleted while deleting the device itself
*    When device is unassigned from location, the rack relation is also being automatically deleted
*    Predefined Item Type Fields cannot be deleted, neither their name & slug can be changed
*    Product with Services assigned cannot be deleted
*    Processor Name is now displayed on the Processors Load Graph instead of the numerical index
*    Resource consuming JS plugins such as (Autocomplete, GeoComplete etc.) removed
*    Unnecessary icon sets are replaced with standard font awesome library
*    Global top header buttons style improvements
*    Errors are displayed on graphs in a more user friendly manner
*    Avatars CDN source has been changed
*    Changed presenters for the "Purchase Price" and "Purchase Date" fields
*    More detailed breadcrumbs added inside the device summary section

Bug Fixes:

*    Devices could not be discovered via graphical user interface nor with 3rd version SNMP access details
*    Issues with fields processing when altered for the second time with "Quick Edit" option
*    Out Bandwidth was not displayed correctly on the Traffic Graph
*    Corrected filtering in the Server List section
*    ‘404 Not Found’ error thrown when ‘Quick Edit’ method was used to edit fields at some sections
*    User birth date cannot be set to the future any more
*    Type Fields were not filled out properly in the default table seeder
*    Some common issues inside the import inventory section, mostly related to validation, have been solved
*    Notification favicons overlaying one another corrected
*    QR code is now shown properly inside the item summary section
*    Too strict validation of a user last name has been changed
*    Special chars issue with encoding or decoding inside ‘Currencies’ settings has been solved
*    Models are now properly assigned to servers created via user order
*    Problems with file upload validation & permission occurring at some environments
*    JSON is not presented to the user any more while they are trying to sign in to the client area
*    Device counter would count deleted devices as active
*    Issues with changing serial number in ‘Parts’ subsection in a device summary
*    New order can be created with API request
*    Custom RRD directory specification corrected
*    ‘hrProcessorLoad’ OID no longer causes errors while pulling information from some of the devices
*    Language typos corrected

## Version 1.0.3
Oct 12th, 2015

Improvements:

*    New Thread Poller based on process manager, substantially improving both stability and scalability
*    Feature to set the number of processed devices per poller thread, which dramatically improves the amount of time required to poll devices
*    Debug Mode for the Poller command in order to obtain additional information about the process
*   Additional services and graphing support for the Client Area, in preparation for EasyDCIM to more fully support client ↔ staff interaction and grant clients (and their contacts) permissions for different features

Bug Fixes:

*    Checkbox display fix on high device-pixel-ratio devices
*    Issue impacting model template data during new item creation
*   "No query results for model [Rack]" error, which occurred infrequently during device discovery
*    Issue causing graphs in the Client Area to not display properly for non-admin users.

## Version 1.0.2
Sep 11th, 2015
Improvements:

*    Background image on first web page during install has been updated
*    Text & Descriptions & Placements have been added and modified in the "LOCATIONS" section on the Floor Summary page, Add Rack page, & Locations Summary page
*    "Ports" tab on Server Overview page changed to "Network Interfaces"
*    "Servers" listing page of EasyDCIM the top menu/action button was "Add Item", changed to "Add Server"
*   Polling now no longer strictly based on hostname resolution, if resolution fails, it will attempt to contact the IP address
*    Using Drag and Drop on the Rack View to move servers around physically in a rack now contains a confirmation action to prevent mistakes
*    Removed the "Page Change Confirmation" action when changing page away from the Item Creation page
*    Error message "There is no content here at the moment" has been revised to "No data has been input/imported yet."
*    Item Creation status is now by default "AVAILABLE" instead of none selected
*    Server Summary Page - Renamed "Units" to "RU’s Occupied". RU’s Occupied and Rack Position were moved to Assignment Info box, plus other changes/enhancements
*    Ajax based Error Page introduces a “Show Details” link which shows as much error / tracing information as possible
*    IPMI & PDU Reboots - If a server has IPMI configured, it will use IPMI to reboot/power off/power on by default. Currently PDU reboots for IPMI configured devices are only available to STAFF/ADMIN until further advanced logic is added to this function. PURPOSE: PDU power cuts can cause damage to hardware
*    Network Interfaces tab v.s. Ports tab - Server devices have Network Interfaces tab, other devices (Switch, Router, PDU) use Ports tab
*    Network Interfaces (Servers) - Add Interface (IE: NIC PORT 1) -- assign Interfaces to Ports found on Switch/Router devices. IE: Server -> Server Interface Creation > Switch Device > Switch Port
*    Removed capability to "Delete" ports from Power Devices pulled via telnet/snmp/etc
*    Removed capability to "Delete" ports from Switches/etc if port is marked/configured as "Pullable"
*    "Label" field modified to be Optional for Components, continues to be required servers/switches/pdu

Bug Fixes:

*    RackUnit number not displayed on "Server Summary Page"
*    "Locations" section CSS revision for compatibility with greater number of resolutions/dimensions
*    WHMCS Module would remove any pre-existing configured options already residing in the WHMCS instance when creating the new automatically generated configuration options
*    An error realized when adding new orders
*    Error sometimes received when adding a "New Item"
*    Resolved issue encountered when assigning "Serial Number 1, Service Tag, Location or Manufacturer" (previously the field did not save inputted details)
*    Previously saving a Memory component as anything but "In Use" caused an error
*    Assigning a memory component from inventory to a server device now works properly
*    Global Input Filter revised to prevent specific symbol characters from being re-written
*    Assigning hostname to metadata would previously not save
*    Discovery would put Serial Number in the wrong field (Example: S/N 2 instead of S/N 1); this has now been corrected
*    Previously, drives from servers would sometimes erroneously be classified as PDUs
*    500 error immediately after install completed has been resolved
*    Action of assigning a server to a customer did not automatically change status to "IN USE" as it is designed to do; this has been resolved
*    Symbol character "+" will no longer overwrite the Global Input Filter
*    SSH Settings on Device/Server Metadata section was missing the "PORT" field
*    WHMCS module would previously error when assigned to a WHMCS product in certain instances
*    iDRAC5 now provides output, such as power; auto-discovery now detects any details
*    Switch Management - "Switch State" now has "Enable/Disable" as possible port actions; "Reboot" has been removed
*    Corrected initial permissions errors and misconfiguration for device RRD's and graphs
*    Creating an Item with Multiple Quantities the "Bulk Insert" fields will now be automatically selected and active
*    Locations are now able to have more than four (4) floors
*    When adding a component and attempting to create a "Manufacturer / Vendor", an error would sometimes be encountered when making your submission; this has been fixed
*    The "rack unit size" field has been removed from certain components where it is not applicable (Examples: RAM, HDD, CPU, etc)
*    Location assignment tracking based on "Component/Item Status". Now, if "Status = AVAILABLE" the device can have its own unique location. If "Status = IN USE", the device will use location assigned to its "Parent" device. In any other Status type, the device location will not be a selectable field
*    PING MONITOR functionality has now been restored
*    Corrected issue which now allows IPMI to be disabled on a server
*    "Switch Module" can now auto-suspend (turn off) the NETWORK PORT associated to a server, once the associated service has been marked as suspended
*    Notification/Log Entry for ports being turned ON/OFF (using Poller) will now display and track properly
*    Switches "Ports" tab - if a device is assigned to one of the ports, there was previously no way to properly Unassign the device/port
*    Auto-Discovery module/functionality repaired and improved

## Version 1.0.1
Jul 20th, 2015

New Features:

 *   WHMCS V6 support
 *   WHMCS module:
  *      Display text product fields as custom fields
  *      Domain, username and password synchronized with WHMCS
  *      Automatic servers provisioning
  *      DNS Management integration
  *      IP Management integration
  *      Usage Collector integration
  *      KVM console integration
 *   New drivers support in Auto-Discovering:
  *      PowerConnect 54xx
  *      Raritan Power PDU
 *   Device discoverer support for Windows Server

Improvements:

 *   Recent Activity widget enhancements
 *   Queries reduction and optimization in database
 * Usage Collector For EasyDCIM:
  *      Main functionality optimized
  *      New API methods implemented
 *   IPMI power button enhancements
 *   General improvements in device polling process
 *   Security improvements while uploading files; mime type and file size detection
 *   Orders improvements:
  *      User and product fields being automatically completed
  *      User-friendly auto-provisioning
 *   Model name changed in favour of label in option list for connected items in Power Ports
 *   Settings section redesigned
 *   Default seeds in database changed

Bug Fixes:

 *   Serial number validation in Mass Add Item form
 *   IPAM groups deletion
 *   Garbage collector session
 *   Device poller memory leak, causing problems with the server stability
 *   Monitor configuration edit form
 *   Incorrect redirection after device deletion
 *   Monitor assignment
 *   Currency HTML code

## Version 1.0.0
Jun 25th, 2015

New Features:

 *   Official Release Date Of Stable EasyDCIM Version

