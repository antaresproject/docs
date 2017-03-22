# Preconfiguration  

[TOC]

## Libraries  

Here is the description of libraries installation which are a part of system's environment:

1. ##### Apache 2.4.x
   Apache 2.4.x or higher ([more info](requirements.md#####Apache 2.4.x))    
    ```console
    apt-get -y install apache2
    ```

    The installation of dedicated modules is performed via a command (an example for mod_headers):
    ```console
    a2enmod headers
    ```
    After the modules' installation, it is necessary to restart:
    
    ```console
    service apache2 restart
    ```
    
    Optionally, there might be a need for an update apache configuration file to read `.htaccess` file which is used by application:
    ```console
    nano /etc/apache2/apache2.conf
    ```
    ```console
    <Directory /var/www/> 
    Options Indexes FollowSymLinks  
    AllowOverride None
    Require all granted
    </Directory>
    ```
    is changed into:
    ```console
    <Directory /var/www/> Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
    </Directory>
    ```
2. ##### PHP 7.1.*   
    PHP 7.1.* or higher ([more info](requirements.md#####PHP 7.1.x))  
    ```console
    apt-get -y install php7.1 libapache2-mod-php7.1
    ```
    Restart after the installation:
    ```console
    service apache2 restart
    ```
    Installation of additional extensions (the case of mbstring):
    ```console
    apt-get -y install php7.1-mbstring
    ```
    Searching for available extensions:
    ```console
    apt-cache search php7.1
    ```
    It is necessary to remember about the restart after the installation:
    ```console
    service apache2 restart
    ```
3. ##### Mysql 14.x
    Mysql (MariaDB) 14.x or higher:
    ```console
    apt-get -y install mariadb-server mariadb-client
    ```
    
    ```console
    mysql_secure_installation
    ```
    
    ```console
    Enter current password for root (enter for none): <-- enter
    Set root password? [Y/n] <-- y
    New password: <-- provide a password for root user
    Re-enter new password: <-- repeat password
    Remove anonymous users? [Y/n] <-- y
    Disallow root login remotely? [Y/n] <-- n
    Reload privilege tables now? [Y/n] <-- y
    ```
    In order to check installation's correctness, type the following command:
    ```console
    mysql -u root -p
    ```
    Once logged in, you should achieve the following result:
     
      ![AT_precon1](https://raw.githubusercontent.com/antaresproject/docs/master/docs/img/docs/installation/preconfiguration/AT_precon1.PNG)
    
    Optionally, [phpMyAdmin](https://www.phpmyadmin.net/) can also be installed:
      
    ```console
    apt-get -y install phpmyadmin
    ```
      
    ```console
    Web server to configure automatically: <-- apache2
    Configure database for phpmyadmin with dbconfig-common? <-- Yes
    MySQL application password for phpmyadmin: <-- enter
    ```
      
    ```console
    echo "update user set plugin='' where User='root'; flush privileges;" | mysql -u root -p mysql
    ```

4. ##### Composer 1.3.x
    Composer 1.3.x or higher
    ```console
    curl -sS https://getcomposer.org/installer | php
    mv composer.phar /usr/local/bin/composer
    ```
5. ##### Git 1.9.x
    Git 1.9.x or higher:
    ```console
    apt-get update
    apt-get install git
    ```    
  
## Environment Verification  
  
The aim of possession of all essential environment components correctness verification is the possibility of using a command in order to check the installed version.
  
1. ##### Apache
    ```console  
    apache2 -v
    ```
      
    The expected version:
      
    ```console
    Server version: Apache/2.4.25 (Ubuntu)
    Server built:   2016-12-21T00:00:00
    ```  
2. ##### Mysql  
    ```console
    mysql --version
    ```
          
    The expected version:
      
    ```console
    mysql  Ver 14.14 Distrib 5.6.30
    ``` 
3. ##### Php
  
    ```console
    php -v
    ```
      
    The expected version:
      
    ```console
    PHP 7.1.3-2+deb.sury.org~trusty+1 (cli) (built: Mar 15 2017 09:53:03) ( NTS )
    Copyright (c) 1997-2017 The PHP Group
    Zend Engine v3.1.0, Copyright (c) 1998-2017 Zend Technologies
        with Zend OPcache v7.1.3-2+deb.sury.org~trusty+1, Copyright (c) 1999-2017, by Zend Technologies
    ```
  
4. ##### Git
    ```console  
    git --version
    ```
  
    The expected version:
      
    ```console
    git version 1.9.1
    ```
  
5. ##### Composer
  
    ```console
    composer --version
    ```
  
    The expected version:
      
    ```console
    Composer version 1.3.2
    ```
  

  
