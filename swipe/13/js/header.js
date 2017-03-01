// v1.0.1

(function ($, Modernizr) {
	"use strict";

	$(function () {
		var $window = $(window),
			$body = $(document.body),
			$html = $("html"),
			isShowingClass = "is-showing",
			leftButton = $("#topics > a"),
			leftClass = "showing-left",
			rightButton = $("#header-subscribe > a"),
			rightClass = "showing-right",
			mobileQuery = "screen and (max-width: 985px)",
			notMobileQuery = "screen and (min-width: 986px)",
			isMobile = !Modernizr.mq(mobileQuery),
			mobileBehavior = { userSelect: 'none', userDrag: 'auto' },
			desktopBehavior = { userSelect: 'text', userDrag: 'none' },
			timeout = null,
			falseFn = function () { return false; },
			trueFn = function () { return true; },
			clickFunction = function (className) { // Build a click handler
				var bothClassNames = className + " " + isShowingClass;

				return function (e) {
					e.stopPropagation();
					e.preventDefault();

					if (!$body.hasClass(isShowingClass)) {
						$body.addClass(bothClassNames);
					} else if ($body.hasClass(className)) {
						$body.removeClass(bothClassNames);
					}

					return false;
				};
			},
			resetHeader = function () { // Hide the subscribe bar
				if ($body.hasClass(rightClass)) {
					$body.removeClass(isShowingClass + " " + rightClass);
				}
			},
			toggleBehavior = function (element, props) { // Toggle select/drag behavior
				//Hammer.utils.toggleBehavior(element, props);
				element.onselectstart = props.userSelect === 'none' ? falseFn : trueFn;
				element.ondragstart = props.userDrag === 'none' ? falseFn : trueFn;
			},
			doneResizing = function () { // Handle resizing
				if (Modernizr.mq(mobileQuery)) { // Check if mobile-sized
					if (!isMobile) {
						isMobile = true;
						toggleBehavior($body[0], mobileBehavior);
					}
				} else if (Modernizr.mq(notMobileQuery)) {
					if (isMobile) {
						isMobile = false;
						toggleBehavior($body[0], desktopBehavior);
						resetHeader();
					}
				}
			};

		// React to resizing
		$window.resize(function () {
			clearTimeout(timeout);
			timeout = setTimeout(doneResizing, 100);
		}).resize();

		// Handle clicks
		leftButton.click(clickFunction(leftClass));
		rightButton.click(clickFunction(rightClass));

		// Handle clicking outside of the topics menu to close it
		$("#topics").click(function (e) {
			e.stopPropagation();
		});

		$html.click(function () {
			if ($body.hasClass(leftClass) && Modernizr.mq(notMobileQuery)) {
				leftButton.click();
			}
		});
	});
}(window.jQuery, window.Modernizr));
