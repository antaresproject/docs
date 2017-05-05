# Contribution Guide

[TOC]

Antares Project is an open-source software. It means that anyone can contribute to its development.

## Contributing Bugfixes or Features

First step is to prepare a repository from which our team can pull into the Antares Project repository. 

* Fork the repository from Antares Project organization

* Clone repository locally and enter it as the following example:
    ```bash
    $ git clone https://github.com/antaresproject/automation.git -b <branch> <directory>
    $ cd <directory>
    ```
* Add a remote to the fork (example of github account):
    ```bash
    $ git remote add {username} git@github.com:{username}/automation.git
    $ git fetch {username}
    ```
* Create a local branch for the bugfix or feature.
* Commit and push changes to your repository.
* Create new pull request with your changes which should be included.

## Running phpunit tests

To run tests:

* Clone the project repository from Antares Project organization:

    ```bash
    $ git clone https://github.com/antaresproject/project.git -b <branch> <directory>
    $ cd <directory>
    ```
    
* Install dependencies via composer:

    ```bash
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar install
    ```
   More information about environment configuration you can found in [Manual Installation Guide](../installation/installation_manual.md).

* Run the tests via phpunit, like in this example:
    ```bash
    $ ./vendor/bin/phpunit -c src/components/automation/phpunit.xml
    ```    
  Edit phpunit.xml if you want to achieve more flexible functionality to test.

 
 
 