# Welcome to MkDocs

For full documentation visit [mkdocs.org](http://mkdocs.org).

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs help` - Print this help message.

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.


```php
    <?php
     
    namespace Antares\Foo\Http\Controllers;
     
    use Antares\Foundation\Http\Controllers\BaseController;
     
    class FrontController extends BaseController
    {
     
        /**
         * Directions for access rules to the controller's action
         */
        public function setupMiddleware()
        {
            ;
        }
     
        /**
         * Usually a list presentation
         */
        public function index()
        {
             
        }
     
        /**
         * Usually a data presentation of a single record
         */
        public function show($id)
        {
             
        }
     
        /**
         * Saving the new record
         */
        public function store()
        {
             
        }
     
        /**
         * An update of the existing record
         */
        public function update()
        {
             
        }
     
        /**
         * Removal of the record
         */
        public function destroy()
        {
             
        }
     
    }
```    