# Cryptor
  
[TOC]  

## Introduction

The platform provides a set of constructions that enable the encryption of data included in the tables of a database. Such a solution increases the security level of the application. Only the columns of tables with data of string type can be subject to encryption (in particular the 'text' and 'varchar' types). 

> The default path of cryptor sources is `src/core/src/utils/security/`.

## Configuration

The configuration that contains information about parameters of cryptors is kept in a file located in:

```php
core\foundation\resources\config\db_cryptor.php
```

The configuration of the cryptor is the following:

```php
return
  [
      /**
       * whether cryptor is enabled or disabled
       */
       'enabled'      => true,
      /**
       * name of cast column to cryptor method
       */
       'cast_name'    => 'aes',
      /**
       * which type of columns can be casted
       */
       'column_types' => [
            'string'
       ],
      /**
       * cryptor configuration
       */
       'config'       => [
          'method'     => "AES-256-CBC",
          'secret_key' => 'This is my secret key',
          'secret_iv'  => 'This is my secret iv'
       ]
  ];
```

Give proper attention to the 'config' section. The keys `secret_key` and `secret_iv` are the encrypting key and the salt accordingly.

If the encyption of tables in a database is enabled, the encrypted strings are saved in the fields of columns defined in a configuration. An example of a configuration:

```php
'cast'               => [
    'tbl_users' => [
        'firstname', 'lastname'
    ]
],
```

The example above contains the name of the table (the key) and the array of columns that will be encypted. For example, the addition of a new user will result in the adding of the following entry in the table:

![AT_CRYPT1](../img/docs/services/cryptor/AT_CRYPT1.png)
  
The fields `firstname` and `lastname` in the edition form are presented in the decoded form as below:

![AT_CRYPT2](../img/docs/services/cryptor/AT_CRYPT2.png)
  
In turn, disabling of the encryption will display:

![AT_CRYPT3](../img/docs/services/cryptor/AT_CRYPT3.png)
  
When you work with the cryptor remember to define the encryption configuration in the main configuration file of the module under the `cast` key.
