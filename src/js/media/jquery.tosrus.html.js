/*	
 * jQuery Touch Optimized Sliders "R"Us
 * HTML media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 * @requires tosrus 2.0.0 or later
 */

(function( $ ) {
	
	var _PLUGIN_ = 'tosrus',
		_MEDIA_	 = 'html';

	$[ _PLUGIN_ ].media[ _MEDIA_ ] = {

		//	Filter anchors
		filterAnchors: function( href )
		{
			return ( href.slice( 0, 1 ) == '#' && $(href).is( 'div' ) )
		},

		//	Create Slides from anchors
		initAnchors: function( $s, href )
		{
			$s.removeClass( $[ _PLUGIN_ ]._c.loading );
			$('<div class="' + $[ _PLUGIN_ ]._c.html + '" />')
				.append( $(href) )
				.appendTo( $s );
		},

		//	Filter slides
		filterSlides: function( $s )
		{
			return $s.is( 'div' );
		},

		//	Create slides from existing content
		initSlides: function( $s ) {}
	};
	
})( jQuery );