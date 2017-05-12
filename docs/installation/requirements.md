# Requirements  

[TOC]

## Server requirements

Antares PHP framework requires following libraries installed on the server:

### Apache 2.4.x

Apache 2.4.x server or higher. The Apache server must have the following modules installed:     

1. mod_rewrite, 
2. mod_filter, 
3. mod_deflate, 
4. mod_alias, 
5. mod_headers, 
6. mod_mime, 
7. mod_env

### PHP 7.1.x

PHP 7.1.x or higher. PHP must have the following extensions installed:    

1. php7.1-bz2, 
2. php7.1-curl, 
3. php7.1-fileinfo, 
4. php7.1-mcrypt, 
5. php7.1-mbstring, 
6. php7.1-gd, 
7. php7.1-bcmath, 
9. php7.1-xml, 
10. php7.1-dom, 
11. php7.1-pdo,  
12. php7.1-zip,
13. php7.1-gettext,
14. php7.1-sqlite
15. php7.1-tokenizer    
16. php7.1-mysql

In the Windows OS an optional extension is php_com_dotnet which facilitates html conversion tool's operation (wkhtmltopdf).

### Mysql 14.x
    
Mysql (MariaDB) 14.x data base or higher.

### Composer 1.3.x

### Git 1.9.x    

## Recommended server resources

To install Antares, we suggest to use **Ubuntu 14.04.3 LTS (trusty) or higher** as our installation guide covers only this OS. If you'd like to use another OS and like to share it with others, feel free to send us an info.

### Development environment:

* Minimum 2GB free disk space,      
* Minimum 2GB of RAM,      
* 2 CPU cores

### Production environment:

* Minimum 10GB free disk space - for system resources, external vendors and internal system logs,       
* Minimum 4GB of RAM - it is recommended to scale up RAM if you find the system working slowly. It highly depends on the amount of users and data in the system.
* 4 CPU cores - the more the better. It will help to quicken loading assets simultaneously      
* SSD disk which provide considerable efficiency increase.
      
           
