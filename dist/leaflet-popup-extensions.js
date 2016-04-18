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
		  this._content = this.options.getContent.apply(this.options.context);

		//Original function/method
    _updateContent.apply(this, arguments);

	}} (L.Popup.prototype._updateContent);



	//Overwrite Popup._getEvents to add the map-events listed in options.updateOnMapEvents
	L.Popup.prototype._getEvents = function (_getEvents) {
		return function () {
		//Original function/method
		var events = _getEvents.apply(this, arguments);

		//Add the events the fire update
		if (this.options.updateOnMapEvents)
		  events[this.options.updateOnMapEvents] = this._updateContent;

		return events;
	}} (L.Popup.prototype._getEvents);



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



