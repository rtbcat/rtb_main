// v1.0.0

(function ($) {
	"use strict";

	window.loader = {
		element: $(),
		className: "is-loading",
		isLoading: false,

		init: function (element) { // Initialize the loader
			this.element = $(element || "div");
			this.element.append($("<span/>", { "class": "animated-loader" }));
		},

		toggle: function (state) { // Update the isLoading state
			this.isLoading = arguments.length ? !!state : !this.isLoading;
			this.element.toggleClass(this.className, this.isLoading);
		},

		activate: function () { // Activate the loader
			this.toggle(true);
		},

		deactivate: function () { // Deactivate the loader
			this.toggle(false);
		}
	};

	$(function () {
		// Initialize the loader
		window.loader.init("#siteheader header h1 a");
	});
}(window.jQuery));
