# Contribution Guide

[TOC]

Antares is an open-source software. It means that anyone can contribute to its development.
**Please note:** only PHP 7 compatibility issues are acceptable.

When contributing to Antares Project repository you have to follow this guide and it's workflow. 
It will help Antares Development Team to resolve the requests quickly. Following below guidelines will result less work for both you and our team.

## Contributing Bugfixes or Features

First step is to prepare a repository from which our team can pull into the Antares Project repository.
 
1. Make sure there is an issue you are working on

    All new features and issues should have an issue in discussion and documentation. Take a look through the existing list of issues which match the contribution you want to create. If exists, please leave a comment on that issue indicating you intend to work on that item. If not available , please open new issue for your work. This will allow our team to review your suggestion.

2. Fork the one of the Antares Project repositories on GitHub.

    More information about how to create new fork can be found [here](http://help.github.com/fork-a-repo).

3. Clone repository locally and enter it as the following example:

        $ git clone git@github.com:<YOUR-GITHUB-USERNAME>/automation.git <DIRECTORY>
        $ cd </DIRECTORY>

    More information about how to setup your GIT installation to work with Github can be found [here](https://help.github.com/articles/set-up-git/). 

4. Add an additional upstream with git remote as
```bash
$ git remote add upstream git://github.com/antaresproject/automation.git
```

5. Get the latest code from the main repository
```bash
$ git fetch upstream
```
It is very important to start work from the newest code. There may be a changes which may affect your implementation.

6. Create a new branch for your work based on the current master branch
```bash
$ git checkout upstream/master
$ git checkout -b <NAME_OF_YOUR_BRANCH>
```
Remember that each bugfix or change should go in a separated branch. Branch name should describe an issue you were working on.

7. Write your code

    Make sure that your code works as you've expected. If you've been working on a bug, take a look on unit tests and code coverage before making a pull request. **Code coverage indicator cannot be decreased** with your code update, otherwise your fix may not be accepted (depends on what kind of fix you are working on). In a case of a new feature, tested and covered code is always welcome - increase your code quality and improve verification process of your contribution.

8. Changelog

    Edit the CHANGELOG.md file to include the description of your changes. The changelog should be grouped by type:

* New - New features
* Changes - Changes of current code
* Fixes - Fixes for reported issues
* Internal - Internal development (eg.: Performance)
* Other  - All others

    If you've been working on a fix which resolves a reported issue, you should add a new line on the top of the "Fixes" section. Here is an example

```bash
 **Fixes**
 <#ISSUE_NUM> a description of bug
``` 
 
    For rest of updates just add a description into sections which describe your work.  
  
9. Commit your work

    First of all, add the files that you want to push into the repository:

```bash
$ git add PATH_TO_YOUR_FILE
```

You can use `-p` option to select what files do you want to have in your commit. If you want to add all the files:

```bash
$ git add *
```

Commit your changes with a valid description. Use the following scheme:
  
* ADD: <COMMIT_MESSAGE> - New feature, new functionality
* CHG: <COMMIT_MESSAGE> - Changes in code
* FIX: <#ISSUE_NUMBER> <COMMIT_MESSAGE> - Changes in code
* INT: <COMMIT_MESSAGE> - Internal development (eg: Performance)
  
An example:

```bash
$ git commit -am "ADD: description of new feature"
``` 

Make sure to mention an issue number while committing fixes, for example:

```bash
$ git commit -am "FIX: #781 description of fix"
```

  
10. Pull the latest code from the master repository

Before you push the changes, you should ensure that you have the latest code in your repository:

```bash
$ git pull upstream master
```

Fix all of the merge conflicts if exist and commit changes once again. It will simplify merging process for our team.

11. Push your code to GitHub

```bash
$ git push -u origin <BRANCH_NAME>
```

Option called `-u`  will automatically send information to GitHub about branch where you are pushing. Next time GitHub will know where to push by simple command `git push`.

12. Create a new pull request 

Go to repository and press the button called "Pull request". Choose your branch and fill the comment by small description of your work. Each pull request should fix single issue or apply a single feature. 
In the next step, someone from our team will review your code and send you a feedback or just apply your commit by merging.
Reviewing the code and sending you feedback by our development team improves the application quality, so don't become easily discouraged. This is just normal and natural process. :)
After your code is accepted or declined you can delete branches you have worked on:

```bash
$ git push origin --delete <BRANCH_NAME>
```

**Please note:** To keep high code quality, every merge request will be picked up with [Travis CI](http://travis-ci.org/) for automated unit tests and [Coveralls](https://coveralls.io/) to verify code coverage. 

## Code style

If you want to create a new pull request, please follow the guidelines described below regarding the code standard. 
We don't want to force you to use this code style for your own application/repository but following it, will reduce amount of feedbacks before merging your pull request. 

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

        <?php
        class Foo
        {
        public $publicProp;
        protected $protectedProp;
        private $privateProp;
        }  

8. Always **elseif** instead of else if.

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
* @package<PACKAGE_NAME>
* @version<VERSION>
* @author <AUTHOR>
* @author <AUTHOR>  
* @licenseBSD License (3-clause)
* @copyright  (c) 2017, Antares
* @linkhttp://antaresproject.io
*/ 
```  

11. Every class **MAY** have a docblock that contains description of class details.

12. Docblock for property **MUST** declare variables types and **MUST** contain description of property destination of use.

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

To run the tests:

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

More information about environment configuration you can found in [Manual Installation Guide](../installation/manual_installation_guide.md).

3. Run the tests via phpunit, like in this example:
```bash
$ ./vendor/bin/phpunit -c src/components/automation/phpunit.xml
```

Edit phpunit.xml if you want to achieve more flexible functionality to test.

Every commit to master Antares repository will run [Travis CI](http://travis-ci.org/) build job to check unit tests and [Coveralls](https://coveralls.io/) service to verify code coverage. 

 
## Versioning
 
 Antares Project follows the [Semantic Versioning](http://semver.org/) as `<major>.<minor>.<patch>`.
 
### Patch Releases

* Based on a branch name 0.9.Y (eg: 0.9.2)
* May contain bug fixes and minor features, never contains major features
* Has 100% backward compatibility
* Release cycle is very often

### Minor Releases

* Based on a branch name 0.X.Y (eg: 0.8.Y)
* Contain minor features and bug fixes merged from patch releases
* Contain new features and important bug fixes
* May require pre-releases from patches
* Requires major news releases and marketing effort

### Major Releases

* (soon)
