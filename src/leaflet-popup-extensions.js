/****************************************************************************
	leaflet-popup-extensions.js,

	(c) 2016, FCOO

	https://github.com/FCOO/leaflet-popup-extensions
	https://github.com/FCOO

****************************************************************************/
;(function ($, L, window, document, undefined) {
	"use strict";

	L.Popup.mergeOptions({
		header						: '',
		icon							: '',
		buttonOk					: false,
		buttonRemove			: false,
		buttonClose				: false,
		buttons						: [],
		buttonHorizontal	: true,
		getContent				: null,
		context						: null,
		updateOnMapEvents	: ''
	});

	//Extend L.Popup with const for standard buttonc
	L.extend(L.Popup, {
		//Const to define differnet formats
		BUTTON_OK			: {	id:'btnOk',			icon:'check',		text:'Ok',			hoverColor: 'green'},
		BUTTON_REMOVE	: {	id:'btnRemove',	icon:'trash-o', text:'Remove',												
											onClick: function(onClickObj){ 
												if (onClickObj.source && onClickObj.map)
													onClickObj.map.removeLayer(onClickObj.source);
											}
										},
		BUTTON_CLOSE	: {	id:'btnClose',		icon:'times',		text:'Close',		hoverColor: 'red',
											onClick: L.Popup.prototype._close }
	});

	//Extend the L.Popup._initLayout to check for extended contents and/or buttons and add the nodes accordingly
	L.Popup.prototype._initLayout = function (_initLayout) {
		return function () {
			//Original function/method
			_initLayout.apply(this, arguments);

			if (this.options.header || this.options.icon){
				//Extend the _wrapper with containers for header with text and/or icon
				this._headerContainer =
					$('<div>')
						.addClass('leaflet-popup-header')
						.css('max-width', this.options.maxWidth+'px')
						.prependTo( this._wrapper );

				if (this.options.icon){
				  this._headerContainer.addClass('icon');
					$('<i>').addClass('fa fa-'+this.options.icon).appendTo( this._headerContainer );
				}

				this._headerContainer.append( this.options.header );
			}
			else
				//Add padding to prevent context to coner topright close button
				$(this._wrapper).css('padding-top', '13px');

			//Extend the _wrapper with containers for buttons
			var buttons = [];

			if (this.options.buttonOk)
			  buttons.push( L.extend( {}, L.Popup.BUTTON_OK, { context: this } ) );

			if (this.options.buttonRemove)
			  buttons.push( L.extend( {}, L.Popup.BUTTON_REMOVE, { context: this } ) );

			for (var i=0; i<this.options.buttons.length; i++ )
			  buttons.push( L.extend( {}, this.options.buttons[i] ) );

			if (this.options.buttonClose)
			  buttons.push( L.extend( {}, L.Popup.BUTTON_CLOSE, { context: this } ) );

			if (buttons.length){
				this._buttonGroupContainer =
					$('<div>')
						.addClass('leaflet-popup-button-container')
						.css('maxWidth', this.options.maxWidth+'px')
						.appendTo( this._wrapper );
				this.buttonGroup = new L.Control.ButtonGroup({
					horizontal			: this.options.buttonHorizontal,
					small						: true,
					equalWidth			: true,
					centerText			: true,
					separateButtons	: true,
					onClickObj			: {popup: this, latLng: this.getLatLng(), source: this._source},
					buttons					: buttons
				});

				this.buttonGroup._map = this._map;
				this.buttonGroup.addButtons();
				this._buttonGroupContainer.append( this.buttonGroup._container );

			}

/*
			if (this._source && this._source._extendPopup){
				this._extendPopup = this._source._extendPopup;

				var onlyExtendPopup = (this._content == L.onlyExtendPopupContent);
				if (onlyExtendPopup)
					this._extendContentNode = this._contentNode
				else {
					//Add the container for the open/close button and the container for the extended content
					this._extendButtonNode = L.DomUtil.create('div', 'leaflet-popup-extend-button', this._wrapper);
					this._extendButtonNode.innerHTML = L.popupExtendButton;
					this.extendButton = this._extendButtonNode.firstChild;
					L.DomEvent.on( this.extendButton, 'click', this.toggleExtendContent, this);
					L.DomEvent.on( this.extendButton, 'click', this.extendButton.blur, this.extendButton);

					this._extendContentNode = L.DomUtil.create('div', 'leaflet-popup-extend-content', this._wrapper);

					this.hideExtendContent(true);
				}

				var extendOptions = this._extendPopup.options || {};
				if (extendOptions.className)
					L.DomUtil.addClass(this._extendContentNode, extendOptions.className);
			}
*/
		};
	} (L.Popup.prototype._initLayout);



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



