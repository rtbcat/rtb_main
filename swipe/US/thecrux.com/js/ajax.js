// v1.0.2

/* AJAX to load more articles */
if (!window.pageProperties || window.pageProperties.hasArchive) {
	(function ($, PT_Ajax, Modernizr) {
		"use strict";

		$(document).ready(function () {
			$('.more-cards').each(function () {
				var $this = $(this),
					isProcessing = false,
					parentList = $this.parents(".cards"),
					moreButton = $("#more-card-button"),
					customField = $this.data("custom-field"),
					customFieldValue = $this.data("custom-field-value"),
					taxonomy = $this.data("taxonomy"),
					taxonomySlug = $this.data("taxonomy-slug"),
					searchQuery = $this.data("search-query"),
					excludedIds = $this.data("excluded-ids"),
					limit = $this.parent().data("limit"),
					tabletQuery = "only screen and (min-width: 600px) and (max-width: 1347px)",
					oldLimit,
					hashValue;

				// Make the limit flexible based on the window size
				if (!limit) {
					limit = Modernizr.mq(tabletQuery) ? 6 : 8;
				}

				// Clean URL for JS users and save for debug purposes
				$this.attr({
					"data-href": $this.attr("href"),
					"href": "#"
				});

				$this.click(function (e) {
					e.preventDefault();

					// Don't attempt to load more until the current load is complete
					// Note: On the server side, the nonce prevents this. This is for client side.
					if (!isProcessing) {
						var offset = parentList.children().length - 1;

						// Notify that the request is currently happening
						isProcessing = true;

						// Start the loader
						if (window.loader) {
							window.loader.activate();
						}

						$.post(
							PT_Ajax.ajaxurl,
							{
								// wp ajax action
								action : 'ajax-loadmoreSubmit',

								// vars
								offset : offset,
								taxonomy : taxonomy,
								taxonomy_slug : taxonomySlug,
								custom_field : customField,
								custom_field_value : customFieldValue,
								search_query : searchQuery,
								excluded_ids : excludedIds,
								limit : limit,

								// send the nonce along with the request
								nextNonce : PT_Ajax.nextNonce
							},
							function (response) {
								var newStuff = $(response);

								// Stop the loader
								if (window.loader) {
									window.loader.deactivate();
								}

								// Handle display logic
								moreButton.detach();
								parentList
									.append(newStuff)
									.append(moreButton)
									.masonry("appended", newStuff)
									.masonry({
										layoutPriorities: {
											shelfOrder: 1.5
										}
									});

								// Update the hash
								location.replace("#" + (parentList.children().length - 1));

								// Notify that the request is complete
								isProcessing = false;
							}
						);
					}
				});

				// Check if the browser is asking for a certain amount of posts on load
				if (location.hash) {
					oldLimit = limit;
					hashValue = location.hash.slice(1).match(/^\d+$/);

					if (hashValue) {
						limit = parseInt(hashValue, 10) - (parentList.children().length - 1);

						if (limit > 0) {
							$this.click();
						}

						limit = oldLimit;
					}
				}
			});
		});
	}(window.jQuery, window.PT_Ajax, window.Modernizr));
}

(function ($, PT_Ajax) {
	"use strict";

	/* ajax call to increment post view count */
	window.incrementPostViewCount = function (postId) {
		$.get(
			PT_Ajax.ajaxurl,
			{
				// wp ajax action
				action: 'ajax-postHit',
				post_id: postId
			},
			function (response) {
				return false;
			}
		);

		return false;
	};
}(window.jQuery, window.PT_Ajax));
