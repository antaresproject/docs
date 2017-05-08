# Contribution Guide

[TOC]

Antares Project is an open-source software. It means that anyone can contribute to its development.
> **Note that only PHP 7 compatibility issues are accepted.**

When contributing to Antares Project you have to follow some points and workflow. 
It allows us to resolve the requests quickly. Following below guidelines will result less work for both you and our team.
        
## Contributing Bugfixes or Features

First step is to prepare a repository from which our team can pull into the Antares Project repository.
 
1. Make sure there is an issue you are working on

   All new features and issues should have an issue in discussion and documentation. Take a look through the existing list of issues which match the contribution you want to create. If exists, please leave a comment on that issue indicating you intend to work on that item. If not available , please open new issue for your work. This will allow our team to review your suggestion.

2. Fork the one of the Antares Project repository on github.
    
   More information about how to create new fork can be found [here](http://help.github.com/fork-a-repo).
    
3. Clone repository locally and enter it as the following example:
    ```bash
    $ git clone git@github.com:<YOUR-GITHUB-USERNAME>/automation.git <DIRECTORY>
    $ cd <directory>
    ```
    More information about how to setup your GIT installation to work with Github can be found [here](https://help.github.com/articles/set-up-git/).     
    
4. Add a git remote as an additional (upstream)
    ```bash
    $ git remote add upstream git://github.com/antaresproject/automation.git
    ```
5. Get the latest code from the main repository
   ```bash
   $ git fetch upstream
   ``` 
   It is very important to start work from the newest code. There may be a changes which may affect to your implementation.

6. Create a new branch for your work based on the current master branch
   ```bash
   $ git checkout upstream/master
   $ git checkout -b <NAME_OF_YOUR_BRANCH>
   ``` 
    
   Remember, each bug fix or change should go in separated branch. Branch name should describe issue you are working on.
        
7. Write your code

   Make sure you code works as you expected. If you working on bug, take a look on unit tests and code coverage before pull request. Code coverage indicator shouldn't decrease after your work, otherwise your fix may not be accepted (depends on what kind of fix you are working on). In case of new feature, tested and covered code is always welcome - increase your code quality and improve checking process of your contribution.

8. Changelog
    
   Edit the CHANGELOG.md file to include description of your changes. The changelog should be grouped by type:
   
    * New - New features
    * Changes - Changes of current code
    * Fixes - Fixes for reported issues
    * Internal - Internal development (eg.: Performance)
    * Other  - All others
            
   If you worked on fix which resolve reported issue, you should add new line on the top of the "Fixes" section. Here is an example 
   ```bash
   **Fixes**
   
   * <#ISSUE_NUM> a desription of bug
   ```
   For rest of all, add description into sections which describe your work.  
      
9. Commit your work

   First of all add the files you want to push into repository:
   ```bash
   $ git add <PATH_TO_YOUR_FILE>
   ```
   You can use `-p` option to select what you want to have in your commit. If you want to add all files:
   ```bash
   $ git add *
   ```
   Commit your changes with a valid description of message. Use the following scheme:
  
  * ADD: <COMMIT_MESSAGE> - New feature, new functionality
  * CHG: <COMMIT_MESSAGE> - Changes in code
  * FIX: <#ISSUE_NUMBER> <COMMIT_MESSAGE> - Changes in code
  * INT: <COMMIT_MESSAGE> - Internal development (eg: Performance)
  
    An example:
    ```bash
    $ git commit -am "ADD: description of new feature"   
    ```  
    Make sure to mention issue number, while committing fixes, for example:
    ```bash
    $ git commit -am "FIX: #781 description of fix"   
    ```
  
10. Pull the latest code from master repository

    Before push changes, you should ensure that you have newest code in your repository:
    ```bash
    $ git pull upstream master   
    ```             
    Fix all of merge conflicts if exists and commit changes once again. It will simplify merge request job for our team.

11. Push your code to github
    ```bash
    $ git push -u origin <BRANCH_NAME>   
    ```
    > Option called `-u`  will automatically send information to github about branch where you are pushing. Next time github will know where to push by simple command `git push`.    
    
12. Create new pull request     

    Go to repository and press the button called "Pull request". Choose your branch and fill the comment by small description of your work. Each pull request should fix single change or apply single feature. 
    In next step, someone from our team will review your code and send you a feedback or just apply your commit by merging.
    Review the code and sending feedbacks by our development teamt improves application quality, so don't be disheartened.   
    After your code was accepted or declined you can delete branches you have worked on:
    ```bash
    $ git push origin --delete <BRANCH_NAME>   
    ```
    > To keep code quality every merge to the app code will picked up [Travis CI](http://travis-ci.org/) for automated run unit tests and [Coveralls](https://coveralls.io/) service to verify code coverage.     

## Code style

If you want to create new pull-request it is good to keep to the guidelines described below. 
We don't want to force you to use this code style for your application but remembering it, will reduce count of feedbacks before merge your pull request. Feel free to choose hat is better for you.

1. PHP Code Demarcation

   PHP code **MUST** use the long <?php ?> tags; it **MUST NOT** use the other tag variations.
    
2. Files **MUST** use only UTF-8 without BOM for PHP code.
3. Indentation **MUST** consist of 4 spaces. Tabs **MUST NOT** be used for indentation.
4. Class names **MUST** be declared in StudlyCaps and **MUST** contain `Antares` namespace.
5. Class constants **MUST** be declared in all upper case with underscore separators:
   ```php
   <?php
   class Foo
   {
       const APP_NAME='Antares';
   }
   ``` 

6. Method names **MUST** be declared in camelCase.
7. Property names **MUST** be declared in camelCase:
   ```php
   <?php
   class Foo
   {
       public $publicProp;
       protected $protectedProp;
       private $privateProp;
   }
   ``` 
8. Always elseif instead of else if.

9. All documentation blocks ("docblocks") **MUST** be compatible with the phpDocumentor format. 

10. Every file that contains PHP code **MUST** have a docblock at the top of the file that contains phpDocumentor tags in following format:
   ```php
   /**
    * Part of the Antares Project package.
    *
    * NOTICE OF LICENSE
    *
    * Licensed under the 3-clause BSD License.
    *
    * This source file is subject to the 3-clause BSD License that is
    * bundled with this package in the LICENSE file.
    *
    * @package    <PACKAGE_NAME>
    * @version    <VERSION>
    * @author     <AUTHOR>
    * @author     <AUTHOR>  
    * @license    BSD License (3-clause)
    * @copyright  (c) 2017, Antares Project
    * @link       http://antaresproject.io
    */
   ```
11. Every class **MAY** have a docblock that contains description of class details.

12. Doc block for property **MUST** declare variables types and **MUST** contain description of property destination of use.
   
   `@param`, `@propery` ,`@var` **MUST** declare one of types: `boolean`, `integer`, `String`, `array`, `null`, classnames such as `Collection` and for types arrays use `Classname[]`.
   Description of property **MUST NOT** have more than 255 characters. An example:
   ```php
   <?php
   class Foo
   {
       /**
        * This is description of $publicProp
        *
        * @var String
        */
        public $publicProp;
   }   
   ```
   
13. Doc block for methods and functions **MUST** declare return type and **MUST** contain description or **MUST** have `{@inheritdoc}` when doc section is the same in parent class.
   
   `@return` **MUST** declare one of types: `boolean`, `integer`, `String`, `array`, `null`, `void`, classnames such as `Collection` and for types arrays use `Classname[]`.
   Description of method or function **MUST NOT** have more than 255 characters. An example:
   ```php
   <?php
   class Foo
   {
       /**
        * {@inheritdoc}
        */
       public function register()
       {
          parent::register();
          $this->commands([ModuleCommand::class]);
       }
      /**
       * Boot extension routing.
       *
       * @return void
       */
       protected function loadRoutes()
       {
          $this->loadBackendRoutesFrom(__DIR__ . "/backend.php");
       }    
   }   
   ```
   If a function or method may throw an exception, use one `@throws` for each discrete exception thrown.
14. Line Termination

    Lines **MUST** end with a single linefeed (LF - 0x0A) as follows the Unix text file convention. The last line of a file **MUST NOT** end in a linefeed. 

15. Namespaces

    Namespaces **MUST** contain only alpha characters, the underscore, and, of course, the namespace separator (\\).
    
16. Namespace Aliases
    
    Namespace Aliases **MUST** contain only alpha characters.
    
17. Filenames
    
    All other PHP files **MUST** only use alphanumeric characters, underscores, and the dash character (-). Spaces are not allowed.     

## Running phpunit tests

To run tests:

1. Clone the project repository from Antares Project organization:

    ```bash
    $ git clone https://github.com/antaresproject/project.git -b <BRANCH> <DIRECTORY>
    $ cd <DIRECTORY>
    ```
    
2. Install dependencies via composer:

    ```bash
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar install
    ```
   More information about environment configuration you can found in [Manual Installation Guide](../installation/installation_manual.md).

3. Run the tests via phpunit, like in this example:
    ```bash
    $ ./vendor/bin/phpunit -c src/components/automation/phpunit.xml
    ```    
    Edit phpunit.xml if you want to achieve more flexible functionality to test.

    > Every commit to master Antares repository will run [Travis CI](http://travis-ci.org/) build job to check unit tests and [Coveralls](https://coveralls.io/) service to verify code coverage. 
 
# Versioning
 
 In general, Antares Project follows the [Semantic Versioning](http://semver.org/) as `<major>.<minor>.<patch>`.
 
## Patch Releases
    
   * Based on a branch name 0.9.Y (eg: 0.9.2)
   * May contain bug fixes and minor features, never contains major features
   * Has 100% backward compatibility
   * Release cycle is very often
   
## Minor Releases
    
   * Based on a branch name 0.X.Y (eg: 0.8.Y)
   * Contain minor features and bug fixes merged from patch releases
   * Contain new features and important bug fixes
   * May require pre-releases from patches
   * Requires major news releases and marketing effort
   
## Major Releases
   
   * Not planned
   