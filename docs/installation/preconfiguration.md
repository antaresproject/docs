#Preconfiguration  

[TOC]


##Libraries  

Here is the description of libraries installation which are a part of system's environment:
  
1. Apache 2.4.x or higher (modules: mod_filter, mod_alias, mod_deflate, mod_env, mod_headers, mod_mime, mod_rewrite)  
```
apt-get -y install apache2
```
The installation of dedicated modules is performed via a command (an example for mod_headers):
<pre><code>a2enmod headers</code></pre>  
After the modules' installation, it is necessary to restart:
<pre><code>service apache2 restart</code></pre>
Optionally, there might be a need for starting the file .htaccess in a configuration:
<pre><code>vim /etc/apache2/apache2.conf
&lt;Directory /var/www/&gt; Options Indexes FollowSymLinks  
AllowOverride `<b><i>None</i></b>`
Require all granted
&lt;/Directory&gt;</code></pre>
is changed into:
<pre><code>&lt;Directory /var/www/&gt; Options Indexes FollowSymLinks
AllowOverride All
Require all granted
&lt;/Directory&gt;</code></pre>
2. PHP 7.0.6 or higher (extensions: ctype, iconv, json, mcrypt, Reflection, session, zip, zlib, libxml, dom, PDO, openssl, SimpleXML, curl, gd, mbstring, Phar, fileinfo, bz2, php_com_dotnet)  
<pre><code>apt-get -y install php7.0 libapache2-mod-php7.0</code></pre>
Restart after the installation:
<pre><code>systemctl restart apache2</code></pre>
Installation of additional extensions (the case of mbstring):
<pre><code>apt-get -y install php7.0-mbstring</code></pre>
Searching for available extensions:
<pre><code>apt-cache search php7.0 </code></pre>
It is necessary to remember about the restart after the installation:
<pre><code>systemctl restart apache2</code></pre>
3. Mysql (MariaDB) 14.x or higher:
<pre><code>apt-get -y install mariadb-server mariadb-client</code></pre>  
<pre><code>mysql_secure_installation</code></pre>  
<pre><code>Enter current password for root (enter for none): <-- enter
Set root password? [Y/n] <-- y
New password: <-- provide a password for root user
Re-enter new password: <-- repeat password
Remove anonymous users? [Y/n] <-- y
Disallow root login remotely? [Y/n] <-- n
Reload privilege tables now? [Y/n] <-- y</code></pre>
In order to check installation's correctness, type the following command:
<pre><code>mysql -u root -p</code></pre>
Once logged in, you should achieve the following result:
  
  ![AT_precon1](../img/docs/installation/preconfiguration/AT_precon1.png)
  
4. Composer 1.x.x or higher:
<pre><code>curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer</code></pre>
5. Git 1.9.x or higher:
<pre><code>apt-get update
apt-get install git</code></pre>
  
##Environment Verification  
  
The aim of possession of all essential environment components correctness verification is the possibility of using a command in order to check the installed version.
  
Apache:
  
<pre><code>apache2 -v</code></pre>
  
The expected version:
  
<pre><code>Server version: Apache/2.4.7 (Ubuntu)
Server built:   Jan 14 2016 17:45:23</code></pre>
  
Mysql:
  
<pre><code>mysql --version</code></pre>
  
The expected version:
  
<pre><code>mysql  Ver 14.14 Distrib 5.6.30</code></pre>
  
Php:
  
<pre><code>php -v</code></pre>
  
The expected version:
  
<pre><code>PHP 7.0.6 (cli) (built: May 11 2016 14:37:09) ( NTS )
Copyright (c) 1997-2016 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2016 Zend Technologies</code></pre>
  
Git:
  
<pre><code>git --version</code></pre>
  
The expected version:
  
<pre><code>git version 1.9.1</code></pre>
  
Composer:
  
<pre><code>composer --version</code></pre>
  
The expected version:
  
<pre><code>Composer version 1.0.0</code></pre>
  
Optionally, PHPmyadmin can also be installed:
  
<pre><code>apt-get -y install phpmyadmin</code></pre>
  
<pre><code>Web server to configure automatically: <-- apache2
Configure database for phpmyadmin with dbconfig-common? <-- Yes
MySQL application password for phpmyadmin: <-- enter</code></pre>
  
<pre><code>echo "update user set plugin='' where User='root'; flush privileges;" | mysql -u root -p mysql</code></pre>
  
