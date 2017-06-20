# Notifier  

[TOC]

## Introduction  

Notifier is a set of tools supporting the design of the notifications sent to the end user. It enables sending a notification (e-mail, SMS) from the system and works closely with the majority of components.

> The path of notification seeders directory is `src/modules/<module_name>/resources/database/seeds/` (e.g. `src/modules/sample_module/resources/database/seeds/ModuleEmailNotification.php`).

## Usage  

### E-mail  

The adapter below is responsible for sending all e-mail notifications:

```php
Antares\Notifier\Adapter\EmailAdapter
```

Access to the adapter is possible through the synonym below:

```php
antares.notifier.email
```

The code below presents solutions to send an e-mail message to the currently logged in user:

```php
/**
 * Sends email message
 *
 * @return boolean
 */
public function sendEmailNotification(){
    $view=view('antares/foo::email.foo_notification');       
    return app('antares.notifier.email')->send($view, [], function($m) {
                $m->to(user());
                $m->subject('Sample notification from foo');
            });
}
```

In the example above, the argument of the anonymous funtion is `$m`, it is the Swiftmailer's object. In order for the message to be sent, the user's object should have the 'email' attribute. It is also possible to send a message to many recipients:

```php
$recipients=User::where('active',1)->get();
$m->to($recipients);
```

As well as send a message directly to an e-mail address:

```php
$m->to(['user.foo@example.com]);
```

More information about the parameters of sending a message can be found in the [SwiftMailer](http://swiftmailer.org/) documentation used by Laravel.

### Sms  

In the case of SMS messages, the following class is an adapter:

```php
Antares\Notifier\Adapter\FastSmsAdapter
```

The synonym is:

```php
antares.notifier.sms
```

Sending the message is executed by the code below:

```php
/**
 * Sends sms message
 *
 * @return boolean
 */
public function sendSmsNotification(){
    $view=view('antares/foo::sms.foo_notification');       
    return app('antares.notifier.sms')->send($view, [], function($m) {
                $m->to(user());
                $m->subject('Sample notification from foo');
            });
}
```

In the example above, the user's object should have the `phone` attribute. Similarly, as in the case of e-mail messages, it is possible to send an SMS to many recipients as well as send the message directly to the recipient's phone number.

## Configuration  

### E-mail  

Configuration of the default adapter for sending e-mail messages is described in the configuration file in the following location:

```bash
core\notifier\resources\config\config.php
```

Sections responsible for configuration are:

```php
'email'   => [
    'adapters' => [
        'default'     => 'swiftMailer',
        'swiftMailer' => [
            'model' => EmailAdapter::class,
        ]
    ]
],
'system'  => [
    'adapters' => [
        'default'     => 'swiftMailer',
        'swiftMailer' => [
            'model' => EmailAdapter::class,
        ]
    ]
]

```
Based on the above mentioned code, you can notice that in order to send e-mail messages and system notifications EmailAdapter is used. Such configuration enables upgrading the system with other adapters. Furthermore, EmailAdapter uses the outgoing e-mail server configuration and its settings can be found at the address:

```bash
/administrators/settings/mail
```

![AT_NOTI01.PNG](../img/docs/services/notifier/AT_NOTI01.PNG)
  
Saving the settings of the form above will result in filling the `tbl_antares_options` table where global settings of the whole application are gathered. The default configuration is determined in the configuration file of the `.env` environment or in the configuration file in the location:

```bash
resources\config\mail.php
```

### Sms  

Similarly to the e-mail messages, the configuration of the SMS adapter is located in the file:

```bash
core\notifier\resources\config\config.php
```

The section responsible for sending settings is:

```php
'sms'     => [
    'adapters' => [
        'default' => 'fastSms',
        'fastSms' => [
            'api'         => [
                'token'    => 'xyz',
                'login'    => 'foo@example.com',
                'password' => 'xyz',
                'url'      => 'https://my.fastsms.co.uk/api',
            ],
            'name'        => 'Fast SMS',
            'provider'    => '<a href="http://www.fastsms.co.uk/?a_aid=559b889916b99">www.fastsms.co.uk</a>',
            'link'        => '<a href="http://www.fastsms.co.uk/?a_aid=559b889916b99" target="_blank" style=" color: #4169E1;">Sign up for a free account</a> and get ten credits to try out Fastsms services. No billing info required!',
            'img'         => 'https://my.fastsms.co.uk/design/img/resellers/6/logo1.png',
            'description' => 'Fastsms is a top professional in the field of internet texting solutions as their structure covers more than 500 mobile networks in over 200 countries. What gives them a decided edge over other providers is a transparent pricing policy and unprecedented flexibility in the use of their services. There are no set-up costs or minimum usage requirements in Fastsms – you simply pay for the blocks of outgoing text credits and use them whenever you wish, as they have no expiry date.',
            'model'       => FastSmsAdapter::class,
            'codes'       => [
                '-100' => 'Not Enough Credits',
                '-101' => 'Invalid CreditID',
                '-200' => 'Invalid Contact',
                '-300' => 'General Database Error',
                '-301' => 'Unknown Error',
                '-302' => 'Return XML Error',
                '-303' => 'Received XML Error',
                '-400' => 'Some numbers in list failed',
                '-401' => 'Invalid Destination Address',
                '-402' => 'Invalid Source Address – Alphanumeric too long',
                '-403' => 'Invalid Source Address – Invalid Number',
                '-404' => 'Blank Body',
                '-405' => 'Invalid Validity Period',
                '-406' => 'No Route Available',
                '-407' => 'Invalid Schedule Date',
                '-408' => 'Distribution List is Empty',
                '-409' => 'Group is Empty',
                '-410' => 'Invalid Distribution List',
                '-411' => 'You have exceeded the limit of messages you can send in a single day to a single number',
                '-412' => 'Number is blacklisted',
                '-414' => 'Invalid Group',
                '-501' => 'Unknown Username/Password',
                '-502' => 'Unknown Action',
                '-503' => 'Unknown Message ID',
                '-504' => 'Invalid From Timestamp',
                '-505' => 'Invalid To Timestamp',
                '-506' => 'Source Address Not Allowed (Email2SMS)',
                '-507' => 'Invalid/Missing Details',
                '-508' => 'Error Creating User',
                '-509' => 'Unknown/Invalid User',
                '-510' => 'You cannot set a user’s credits to be less than 0',
                '-511' => 'The system is down for maintenance',
                '-512' => 'User Suspended',
                '-513' => 'License in use',
                '-514' => 'License expired',
                '-515' => 'No License available',
                '-516' => 'Unknown List',
                '-517' => 'Unable to create List',
                '-518' => 'Blank or Invalid Source Address',
                '-519' => 'Blank Message Body',
                '-520' => 'Unknown Group',
                '-601' => 'Unknown Report Type',
                '-701' => 'No UserID Specified',
                '-702' => 'Invalid Amount Specified',
                '-703' => 'Invalid Currency Requested'
            ]
        ]
    ]
]
```

More information on how the notifications operate can be found [here](../core-modules/notifications.md).
