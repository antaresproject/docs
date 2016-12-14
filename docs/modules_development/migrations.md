#Migrations  

[TOC]

##Basic Migration File  

The migration files do not need to be a part of a component if the component does not require appropriate structure in database to operate. More information about catalogues' structure for the migration files can be found [here](https://inbssoftware.atlassian.net/wiki/pages/createpage.action?spaceKey=AS&title=Creating+new+component&linkCreation=true&fromPageId=21856335).

Example of use (file 2015_07_24_082030_foo_table):

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
    
* The 'up' method is responsible for creation of a structure and is launched during component's installation.
* The 'down' method is responsible for removal of a structure and is launched during component's uninstall.

##Structure's Import Based on the SQL File  

In one of the migration files it is possible to determine any quantity of tables to create, therefore, it is possible to create any quantity of migration files.

Sometimes, the process of creating migration files may become tiring because of the complex structure. In such a situation it is possible to import a scheme using sql files.

Example of use (file 2015_07_24_082030_foo_schema.php):

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
    
##ACL Migration File  

The task of ACL migration file is the arrangement of access rules facilitating the use of application's resources by different groups of users. The arrangement of rules are available directly after the component's installation.

The structure of such a file may be presented as below:

    <?php
     
    use Illuminate\Database\Migrations\Migration;
    use Antares\Acl\Database\Migration as AclMigration;
    use Antares\FooServiceProvider\FooServiceProvider;
     
    class FooAcl extends Migration
    {
     
        /**
         * @var AclMigration
         */
        protected $aclMigration;
     
        /**
         * a constructor, creation of the migration file for a component
         */
        public function __construct()
        {
            /** name "foo" is a brief component's name, identical just like in the manifest.json file **/
            $this->aclMigration = new AclMigration(app(), 'foo');
        }
     
        /**
         * downloading of the access rules from the static acl() method from the service provider and import
         */
        public function up()
        {
            $this->aclMigration->up(FooServiceProvider::acl());
        }
     
        /**
         * removal of the access rules
         */
        public function down()
        {
            $this->aclMigration->down();
        }
     
    }
    
In the constructor of the migration class, creation of an object which will import the rules takes place. The 'up' method is responsible for the rules' import to the data base, whereas the 'down' method removes the rules. The 'up' method is done during the component's installation, whereas the 'down' method is applied while uninstalling. More information about the construction of the 'acl' method in the service provider, can be found [here](https://inbssoftware.atlassian.net/wiki/display/AS/Service+Providers)

##Seeder  

The seeder is responsible for filling the base's structure with data. It consists of two methods:

* 'run' - responsible for adding the data, which is launched during the component's installation
* 'down' - responsible for data removal, which is launched when the component is uninstalled

An example of a solution:

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
