#Preconfiguration  

[TOC]


##Libraries  

Here is the description of libraries installation which are a part of system's environment:
  
1. Apache 2.4.x or higher (modules: mod_filter, mod_alias, mod_deflate, mod_env, mod_headers, mod_mime, mod_rewrite)  
```
apt-get -y install apache2
```
The installation of dedicated modules is performed via a command (an example for mod_headers):
```
a2enmod headers
```
After the modules' installation, it is necessary to restart:
```
service apache2 restart
```
Optionally, there might be a need for starting the file .htaccess in a configuration:
```
vim /etc/apache2/apache2.conf
<Directory /var/www/> Options Indexes FollowSymLinks  
AllowOverride `<b><i>None</i></b>`
Require all granted
</Directory>
```
is changed into:
```
<Directory /var/www/> Options Indexes FollowSymLinks
AllowOverride All
Require all granted
</Directory>
```
2. PHP 7.0.6 or higher (extensions: ctype, iconv, json, mcrypt, Reflection, session, zip, zlib, libxml, dom, PDO, openssl, SimpleXML, curl, gd, mbstring, Phar, fileinfo, bz2, php_com_dotnet)  
```
apt-get -y install php7.0 libapache2-mod-php7.0
```
Restart after the installation:
```
systemctl restart apache2
```
Installation of additional extensions (the case of mbstring):
```
apt-get -y install php7.0-mbstring
```
Searching for available extensions:
```
apt-cache search php7.0
```
It is necessary to remember about the restart after the installation:
```
systemctl restart apache2
```
3. Mysql (MariaDB) 14.x or higher:
```
apt-get -y install mariadb-server mariadb-client
```

```
mysql_secure_installation
```

```
Enter current password for root (enter for none): <-- enter
Set root password? [Y/n] <-- y
New password: <-- provide a password for root user
Re-enter new password: <-- repeat password
Remove anonymous users? [Y/n] <-- y
Disallow root login remotely? [Y/n] <-- n
Reload privilege tables now? [Y/n] <-- y
```
In order to check installation's correctness, type the following command:
```
mysql -u root -p
```
Once logged in, you should achieve the following result:
 
  ![AT_precon1](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/installation/preconfiguration/AT_precon1.PNG)
  
4. Composer 1.x.x or higher:
```
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```
5. Git 1.9.x or higher:
```
apt-get update
apt-get install git
```
  
##Environment Verification  
  
The aim of possession of all essential environment components correctness verification is the possibility of using a command in order to check the installed version.
  
Apache:
```  
apache2 -v
```
  
The expected version:
  
```
Server version: Apache/2.4.7 (Ubuntu)
Server built:   Jan 14 2016 17:45:23
```
  
Mysql:
  
```
mysql --version
```
  
The expected version:
  
```
mysql  Ver 14.14 Distrib 5.6.30
```
  
Php:
  
```
php -v
```
  
The expected version:
  
```
PHP 7.0.6 (cli) (built: May 11 2016 14:37:09) ( NTS )
Copyright (c) 1997-2016 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2016 Zend Technologies
```
  
Git:
```  
git --version
```
  
The expected version:
  
```
git version 1.9.1
```
  
Composer:
  
```
composer --version
```
  
The expected version:
  
```
Composer version 1.0.0
```
  
Optionally, PHPmyadmin can also be installed:
  
```
apt-get -y install phpmyadmin
```
  
```
Web server to configure automatically: <-- apache2
Configure database for phpmyadmin with dbconfig-common? <-- Yes
MySQL application password for phpmyadmin: <-- enter
```
  
```
echo "update user set plugin='' where User='root'; flush privileges;" | mysql -u root -p mysql
```
  
