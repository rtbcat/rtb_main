// v1.0.1 -- Script to make the "up next" floater... float

(function ($) {
	"use strict";

	$(function () {
		var cookiename = 'crx_float_close';


		if ($('#floater').length) {
			var floater = $('#floater');
			floater.find('.floater-close').click((function (floater) {

				return function (event) {
					event.preventDefault();
					floater.floater_hidden = true;
					floater.floater_showable = false;
					floater.floater_closed = true;
					floater.floater_update();

					$.cookie(cookiename, true, { expires: 7, path: '/' })
				};
			}(floater)));

			floater.floater_hidden = false;
			floater.floater_ready = false;
			floater.floater_showable = true;
			floater.floater_shown = false;
			floater.floater_animating = false;
			floater.floater_scrolled = false;
			floater.floater_closed = false;

			floater.floater_width = floater.css('width');
			floater.floater_origin = floater.css('right');
			floater.floater_margin = (Math.abs(parseInt(floater.floater_origin, 10)) - parseInt(floater.floater_width, 10)) + "px";


			if($.cookie(cookiename)) {
				floater.floater_hidden = true;
			}

			floater.floater_show = function () {
				this.floater_animating = true;
				floater.css('visibility', 'visible');

				floater.stop().animate({right: this.floater_margin}, {complete: (function (floater) {
					floater.floater_animating = false;
					floater.floater_shown = true;
				}(this))});
			};

			floater.floater_hide = function () {
				this.floater_animating = true;
				floater.stop().animate({right: this.floater_origin}, {complete: (function (floater) {
					floater.floater_animating = false;
					floater.floater_shown = false;
				}(this))});
			};

			floater.floater_update = function () {
				if (this.floater_ready) {
					if (this.floater_showable && !this.floater_closed && !this.floater_hidden) {
						if (!this.floater_shown && !this.floater_animating) {
							this.floater_show();
						}
					} else {
						if (this.floater_shown && !this.floater_animating) {
							this.floater_hide();
						}
					}
				}
			};

			//handle scrolling
			$(window).scroll((function (floater) {
				return function () {
					if ($(window).scrollTop() > ($('body').height() - $(window).height()) / 2) {
						floater.floater_scrolled = true;
						floater.floater_showable = true;
						if (!floater.floater_shown && !floater.floater_animating) {
							floater.floater_update();
						}
					} else if ($(window).scrollTop() === 0) {
						floater.floater_showable = false;
						if (floater.floater_shown && !floater.floater_animating) {
							floater.floater_update();
						}
					}
				};
			}(floater)));

			setTimeout(function () {
				floater.floater_ready = true;
				//floater.floater_showable = true;
				//floater.floater_update();
			}, 1000);
		}
	});

}(window.jQuery));
