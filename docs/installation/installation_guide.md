#Installation Guide  

[TOC]

Before the installation, it is worth to make sure that all environment's components have been installed in versions compatible with the [expected](https://inbssoftware.atlassian.net/wiki/display/AS/Requirements) ones.  
  
1. Firstly, it is relevant to clone repository:  
<pre><code>cd /var/www
git clone http://git.mglocal/app/v0.5 html</code></pre> 
The above command will install the application in 0.5 version with git repository in html catalogue. 
In this case, please remember about pointing the virtual machine at public project catalogue:  
<pre><code>vim /etc/apache2/sites-enabled/000-default.conf  
DocumentRoot /var/www/html/public</code></pre>
  
  ![AT_IG1](/img/docs/installation/installation guide/AT_IG1.png)
  
2. Go to html catalogue and launch the installation command:  
<pre><code>cd /var/www/html
composer install</code></pre>
  ![AT_IG2](/img/docs/installation/installation guide/At_IG2.png)
The installation will download all the repositories belonging to the whole application based on interrelations specified in the composer.json file. It will additionally download the required assets (js, css). In the end of this procedure it will move such a frontend version to 'public' catalogue, which the application uses.
  
3. In the application's catalogue change the catalogues' entitlements.
<pre><code>chmod -R 777 storage && chmod -R 777 builds && chmod -R 777 public && chmod -R 777 bootstrap</code></pre>
  
4.  Edit the file /var/www/html/.env by setting the access to data base:
<pre><code>DB_HOST=127.0.0.1
DB_DATABASE=foo
DB_USERNAME=foo
DB_PASSWORD=foo</code></pre>
  
5. Go to the [link](http://127.0.0.1/admin/install) in order to start migration import to the base.
6. In the first installation step, there is an environment set-up verification - if everything is correct please continue. If the application states that something has not been set properly, the continuation will not be possible.
7. In the next step please fill the license data. If the license form's blanks are off, proceed to the next step. Otherwise, enter the [website](http://192.168.1.217/license), copy the key and save the license file. Use these data to fill the form concerning the license.
  
  ![AT_IG3](/img/docs/installation/installation_guide/AT_IG3.png)
  
8. In the next step, set up the application's instance name, username and password of the main administrator.
9. The final step in the installation is a definition of components and modules which will be a part of yours application's version. Once the components are chosen and the 'next' button is pressed, the application creates migration files and starts the Daemon that will watch over the execution of 'jobs' which the application will submit during the work (e.g. notifications, demanding computational procedures, etc.).
  
  ![AT_IG4](/img/docs/installation/installation_guide/AT_IG4.png)
  
10. In the next step the application will inform you about the end of installation, so move to the logging-in website. Log in using the created earlier account and move to the website /admin/extensions where you can install and uninstall the components and modules (right button).
  
  ![AT_IG5](/img/docs/installation/installation_guide/AT_IG5.png)
  
11. The application is ready to work.
