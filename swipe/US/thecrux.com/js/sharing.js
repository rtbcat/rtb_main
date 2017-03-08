// v1.0.1

(function ($, gigya) {
	"use strict";

	var providers = ["facebook", "twitter"],
		buildShareData = function (element) { // Builds the sharing data into the element
			// Build the share data
			var $this = $(element),
				data = {
					url: $this.data("url") || location.href,
					title: $this.data("title") || document.title,
					thumbnailUrl: $this.data("thumbnail-url"),
					description: $this.data("description")
				};

			// Remove empty data
			data.thumbnailUrl || delete data.thumbnailUrl;
			data.description || delete data.description;

			// Save to the element
			$this.data("share-data", data);

			return data;
		},
		handleSharing = function (e) {
			// Get the data
			var $this = $(this),
				provider = $this.parent().attr("class"),
				parent = $this.parents("ul.share, ul.card-share"),
				data = parent.data("share-data") || buildShareData(parent);

			// For valid providers, take over the click event
			if (~$.inArray(provider, providers)) {
				e.preventDefault();
				data.url = data.url.replace("local.thecrux", "thecrux");
				gigya.socialize.postBookmark($.extend({ provider: provider }, data));
			}
		};

	$(function () {
		if (!window.pageProperties || window.pageProperties.hasSharing) {
			var defaultValue = "--",
				facebookCount = $(".facebook_count").text(defaultValue),
				twitterCount = $(".twitter_count").text(defaultValue),
				displayCounts;

			displayCounts = function (response) {
				var hasError = response.errorCode !== 0;

				facebookCount.text(hasError ? defaultValue : response.shareCounts.facebook);
				twitterCount.text(hasError ? defaultValue : response.shareCounts.twitter);

				if(facebookCount.text() >= 100) facebookCount.css('visibility', 'visible');
				if(twitterCount.text() >= 100) twitterCount.css('visibility', 'visible');

			};

			gigya.socialize.getProviderShareCounts({callback: displayCounts});
		}

		if (!window.pageProperties || window.pageProperties.hasArchive) {
			// Handle clicks on share links
			$(".cards").on("click", ".card-share a", handleSharing);
		}

		$("ul.share a, ul.mobile-share a").on("click", handleSharing);
	});



}(window.jQuery, window.gigya));
