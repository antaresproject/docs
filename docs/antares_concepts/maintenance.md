#Maintenance  

[TOC]

Within each mode (production, development, testing, staging) an application may enter the maintenance mode.

In order to switch the application over the maintenance mode, type the following command:

<pre><code>php artisan down</code></pre>

The following confirmation will be displayed: *Application is now in maintenance mode.* As a result, during the attempt of entering the system, the following website will be shown:

  ![AT_MAINT01](/img/docs/antares_concepts/maintenance/AT_MAINT01.png)
  
In order to restart system's operation, type the command:

<pre><code>php artisan up</code></pre>

The confirmation *Application is now live.* will be displayed and the application will return to work.

##Merging With Latest Antares Release  

In order to keep the application up-to-date, type the following command:

<pre><code>composer update</code></pre>

The task of the command is to download the source code belonging to the individual components, modules and to download the latest 'core' version and frontend sources. Keep in mind that the command will download the code from the branch which will be defined in the *composer.json* file, e.g.:

<pre><code>{
    "repositories": [
        {
            "type": "git",
            "url": "http://git.mglocal/components/foo.git"
        }
    ],
    "require": {
        "components/foo": "master"
    },   
}</code></pre>

In the abovementioned example the source code will be downloaded from the *foo* component of the *master* branch. To indicate other branch, indicate that name in the *require* section:

<pre><code>{
    "repositories": [
        {
            "type": "git",
            "url": "http://git.mglocal/components/foo.git"
        }
    ],
    "require": {
        "components/foo": "0.7-dev"
    },   
}</code></pre>

In the abovementioned example the *0.7-dev* branch of the *foo* component has been indicated.

The remaining part of application is subordinate to its own update within http://git.mglocal/app/v0.5 and should be executed on your own. The reasons of such a solution are the far-reaching differences in different projects created on the basis of the system. When thinking about the application think about the files belonging to the repository i.e. the catalogues:

1. /app
2. /public/packages/core
3. /public/js
4. /public/img
5. /public/views

Keep in mind that application's repository should be treated as a kind of a pattern, not as last resort while creating the custom project. Each of such a project should have its own repository with defined configuration files' and composer.json file's settings.

##Updating Application  

The information concerning application's update with the latest repository version can be found [here](https://inbssoftware.atlassian.net/wiki/pages/createpage.action?spaceKey=AS&title=Merging+with+latest+Antares+release&linkCreation=true&fromPageId=21069877), whereas the information concerning updater component's operation can be found [here](https://inbssoftware.atlassian.net/wiki/display/AS/Updater).

###Components and Modules  

Each of the component belonging to the application may be updated individually due to the fact that it is a separate repository. This means that each of the application's components and modules has its own catalogue named as *.git.* During committing and pushing the changes within a component the changes will be sent to the branch where the component comes from.

The *core* catalogue, which is the core of application and which is placed in the src catalogue in the main application's path, is subordinate to the similar procedures.

###Frontend  

Frontend (determined by the javascript and css files) is subordinate to another procedure as in the case of components and modules. Only the command 'composer update' can currently download the latest frontend version. In order to execute the update by hand, download the repository determined in the composer.json file, e.g.:

<pre><code>{
    "type": "package",
    "package": {
        "name": "antares-frontend",
        "version": "master",
        "source": {
            "url": "http://git.mglocal/billevo/antares-frontend.git",
            "type": "git",
            "reference": "master"
        }
    }
}</code></pre>

The command:

<pre><code>git clone http://git.mglocal/billevo/antares-frontend.git</code></pre>

will download project's repository to the catalogue antares-frontend. Copy the following source codes, from the downloaded repository:

1. _dist
2. assets
3. gzip_assets

to the public catalogue in the main application's path.

##Staging Environments  

The application may work in several modes:

1. production
2. development
3. testing
4. staging (i.e. pre-production)

Furthermore, within each mode the application may switch to the maintenance mode - more information can be found [here](https://inbssoftware.atlassian.net/wiki/display/AS/Maintenance).

The production mode (production server) is a mode and the server where client's application is maintained (the one which has the smallest number of submitted errors and the one where the system works in the real mode) is usually connected with it. On this server, the real clients data, not subordinate to test, are also maintained.

**The development mode (developer server) is the programmers server and on this server the application's instance subordinate to development is maintained. The instance should have error reporting on and as a rule, should not be seen outside (beyond the area of the company's network) for safety's sake.**

The staging mode is rendering the application available for the application tests. The constituent part are unit tests which should have the coverage not lower than 50% of the code. For more information about  testing environment operation click [here](https://inbssoftware.atlassian.net/wiki/display/AS/Test+benchmark). The server's configuration which is responsible for maintaining the application for the tests' needs, should be compatible with development server, that is the one where the programmer works. Preparation of the testing server is in fact associated with preparation of the [development server](https://inbssoftware.atlassian.net/wiki/display/AS/Installation). Such prepared testing environment should contain functioning application's version with the minimal number of errors and be subordinate to the rules determined within the process of Continuous Integration (CI). CI is a kind of practice used during the software's development, which depends on frequent, regular activation (integration) of current changes in the code to the main repository. The correctly made, constant integration should lead to:

* the reduction of costs and the reduction of the amount of work necessary in combining the work made by different people,
* earlier error detection.

Within the work based on CI, the environment supporting realization is [Jenkins](https://inbssoftware.atlassian.net/wiki/display/MAN/How+to+install+Jenkins).
