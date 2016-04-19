# leaflet-popup-extensions
>


## Description
Extensions to leaflet popup: Dynamic contents, update on map-events, resizeable


## Installation
### bower
`bower install https://github.com/FCOO/leaflet-popup-extensions.git --save`

## Demo
http://FCOO.github.io/leaflet-popup-extensions/demo/ 

## Usage

### Dynamic creating content
	var mypopup = L.popup({
	               getContent: function( popup ){ return 'This is the content'; },
	               context   : null
	});

`getContent` returns a string or DOM-element that is the contents of the popup
`context`	is the optional context of `getContent`

### Update content on map-events
	var mypopup = L.popup({
	               updateOnMapEvents: "zoomend latlngformatchange"
	});

When any of the events in `updateOnMapEvents` is fired on the map, the popup is updated. 

#### Resizable popup

** TODO **

## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/leaflet-popup-extensions/LICENSE).

Copyright (c) 2016 [FCOO](https://github.com/FCOO)

## Contact information

[Niels Holt](http://github.com/NielsHolt)

