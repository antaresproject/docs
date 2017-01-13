
#Sample Module  

[TOC]

An exemplary component may be downloaded from the git location:

```php
http://git.mglocal/components/foo.git

```

or installation appearance may be added to the composer file:

```php
{  
    "repositories": [
        ...
        {
            "type": "git",
            "url": "http://git.mglocal/components/foo.git"
        }
        ...
    ],
    "require": {
        ...
        "components/foo": "master",
        ...
    },
    ...
}

```

