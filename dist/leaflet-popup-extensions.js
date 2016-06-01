/****************************************************************************
	leaflet-popup-extensions.js,

	(c) 2016, FCOO

	https://github.com/FCOO/leaflet-popup-extensions
	https://github.com/FCOO

****************************************************************************/
;(function ($, L, window, document, undefined) {
	"use strict";

	L.Popup.mergeOptions({
		getContent				: null,
		context						: null,
		updateOnMapEvents	: ''
	});


	//Overwrite Popup._updateContent to use options.getContent when updating the content
	L.Popup.prototype._updateContent = function (_updateContent) {
		return function () {

		//Get the contents from the options.getContent function
		if (this.options.getContent)
		  this._content = this.options.getContent.apply(this.options.context, [this] );

		//Original function/method
    _updateContent.apply(this, arguments);

	}} (L.Popup.prototype._updateContent);



	//Overwrite Popup._getEvents (leaflet version <= 0.7.7) and
	//Popup.getEvents (leaflet version >= 1.0.0) to add the
	//map-events listed in options.updateOnMapEvents
	function newGetEvents( originalGetEvents ) {
			return function () {
			//Original function/method
			var events = originalGetEvents.apply(this, arguments);

			//Add the events the fire update
			if (this.options.updateOnMapEvents){
				var updateOnMapEventList = this.options.updateOnMapEvents.split(',').join(' ').split(' ');
				for (var i=0; i<updateOnMapEventList.length; i++ )
					 events[updateOnMapEventList[i]] = this._updateContent;
			}
			return events;
		};
	}

	//Verision <= 0.7.7
	if (L.Popup.prototype._getEvents)
		L.Popup.prototype._getEvents = newGetEvents( L.Popup.prototype._getEvents );

	//Verision >= 1.0.0
	if (L.Popup.prototype.getEvents)
		L.Popup.prototype.getEvents = newGetEvents( L.Popup.prototype.getEvents );


	//OR/AND extend a prototype-method (METHOD) of a leaflet {CLASS}

	/***********************************************************
	Extend the L.{CLASS}.{METHOD} to do something more
	***********************************************************/
/*
	L.{CLASS}.prototype.{METHOD} = function ({METHOD}) {
		return function () {
    //Original function/method
    {METHOD}.apply(this, arguments);

    //New extended code
    ......extra code

		}
	} (L.{CLASS}.prototype.{METHOD});
*/


}(jQuery, L, this, document));



