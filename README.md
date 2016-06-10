# leaflet-popup-extensions
>


## Description
Extensions to leaflet popup: Dynamic contents, update on map-events, header, and buttons
TODO: 


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

#### Buttons
There are tree standard buttons available: `[Ok]`, `[Remove]`, and `[Close]`
Individual buttons are added by setting `options.buttons` 
   
`[Remove]` and `[Close]` have a default onClick-function while `[Ok]` needs a onClick-function
To add the default buttons use

	L.popup({ onOk: function( onClickObj ){..} });  //[Ok]
	L.popup({ buttonRemove: true });                //[Remove]
	L.popup({ buttonClose: true });                 //[Close]	


Individual buttons are added by setting `options.buttons` as described in [fcoo/leaflet-control-button-group](https://github.com/FCOO/leaflet-control-button-group)

To align the buttons horizontal or vertical set the option `buttonHorizontal`

	{buttonHorizontal: true}  //Buttons are aligned horizontal (default)
	{buttonHorizontal: false} //Buttons are stacked vertical


##### onClickObj
The object passed to the onClick-functions contains:

	{id, latLng, button, popup, source, map, selected}

(`source` is the object (if any) where the popup was opened on)

#### Resizeable

** TODO **

## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/leaflet-popup-extensions/LICENSE).

Copyright (c) 2016 [FCOO](https://github.com/FCOO)

## Contact information

[Niels Holt](http://github.com/NielsHolt)

