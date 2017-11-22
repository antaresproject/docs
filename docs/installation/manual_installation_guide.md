# Manual Installation Guide  

[TOC]

Manual installation is recommended for more advanced users that would like to set up Antares on their own,  specific server environment. It is also recommended to follow it when the automatic installer failed. It provides more flexibility of configuration of the server packages such as apache document root location, pre-installed apache extensions, PHP extensions and server tools.

Before the installation, it is worth to make sure that all environment's components have been installed in versions compatible with the [expected](requirements.md) ones. You will find the instructions [Automatic Installation Guide](automatic_installation_guide.md).

> ***Please note**: Manual installation is the hardest and longest way to install Antares, but gives full server customization as opposed to the auto installation. In case that you are having problems or simply you're not experienced enough to set up your webserver on a Linux environment, please follow [Automatic Installation Guide](automatic_installation_guide.md).*

The following manual is dedicated for **Ubuntu 14.04/16.06**. 



## Server preconfiguration  

Before you proceed with the Antares installation, you need to start with libraries which are a part of the system environment.

Just in case, run apt-get update to get the newest versions of packages and their dependencies:
```bash
apt-get update
```

### Apache Installation

Install Apache 2.4.x or higher:    

```bash
apt-get -y install apache2
```

Install the required Apache modules:
```bash
a2enmod headers rewrite filter deflate alias mime env
```

After the modules are installed, it is necessary to restart Apache:
    
```bash
service apache2 restart
```
   
Optionally, there might be a need for an update apache configuration file to read `.htaccess` file which is used by application. Edit `apache2.conf` file by command:
```bash
nano /etc/apache2/apache2.conf
```
find following lines:
```bash
<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
</Directory>

```
and change AllowOverride to All :
```bash
AllowOverride All
```

### PHP 7 Installation 
Install PHP 7.1.* or higher:
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

Install the required PHP extensions:
```bash
apt-get -y install php7.1-bz2 php7.1-curl php7.1-fileinfo php7.1-mcrypt php7.1-gd php7.1-bcmath php7.1-xml php7.1-zip php7.1-pdo php7.1-dom php7.1-tokenizer php7.1-sqlite php7.1-gettext php7.1-mbstring php7.1-mysql
```
Restart Apache after the installation:
```bash
service apache2 restart
```


### Mysql Installation
Install Mysql (MariaDB) 14.x or higher:
```bash
apt-get -y install mariadb-server mariadb-client
```

Run secure mySQL installation script:
```bash
mysql_secure_installation
```

You can follow these settings:
```bash
Enter current password for root (enter for none): <-- enter
Set root password? [Y/n] <-- y
New password: <-- provide a password for root user
Re-enter new password: <-- repeat password
Remove anonymous users? [Y/n] <-- y
Disallow root login remotely? [Y/n] <-- n
Remove test database and access to it? [Y/n] <-- y
Reload privilege tables now? [Y/n] <-- y
```

### Database User Configuration


Log into MYSQL as root:    

```bash
mysql -u root -p
```
Create a new user (**Do not forget to set up the password!**):

```bash
CREATE USER 'antares'@'localhost' IDENTIFIED BY 'password';
```

And grant him privileges to the database:

```bash
GRANT ALL PRIVILEGES ON *.* to 'antares'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

Flush the privileges:

```bash
FLUSH PRIVILEGES;
```

```bash
exit;
```
  
### Composer Installation

Install composer 1.3.x or higher

```bash
curl -sS https://getcomposer.org/installer | php 
mv composer.phar /usr/local/bin/composer
```

### Git Installation
Install Git 1.9.x or higher:
```bash
apt-get install git
```    



## Antares Installation
  
### Git Clone
Firstly, go to directory:

```bash
cd /var/www
```  
remove html directory if exists `rm -rf /var/www/html`. *Warning! This command will remove everything you have in the html directory - make sure that there's nothing there!*

and clone GIT repository using `create-project` command:

```bash
composer create-project antaresproject/project /var/www/html dev-master --keep-vcs
```

The above command will install the application in dev-master version from git repository in your `/var/www/html` directory. 
In this case, please remember about pointing the apache at the public project directory:

```bash
nano /etc/apache2/sites-enabled/000-default.conf
```

and add following lines within `VirtualHost` section:
    
```bash
<Directory /var/www/html>
    Require all granted
    AllowOverride All
</Directory>
```        

An example of valid `virtualhost` section should looks like:

```bash
<VirtualHost *:80>
        ServerAdmin youremail@domain.net
        DocumentRoot /var/www/html
        # ...
        <Directory /var/www/html>
                Require all granted
                AllowOverride All
        </Directory>        
        # ...
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

    
Optionally you can configure permission settings for specified IPs: 

```bash
<Directory /var/www/html>
   Require all granted
   AllowOverride All
   Allow from 127.0.0.1
   Allow from ::1
</Directory>   
```            

Once you apply the above settings, restart apache service:

```bash
service apache2 restart
```

More information about `vhosts` configuration you can find [here](https://httpd.apache.org/docs/2.4/vhosts/examples.html).
   

### Database Configuration

Create new database instance using following command:

```bash
mysql -u root -p 
```

```bash
create database foo CHARACTER SET=utf8 COLLATE=utf8_general_ci;
```    
> **Please note:** Database name "foo" is just an example, it is recommended to use your own database name.

Type `exit` to leave the MySQL command line.


       
Once created, you need to set the database connection in the file `/var/www/html/.env`:

```bash
nano /var/www/html/.env
```

Change following lines:

```bash
DB_HOST=127.0.0.1
DB_DATABASE=foo
DB_USERNAME=<enter mysql username here>
DB_PASSWORD=<enter mysql password here>
```    
  
  
### Web-based Installer

Go to the `http://<server_IP>/install` in order to start migration import to the database. In the first installation step, there is an environment verification - if everything is correct please continue. If the application states that something has not been set properly, you will have to configure it before being able to proceed.

![installation_manual_step_1](../img/docs/installation/installation_guide/installation_manual_step_1.png)

 
In the next step, set up the application name, username and password of the main administrator.

![installation_manual_step_2](../img/docs/installation/installation_guide/installation_manual_step_2.png)

> **Please note:** Do not forget to remember the password, it's the only way to log in to the application.

Next step is about choosing optional modules:

![installation_manual_step_3](../img/docs/installation/installation_guide/installation_manual_step_3.png)

The final step in the installation is to choose the modules which will be included in your application. Once the components are chosen and the 'next' button is pressed, the application creates migration files and starts the daemon that will be handling [automation](../core_modules/automation.md).

![installation_manual_step_4](../img/docs/installation/installation_guide/installation_manual_step_4.png)
  
  
In the next step the application will inform you about the end of the installation. 
  
**Congratulations!!! The Antares application is ready to work.**


## Nginx

First, we need to update our local package index to make sure we have a fresh list of the available packages. 
Then we can install the necessary components:

```bash
apt-get update
apt-get install nginx php7.1-fpm
```

The first thing that we need to do is open the main PHP configuration file for the PHP-fpm processor that Nginx uses. 
Open this in your text editor:

```bash
nano /etc/php/7.1/fpm/php.ini
```

We only need to modify one value in this file. 
Search for the `cgi.fix_pathinfo` parameter and update it to following value:

```bash
cgi.fix_pathinfo=0
```   

In next step, open the default server block configuration file:

```bash
nano /etc/nginx/sites-available/default
```

Upon installation, this file will have quite a few explanatory comments, but the basic structure should be updated to this:

```bash
server {
        listen 80 default_server;
        listen [::]:80 default_server ipv6only=on;

        root /var/www/html/public;
        index index.php index.html index.htm;

        # Make site accessible from http://localhost/
        server_name <server_domain_or_IP>;

        location / {
                try_files $uri $uri/ /index.php?$query_string;
        }
        location ~ \.php$ {
                try_files $uri =404;
                fastcgi_split_path_info ^(.+\.php)(/.+)$;
                fastcgi_pass unix:/var/run/php/php7.1-fpm.sock;
                fastcgi_index index.php;
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                include fastcgi_params;
        }
}
```   

We have set the root `parameter` to `/var/www/html/public` so that PHP can locate the requested files correctly. 
That's all. Just restart nginx process:
 
```bash
sudo service nginx restart
```

