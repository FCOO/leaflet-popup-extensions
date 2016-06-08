# leaflet-popup-extensions
>


## Description
Extensions to leaflet popup: Dynamic contents, update on map-events, resizeable, header, and buttons


## Installation
### bower
`bower install https://github.com/FCOO/leaflet-popup-extensions.git --save`

## Demo
http://FCOO.github.io/leaflet-popup-extensions/demo/ 

## Usage

### Dynamic creating content
	var myPopup = L.popup({
	               getContent: function( popup ){ return 'This is the content'; },
	               context   : null
	});

`getContent` returns a string or DOM-element that is the contents of the popup
`context`	is the optional context of `getContent`

### Update content on map-events
	var myPopup = L.popup({
	               updateOnMapEvents: "zoomend latlngformatchange"
	});

When any of the events in `updateOnMapEvents` is fired on the map, the popup is updated. 

#### Header and Icon
	var myPopup = L.popup({
	               header: "This is a header",
	               icon  : "map-marker"
	});

Will add a header and icon to the popup next to the close-button
`header` is the header text
`icon` is the name of a [font-awesome icon](http://fontawesome.io/)



#### Resizeable popup

** TODO **

## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/leaflet-popup-extensions/LICENSE).

Copyright (c) 2016 [FCOO](https://github.com/FCOO)

## Contact information

[Niels Holt](http://github.com/NielsHolt)

