/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Pagination addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	@requires tosrus 2.0.0 or later
 */

 (function( $ ) {
 
 	var _PLUGIN_ = 'tosrus',
		_ADDON_  = 'pagination';

	var _addonInitiated = false,
		_c, _d, _e, _f, _g;

	$[ _PLUGIN_ ].prototype[ '_addon_' + _ADDON_ ] = function()
	{		
		if ( !_addonInitiated )
		{
			_c = $[ _PLUGIN_ ]._c;
			_d = $[ _PLUGIN_ ]._d;
			_e = $[ _PLUGIN_ ]._e;
			_f = $[ _PLUGIN_ ]._f;
			_g = $[ _PLUGIN_ ]._g;

			_c.add( 'pagination selected' );

			_addonInitiated = true;
		}

		var that = this,
			pagr = this.opts[ _ADDON_ ];

		this.nodes.$pagr = null;

		if ( pagr )
		{
			if ( typeof pagr == 'string' )
			{
				pagr = $(pagr);
			}
			this.nodes.$pagr = ( pagr instanceof $ )
				? pagr
				: $('<div class="' + _c.pagination + '" />')
					.appendTo( this.nodes.$wrpr );

			this.nodes.$slides
				.each(
					function( index )
					{
						$('<a href="#"><span>' + ( index + 1 ) + '</span></a>')
							.appendTo( that.nodes.$pagr )
							.on( _e.click,
								function( e )
								{
									e.preventDefault();

									that.nodes.$wrpr.trigger( _e.slideTo, [ index ] );
								}
							);
					}
				);
			
			this.updatePagination();
			this.nodes.$wrpr
				.on( _e.sliding,
					function( e, slide, direct )
					{
						that.updatePagination();
					}
				);
		}
	};
	
	$[ _PLUGIN_ ].prototype.updatePagination = function()
	{
		if ( this.nodes.$pagr )
		{
			this.nodes.$pagr
				.children()
				.removeClass( _c.selected )
				.eq( this.slides.index )
				.addClass( _c.selected );
		}
	};

	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = false;

	//	Add to plugin
	$[ _PLUGIN_ ].addons.push( _ADDON_ );
	$[ _PLUGIN_ ].ui.push( 'pagination' );


})( jQuery );