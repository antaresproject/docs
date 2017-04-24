# Installation Guide  

Manual installation is recommended when overall project requires interference with the specific server environment.
This way allows flexibility of configure server packages such as apache document root location, pre-installed apache extensions and server tools (eg.: [Varnish cache](https://varnish-cache.org/intro/index.html#intro)) and php extensions and libs (eg.: [ImageMagick](http://php.net/manual/en/book.imagick.php)) depends on project requirements.
It is worth to remember that server customization procedure can be also done after [Automatic Installation](installation_auto.md).    

Before the installation, it is worth to make sure that all environment's components have been installed in versions compatible with the [expected](requirements.md) ones.
In case you don't have the required libraries installed, you can find pre-installation commands [here](preconfiguration.md).    

***Please note**: Manual installation is the hardest and longest way to install Antares Project and gives full server customization as opposed to auto install.  The following manual is dedicated for Ubuntu 14.04/16.06 or CentOS 7.2.x. In case that you are not able to use it, please follow [Automatic Installation Guide](installation_auto.md).*
  
1. Firstly, it is relevant to clone repository:  

```bash
cd /var/www
git clone https://github.com/antaresproject/project.git -b 0.9.2 html
```

The above command will install the application in 0.9.2 version with git repository in html catalogue. 
In this case, please remember about pointing the virtual machine at public project catalogue:  

```bash
nano /etc/apache2/sites-enabled/000-default.conf  
DocumentRoot /var/www/html/public
```
  ![git_clone](../img/installation/git_clone.png)      
  
2. Go to html catalogue and launch the installation command:  

```bash
cd /var/www/html
composer install
```

![AT_IG2](../img/docs/installation/installation_guide/AT_IG2.PNG)

The installation will download all the repositories belonging to the whole application based on interrelations specified in the composer.json file. It will additionally download the required assets (js, css). In the end of this procedure it will move such a frontend version to 'public' catalogue, which the application uses.  

3. In the application's catalogue change the catalogues' entitlements.

```bash
chmod -R 777 storage && chmod -R 777 builds && chmod -R 777 public && chmod -R 777 bootstrap
```

4. Create new database instance using following command:
    
```bash
mysql -u <enter mysql username here> -p <enter mysql password here>
```   
```bash
create database foo CHARACTER SET=utf8 COLLATE=utf8_general_ci
```
`*Tip: You can also create database instance using phpMyAdmin by going to http://<server_name>/phpmyadmin`
       
5.  Edit the file /var/www/html/.env:

```bash
nano /var/www/html/.env
```
and set access to database:

```bash
DB_HOST=127.0.0.1
DB_DATABASE=foo
DB_USERNAME=<enter mysql username here>
DB_PASSWORD=<enter mysql password here>
```
  
6. Go to the `http://<server_name>/install` in order to start migration import to the base. In the first installation step, there is an environment set-up verification - if everything is correct please continue. If the application states that something has not been set properly, the continuation will not be possible.
![installation_manual_step_1](../img/docs/installation/installation_guide/installation_manual_step_1.PNG)

 
7. In the next step, set up the application's instance name, username and password of the main administrator.

    ![installation_manual_step_2](../img/docs/installation/installation_guide/installation_manual_step_2.PNG)

8. The final step in the installation is a definition of components and modules which will be a part of yours application's version. Once the components are chosen and the 'next' button is pressed, the application creates migration files and starts the Daemon that will watch over the execution of 'jobs' which the application will submit during the work (e.g. notifications, demanding computational procedures, etc.).
    
    ![installation_manual_step_3](../img/docs/installation/installation_guide/installation_manual_step_3.PNG)
  
  
9. In the next step the application will inform you about the end of installation, so move to the logging-in website. Log in using the created earlier account and move to the website /admin/extensions where you can install and uninstall the components and modules (right button).
  
    ![AT_IG5](../img/docs/installation/installation_guide/AT_IG5.PNG)
  
10. The application is ready to work.
