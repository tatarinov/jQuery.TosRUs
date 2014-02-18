/*
 *	jQuery Touch Optimized Sliders "R"Us 2.0.0
 *	
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	tosrus.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function( $ ) {

	var _PLUGIN_	= 'tosrus',
		_ABBR_		= 'tos',
		_VERSION_	= '2.0.0';


	//	Plugin already excists
	if ( $[ _PLUGIN_ ] )
	{
		return;
	}


	//	Global variables
	var _c = {}, _d = {}, _e = {}, _f = {}, _g = {};


	/*
		Class
	*/
	$[ _PLUGIN_ ] = function( $node, opts, conf )
	{
		this.$node	= $node;
		this.opts	= opts;
		this.conf	= conf;

		this.vars	= {};
		this.nodes	= {};
		this.slides	= {};

		this._init();

		return this;
	};
	$[ _PLUGIN_ ].prototype = {

		//	Initialize the plugin
		_init: function()
		{
			var that = this;

			this._complementOptions();
			this.vars.fixed = ( this.opts.wrapper.target == 'window' );


			//	Add markup
			this.nodes.$wrpr = $('<div class="' + _c.wrapper + '" />');
			this.nodes.$sldr = $('<div class="' + _c.slider + '" />').appendTo( this.nodes.$wrpr );
	
			this.nodes.$wrpr
				.addClass( this.vars.fixed ? _c.fixed : _c.inline )
				.addClass( $[ _PLUGIN_ ].support.touch ? _c.touch : _c.desktop )
				.addClass( _c( 'fx-' + this.opts.effect ) )
				.addClass( _c( this.opts.slides.scale ) )
				.addClass( this.opts.wrapper.classes );


			//	Bind events
			this.nodes.$wrpr

				//	Custom events
				.on( _e.open + ' ' + _e.close + ' ' + _e.prev + ' ' + _e.next + ' ' + _e.slideTo,
					function( e )
					{
						arguments = Array.prototype.slice.call( arguments );
						var e = arguments.shift(),
							t = e.type;
	
						e.stopPropagation();

						if ( typeof that[ t ] == 'function' )
						{
							that[ t ].apply( that, arguments );
						}
					}
				)

				//	Toggle UI
				.on( _e.click,
					function( e )
					{
						e.stopPropagation();
						that.nodes.$wrpr.toggleClass( _c.hover );
					}
				);


			//	Nodes
			this.nodes.$anchors = this._initAnchors();
			this.nodes.$slides  = this._initSlides();


			//	Slides
			this.slides.total	= this.nodes.$slides.length;
			this.slides.visible	= this.opts.slides.visible;
			this.slides.index	= 0;

			//	Vars
			this.vars.opened	= true;


			//	Init addons
			for ( var a = 0; a < $[ _PLUGIN_ ].addons.length; a++ )
			{
				if ( $.isFunction( this[ '_addon_' + $[ _PLUGIN_ ].addons[ a ] ] ) )
				{
					this[ '_addon_' + $[ _PLUGIN_ ].addons[ a ] ]();
				}
			}
			for ( var u = 0; u < $[ _PLUGIN_ ].ui.length; u++ )
			{
				if ( this.nodes.$wrpr.find( '.' + _c[ $[ _PLUGIN_ ].ui[ u ] ] ).length )
				{
					this.nodes.$wrpr.addClass( _c( 'has-' + $[ _PLUGIN_ ].ui[ u ] ) );
				}
			}


			//	Start
			if ( this.vars.fixed )
			{
				this.nodes.$wrpr.appendTo( _g.$body );
				this.close( true );
			}
			else
			{
				this.nodes.$wrpr.appendTo( this.opts.wrapper.target );

				if ( this.opts.show )
				{
					this.vars.opened = false;
					this.open( 0, true );
				}
				else
				{
					this.close( true );
				}
			}
		},


		//	Open method, opens the gallery and slides to the designated slide
		open: function( index, direct )
		{
			var that = this;

			if ( !this.vars.opened )
			{
				if ( this.vars.fixed )
				{
					_g.scrollPosition = _g.$wndw.scrollTop();
					_g.$body.addClass( _c.opened );
				}

				if ( direct )
				{
					this.nodes.$wrpr
						.addClass( _c.opening )
						.trigger( _e.opening, [ index, direct ] );
				}
				else
				{
					setTimeout(
						function()
						{
							that.nodes.$wrpr
								.addClass( _c.opening )
								.trigger( _e.opening, [ index, direct ] );
						}, 5
					);
				}

				this.nodes.$wrpr
					.addClass( _c.hover )
					.addClass( _c.opened );
			}

			this.vars.opened = true;
			this._loadContents();

			//	Slide to given slide
			if ( $.isNumeric( index ) )
			{
				direct = ( direct || !this.vars.opened );
				this.slideTo( index, direct );
			}
		},


		//	Close method, closes the gallery
		close: function( direct )
		{
			if ( this.vars.opened )
			{
				if ( this.vars.fixed )
				{
					_g.$body.removeClass( _c.opened );
				}

				if ( direct )
				{
					this.nodes.$wrpr.removeClass( _c.opened );
				}
				else
				{
					_f.transitionend( this.nodes.$wrpr,
						function()
						{
							$(this).removeClass( _c.opened );
						}, this.conf.transitionDuration
					);
				}

				//	Close + Callback event
				this.nodes.$wrpr
					.removeClass( _c.hover )
					.removeClass( _c.opening )
					.trigger( _e.closing, [ this.slides.index, direct ] );
			}
			this.vars.opened = false;
		},


		//	Prev method, slides to the previous set of slides
		prev: function( slides, direct )
		{
			if ( !$.isNumeric( slides ) )
			{
				slides = this.opts.slides.slide;
			}
			this.slideTo( this.slides.index - slides, direct );

		},


		//	Next method, slides to the next set of slides
		next: function( slides, direct )
		{
			if ( !$.isNumeric( slides ) )
			{
				slides = this.opts.slides.slide;
			}
			this.slideTo( this.slides.index + slides, direct );
		},


		//	SlideTo method, slides to the designated slide
		slideTo: function( index, direct )
		{
			if ( !this.vars.opened )
			{
				return false;
			}
			if ( !$.isNumeric( index ) )
			{
				return false;
			}

			var doSlide = true;

			//	Less then first
			if ( index < 0 )
			{
				var atStart = ( this.slides.index == 0 );

				//	Infinite
				if ( this.opts.infinite )
				{
					if ( atStart )
					{
						index = this.slides.total - this.slides.visible;
					}
					else
					{
						index = 0;
					}
				}
				//	Non-infinite
				else
				{
					index = 0;
					if ( atStart )
					{
						doSlide = false;
					}
				}
			}

			//	More then last
			if ( index + this.slides.visible > this.slides.total )
			{
				var atEnd = ( this.slides.index + this.slides.visible >= this.slides.total );

				//	Infinite
				if ( this.opts.infinite )
				{
					if ( atEnd )
					{
						index = 0;
					}
					else
					{
						index = this.slides.total - this.slides.visible;
					}
				}
				//	Non-infinite
				else
				{
					index = this.slides.total - this.slides.visible;
					if ( atEnd )
					{
						doSlide = false;
					}
				}
			}

			this.slides.index = index;
			this._loadContents();

			if ( doSlide )
			{
				var left = 0 - ( this.slides.index * this.opts.slides.width ) + this.opts.slides.offset;
				if ( this.slides.widthPercentage )
				{
					left += '%';
				}

				if ( direct )
				{
					this.nodes.$sldr.addClass( _c.noanimation );
					_f.transitionend( this.nodes.$sldr,
						function()
						{
							$(this).removeClass( _c.noanimation );
						}, 5
					);
				}

				//	Transition
				for ( var e in $[ _PLUGIN_ ].effects )
				{
					if ( e == this.opts.effect )
					{
						$[ _PLUGIN_ ].effects[ e ].call( this, left, direct );
						break;
					}
				}
				
				//	Callback event
				this.nodes.$wrpr.trigger( _e.sliding, [ index, direct ] );
			}
		},

		_initAnchors: function()
		{
			var that = this,
				$a = $();

			if ( this.$node.is( 'a' ) )
			{
				for ( var m in $[ _PLUGIN_ ].media )
				{
					$a = $a.add( 
							this.$node.filter(
								function()
								{
									return $[ _PLUGIN_ ].media[ m ].filterAnchors.call( that, $(this).attr( 'href' ) );
								}
							)
						);
				}
			}
			return $a;
		},
		_initSlides: function()
		{
			this[ this.$node.is( 'a' ) ? '_initSlidesFromAnchors' : '_initSlidesFromContent' ]();
			return this.nodes.$sldr.children().css( 'width', this.opts.slides.width + ( this.slides.widthPercentage ? '%' : '' ) );
		},
		_initSlidesFromAnchors: function()
		{
			var that = this;

			this.nodes.$anchors
				.each(
					function( index )
					{
						var $anchor = $(this);

						//	Create the slide
						var $slide = $('<div class="' + _c.slide + ' ' + _c.loading + '" />')
							.data( _d.anchor, $anchor )
							.appendTo( that.nodes.$sldr );

						//	Clicking an achor opens the slide
						$anchor
							.data( _d.slide, $slide )
							.on( _e.click,
								function( e )
								{
									e.preventDefault();
									that.open( index );
								}
							);
					}
				);
		},
		_initSlidesFromContent: function()
		{
			var that = this;

			this.$node
				.children()
				.each(
					function()
					{
						var $slide = $(this);

						$('<div class="' + _c.slide + '" />')
							.append( $slide )
							.appendTo( that.nodes.$sldr );

						//	Init slide content
						for ( var m in $[ _PLUGIN_ ].media )
						{
							if ( $[ _PLUGIN_ ].media[ m ].filterSlides.call( that, $slide ) )
							{
								$[ _PLUGIN_ ].media[ m ].initSlides.call( that, $slide );
								$slide.parent().addClass( _c( m ) );
								break;
							}
						}
					}
			);
		},

		_loadContents: function()
		{
			var that = this;

			switch ( this.opts.slides.load )
			{
				//	Load all
				case 'all':
					this._loadContent( 0, this.slides.total );
					break;

				//	Load current
				case 'visible':
					this._loadContent( this.slides.index, this.slides.index + this.slides.visible );
					break;

				//	Load current + prev + next
				case 'near-visible':
				default:
					this._loadContent( this.slides.index, this.slides.index + this.slides.visible );
					setTimeout(
						function()
						{
							that._loadContent( that.slides.index - that.slides.visible, that.slides.index );								//	prev
							that._loadContent( that.slides.index + that.slides.visible, that.slides.index + ( that.slides.visible * 2 ) );	//	next
						}, this.conf.transitionDuration
					);
					break;
			}
		},
		_loadContent: function( start, end )
		{
			var that = this;

			this.nodes.$slides
				.slice( start, end )
				.each(
					function()
					{
						var $slide		= $(this),
							contenttype = false;

						if ( $slide.children().length == 0 )
						{
							var content = $slide.data( _d.anchor ).attr( 'href' );

							//	Search for slide content
							for ( var m in $[ _PLUGIN_ ].media )
							{
								if ( $[ _PLUGIN_ ].media[ m ].filterAnchors.call( that, content ) )
								{
									$[ _PLUGIN_ ].media[ m ].initAnchors.call( that, $slide, content );
									$slide.addClass( _c( m ) );
									break;
								}
							}

							//	Callback event
							$slide.trigger( _e.loading, [ $slide.data( _d.anchor ) ] );
						}
					}
			);
		},

		_complementOptions: function()
		{
			//	Wrapper
			if ( typeof this.opts.wrapper.target == 'undefined' )
			{
				this.opts.wrapper.target = ( this.$node.is( 'a' ) ) ? 'window' : this.$node;
			}
			if ( this.opts.wrapper.target != 'window' )
			{
				if ( typeof this.opts.wrapper.target == 'string' )
				{
					this.opts.wrapper.target = $(this.opts.wrapper.target);
				}
			}
	
			//	Show
			this.opts.show = _f.complBoolean(  this.opts.show, this.opts.wrapper.target != 'window' );

			//	Slides
			if ( $.isNumeric( this.opts.slides.width ) )
			{
				this.slides.widthPercentage	= false;
				this.opts.slides.visible 	= _f.complNumber( this.opts.slides.visible, 1 );
			}
			else
			{
				var percWidth = ( _f.isPercentage( this.opts.slides.width ) ) ? _f.getPercentage( this.opts.slides.width ) : false;

				this.slides.widthPercentage	= true;
				this.opts.slides.visible 	= _f.complNumber( this.opts.slides.visible, ( percWidth ) ? Math.floor( 100 / percWidth ) : 1 );
				this.opts.slides.width 		= ( percWidth ) ? percWidth : Math.ceil( 100 * 100 / this.opts.slides.visible ) / 100;
			}
			this.opts.slides.slide		=   _f.complNumber( this.opts.slides.slide, this.opts.slides.visible );
			this.opts.slides.offset 	= ( _f.isPercentage( this.opts.slides.offset ) ) ? _f.getPercentage( this.opts.slides.offset ) : _f.complNumber( this.opts.slides.offset, 0 );
		}
	};


	/*
		jQuery Plugin
	*/
	$.fn[ _PLUGIN_ ] = function( opts, optsD, optsT, conf )
	{
		//	First time plugin is fired
		if ( !_g.$wndw )
		{
			initPlugin();
		}

		//	Extend options
		opts = $.extend( true, {}, $[ _PLUGIN_ ].defaults, opts );
		opts = $.extend( true, {}, opts, $[ _PLUGIN_ ].support.touch ? optsT : optsD );

		//	Extend configuration
		conf = $.extend( true, {}, $[ _PLUGIN_ ].configuration, conf );

		var clss = new $[ _PLUGIN_ ]( this, opts, conf );

		this.data( _PLUGIN_, clss );
		return clss.nodes.$wrpr;
	};


	/*
		SUPPORT
	*/
	$[ _PLUGIN_ ].support = {
		touch: 'ontouchstart' in window.document
	};


	/*
		Options
	*/
	$[ _PLUGIN_ ].defaults = {
//		show		: null,				//	true for inline slider, false for popup lightbox
		infinite	: false,
		effect		: 'slide',
		wrapper	: {
//			target	: null,				//	"window" for lightbox popup
			classes	: ''
		},
		slides	: {
//			slide	: null,				//	slides.visible
//			width	: null,				//	auto, max 100%
			offset	: 0,
			scale	: 'fit',			//	"fit" or "fill" (for images only)
			load	: 'near-visible',	//	"all", "visible" or "near-visible"
			visible	: 1
		}
	};

	$[ _PLUGIN_ ].configuration = {
		transitionDuration: 400
	};


	/*
		DEBUG
	*/
	$[ _PLUGIN_ ].debug = function( msg ) {};
	$[ _PLUGIN_ ].deprecated = function( depr, repl )
	{
		if ( typeof console != 'undefined' && typeof console.warn != 'undefined' )
		{
			console.warn( _PLUGIN_ + ': ' + depr + ' is deprecated, use ' + repl + ' instead.' );
		}
	};


	/*
		EFFECTS
	*/
	$[ _PLUGIN_ ].effects	= {
		'slide': function( left )
		{
			var left = 'translateX(' + left + ')';
			this.nodes.$sldr.css({
				'-webkit-transform'	: left,
				'-moz-transform'	: left,
				'-ms-transform'		: left,
				'-o-transform'		: left,
				'transform'			: left
			});
		},
		'fade': function( left )
		{
			_f.transitionend( this.nodes.$sldr,
				function()
				{
					$(this)
						.css( 'left', left )
						.css( 'opacity', 1 );
				}, this.conf.transitionDuration
			);
			this.nodes.$sldr.css( 'opacity', 0 );
		}
	};


	$[ _PLUGIN_ ].version 	= _VERSION_;
	$[ _PLUGIN_ ].media		= {};
	$[ _PLUGIN_ ].addons 	= [];
	$[ _PLUGIN_ ].ui		= [];


	/*
		Private functions
	*/
	function initPlugin()
	{

		//	Classnames, Datanames, Eventnames
		_c = function( c ) { return _ABBR_ + '-' + c; };
		_d = function( d ) { return _ABBR_ + '-' + d; };
		_e = function( e ) { return e + '.' + _ABBR_; };

		$.each( [ _c, _d, _e ],
			function( i, o )
			{
				o.add = function( c )
				{
					c = c.split( ' ' );
					for ( var d in c )
					{
						o[ c[ d ] ] = o( c[ d ] );
					}
				};
			}
		);

		//	Classnames
		_c.add( 'noanimation fastanimation opened opening wrapper slider slide html loading fixed inline touch desktop hover' );

		//	Datanames
		_d.add( 'content slide anchor ratio maxWidth maxHeight index' );

		//	Eventnames
		_e.add( 'open opening close closing prev next slideTo sliding click keyup scroll orientationchange load loading transitionend webkitTransitionEnd' );


		//	Functions
		_f = {
			complObject: function( option, defaultVal )
			{
				if ( !$.isPlainObject( option ) )
				{
					option = defaultVal;
				}
				return option;
			},
			complBoolean: function( option, defaultVal )
			{
				if ( typeof option != 'boolean' )
				{
					option = defaultVal;
				}
				return option;
			},
			complNumber: function( option, defaultVal )
			{
				if ( !$.isNumeric( option ) )
				{
					option = defaultVal;
				}
				return option;
			},
			complString: function( option, defaultVal )
			{
				if ( typeof option != 'string' )
				{
					option = defaultVal;
				}
				return option;
			},
			isPercentage: function( value )
			{
				return ( typeof value == 'string' && value.slice( -1 ) == '%' );
				{
					value = parseInt( value.slice( 0, -1 ) );
				}
				return !isNaN( value );
			},
			getPercentage: function( value )
			{
				return parseInt( value.slice( 0, -1 ) );
			},
			transitionend: function( $e, fn, duration )
	        {
				var _ended = false,
					_fn = function()
					{
						if ( !_ended )
						{
							fn.call( $e[ 0 ] );
						}
						_ended = true;
					};

				$e.one( _e.transitionend, _fn );
				$e.one( _e.webkitTransitionEnd, _fn );
				setTimeout( _fn, duration * 1.1 );
	        },
	        setViewportScale: function()
	        {
				_g.$body.addClass( _c( 'scale-' + Math.max( Math.min( Math.round( $(document).width() / window.outerWidth ), 3 ), 1 ) ) );
	        }
		};


		// Global variables
		_g = {
			$wndw	: $(window),
			$html	: $('html'),
			$body	: $('body'),

			scrollPosition: 0
		};

		//	Prevent scroling when opened
		_g.$wndw
			.on( _e.scroll,
				function( e )
				{
					if ( _g.$body.hasClass( _c.opened ) )
					{
						window.scrollTo( 0, _g.scrollPosition );
						e.preventDefault();
						e.stopPropagation();
						e.stopImmediatePropagation();
					}
				}
			);

		//	Invert viewport-scale
		_f.setViewportScale();
		_g.$wndw
			.on( _e.orientationchange,
				function( e )
				{
					_f.setViewportScale();
				}
			);


		//	Add to plugin
		$[ _PLUGIN_ ]._c = _c;
		$[ _PLUGIN_ ]._d = _d;
		$[ _PLUGIN_ ]._e = _e;
		$[ _PLUGIN_ ]._f = _f;
		$[ _PLUGIN_ ]._g = _g;
	};

})( jQuery );
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Buttons addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	@requires tosrus 2.0.0 or later
 */
!function(e){function s(s,t){return e('<a class="'+n[s]+t+'" href="#"><span></span></a>')}function t(e,s,t,n){s.on(o.click,function(s){s.preventDefault(),e.trigger(o[t],[n])})}var n,i,o,d,p,l="tosrus",r="buttons",a=!1;e[l].prototype["_addon_"+r]=function(){a||(n=e[l]._c,i=e[l]._d,o=e[l]._e,d=e[l]._f,p=e[l]._g,n.add(" prev next close disabled"),a=!0);var u=this,h=this.opts[r];this.nodes.$prev=null,this.nodes.$next=null,this.nodes.$clse=null,"boolean"==typeof h||"string"==typeof h&&"inline"==h?h={prev:h,next:h}:(h=d.complObject(h,{}),h=e.extend(!0,{},e[l].defaults[r],h)),"undefined"==typeof h.close&&(h.close="window"==this.opts.wrapper.target),e.each({prev:"prev",next:"next",close:"clse"},function(i,d){h[i]&&("string"==typeof h[i]&&"inline"==h[i]?u.vars.fixed&&"close"!=i&&u.nodes.$slides.on(o.loading,function(){var o=s(i," "+n.inline)["prev"==i?"prependTo":"appendTo"](this);t(u.nodes.$wrpr,o,i,1),("prev"==i&&e(this).is(":first-child")||"next"==i&&e(this).is(":last-child"))&&o.addClass(n.disabled)}):("string"==typeof h[i]&&(h[i]=e(h[i])),u.nodes["$"+d]=h[i]instanceof e?h[i]:s(i,"").appendTo(u.nodes.$wrpr),t(u.nodes.$wrpr,u.nodes["$"+d],i,null)))}),this.opts.infinite||(this.updateButtons(),this.nodes.$wrpr.on(o.sliding,function(){u.updateButtons()}))},e[l].prototype.updateButtons=function(){this.nodes.$prev&&this.nodes.$prev[(this.slides.index<1?"add":"remove")+"Class"](n.disabled),this.nodes.$next&&this.nodes.$next[(this.slides.index>=this.slides.total-this.slides.visible?"add":"remove")+"Class"](n.disabled)},e[l].defaults[r]={prev:!e[l].support.touch,next:!e[l].support.touch},e[l].addons.push(r),e[l].ui.push("prev"),e[l].ui.push("next"),e[l].ui.push("close")}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Caption addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	@requires tosrus 2.0.0 or later
 */
!function(a){var t,s,n,d,i,o="tosrus",e="caption",r=!1;a[o].prototype["_addon_"+e]=function(){r||(t=a[o]._c,s=a[o]._d,n=a[o]._e,d=a[o]._f,i=a[o]._g,t.add("caption"),s.add("caption"),r=!0);var c=this,p=this.opts[e];this.nodes.$capt=null,a.isArray(p)&&this.vars.fixed&&(this.nodes.$capt=a('<div class="'+t.caption+'" />').appendTo(this.nodes.$wrpr),this.nodes.$anchors.each(function(){var t=a(this),n=t.data(s.slide);n.data(s.caption,"");for(var d=0,i=p.length;i>d;d++){var o=t.attr(p[d]);if(o&&o.length){n.data(s.caption,o);break}}}),this.nodes.$wrpr.on(n.sliding,function(){var a=c.nodes.$sldr.children().eq(c.slides.index).data(s.caption)||"";c.nodes.$capt.text(a)[a.length>0?"removeClass":"addClass"](t.disabled)}))},a[o].defaults[e]=["title","rel"],a[o].addons.push(e),a[o].ui.push("caption")}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Drag addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	@requires tosrus 2.0.0 or later
 */
!function(e){if(e.fn.hammer){var t,s,r,n,i,a="tosrus",d="drag",o=!1;e[a].prototype["_addon_"+d]=function(){o||(t=e[a]._c,s=e[a]._d,r=e[a]._e,n=e[a]._f,i=e[a]._g,r.add("dragstart dragend dragleft dragright swipeleft swiperight"),o=!0);var l=this;if(this.opts[d]&&"slide"==this.opts.effect){var f=0,g=!1,u=!1;this.nodes.$wrpr.hammer().on(r.dragstart,function(e){e.gesture.preventDefault(),l.nodes.$sldr.addClass(t.noanimation)}).on(r.dragleft+" "+r.dragright,function(e){e.stopPropagation(),e.gesture&&e.gesture.preventDefault(),f=e.gesture.deltaX,g=e.gesture.direction,u=!1,("left"==g&&l.slides.index+l.slides.visible>=l.slides.total||"right"==g&&0==l.slides.index)&&(f/=2.5),l.nodes.$sldr.css("left",Math.round(f))}).on(r.swipeleft+" "+r.swiperight,function(e){e.gesture.preventDefault(),u=!0}).on(r.dragend,function(e){if(e.gesture.preventDefault(),"left"==g||"right"==g){if(u)var s=l.slides.visible;else var i=l.nodes.$slides.first().width(),s=Math.floor((Math.abs(f)+i/2)/i);s>0&&l.nodes.$wrpr.trigger(r["left"==g?"next":"prev"],[s])}l.nodes.$sldr.removeClass(t.noanimation).addClass(t.fastanimation),n.transitionend(l.nodes.$sldr,function(){l.nodes.$sldr.removeClass(t.fastanimation)},l.conf.transitionDuration/2),l.nodes.$sldr.css("left",0),g=!1})}},e[a].defaults[d]=e[a].support.touch,e[a].addons.push(d)}}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Keys addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	@requires tosrus 2.0.0 or later
 */
!function(e){var o,t,s,n,r,a="tosrus",p="keys",c=!1;e[a].prototype["_addon_"+p]=function(){c||(o=e[a]._c,t=e[a]._d,s=e[a]._e,n=e[a]._f,r=e[a]._g,c=!0);var i=this,d=this.opts[p];"boolean"==typeof d&&d&&(d={prev:37,next:39,close:27}),e.isPlainObject(d)&&e(document).on(s.keyup,function(e){if(i.vars.opened){var o=!1;switch(e.keyCode){case d.prev:o=s.prev;break;case d.next:o=s.next;break;case d.close:o=s.close}o&&(e.preventDefault(),e.stopPropagation(),i.nodes.$wrpr.trigger(o))}})},e[a].defaults[p]=!1,e[a].addons.push(p)}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Pagination addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	@requires tosrus 2.0.0 or later
 */
!function(n){var s,e,i,t,a,o="tosrus",d="pagination",p=!1;n[o].prototype["_addon_"+d]=function(){p||(s=n[o]._c,e=n[o]._d,i=n[o]._e,t=n[o]._f,a=n[o]._g,s.add("pagination selected"),p=!0);var r=this,g=this.opts[d];this.nodes.$pagr=null,g&&("string"==typeof g&&(g=n(g)),this.nodes.$pagr=g instanceof n?g:n('<div class="'+s.pagination+'" />').appendTo(this.nodes.$wrpr),this.nodes.$slides.each(function(s){n('<a href="#"><span>'+(s+1)+"</span></a>").appendTo(r.nodes.$pagr).on(i.click,function(n){n.preventDefault(),r.nodes.$wrpr.trigger(i.slideTo,[s])})}),this.updatePagination(),this.nodes.$wrpr.on(i.sliding,function(){r.updatePagination()}))},n[o].prototype.updatePagination=function(){this.nodes.$pagr&&this.nodes.$pagr.children().removeClass(s.selected).eq(this.slides.index).addClass(s.selected)},n[o].defaults[d]=!1,n[o].addons.push(d),n[o].ui.push("pagination")}(jQuery);
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * HTML media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 * @requires tosrus 2.0.0 or later
 */
!function(i){var n="tosrus",t="html";i[n].media[t]={filterAnchors:function(n){return"#"==n.slice(0,1)&&i(n).is("div")},initAnchors:function(t,e){t.removeClass(i[n]._c.loading),i('<div class="'+i[n]._c.html+'" />').append(i(e)).appendTo(t)},filterSlides:function(i){return i.is("div")},initSlides:function(){}}}(jQuery);
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * Images media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 * @requires tosrus 2.0.0 or later
 */
!function(i){var n="tosrus",o="image";i[n].media[o]={filterAnchors:function(n){return i.inArray(n.toLowerCase().split(".").pop().split("?")[0],["jpg","jpe","jpeg","gif","png"])>-1},initAnchors:function(o,r){i('<img border="0" />').on(i[n]._e.load,function(r){r.stopPropagation(),o.removeClass(i[n]._c.loading)}).appendTo(o).attr("src",r)},filterSlides:function(i){return i.is("img")},initSlides:function(){}}}(jQuery);
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * Vimeo media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 * @requires tosrus 2.0.0 or later
 */
!function(i){function t(t){function h(){var i=t.width(),o=t.height();p&&i>p&&(i=p),g&&o>g&&(o=g),u>i/o?o=i/u:i=o*u,f.width(i).height(o)}function l(i){f.length&&f[0].contentWindow.postMessage('{ "method": "'+i+'" }',"*")}c||(o=i[s]._c,n=i[s]._d,e=i[s]._e,a=i[s]._f,r=i[s]._g,c=!0);var f=t.children(),m=t.data(i[s]._d.anchor)||i(),u=m.data(n.ratio)||this.opts[d].ratio,p=m.data(n.maxWidth)||this.opts[d].maxWidth,g=m.data(n.maxHeight)||this.opts[d].maxHeight;t.removeClass(o.loading).on(e.loading,function(){h()}),this.nodes.$wrpr.on(e.sliding,function(){l("pause")}).on(e.closing,function(){l("unload")}),r.$wndw.on(e.resize,function(i){i.stopPropagation(),h()})}var o,n,e,a,r,s="tosrus",d="vimeo",c=!1;i[s].media[d]={filterAnchors:function(i){return i.toLowerCase().indexOf("vimeo.com/")>-1},initAnchors:function(o,n){n=n.split("vimeo.com/")[1].split("?")[0]+"?api=1",i('<iframe src="http://player.vimeo.com/video/'+n+'" frameborder="0" allowfullscreen />').appendTo(o),t.call(this,o)},filterSlides:function(i){return i.is("iframe")&&i.attr("src")?i.attr("src").toLowerCase().indexOf("vimeo.com/video/")>-1:!1},initSlides:function(i){t.call(this,i)}},i[s].defaults[d]={ratio:16/9,maxWidth:!1,maxHeight:!1}}(jQuery);
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * Youtube media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 * @requires tosrus 2.0.0 or later
 */
!function(t){function i(i){function u(){var t=i.width(),o=i.height();p&&t>p&&(t=p),g&&o>g&&(o=g),m>t/o?o=t/m:t=o*m,l.width(t).height(o)}function h(t){l.length&&l[0].contentWindow.postMessage('{ "event": "command", "func": "'+t+'Video" }',"*")}d||(o=t[s]._c,n=t[s]._d,e=t[s]._e,a=t[s]._f,r=t[s]._g,d=!0);var l=i.children(),f=i.data(t[s]._d.anchor)||t(),m=f.data(n.ratio)||this.opts[c].ratio,p=f.data(n.maxWidth)||this.opts[c].maxWidth,g=f.data(n.maxHeight)||this.opts[c].maxHeight;i.removeClass(o.loading).on(e.loading,function(){u()}),this.nodes.$wrpr.on(e.sliding,function(){h("pause")}).on(e.closing,function(){h("stop")}),r.$wndw.on(e.resize,function(){u()})}var o,n,e,a,r,s="tosrus",c="youtube",d=!1;t[s].media[c]={filterAnchors:function(t){return t.toLowerCase().indexOf("youtube.com/watch?v=")>-1},initAnchors:function(o,n){var e=n;n=n.split("?v=")[1].split("&")[0],this.opts[c].imageLink?(n="http://img.youtube.com/vi/"+n+"/0.jpg",t('<a href="'+e+'" class="'+t[s]._c("play")+'" target="_blank" />').appendTo(o),t('<img border="0" />').on(t[s]._e.load,function(i){i.stopPropagation(),o.removeClass(t[s]._c.loading)}).appendTo(o).attr("src",n)):(t('<iframe src="http://www.youtube.com/embed/'+n+'" frameborder="0" allowfullscreen />').appendTo(o),i.call(this,o))},filterSlides:function(t){return t.is("iframe")&&t.attr("src")?t.attr("src").toLowerCase().indexOf("youtube.com/embed/")>-1:!1},initSlides:function(t){i.call(this,t)}},t[s].defaults[c]={ratio:16/9,maxWidth:!1,maxHeight:!1,imageLink:t[s].support.touch}}(jQuery);