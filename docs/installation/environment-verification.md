# Environment Verification  
If you are not sure if your server is configured properly, you can run these commands in order to verify versions of required libraries.


## Apache
```bash  
apache2 -v
```
  
The expected version:
  
```bash
Server version: Apache/2.4.25 (Ubuntu)
Server built:   2016-12-21T00:00:00
```  
## Mysql  
```bash
mysql --version
```
      
The expected version (or higher):
  
```bash
mysql  Ver 14.14 Distrib 5.6.30
``` 

## Php
  
```bash
php -v
```
  
The expected version (or higher):
  
```bash
PHP 7.1.3-2+deb.sury.org~trusty+1 (cli) (built: Mar 15 2017 09:53:03) ( NTS )
Copyright (c) 1997-2017 The PHP Group
Zend Engine v3.1.0, Copyright (c) 1998-2017 Zend Technologies
    with Zend OPcache v7.1.3-2+deb.sury.org~trusty+1, Copyright (c) 1999-2017, by Zend Technologies
```
  
## Git
```bash  
git --version
```

The expected version (or higher):
  
```bash
git version 1.9.1
```
  
## Composer
  
```bash
composer --version
```

The expected version (or higher):
  
```bash
Composer version 1.3.2
```
