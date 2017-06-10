# Logs  

[TOC]

## Introduction

Logger is a set of functionalities that enables the monitoring of the actions taken by the users of the system as well as the system itself as well as processes connected with it. 

## An example

A standard mechanism offered by the Laravel environment based on collecting the logs into a file is used inside the system:

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

```bash
storage\logs
```

Loggers' operation is strictly connected with a component of the same name. More information can be found [here](../core_modules/logger.md).
