#ACL  

[TOC]

ACL - Access Control List, as the name suggests, is a layer responsible for decision-making concerning user's access to a resource (a website, a file, etc...).

##Verification at the Controller's Level  

ACL's implementation occurs at the controller's level in the '**setupMiddleware()**' method. The rules determining whether a user can be admitted to the website (action) are located in this method. In the case of controllers the whole verification takes place at the Middleware stage (before entering the action). The following, predefined types of access can be distinguished:

All logged in users (regardless of the role) have access:


```php
/** All logged in (authorized) users have access **/
$this->middleware('antares.auth');
```

All the users who are not logged in have access:

```php
/** All the users who are not logged in have access **/
$this->middleware('antares.guest');
```

Only the logged in users who have the access to the 'Show Dashboard' belonging to the core, have access:

```php
/** Only the logged in with access to the core and to the show dashboard **/
$this->middleware('antares.can:show-dashboard');
```

Only the logged in users who have access to the 'Index Action' belonging to the 'Foo' component, have access:

```php
/** Only the logged in with access to the index-action within the foo component **/
$this->middleware("antares.can:antares/foo::index-action");
```

There is also a possibility to determine which actions exactly the user may access:

```php
/** All the logged in users have access to the index action only **/
$this->middleware('antares.auth',['only' => ['index']]);
  
/** All the logged in with access to the 'Index Action' within the foo component have access to the 'index' action in the controller **/
$this->middleware("antares.can:antares/foo::index-action",['only' => ['index']]);
```

Keep in mind that the names of the accesses are the same as in the **acl()** method described in the [Service Provider](https://inbssoftware.atlassian.net/wiki/display/AS/Service+Providers).

So an example of using the **setupMiddleware()** method in a controller, may be the following:

```php
public function setupMiddleware()
{
        $this->middleware('antares.auth');
        $this->middleware("antares.can:antares/foo::index-action", ['only' => ['index']]);
}
```

##Global Verification  

A helper has been prepared, used for the access verification at any application's place:

```php
can("antares/foo.index-action");
```

The abovementioned code is identical with:

```php
app('antares.acl')->make('antares/foo')->can('index-action')
```

##Verification at the View's Level  

Verification in a view uses specially prepared twig engine function, as an extension. An example of use:

```php
{% if can('antares/foo::index-action') %}   
    <div>User has access to Index</div>
{% endif %}
```

##Access Control at the Interface Level  

When using the url address /admin/control/roles/index one can notice a register of users' groups (roles). To edit a group and authorizations click the right mouse button on a line and choose the edit option. The edition contains the details of ascribed authorizations for a group. To change the authorizations of a role, check or uncheck the checkboxes placed next to the action's name:

  ![AT_ACL1](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/modules_development/acl/AT_ACL1.png)
  
Remember that for other user's group these settings may look different and for example the 'Redactor' group has no access to the component at all:

  ![AT_ACL2](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/modules_development/acl/AT_ACL2.png)
  
Keep in mind that the access settings are realized 'per brand' and for different brands the access settings may be different. this means that the access to a component may be active in one brand, but not active in the other. Access configuration for each of the brand is possible when switching to other brand only.

If the action is provided with forms, then there is a possibility of visibility configuration and edition of specific form's box depending on a brand, action and user's group:

  ![AT_ACL3](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/modules_development/acl/AT_ACL3.png)
   
