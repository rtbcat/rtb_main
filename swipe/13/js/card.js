// v1.0.0

if (!window.pageProperties || window.pageProperties.hasCards) {
	(function ($, Modernizr) {
		"use strict";

		var settings = {
			ellipsis: "…",
			watch: "window"
		};

		$(function () {
			if (!Modernizr.csstransitions) {
				$(document.body).addClass("no-transitions");
			}
		});

		$(window).load(function () {
			$(".card").dotdotdot(settings);
			$('ul.cards-archive').masonry({
				layoutPriorities: {
					shelfOrder: 1.5
				}
			});
		});
	}(window.jQuery, window.Modernizr));
}
