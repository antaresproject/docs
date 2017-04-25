# Preconfiguration  

[TOC]

## Libraries  

Here is the description of libraries installation which are a part of system's environment:

### Apache 2.4.x

Apache 2.4.x or higher ([more info](requirements.md#####Apache 2.4.x))    
    

```bash
apt-get -y install apache2
```

The installation of dedicated modules is performed via a command (an example for mod_headers):
```bash
a2enmod headers
```
After the modules' installation, it is necessary to restart:
    
```bash
service apache2 restart
```
   
Optionally, there might be a need for an update apache configuration file to read `.htaccess` file which is used by application:
```bash
nano /etc/apache2/apache2.conf
```
```bash
<Directory /var/www/> 
Options Indexes FollowSymLinks  
AllowOverride None
Require all granted
</Directory>
```

is changed into:
```bash
<Directory /var/www/> 
Options Indexes FollowSymLinks
AllowOverride All
Require all granted
</Directory>
```

### PHP 7.1.*   
PHP 7.1.* or higher ([more info](requirements.md#####PHP 7.1.x))
```bash
apt-get install software-properties-common
```
```bash
add-apt-repository ppa:ondrej/php
```
```bash
apt-get update
```
```bash
apt-get -y install php7.1 libapache2-mod-php7.1
```
Restart after the installation:
```bash
service apache2 restart
```
Installation of additional extensions (the case of mbstring):
```bash
apt-get -y install php7.1-mbstring
```
Searching for available extensions:
```bash
apt-cache search php7.1
```
It is necessary to remember about the restart after the installation:
```bash
service apache2 restart
```
### Mysql 14.x
Mysql (MariaDB) 14.x or higher:
```bash
apt-get -y install mariadb-server mariadb-client
```

```bash
mysql_secure_installation
```

```bash
Enter current password for root (enter for none): <-- enter
Set root password? [Y/n] <-- y
New password: <-- provide a password for root user
Re-enter new password: <-- repeat password
Remove anonymous users? [Y/n] <-- y
Disallow root login remotely? [Y/n] <-- n
Reload privilege tables now? [Y/n] <-- y
```
In order to check installation's correctness, type the following command:
```bash
mysql -u root -p
```
Once logged in, you should achieve the following result:
 
  ![AT_precon1](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/installation/preconfiguration/AT_precon1.PNG)

Optionally, [phpMyAdmin](https://www.phpmyadmin.net/) can also be installed:
  
```bash
apt-get -y install phpmyadmin
```
  
```bash
Web server to configure automatically: <-- apache2
Configure database for phpmyadmin with dbconfig-common? <-- Yes
MySQL application password for phpmyadmin: <-- enter
```

After phpmyadmin installation, remove invalid php5 config files:
```bash
cd /etc/apache2/mods-enabled
rm php5.conf
rm php5.load
service apache2 restart
```      
```bash
echo "update user set plugin='' where User='root'; flush privileges;" | mysql -u root -p mysql
```
  
### Composer 1.3.x
Composer 1.3.x or higher
```bash
curl -sS https://getcomposer.org/installer | php 
mv composer.phar /usr/local/bin/composer
```
### Git 1.9.x
Git 1.9.x or higher:
```bash
apt-get update
apt-get install git
```    
  
## Environment Verification  
  
The aim of possession of all essential environment components correctness verification is the possibility of using a command in order to check the installed version.
  
### Apache
```bash  
apache2 -v
```
  
The expected version:
  
```bash
Server version: Apache/2.4.25 (Ubuntu)
Server built:   2016-12-21T00:00:00
```  
### Mysql  
```bash
mysql --version
```
      
The expected version:
  
```bash
mysql  Ver 14.14 Distrib 5.6.30
``` 

### Php
  
```bash
php -v
```
  
The expected version:
  
```bash
PHP 7.1.3-2+deb.sury.org~trusty+1 (cli) (built: Mar 15 2017 09:53:03) ( NTS )
Copyright (c) 1997-2017 The PHP Group
Zend Engine v3.1.0, Copyright (c) 1998-2017 Zend Technologies
    with Zend OPcache v7.1.3-2+deb.sury.org~trusty+1, Copyright (c) 1999-2017, by Zend Technologies
```
  
### Git
```bash  
git --version
```

The expected version:
  
```bash
git version 1.9.1
```
  
### Composer
  
```bash
composer --version
```

The expected version:
  
```bash
Composer version 1.3.2
```
