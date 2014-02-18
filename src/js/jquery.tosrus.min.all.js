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
!function(s){function i(){o=function(s){return e+"-"+s},d=function(s){return e+"-"+s},r=function(s){return s+"."+e},s.each([o,d,r],function(s,i){i.add=function(s){s=s.split(" ");for(var t in s)i[s[t]]=i(s[t])}}),o.add("noanimation fastanimation opened opening wrapper slider slide html loading fixed inline touch desktop hover"),d.add("content slide anchor ratio maxWidth maxHeight index"),r.add("open opening close closing prev next slideTo sliding click keyup scroll orientationchange load loading transitionend webkitTransitionEnd"),a={complObject:function(i,t){return s.isPlainObject(i)||(i=t),i},complBoolean:function(s,i){return"boolean"!=typeof s&&(s=i),s},complNumber:function(i,t){return s.isNumeric(i)||(i=t),i},complString:function(s,i){return"string"!=typeof s&&(s=i),s},isPercentage:function(s){return"string"==typeof s&&"%"==s.slice(-1)},getPercentage:function(s){return parseInt(s.slice(0,-1))},transitionend:function(s,i,t){var e=!1,n=function(){e||i.call(s[0]),e=!0};s.one(r.transitionend,n),s.one(r.webkitTransitionEnd,n),setTimeout(n,1.1*t)},setViewportScale:function(){l.$body.addClass(o("scale-"+Math.max(Math.min(Math.round(s(document).width()/window.outerWidth),3),1)))}},l={$wndw:s(window),$html:s("html"),$body:s("body"),scrollPosition:0},l.$body.addClass(s[t].support.touch?o.touch:o.desktop),l.$wndw.on(r.scroll,function(s){l.$body.hasClass(o.opened)&&(window.scrollTo(0,l.scrollPosition),s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation())}),a.setViewportScale(),l.$wndw.on(r.orientationchange,function(){a.setViewportScale()}),s[t]._c=o,s[t]._d=d,s[t]._e=r,s[t]._f=a,s[t]._g=l}var t="tosrus",e="tos",n="2.0.0";if(!s[t]){var o={},d={},r={},a={},l={};s[t]=function(s,i,t){return this.$node=s,this.opts=i,this.conf=t,this.vars={},this.nodes={},this.slides={},this._init(),this},s[t].prototype={_init:function(){var i=this;this._complementOptions(),this.vars.fixed="window"==this.opts.wrapper.target,this.nodes.$wrpr=s('<div class="'+o.wrapper+'" />'),this.nodes.$sldr=s('<div class="'+o.slider+'" />').appendTo(this.nodes.$wrpr),this.nodes.$wrpr.addClass(this.vars.fixed?o.fixed:o.inline).addClass(o("fx-"+this.opts.effect)).addClass(o(this.opts.slides.scale)).addClass(this.opts.wrapper.classes),this.nodes.$wrpr.on(r.open+" "+r.close+" "+r.prev+" "+r.next+" "+r.slideTo,function(s){arguments=Array.prototype.slice.call(arguments);var s=arguments.shift(),t=s.type;s.stopPropagation(),"function"==typeof i[t]&&i[t].apply(i,arguments)}).on(r.click,function(s){s.stopPropagation(),i.nodes.$wrpr.toggleClass(o.hover)}),this.nodes.$anchors=this._initAnchors(),this.nodes.$slides=this._initSlides(),this.slides.total=this.nodes.$slides.length,this.slides.visible=this.opts.slides.visible,this.slides.index=0,this.vars.opened=!0;for(var e=0;e<s[t].addons.length;e++)s.isFunction(this["_addon_"+s[t].addons[e]])&&this["_addon_"+s[t].addons[e]]();for(var n=0;n<s[t].ui.length;n++)this.nodes.$wrpr.find("."+o[s[t].ui[n]]).length&&this.nodes.$wrpr.addClass(o("has-"+s[t].ui[n]));this.vars.fixed?(this.nodes.$wrpr.appendTo(l.$body),this.close(!0)):(this.nodes.$wrpr.appendTo(this.opts.wrapper.target),this.opts.show?(this.vars.opened=!1,this.open(0,!0)):this.close(!0))},open:function(i,t){var e=this;this.vars.opened||(this.vars.fixed&&(l.scrollPosition=l.$wndw.scrollTop(),l.$body.addClass(o.opened)),t?this.nodes.$wrpr.addClass(o.opening).trigger(r.opening,[i,t]):setTimeout(function(){e.nodes.$wrpr.addClass(o.opening).trigger(r.opening,[i,t])},5),this.nodes.$wrpr.addClass(o.hover).addClass(o.opened)),this.vars.opened=!0,this._loadContents(),s.isNumeric(i)&&(t=t||!this.vars.opened,this.slideTo(i,t))},close:function(i){this.vars.opened&&(this.vars.fixed&&l.$body.removeClass(o.opened),i?this.nodes.$wrpr.removeClass(o.opened):a.transitionend(this.nodes.$wrpr,function(){s(this).removeClass(o.opened)},this.conf.transitionDuration),this.nodes.$wrpr.removeClass(o.hover).removeClass(o.opening).trigger(r.closing,[this.slides.index,i])),this.vars.opened=!1},prev:function(i,t){s.isNumeric(i)||(i=this.opts.slides.slide),this.slideTo(this.slides.index-i,t)},next:function(i,t){s.isNumeric(i)||(i=this.opts.slides.slide),this.slideTo(this.slides.index+i,t)},slideTo:function(i,e){if(!this.vars.opened)return!1;if(!s.isNumeric(i))return!1;var n=!0;if(0>i){var d=0==this.slides.index;this.opts.infinite?i=d?this.slides.total-this.slides.visible:0:(i=0,d&&(n=!1))}if(i+this.slides.visible>this.slides.total){var l=this.slides.index+this.slides.visible>=this.slides.total;this.opts.infinite?i=l?0:this.slides.total-this.slides.visible:(i=this.slides.total-this.slides.visible,l&&(n=!1))}if(this.slides.index=i,this._loadContents(),n){var h=0-this.slides.index*this.opts.slides.width+this.opts.slides.offset;this.slides.widthPercentage&&(h+="%"),e&&(this.nodes.$sldr.addClass(o.noanimation),a.transitionend(this.nodes.$sldr,function(){s(this).removeClass(o.noanimation)},5));for(var c in s[t].effects)if(c==this.opts.effect){s[t].effects[c].call(this,h,e);break}this.nodes.$wrpr.trigger(r.sliding,[i,e])}},_initAnchors:function(){var i=this,e=s();if(this.$node.is("a"))for(var n in s[t].media)e=e.add(this.$node.filter(function(){return s[t].media[n].filterAnchors.call(i,s(this).attr("href"))}));return e},_initSlides:function(){return this[this.$node.is("a")?"_initSlidesFromAnchors":"_initSlidesFromContent"](),this.nodes.$sldr.children().css("width",this.opts.slides.width+(this.slides.widthPercentage?"%":""))},_initSlidesFromAnchors:function(){var i=this;this.nodes.$anchors.each(function(t){var e=s(this),n=s('<div class="'+o.slide+" "+o.loading+'" />').data(d.anchor,e).appendTo(i.nodes.$sldr);e.data(d.slide,n).on(r.click,function(s){s.preventDefault(),i.open(t)})})},_initSlidesFromContent:function(){var i=this;this.$node.children().each(function(){var e=s(this);s('<div class="'+o.slide+'" />').append(e).appendTo(i.nodes.$sldr);for(var n in s[t].media)if(s[t].media[n].filterSlides.call(i,e)){s[t].media[n].initSlides.call(i,e),e.parent().addClass(o(n));break}})},_loadContents:function(){var s=this;switch(this.opts.slides.load){case"all":this._loadContent(0,this.slides.total);break;case"visible":this._loadContent(this.slides.index,this.slides.index+this.slides.visible);break;case"near-visible":default:this._loadContent(this.slides.index,this.slides.index+this.slides.visible),setTimeout(function(){s._loadContent(s.slides.index-s.slides.visible,s.slides.index),s._loadContent(s.slides.index+s.slides.visible,s.slides.index+2*s.slides.visible)},this.conf.transitionDuration)}},_loadContent:function(i,e){var n=this;this.nodes.$slides.slice(i,e).each(function(){var i=s(this);if(0==i.children().length){var e=i.data(d.anchor).attr("href");for(var a in s[t].media)if(s[t].media[a].filterAnchors.call(n,e)){s[t].media[a].initAnchors.call(n,i,e),i.addClass(o(a));break}i.trigger(r.loading,[i.data(d.anchor)])}})},_complementOptions:function(){if("undefined"==typeof this.opts.wrapper.target&&(this.opts.wrapper.target=this.$node.is("a")?"window":this.$node),"window"!=this.opts.wrapper.target&&"string"==typeof this.opts.wrapper.target&&(this.opts.wrapper.target=s(this.opts.wrapper.target)),this.opts.show=a.complBoolean(this.opts.show,"window"!=this.opts.wrapper.target),s.isNumeric(this.opts.slides.width))this.slides.widthPercentage=!1,this.opts.slides.visible=a.complNumber(this.opts.slides.visible,1);else{var i=a.isPercentage(this.opts.slides.width)?a.getPercentage(this.opts.slides.width):!1;this.slides.widthPercentage=!0,this.opts.slides.visible=a.complNumber(this.opts.slides.visible,i?Math.floor(100/i):1),this.opts.slides.width=i?i:Math.ceil(1e4/this.opts.slides.visible)/100}this.opts.slides.slide=a.complNumber(this.opts.slides.slide,this.opts.slides.visible),this.opts.slides.offset=a.isPercentage(this.opts.slides.offset)?a.getPercentage(this.opts.slides.offset):a.complNumber(this.opts.slides.offset,0)}},s.fn[t]=function(e,n,o,d){l.$wndw||i(),e=s.extend(!0,{},s[t].defaults,e),e=s.extend(!0,{},e,s[t].support.touch?o:n),d=s.extend(!0,{},s[t].configuration,d);var r=new s[t](this,e,d);return this.data(t,r),r.nodes.$wrpr},s[t].support={touch:"ontouchstart"in window.document},s[t].defaults={infinite:!1,effect:"slide",wrapper:{classes:""},slides:{offset:0,scale:"fit",load:"near-visible",visible:1}},s[t].configuration={transitionDuration:400},s[t].debug=function(){},s[t].deprecated=function(s,i){"undefined"!=typeof console&&"undefined"!=typeof console.warn&&console.warn(t+": "+s+" is deprecated, use "+i+" instead.")},s[t].effects={slide:function(s){var s="translateX("+s+")";this.nodes.$sldr.css({"-webkit-transform":s,"-moz-transform":s,"-ms-transform":s,"-o-transform":s,transform:s})},fade:function(i){a.transitionend(this.nodes.$sldr,function(){s(this).css("left",i).css("opacity",1)},this.conf.transitionDuration),this.nodes.$sldr.css("opacity",0)}},s[t].version=n,s[t].media={},s[t].addons=[],s[t].ui=[]}}(jQuery);
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