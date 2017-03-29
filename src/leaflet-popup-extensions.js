/****************************************************************************
    leaflet-popup-extensions.js,

    (c) 2016, FCOO

    https://github.com/FCOO/leaflet-popup-extensions
    https://github.com/FCOO

****************************************************************************/
(function ($, L/*, window, document, undefined*/) {
    "use strict";

    L.Popup.mergeOptions({
        header           : '',
        icon             : '',
        buttonOk         : false,
        buttonRemove     : false,
        buttonClose      : false,
        buttons          : [],
        buttonHorizontal : true,
        getContent       : null,
        context          : null
    });

    //Extend L.Popup with const for standard buttonc
    L.extend(L.Popup, {
        //Const to define differnet formats
        BUTTON_OK    : { id:'btnOk',     icon:'check',   text:'Ok',     hoverColor: 'green'},
        BUTTON_REMOVE: { id:'btnRemove', icon:'trash-o', text:'Remove', onClick: function(onClickObj){ 
                                                                                     if (onClickObj.source && onClickObj.map)
                                                                                         onClickObj.map.removeLayer(onClickObj.source);
                                                                                 }
                 },
        BUTTON_CLOSE : { id:'btnClose', icon:'times', text:'Close', hoverColor: 'red', onClick: L.Popup.prototype._close }
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
                    horizontal     : this.options.buttonHorizontal,
                    small          : true,
                    equalWidth     : true,
                    centerText     : true,
                    separateButtons: true,
                    onClickObj     : {popup: this, latLng: this.getLatLng(), source: this._source},
                    buttons        : buttons
                });

                this.buttonGroup._map = this._map;
                this.buttonGroup.addButtons();
                this._buttonGroupContainer.append( this.buttonGroup._container );
            }
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
        };
    } (L.Popup.prototype._updateContent);

    

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