// v1.0.1

if (!window.pageProperties || window.pageProperties.isSingle) {
	(function ($, Modernizr) {
		"use strict";

		$(function () {
			var $window = $(window),
				resizeTimeout = null,
				scrollTimeout = null,
				allVideos = $(".embed").find("iframe, object, embed"),
				container = $("#post-content"),
				lastContainerHeight = 0,
				header = $("#siteheader"),
				shareOffset = header.outerHeight(),
				shareBar = $("#sidebar > .share").data("data", {}),
				shareStates = ["", "floating", "docked"],
				mobileQuery = "screen and (max-width: 985px)",
				articleImageContainer = $("#article-image"),
				articleImage = articleImageContainer.find("img"),
				coords = null,
				isMobile = function () {
					return Modernizr.mq(mobileQuery);
				},
				resizeVideos = function () { // Handle video resizing
					allVideos.each(function () {
						var $this = $(this),
							newWidth = ($this.data("parent") || $this.parent()).width();

						$this
							.width(newWidth)
							.height(newWidth * $this.attr("data-aspect-ratio"));
					});
				},
				setShareState = function (state, ignoreData) {
					var data = shareBar.data("data");

					if (data.state !== state || ignoreData) {
						// Update class
						shareBar
							.removeClass(shareStates[data.state])
							.addClass(shareStates[state]);

						if (!ignoreData) {
							// Update data
							data.state = state;
							shareBar.data("data", data);
						}

						// Manually fix the positioning while floating
						shareBar.css({ top: (data.state === 1) ? shareOffset : "" });
					}
				},
				scrollShare = function () { // Handle share scrolling
					var position = $window.scrollTop();

					shareBar.each(function () {
						var $this = $(this),
							data = $this.data("data"),
							nextState = position < data.top ? 0 :
									position < data.bottom ? 1 : 2;

						// Update the state of the share bar
						setShareState(nextState);
					});
				},
				checkContainer = function () { // Check if the container has been resized
					var newHeight = container.outerHeight();

					if (lastContainerHeight !== newHeight) {
						lastContainerHeight = newHeight;

						// Update share bar data
						shareBar.each(function () {
							var $this = $(this),
								top = container.offset().top,
								data = $this.data("data");

							setShareState(0);

							data.top = $this.offset().top - shareOffset;
							data.bottom = top + newHeight - $this.outerHeight() - shareOffset;
							$this.data("data", data);

							setShareState(data.state);
						});

						// Update share scrolling
						scrollShare();
					}
				},
				checkImage = function () { // Check if the image has faces and center it
					var height = articleImage.data("height"),
						bestCoords = null,
						bestConfidence = null,
						heightRatio,
						position;

					if (isMobile()) {
						if (!coords) {
							coords = articleImage.faceDetection();

							// Get the natural height of the image to account for scaling
							height = articleImage[0].naturalHeight || articleImage.attr("height");
							articleImage.data("height", height);

							// Get the highest confidence coordinates
							if (coords) {
								$.each(coords, function (i, val) {
									if (bestConfidence === null || val.confidence > bestConfidence) {
										bestCoords = val;
										bestConfidence = val.confidence;
									}
								});
							}

							coords = bestCoords;
						}

						// Maneuver the image to center the face
						if (coords) {
							heightRatio = articleImage.height() / height;

							// Account for scaling with the height ratio
							position = {
								y: coords.y * heightRatio,
								h: coords.height * heightRatio
							};

							articleImage.css({
								marginTop: 0, // Remove the margin: 50%
								top: Math.min(Math.max(-(position.y + position.h / 2 - articleImageContainer.height() / 2), -articleImage.height()), 0)
							});
						} else {
							articleImage.css({
								marginTop: "",
								top: ""
							});
						}
					}
				},
				doResize = function () { // Respond to resize
					resizeVideos();
					checkContainer();
					checkImage();
				},
				doScroll = function () { // Respond to scrolling
					scrollShare();
				};

			// Fix iframes for IE
			$("iframe").each(function () {
				var url = $(this).attr("src");

				if (url) {
					$(this).attr({
						"src" : url + (url.indexOf("?") > 0 ? "&" : "?") + "wmode=transparent",
						"wmode" : "opaque"
					});
				}
			});

			// Set up aspect ratio data
			allVideos.each(function () {
				var aspectRatio = 0.5;

				if (this.height && this.width) {
					var height = this.height.replace('px', '').replace('%', ''),
						width = this.width.replace('px', '').replace('%', '');

					aspectRatio = height / width;
				}

				$(this)
						.attr("data-aspect-ratio", aspectRatio)
						.data("parent", $(this).parent())
						.removeAttr("height")
						.removeAttr("width");
			});

			// Handle subscription form toggle on embedded media posts
			$(".embed").each(function () {
				var embed = $(this),
					button = embed.find(".share > .subscribe > a").add(embed.find(".close")),
					className = "is-open";

				button.click(function (e) {
					e.preventDefault();
					e.stopPropagation();

					embed.toggleClass(className);

					return false;
				});
			});

			// Handle mobile-only subscribe toggle
			$("#mobile-subscribe").each(function () {
				var $this = $(this),
					toggler = $this.children("strong").add($this.children(".close")),
					className = "is-open",
					paragraphs = $this.parent().find("p");

				// Toggle on click
				toggler.click(function () {
					$this.toggleClass(className);
				});

				// Reposition in the middle of the article
				if (paragraphs.length < 5) {
					paragraphs.first().after($this);
				} else {
					paragraphs.eq(Math.round(paragraphs.length / 2)).after($this);
				}
			});

			// Facebook "Like" button
			(function (d, s, id) {
				var js,
					fjs = d.getElementsByTagName(s)[0];

				if (d.getElementById(id)) {
					return;
				}

				js = d.createElement(s);
				js.id = id;
				js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=456772637782763";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));

			// Double-check the container if there's an embed / iframe loading
			if ($("#post.embed").length) {
				setTimeout(checkContainer, 5000); // Lazy loading...
			}

			// Respond to window scroll
			$window.scroll(function () {
				clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(doScroll, 0);
			});

			// Respond to window resize
			$window
				.resize(function () {
					clearTimeout(resizeTimeout);
					resizeTimeout = setTimeout(doResize, 100);
				})
				.resize();

			checkContainer();
		});
	}(window.jQuery, window.Modernizr));
}
