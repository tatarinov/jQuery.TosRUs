/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Caption addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	@requires tosrus 2.0.0 or later
 */
 
 (function( $ ) {
 
 	var _PLUGIN_ = 'tosrus',
		_ADDON_  = 'caption';

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

			_c.add( 'caption' );
			_d.add( 'caption' );

			_addonInitiated = true;
		}

		var that = this,
			capt = this.opts[ _ADDON_ ];

		this.nodes.$capt = null;

		if ( $.isArray( capt ) && this.vars.fixed )
		{
			this.nodes.$capt = $('<div class="' + _c.caption + '" />').appendTo( this.nodes.$wrpr );

			this.nodes.$anchors
				.each(
					function( index )
					{
						var $anchor = $(this),
							$slide = $anchor.data( _d.slide );

						$slide.data( _d.caption, '' );
						for ( var c = 0, l = capt.length; c < l; c++ )
						{
							var caption = $anchor.attr( capt[ c ] );
							if ( caption && caption.length )
							{
								$slide.data( _d.caption, caption );
								break;
							}
						}
					}
				);
			

			this.nodes.$wrpr
				.on( _e.sliding,
					function( e, slide, direct )
					{
						var caption = that.nodes.$sldr.children().eq( that.slides.index ).data( _d.caption ) || '';
						that.nodes.$capt
							.text( caption )
							[ ( caption.length > 0 ) ? 'removeClass' : 'addClass' ]( _c.disabled );
					}
				);
		}
	};

	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = [ 'title', 'rel' ];

	//	Add to plugin
	$[ _PLUGIN_ ].addons.push( _ADDON_ );
	$[ _PLUGIN_ ].ui.push( 'caption' );


})( jQuery );