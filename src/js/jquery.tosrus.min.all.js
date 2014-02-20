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
!function(s){function i(){o=function(s){return t+"-"+s},d=function(s){return t+"-"+s},r=function(s){return s+"."+t},s.each([o,d,r],function(s,i){i.add=function(s){s=s.split(" ");for(var e in s)i[s[e]]=i(s[e])}}),o.add("touch desktop scale-1 scale-2 scale-3 wrapper opened opening fixed inline hover slider slide loading noanimation fastanimation"),d.add("slide anchor"),r.add("open opening close closing prev next slideTo sliding click pinch scroll resize orientationchange load loading transitionend webkitTransitionEnd"),a={complObject:function(i,e){return s.isPlainObject(i)||(i=e),i},complBoolean:function(s,i){return"boolean"!=typeof s&&(s=i),s},complNumber:function(i,e){return s.isNumeric(i)||(i=e),i},complString:function(s,i){return"string"!=typeof s&&(s=i),s},isPercentage:function(s){return"string"==typeof s&&"%"==s.slice(-1)},getPercentage:function(s){return parseInt(s.slice(0,-1))},resizeRatio:function(s,i,e,t,n){var o=i.width(),d=i.height();e&&o>e&&(o=e),t&&d>t&&(d=t),n>o/d?d=o/n:o=d*n,s.width(o).height(d)},transitionend:function(s,i,e){var t=!1,n=function(){t||i.call(s[0]),t=!0};s.one(r.transitionend,n),s.one(r.webkitTransitionEnd,n),setTimeout(n,1.1*e)},setViewportScale:function(){if(l.viewportScale){var s=l.viewportScale.getScale();"undefined"!=typeof s&&(s=1/s,l.$body.removeClass(o["scale-1"]).removeClass(o["scale-2"]).removeClass(o["scale-3"]).addClass(o["scale-"+Math.max(Math.min(Math.round(s),3),1)]))}}},l={$wndw:s(window),$html:s("html"),$body:s("body"),scrollPosition:0,viewportScale:null,viewportScaleInterval:null},l.$body.addClass(s[e].support.touch?o.touch:o.desktop),l.$wndw.on(r.scroll,function(s){l.$body.hasClass(o.opened)&&(window.scrollTo(0,l.scrollPosition),s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation())}),!l.viewportScale&&s[e].support.touch&&"undefined"!=typeof FlameViewportScale&&(l.viewportScale=new FlameViewportScale,a.setViewportScale(),l.$wndw.on(r.orientationchange+" "+r.resize,function(){l.viewportScaleInterval&&(clearTimeout(l.viewportScaleInterval),l.viewportScaleInterval=null),l.viewportScaleInterval=setTimeout(function(){a.setViewportScale()},500)})),s[e]._c=o,s[e]._d=d,s[e]._e=r,s[e]._f=a,s[e]._g=l}var e="tosrus",t="tos",n="2.0.0";if(!s[e]){var o={},d={},r={},a={},l={};s[e]=function(s,i,e){return this.$node=s,this.opts=i,this.conf=e,this.vars={},this.nodes={},this.slides={},this._init(),this},s[e].prototype={_init:function(){var i=this;this._complementOptions(),this.vars.fixed="window"==this.opts.wrapper.target,this.nodes.$wrpr=s('<div class="'+o.wrapper+'" />'),this.nodes.$sldr=s('<div class="'+o.slider+'" />').appendTo(this.nodes.$wrpr),this.nodes.$wrpr.addClass(this.vars.fixed?o.fixed:o.inline).addClass(o("fx-"+this.opts.effect)).addClass(o(this.opts.slides.scale)).addClass(this.opts.wrapper.classes),this.nodes.$wrpr.on(r.open+" "+r.close+" "+r.prev+" "+r.next+" "+r.slideTo,function(s){arguments=Array.prototype.slice.call(arguments);var s=arguments.shift(),e=s.type;s.stopPropagation(),"function"==typeof i[e]&&i[e].apply(i,arguments)}).on(r.opening+" "+r.closing+" "+r.sliding+" "+r.loading,function(s){s.stopPropagation()}).on(r.click,function(s){s.stopPropagation(),i.nodes.$wrpr.toggleClass(o.hover)}),s.fn.hammer&&s[e].support.touch&&this.nodes.$wrpr.hammer().on(r.pinch,function(s){l.$body.hasClass(o.opened)&&(s.gesture.preventDefault(),s.stopPropagation())}),this.nodes.$anchors=this._initAnchors(),this.nodes.$slides=this._initSlides(),this.slides.total=this.nodes.$slides.length,this.slides.visible=this.opts.slides.visible,this.slides.index=0,this.vars.opened=!0;for(var t=0;t<s[e].addons.length;t++)s.isFunction(this["_addon_"+s[e].addons[t]])&&this["_addon_"+s[e].addons[t]]();for(var n=0;n<s[e].ui.length;n++)this.nodes.$wrpr.find("."+o[s[e].ui[n]]).length&&this.nodes.$wrpr.addClass(o("has-"+s[e].ui[n]));this.vars.fixed?(this.nodes.$wrpr.appendTo(l.$body),this.close(!0)):(this.nodes.$wrpr.appendTo(this.opts.wrapper.target),this.opts.show?(this.vars.opened=!1,this.open(0,!0)):this.close(!0))},open:function(i,e){var t=this;this.vars.opened||(this.vars.fixed&&(l.scrollPosition=l.$wndw.scrollTop(),l.$body.addClass(o.opened),a.setViewportScale()),e?this.nodes.$wrpr.addClass(o.opening).trigger(r.opening,[i,e]):setTimeout(function(){t.nodes.$wrpr.addClass(o.opening).trigger(r.opening,[i,e])},5),this.nodes.$wrpr.addClass(o.hover).addClass(o.opened)),this.vars.opened=!0,this._loadContents(),s.isNumeric(i)&&(e=e||!this.vars.opened,this.slideTo(i,e))},close:function(i){this.vars.opened&&(this.vars.fixed&&l.$body.removeClass(o.opened),i?this.nodes.$wrpr.removeClass(o.opened):a.transitionend(this.nodes.$wrpr,function(){s(this).removeClass(o.opened)},this.conf.transitionDuration),this.nodes.$wrpr.removeClass(o.hover).removeClass(o.opening).trigger(r.closing,[this.slides.index,i])),this.vars.opened=!1},prev:function(i,e){s.isNumeric(i)||(i=this.opts.slides.slide),this.slideTo(this.slides.index-i,e)},next:function(i,e){s.isNumeric(i)||(i=this.opts.slides.slide),this.slideTo(this.slides.index+i,e)},slideTo:function(i,t){if(!this.vars.opened)return!1;if(!s.isNumeric(i))return!1;var n=!0;if(0>i){var d=0==this.slides.index;this.opts.infinite?i=d?this.slides.total-this.slides.visible:0:(i=0,d&&(n=!1))}if(i+this.slides.visible>this.slides.total){var l=this.slides.index+this.slides.visible>=this.slides.total;this.opts.infinite?i=l?0:this.slides.total-this.slides.visible:(i=this.slides.total-this.slides.visible,l&&(n=!1))}if(this.slides.index=i,this._loadContents(),n){var h=0-this.slides.index*this.opts.slides.width+this.opts.slides.offset;this.slides.widthPercentage&&(h+="%"),t&&(this.nodes.$sldr.addClass(o.noanimation),a.transitionend(this.nodes.$sldr,function(){s(this).removeClass(o.noanimation)},5));for(var c in s[e].effects)if(c==this.opts.effect){s[e].effects[c].call(this,h,t);break}this.nodes.$wrpr.trigger(r.sliding,[i,t])}},_initAnchors:function(){var i=this,t=s();if(this.$node.is("a"))for(var n in s[e].media)t=t.add(this.$node.filter(function(){return s[e].media[n].filterAnchors.call(i,s(this).attr("href"))}));return t},_initSlides:function(){return this[this.$node.is("a")?"_initSlidesFromAnchors":"_initSlidesFromContent"](),this.nodes.$sldr.children().css("width",this.opts.slides.width+(this.slides.widthPercentage?"%":""))},_initSlidesFromAnchors:function(){var i=this;this.nodes.$anchors.each(function(e){var t=s(this),n=s('<div class="'+o.slide+" "+o.loading+'" />').data(d.anchor,t).appendTo(i.nodes.$sldr);t.data(d.slide,n).on(r.click,function(s){s.preventDefault(),i.open(e)})})},_initSlidesFromContent:function(){var i=this;this.$node.children().each(function(){var t=s(this);s('<div class="'+o.slide+'" />').append(t).appendTo(i.nodes.$sldr);for(var n in s[e].media)if(s[e].media[n].filterSlides.call(i,t)){s[e].media[n].initSlides.call(i,t),t.parent().addClass(o(n));break}})},_loadContents:function(){var s=this;switch(this.opts.slides.load){case"all":this._loadContent(0,this.slides.total);break;case"visible":this._loadContent(this.slides.index,this.slides.index+this.slides.visible);break;case"near-visible":default:this._loadContent(this.slides.index,this.slides.index+this.slides.visible),setTimeout(function(){s._loadContent(s.slides.index-s.slides.visible,s.slides.index),s._loadContent(s.slides.index+s.slides.visible,s.slides.index+2*s.slides.visible)},this.conf.transitionDuration)}},_loadContent:function(i,t){var n=this;this.nodes.$slides.slice(i,t).each(function(){var i=s(this);if(0==i.children().length){var t=i.data(d.anchor).attr("href");for(var a in s[e].media)if(s[e].media[a].filterAnchors.call(n,t)){s[e].media[a].initAnchors.call(n,i,t),i.addClass(o(a));break}i.trigger(r.loading,[i.data(d.anchor)])}})},_complementOptions:function(){if("undefined"==typeof this.opts.wrapper.target&&(this.opts.wrapper.target=this.$node.is("a")?"window":this.$node),"window"!=this.opts.wrapper.target&&"string"==typeof this.opts.wrapper.target&&(this.opts.wrapper.target=s(this.opts.wrapper.target)),this.opts.show=a.complBoolean(this.opts.show,"window"!=this.opts.wrapper.target),s.isNumeric(this.opts.slides.width))this.slides.widthPercentage=!1,this.opts.slides.visible=a.complNumber(this.opts.slides.visible,1);else{var i=a.isPercentage(this.opts.slides.width)?a.getPercentage(this.opts.slides.width):!1;this.slides.widthPercentage=!0,this.opts.slides.visible=a.complNumber(this.opts.slides.visible,i?Math.floor(100/i):1),this.opts.slides.width=i?i:Math.ceil(1e4/this.opts.slides.visible)/100}this.opts.slides.slide=a.complNumber(this.opts.slides.slide,this.opts.slides.visible),this.opts.slides.offset=a.isPercentage(this.opts.slides.offset)?a.getPercentage(this.opts.slides.offset):a.complNumber(this.opts.slides.offset,0)}},s.fn[e]=function(t,n,o,d){l.$wndw||i(),t=s.extend(!0,{},s[e].defaults,t),t=s.extend(!0,{},t,s[e].support.touch?o:n),d=s.extend(!0,{},s[e].configuration,d);var r=new s[e](this,t,d);return this.data(e,r),r.nodes.$wrpr},s[e].support={touch:"ontouchstart"in window.document},s[e].defaults={infinite:!1,effect:"slide",wrapper:{classes:""},slides:{offset:0,scale:"fit",load:"near-visible",visible:1}},s[e].configuration={transitionDuration:400},s[e].debug=function(){},s[e].deprecated=function(s,i){"undefined"!=typeof console&&"undefined"!=typeof console.warn&&console.warn(e+": "+s+" is deprecated, use "+i+" instead.")},s[e].effects={slide:function(s){this.nodes.$sldr.css("left",s)},fade:function(i){a.transitionend(this.nodes.$sldr,function(){s(this).css("left",i).css("opacity",1)},this.conf.transitionDuration),this.nodes.$sldr.css("opacity",0)}},s[e].version=n,s[e].media={},s[e].addons=[],s[e].ui=[]}}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Buttons addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	@requires tosrus 2.0.0 or later
 */
!function(e){function s(s,t){return e('<a class="'+n[s]+t+'" href="#"><span></span></a>')}function t(e,s,t,n){s.on(o.click,function(s){s.preventDefault(),s.stopPropagation(),e.trigger(o[t],[n])})}var n,i,o,d,p,r="tosrus",l="buttons",a=!1;e[r].prototype["_addon_"+l]=function(){a||(n=e[r]._c,i=e[r]._d,o=e[r]._e,d=e[r]._f,p=e[r]._g,n.add(" prev next close disabled"),a=!0);var u=this,h=this.opts[l];this.nodes.$prev=null,this.nodes.$next=null,this.nodes.$clse=null,"boolean"==typeof h||"string"==typeof h&&"inline"==h?h={prev:h,next:h}:(h=d.complObject(h,{}),h=e.extend(!0,{},e[r].defaults[l],h)),"undefined"==typeof h.close&&(h.close="window"==this.opts.wrapper.target),e.each({prev:"prev",next:"next",close:"clse"},function(i,d){h[i]&&("string"==typeof h[i]&&"inline"==h[i]?u.vars.fixed&&"close"!=i&&u.nodes.$slides.on(o.loading,function(){var o=s(i," "+n.inline)["prev"==i?"prependTo":"appendTo"](this);t(u.nodes.$wrpr,o,i,1),("prev"==i&&e(this).is(":first-child")||"next"==i&&e(this).is(":last-child"))&&o.addClass(n.disabled)}):("string"==typeof h[i]&&(h[i]=e(h[i])),u.nodes["$"+d]=h[i]instanceof e?h[i]:s(i,"").appendTo(u.nodes.$wrpr),t(u.nodes.$wrpr,u.nodes["$"+d],i,null)))}),this.opts.infinite||(this.updateButtons(),this.nodes.$wrpr.on(o.sliding,function(){u.updateButtons()}))},e[r].prototype.updateButtons=function(){this.nodes.$prev&&this.nodes.$prev[(this.slides.index<1?"add":"remove")+"Class"](n.disabled),this.nodes.$next&&this.nodes.$next[(this.slides.index>=this.slides.total-this.slides.visible?"add":"remove")+"Class"](n.disabled)},e[r].defaults[l]={prev:!e[r].support.touch,next:!e[r].support.touch},e[r].addons.push(l),e[r].ui.push("prev"),e[r].ui.push("next"),e[r].ui.push("close")}(jQuery);
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
!function(e){if(e.fn.hammer){var t,s,r,n,i,a="tosrus",d="drag",o=!1;e[a].prototype["_addon_"+d]=function(){o||(t=e[a]._c,s=e[a]._d,r=e[a]._e,n=e[a]._f,i=e[a]._g,r.add("dragstart dragend dragleft dragright swipeleft swiperight"),o=!0);var l=this;if(this.opts[d]&&"slide"==this.opts.effect){var f=0,g=!1,u=!1;this.nodes.$wrpr.hammer().on(r.dragstart,function(e){e.gesture.preventDefault(),l.nodes.$sldr.addClass(t.noanimation)}).on(r.dragleft+" "+r.dragright,function(e){e.stopPropagation(),e.gesture&&e.gesture.preventDefault(),f=e.gesture.deltaX,g=e.gesture.direction,u=!1,("left"==g&&l.slides.index+l.slides.visible>=l.slides.total||"right"==g&&0==l.slides.index)&&(f/=2.5),l.nodes.$sldr.css("margin-left",Math.round(f))}).on(r.swipeleft+" "+r.swiperight,function(e){e.gesture.preventDefault(),u=!0}).on(r.dragend,function(e){if(e.gesture.preventDefault(),l.nodes.$sldr.removeClass(t.noanimation).addClass(t.fastanimation),n.transitionend(l.nodes.$sldr,function(){l.nodes.$sldr.removeClass(t.fastanimation)},l.conf.transitionDuration/2),l.nodes.$sldr.css("margin-left",0),"left"==g||"right"==g){if(u)var s=l.slides.visible;else var i=l.nodes.$slides.first().width(),s=Math.floor((Math.abs(f)+i/2)/i);s>0&&l.nodes.$wrpr.trigger(r["left"==g?"next":"prev"],[s])}g=!1})}},e[a].defaults[d]=e[a].support.touch,e[a].addons.push(d)}}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Keys addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	@requires tosrus 2.0.0 or later
 */
!function(e){var o,t,s,n,a,r="tosrus",p="keys",c=!1;e[r].prototype["_addon_"+p]=function(){c||(o=e[r]._c,t=e[r]._d,s=e[r]._e,n=e[r]._f,a=e[r]._g,s.add("keyup"),c=!0);var d=this,i=this.opts[p];"boolean"==typeof i&&i&&(i={prev:37,next:39,close:27}),e.isPlainObject(i)&&e(document).on(s.keyup,function(e){if(d.vars.opened){var o=!1;switch(e.keyCode){case i.prev:o=s.prev;break;case i.next:o=s.next;break;case i.close:o=s.close}o&&(e.preventDefault(),e.stopPropagation(),d.nodes.$wrpr.trigger(o))}})},e[r].defaults[p]=!1,e[r].addons.push(p)}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Pagination addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	@requires tosrus 2.0.0 or later
 */
!function(n){var s,i,t,e,a,o="tosrus",d="pagination",p=!1;n[o].prototype["_addon_"+d]=function(){p||(s=n[o]._c,i=n[o]._d,t=n[o]._e,e=n[o]._f,a=n[o]._g,s.add("pagination selected"),p=!0);var r=this,g=this.opts[d];this.nodes.$pagr=null,g&&("string"==typeof g&&(g=n(g)),this.nodes.$pagr=g instanceof n?g:n('<div class="'+s.pagination+'" />').appendTo(this.nodes.$wrpr),this.nodes.$slides.each(function(s){n('<a href="#"><span>'+(s+1)+"</span></a>").appendTo(r.nodes.$pagr).on(t.click,function(n){n.preventDefault(),n.stopPropagation(),r.nodes.$wrpr.trigger(t.slideTo,[s])})}),this.updatePagination(),this.nodes.$wrpr.on(t.sliding,function(){r.updatePagination()}))},n[o].prototype.updatePagination=function(){this.nodes.$pagr&&this.nodes.$pagr.children().removeClass(s.selected).eq(this.slides.index).addClass(s.selected)},n[o].defaults[d]=!1,n[o].addons.push(d),n[o].ui.push("pagination")}(jQuery);
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
!function(i){function t(t){function l(i){m.length&&m[0].contentWindow.postMessage('{ "method": "'+i+'" }',"*")}c||(o=i[s]._c,e=i[s]._d,n=i[s]._e,a=i[s]._f,r=i[s]._g,e.add("ratio maxWidth maxHeight"),c=!0);var m=t.children(),f=t.data(i[s]._d.anchor)||i(),h=f.data(e.ratio)||this.opts[d].ratio,u=f.data(e.maxWidth)||this.opts[d].maxWidth,p=f.data(e.maxHeight)||this.opts[d].maxHeight;t.removeClass(o.loading).on(n.loading,function(){a.resizeRatio(m,t,u,p,h)}),this.nodes.$wrpr.on(n.sliding,function(){l("pause")}).on(n.closing,function(){l("unload")}),r.$wndw.on(n.resize,function(){a.resizeRatio(m,t,u,p,h)})}var o,e,n,a,r,s="tosrus",d="vimeo",c=!1;i[s].media[d]={filterAnchors:function(i){return i.toLowerCase().indexOf("vimeo.com/")>-1},initAnchors:function(o,e){e=e.split("vimeo.com/")[1].split("?")[0]+"?api=1",i('<iframe src="http://player.vimeo.com/video/'+e+'" frameborder="0" allowfullscreen />').appendTo(o),t.call(this,o)},filterSlides:function(i){return i.is("iframe")&&i.attr("src")?i.attr("src").toLowerCase().indexOf("vimeo.com/video/")>-1:!1},initSlides:function(i){t.call(this,i)}},i[s].defaults[d]={ratio:16/9,maxWidth:!1,maxHeight:!1}}(jQuery);
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * Youtube media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 * @requires tosrus 2.0.0 or later
 */
!function(t){function i(i){function u(t){l.length&&l[0].contentWindow.postMessage('{ "event": "command", "func": "'+t+'Video" }',"*")}d||(o=t[s]._c,e=t[s]._d,a=t[s]._e,n=t[s]._f,r=t[s]._g,e.add("ratio maxWidth maxHeight"),d=!0);var l=i.children(),m=i.data(t[s]._d.anchor)||t(),h=m.data(e.ratio)||this.opts[c].ratio,f=m.data(e.maxWidth)||this.opts[c].maxWidth,p=m.data(e.maxHeight)||this.opts[c].maxHeight;i.removeClass(o.loading).on(a.loading,function(){n.resizeRatio(l,i,f,p,h)}),this.nodes.$wrpr.on(a.sliding,function(){u("pause")}).on(a.closing,function(){u("stop")}),r.$wndw.on(a.resize,function(){n.resizeRatio(l,i,f,p,h)})}var o,e,a,n,r,s="tosrus",c="youtube",d=!1;t[s].media[c]={filterAnchors:function(t){return t.toLowerCase().indexOf("youtube.com/watch?v=")>-1},initAnchors:function(o,e){var a=e;e=e.split("?v=")[1].split("&")[0],this.opts[c].imageLink?(e="http://img.youtube.com/vi/"+e+"/0.jpg",t('<a href="'+a+'" class="'+t[s]._c("play")+'" target="_blank" />').appendTo(o),t('<img border="0" />').on(t[s]._e.load,function(i){i.stopPropagation(),o.removeClass(t[s]._c.loading)}).appendTo(o).attr("src",e)):(t('<iframe src="http://www.youtube.com/embed/'+e+'" frameborder="0" allowfullscreen />').appendTo(o),i.call(this,o))},filterSlides:function(t){return t.is("iframe")&&t.attr("src")?t.attr("src").toLowerCase().indexOf("youtube.com/embed/")>-1:!1},initSlides:function(t){i.call(this,t)}},t[s].defaults[c]={ratio:16/9,maxWidth:!1,maxHeight:!1,imageLink:t[s].support.touch}}(jQuery);