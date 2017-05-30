# Migrations  

[TOC]

## Introduction

Migrations are files containing scripts to create database schema which your module will use. 
It is launched while module starts to install or uninstall. Every module which use database to 
deliver its own functionality should define tables schema in those files. In case
when functionality requires default data in database after installation, there is a different type of
migration called seed. Antares uses [Laravel migrations](https://laravel.com/docs/5.4/migrations) as default base. 

> The path of migrations directory is `src/modules/<module_name>/resources/database/migrations/` (e.g. `src/modules/sample_module/resources/database/migrations/2015_07_24_082030_custom_module_table.php`).

## Basic Migration File  

The migration files do not need to be a part of a component if the component does not require 
appropriate structure in database to operate. More information about catalogues' structure 
for the migration files can be found [here](../antares_concepts/files_structure.md).

Example of use (`file 2015_07_24_082030_foo_table`):

```php
    <?php
     
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
     
    class FooTable extends Migration
    {
     
        /**
         * Migration start
         *
         * @return void
         */
        public function up()
        {
            Schema::create('tbl_foo', function(Blueprint $table) {
                $table->increments('id');
                $table->integer('user_id')->unsigned()->index('user_id');
                $table->string('name');
                $table->string('description')->nullable();
            });
      
            //connection of a table with users' table by foreign key
            Schema::table('tbl_foo', function(Blueprint $table) {
                $table->foreign('user_id', 'tbl_foo_ibfk_1')->references('id')->on('tbl_users')->onUpdate('NO ACTION')->onDelete('CASCADE');
            });
        }
     
        /**
         * Base's structure restoration from before the migration (reverse)
         *
         * @return void
         */
        public function down()
        {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            Schema::dropIfExists('tbl_foo');
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
     
    }
```    
    
* The *up* method is responsible for creation of a structure and is launched during component's installation.
* The *down* method is responsible for removal of a structure and is launched during component's uninstall.

## Structure's Import Based On The SQL File  

In one of the migration files it is possible to determine any quantity of tables to create, therefore, it is possible to create any quantity of migration files.

Sometimes, the process of creating migration files may become tiring because of the complex structure. In such a situation it is possible to import a scheme using sql files.

Example of use (`file 2015_07_24_082030_foo_schema.php`):

```php
    <?php
     
    use Illuminate\Database\Migrations\Migration;
    use Exception;
     
    class FooSchema extends Migration
    {
     
        /**
         * Creation of component's table structure based on sql file
         *
         * @return void
         */
        public function up()
        {
            DB::transaction(function() {
                DB::unprepared($this->readSchema('foo_up.sql'));
            });
        }
     
        /**
         * Removal of tables' structure (foo_down.sql file)
         *
         * @return void
         */
        public function down()
        {
            DB::transaction(function() {
                DB::unprepared($this->readSchema('foo_down.sql'));
            });
        }
     
        /**
         * Reading sql file's content
         *
         * @param String $filename
         * @return String
         * @throws Exception
         */
        protected function readSchema($filename)
        {
            $schemaPath = __DIR__ . '/schemas/' . $filename;
            if (!file_exists($schemaPath)) {
                throw new Exception('Schema file not exists.');
            }
            return file_get_contents($schemaPath);
        }
     
    }
```

## ACL Migration File  (removed)

This way to migrating ACL has been removed and should be done in the new way describes in the dedicated section about ACL.

## Seeder  

The seeder is responsible for filling the base's structure with data. It consists of two methods:

* *run* - responsible for adding the data, which is launched during the component's installation
* *down* - responsible for data removal, which is launched when the component is uninstalled

An example of a solution:

```php
    <?php
     
    use Illuminate\Database\Seeder;
     
    class FooSeeder extends Seeder
    {
     
        /**
         * Adds data to the tables
         *
         * @return void
         */
        public function run()
        {
            $this->down();
     
            DB::table('tbl_foo')->insert([
                ['user_id' => 1, 'name' => 'Foo', 'description' => 'Sample foo description'],
            ]);
        }
         
        /**
         * Removes data from the tables
         *
         * @return void
         */
        public function down()
        {
            DB::transaction(function() {
                DB::table('tbl_foo')->delete();
            });
        }
     
    }
```    
