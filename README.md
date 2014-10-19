sticky.js
=========

> A jQuery plugin for fixing elements to the top of the page on scroll

##Overview

This plugin takes `position: fixed` a step further by managing an element's position and only applying fixed position if the element is leaving the top of the scroll area.

##Options

**getMaxVerticalHeight**: function

Description: Limits the distance an element can travel on the vertical plane. This is helpful in cases where an element may collide into other elements below it (ex. footer). *Value is cached on initialization and on window resize.*

Default: 
```
function() { 
  return 0; 
}
```

**minWidth**: integer

Description: Switches an element back to `position: static` once the window width is less than the value provided.

Default: 0

##Methods

**update()** - Forces an update of the element's position

##License

MIT &copy; Marc J Keppler
