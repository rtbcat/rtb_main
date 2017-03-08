// v1.0.2

(function ($) {
	"use strict";

	$(function () {
		var validationRegex = /^[a-zA-Z0-9_.+\-]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z.]{2,}$/,
			validationClassName = "is-invalid",
			placeholderClassName = "placeholder",
			placeholderAttrName = "placeholder";

		// Fake the placeholder functionality for more stylistic control... :/
		$("input[placeholder]").each(function () {
			var $this = $(this),
				placeholder = $this.attr(placeholderAttrName);

			// Kill the browser's default placeholder functionality in one fell swoop
			$this.removeAttr(placeholderAttrName);

			$this
				.on("focusin", function () { // Handle focus
					if ($this.val() === placeholder) {
						$this.removeClass(placeholderClassName).val("");
					}
				})
				.on("focusout", function () { // Handle blur
					if ($.trim($this.val()) === "") {
						$this.addClass(placeholderClassName).val(placeholder);
					}
				})
				.trigger("focusin") // Force a focus,
				.trigger("focusout"); // Then force a blur...
		});

		// Take over e-mail validation, because apparently, the browser isn't good enough
		$("input[type=email]").each(function () {
			var $this = $(this),
				form = $this.parents("form"),
				wrapper;

			// Kill browser's default validation in 3... 2... 1...
			form.attr("novalidate", "");

			// Create false elements since psuedo-elements don't work for forms
			$this.wrap("<span>").after("<span>");
			wrapper = $this.parent().width($this.outerWidth());

			// Prepare to hold the form's validation for ransom
			form.on("submit", function () {
				if (!validationRegex.exec($this.val())) {
					wrapper.addClass(validationClassName);
					$this.trigger("blur");

					return false;
				}
			});

			// Clear error message if the user decides to buck up and try again
			$this.on("focus", function () {
				wrapper.removeClass(validationClassName);
			});
		});

		// Activate the loader when a search occurs
		$("form[role=search]").submit(function () {
			if (window.loader) {
				window.loader.activate();

				// There's no cross browser way to detect a load stop, so just wait 10 seconds
				setTimeout($.proxy(window.loader.deactivate, window.loader), 10000);
			}
		});
	});
}(window.jQuery));
