# Branding

[TOC]

## Introduction

The module gives a possibility of dividing the application into brands. 

By default, one main brand which is simultaneously the default brand is set during the system installation. 
Brands' functionalities provides the possibility of defining own color settings for the whole application, 
default composition of e-mail templates (header, style, footer), url, date and language settings. 
Dividing the application into areas is a superior function in relation to brands. 
Area is a level of system's operation, which means that different groups of users may have different settings of the same brands. 
For instance, the users at the *redactors* level for example may have different color settings, 
footer and heading for outgoing e-mails, whereas the *administrators* level may have different settings of the same brand. 
Users' and ui components settings are related to brand.
 
This means that a group of users e.g. *redactors* may have different resource access settings in one brand, 
in other brand these settings may be different. Thus, ui components settings (e.g. location) in one brand may be different in another.

## Brand configuration
  
Brand's configuration is available at `Branding` under `Configuration` section in main menu.

![brand_edit](../img/docs/core_modules/branding/brand_edit.PNG)
   
The menu dedicated to particular brand's settings can be found on the left. 

Description of particular form's fields:
1. Brand name - name of the brand.
2. Maintenance mode - a synonym for stat.
3. Brand url - url related to brand. When entering the url the application switches directly into brand.
4. Date format - date format recognized within brand.
5. Default country - the default country which is used for the billing and conversion rate needs.
6. Default language - application's default language.

## Email branding

The email branding position renders available e-mail's new template defining form. 
The template is used when sending an e-mail from the system, which is based on the [notifications](../core_modules/notifications.md) module:

![brand_email](../img/docs/core_modules/branding/brand_email.PNG)
  
Inline code editor is placed on the left. Each change is visible in the preview **on the right**. Changes are mirrored in the real mode. Above, the following tabs can be found:

1. Header - header is responsible for message heading
2. Styles - message css styles
3. Footer - message footer

The variables which can be pinned directly to content of the created template can be found at the top.

## Area branding

The menu on the left has the following positions:
1. Admin area
2. User area

These positions are areas (levels) of particular user groups. Each group enables color edit and the general application's design:

![brand_area](../img/docs/core_modules/branding/brand_area.PNG)  
  
Description of particular form's fields:

* Composition - menu's composition which determines location and size
* Brand logo - logotypes ascribed to the application, Logo is the main logotype (presented at the login page and at the application's website for a wide menu), Favicon - application's icon:
* Brand colors - color ascribed to brand, it enables particular application's sections color edit

  