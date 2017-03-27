# Logs  

[TOC]

Logger is a set of functionalities which enables following the actions undertaken by the users of the system as well as the system itself and processes which are connected with it. A standard mechanism made accessible by the Laravel environment based on collecting logs into a file is used inside the system:

```php
try {
    /**
     * logic
     */
} catch (Exception $e) {
    \Illuminate\Support\Facades\Log::warning($e);
}
```

Details concerning the settings can be found in [documentation](https://laravel.com/docs/5.2/errors). Logs' files are stored in the location:

```console
storage\logs
```

Loggers' operation is strictly connected with a component of the same name. More information can be found [here](../core_modules/logger.md).
