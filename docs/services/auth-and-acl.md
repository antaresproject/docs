# Auth & ACL  

[TOC]

## Introduction  

System's architecture provides mechanisms for controlling users' access to the resources based on RBAC (Role Based Access Control). The RBAC consists of:

  
| Name       | Description   |
| ---------- |:-------------| 
| action     | Actions are conducted by endpoints defined as routes or by activity that the user can do (or not)      | 
| role       | Roles are the groups of users which the user belongs to     | 
| acl        | ACL is a map of values of the boolean type that defines the relation between the action and the role. It also specifies whether the role may have permission to execute a given action      | 

> The path of source code is `src/core/src/components/acl/` and `src/core/src/components/auth/`.

## Auth  

Auth is a set of tools that expands the *Illuminate\Auth* base functionality of Laravel in order to deliver the user's instance and the groups assigned to it. The aim of this functionality is to provide measures and tools for efficient control of users' access to resources (ACL -  Access Control List). The facade connected with the ACL instance is:

```php
Antares\Support\Facades\ACL
```

In order to use the facade in the application you should determine the alias of the class in the configuration:

```php
'aliases' => [
    'ACL' => Antares\Support\Facades\ACL::class,
],
```

### Roles  

In order to create a new role:

```php
$roleAdmin              = new \Antares\Model\Role();
$roleAdmin->name        = 'administrator';
$roleAdmin->area        = 'administrators';
$roleAdmin->full_name   = 'Administrator';
$roleAdmin->description = 'Manage administration privileges';
$roleAdmin->save();
 
//or create array method
 
$role      = new \Antares\Model\Role();
$roleAdmin = $role->create([
    'name'        => 'administrator',
    'area'        => 'administrators',
    'full_name'   => 'Administrator',
    'description' => 'Manage administration privileges'
]);
```

In order to create a new hierarchical role (with a superior role):

```php
$role      = new \Antares\Model\Role();
$roleModerator = $role->create([
    'parent_id'=>$role->newQuery()->where('name','administrator')->firstOrFail()->id,
    'name'        => 'moderator',
    'area'        => 'administrators',
    'full_name'   => 'Moderator',
    'description' => 'Manage moderator privileges'
]);
```

In order to assign the role to a new user:

```php
$user = user()->newInstance([
    'email'    => 'foo@bar.com',
    'firstname' > 'Foo',
    'lastname' => 'Bar',
    'password' => 'FooBar'
]);
$user->save();
$user->roles()->sync([
    \Antares\Model\Role::members()->lists('id')->toArray()
]);
```

To change the role of the existing user:

```php
$user  = user()->newQuery()->where('email', 'foo@bar.com')->firstOrFail();
$roles = $user->roles->lists('id')->toArray();
$admin = \Antares\Model\Role::admin()->id;
$map   = array_merge($roles, (array) $admin);
 
$user->roles()->sync([
    $map
]);
```

Each user of the system is assigned to a specific role (group) with the particular permissions.
To download the list of available roles assigned to a user:

```php
$roles = Auth::roles();
```

Or:

```php
$roles = auth()->roles();
```

In order to check whether a user is assigned to a role (roles):

```php
if (Auth::is(['admin', 'editor'])) {
    echo "Is an admin and editor";
}
```

In order to check whether a user is assigned to any of given roles:

```php
if (Auth::isAny(['admin', 'editor'])) {
    echo "Is a member or admin";
}
```

In order to check whether a user is not assigned to given roles:

```php
if (Auth::isNot(['admin', 'editor'])) {
    echo "Isn't an admin and editor";
}
```

In order to check whether a user is not assigned to any of given roles:

```php
if (Auth::isNotAny(['admin', 'editor'])) {
    echo "Isn't a member or admin";
}
```

## ACL And Metrics  

Owing to the modularity of application, each module can decide independently which resources (within the module's space) are accessible to the logged in user. More details about the creation of the ACL migration files can be found [here](../modules-development/migrations.md). Information about the verification of access to the actions of controllers (resources) can be found [here](../modules-development/acl.md).
In order to download the ACL instance assigned to a module:

```php
$acl = ACL::make('antares/foo');
```

In order to verify whether a user has access to a resource:

```php
$acl = ACL::make('antares/foo'); 
if (!$acl->can('foo-index')) {
     return redirect()->to(handles('antares::login'));
}
```

