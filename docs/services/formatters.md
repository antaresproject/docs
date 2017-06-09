# Formatters  

[TOC]

## Introduction  

Formatters are tools intended for streamlining the data presentation. They format, i.e. process the data in order to achieve the shape compatible with the project's requirements. The example can be a data formatter (e.g. to the shape YYYY-MM-DD) or a formatter that defines the monetary value (e.g. periods instead of commas, the number of decimal places, leading zeros, etc.). The application renders available the following list of formatters:

## Available formatters

### format_x_days  

Enables data conversion to a more transparent format by changing the value of a date to the format presenting the amount of time that passed until now. Take a look at the example:

```php 
format_x_days('2016-07-19 17:00:00')
```

This, in turn, will display:

![AT_FORMATT01](../img/docs/services/formatters/AT_FORMATT01.png)
  
When you hover the mouse cursor on a value you will be able to see the full date in a tooltip. The first argument of the method is the date in any correct format, the second one is a flag (true/ false) that specifies whether a value should be decorated with the html code for the purpose of the tooltip operation. The default value of a flag is 'true', in case of the 'false' value the formatter will reply with a value without the html.

In the twig, the use of the formatter is the same, so:
    
```twig    
 {{ format_x_days('2016-07-19 17:00:00') }}
```
