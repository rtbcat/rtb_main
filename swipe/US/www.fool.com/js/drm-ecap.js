jQuery().ready(function() {
    if (jQuery('form.ecapForm') && typeof(Validation) !== "undefined" && typeof(ZipValidation) !== "undefined") {
        Validation.initialize('form.ecapForm');
        ZipValidation.initialize('form.ecapForm');
    }
});

var getQueryStringParam = getQueryStringParam || function(param) {
    param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + param + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null) {
        return "";
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
};

var updateQueryStringParam = updateQueryStringParam || function (key, value, url) {
  var re = new RegExp('([?&])' + key + '=.*?(&|#|$)(.*)', 'gi');
  var hash;
  if (!url) {
    url = window.location.href;
  }
  if (re.test(url)) {
    if (typeof value !== 'undefined' && value !== null) {
      return url.replace(re, '$1' + key + '=' + value + '$2$3');
    } else {
      hash = url.split('#');
      url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
      if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
        url += '#' + hash[1];
      }
      return url;
    }
  } else {
    if (typeof value !== 'undefined' && value !== null) {
      var separator = (url.indexOf('?') !== -1)
        ? '&'
        : '?';
      hash = url.split('#');
      url = hash[0] + separator + key + '=' + value;
      if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
        url += '#' + hash[1];
      }
      return url;
    } else {
      return url;
    }
  }
};

var Validation = {
    errorElement: jQuery(document.createElement('SPAN')).addClass('errEmailAddress').html('Please check your email address'),
    initialize: function(selector) {
        jQuery(selector).submit(this.controller);
    },
    controller: function(event) {
        var value = jQuery(event.target).find('input.formbox[name=email]')[0].value;
        if (!Validation.isValid(value)) {
            jQuery(event.target).find('input.formbox[name=email]').after(Validation.errorElement);
            event.preventDefault();
            return false;
        } else {
            Validation.errorElement.remove();
        }
    },
    isValid: function(value, regex) {
        return value.match(/^[a-zA-Z0-9._\-\+]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}$/);
    }
};

var ZipValidation = {
    errorElement: jQuery(document.createElement('SPAN')).addClass('errZipCode').html('Please check your zip code'),
    initialize: function(selector) {
        if (ZipValidation.zipCodeInputExists(selector)) {
            jQuery(selector).submit(this.controller);
        }
    },
    controller: function(event) {
        var value = jQuery(event.target).find('input[name=zipcode]')[0].value;
        if (!ZipValidation.isValid(value)) {
            jQuery(event.target).find('input[name=zipcode]').after(ZipValidation.errorElement);
            event.preventDefault();
            return false;
        } else {
            ZipValidation.errorElement.remove();
        }
    },
    isValid: function(value, regex) {
        return value.match(/^[0-9]{5}$/) || value.match(/^[0-9]{5}\-[0-9]{4}$/);
    },
    zipCodeInputExists: function(selector) {
        return jQuery(selector).find('input[name=zipcode]').length > 0;
    }
};

var TrackingPixel = {
    image: function(imagePath) {
        jQuery(document).ready(function() {
            var img = document.createElement('img');
            img.src = imagePath;
            img.width = 0;
            img.height = 0;
            img.alt = '';
            img.style.cssText = 'display:none';
            document.body.appendChild(img);
        });
    },

    script: function(scriptPath, callback) {
        var el = document.createElement('script');
        el.src = scriptPath;
        el.type = 'text/javascript';
        document.body.appendChild(el);
        if (callback != undefined && callback.typeOf == 'function') {
            callback();
        }
    }
};

var Transcript = {
    closeButton: jQuery('#closeBtn'),
    viewButton: jQuery('#viewTs'),
    transcript: jQuery('#transcript'),
    show: function() {
        Transcript.viewButton.hide();
        Transcript.closeButton.show();
        Transcript.transcript.slideDown();
    },

    hide: function() {
        Transcript.closeButton.hide();
        Transcript.viewButton.show();
        Transcript.transcript.slideUp();
    }
};


// This code is for use on pages where we do an apparent redirect when the user tries to leave the page.
// In fact, we replace the current page content with an iframe showing another page; the user gets a
// dialog box so they can escape if they wish.
var LastChanceOnExit = {

    PreventExitSplash: false,

    // Function to replace the contents of the body with the
    // inline frame so it appears to have jumped to a new page.
    DisplayExitSplash: function() {

        if (LastChanceOnExit.PreventExitSplash == false) {


            if (typeof(analytics) !== "undefined") {
                analytics.track('Exit Pop', {
                    category: 'Video',
                    label: 'Video',
                    value: 0
                });
            }

            if (typeof pageLoadTime != 'undefined') {
                exitSplashDisplayTime = Math.round(Date.now() / 1000) - pageLoadTime;
                timerParams = "&exitSplashDisplayTime=" + exitSplashDisplayTime;
            } else {
                timerParams = "";
            }

            LastChanceOnExit.PreventExitSplash = true;

            if (typeof(exitSplashPageUrl) !== "undefined" && exitSplashPageUrl != null) {
                window.scrollTo(0, 0);
                divtag = document.createElement("div");
                divtag.setAttribute("id", "ExitSplashMainOuterLayer");
                divtag.style.position = "absolute";
                divtag.style.width = "100%";
                divtag.style.height = "100%";
                divtag.style.zIndex = "99";
                divtag.style.left = "0px";
                divtag.style.top = "0px";
                divtag.innerHTML = '<iframe src="' + exitSplashPageUrl + timerParams + '" width="100%" height="100%" align="middle" frameborder="0"></iframe>';

                theBody = document.body;
                if (!theBody) {
                    theBody = document.getElementsByTagName("body")[0];
                }

                theBody.innerHTML = "";
                theBody.topMargin = "0px";
                theBody.rightMargin = "0px";
                theBody.bottomMargin = "0px";
                theBody.leftMargin = "0px";
                theBody.style.overflow = "hidden";
                theBody.appendChild(divtag);
            }
            return exitSplashMessage;
        }
    },

    SetSourceCodes: function() {
        var pageSourceCode = LastChanceOnExit.GetSourceCode(window.location.href);
        source = (pageSourceCode == "") ? defaultSourceCode : pageSourceCode;

        // source all the links that do not have one
        var allLinks = document.links;
        for (var i = 0; i < allLinks.length; i++) {
            var thisLink = allLinks[i];
            if (thisLink.hash == ""){
                var thisLinkSource = LastChanceOnExit.GetActualSourceCode(thisLink.href);
                if (thisLinkSource == "") {
                    thisLink.href += (/\?/.test(thisLink.href)) ? "&" : "?";
                    thisLink.href += "source=" + source;
                }
            }
        }

        // Ensure that there is a source on the url for the exit splash page
        if (typeof(exitSplashPageUrl) !== "undefined" && exitSplashPageUrl != null && exitSplashPageUrl != "") {
            var exitSplashUrlSrc = LastChanceOnExit.GetActualSourceCode(exitSplashPageUrl);
            if (exitSplashUrlSrc == "") {
                exitSplashPageUrl += (/\?/.test(exitSplashPageUrl)) ? "&" : "?";
                exitSplashPageUrl += "source=" + source;
            }
        }
    },

    SetAidCodes: function() {
        var pageAidCode = LastChanceOnExit.GetAidCode(window.location.href);
        var aid = (pageAidCode == "") ? defaultAidCode : pageAidCode;

        // 'aid' all the links that do not have one
        var allLinks = document.links;
        for (var i = 0; i < allLinks.length; i++) {
            var thisLink = allLinks[i];
            if (thisLink.hash == ""){
                var thisLinkAid = LastChanceOnExit.GetActualAidCode(thisLink.href);
                if (thisLinkAid == "") {
                    thisLink.href += (/\?/.test(thisLink.href)) ? "&" : "?";
                    thisLink.href += "aid=" + aid;
                }
            }
        }

        // Ensure that there is a source on the url for the exit splash page
        if (typeof(exitSplashPageUrl) !== "undefined" && exitSplashPageUrl != null && exitSplashPageUrl != "") {
            var exitSplashUrlAid = LastChanceOnExit.GetActualAidCode(exitSplashPageUrl);
            if (exitSplashUrlAid == "") {
                exitSplashPageUrl += (/\?/.test(exitSplashPageUrl)) ? "&" : "?";
                exitSplashPageUrl += "aid=" + aid;
            }
        }
    },

    // If it exists in a URL string, extract the source code which could be 'psource', 'source' or 'src'.
    GetSourceCode: function(url) {
        return LastChanceOnExit.GetCode(url, ['psource', 'source', 'src']);
    },

    // If it exists in a URL string, extract the source code, just 'source'.
    GetActualSourceCode: function(url) {
        return LastChanceOnExit.GetCode(url, ['source']);
    },

    // If it exists in a URL string, extract the 'paid' or 'aid' code.
    GetAidCode: function(url) {
        return LastChanceOnExit.GetCode(url, ['paid', 'aid']);
    },

    // If it exists in a URL string, extract the 'aid', just 'aid'.
    GetActualAidCode: function(url) {
        return LastChanceOnExit.GetCode(url, ['aid']);
    },

    // If it exists in a URL string, extract the source/aid/whatever code.
    GetCode: function(url, searchItemsArray) {
        var name, value, nameValuePair;
        if (/\?/.test(url)) {
            var nameValuePairs = url.substring(url.indexOf("?") + 1).split("&");
            for (i in nameValuePairs) {
                nameValuePair = nameValuePairs[i];
                if (typeof(nameValuePair) !== 'string') {
                    continue;
                }
                if (nameValuePair.split("=").length > 0) {
                    name = nameValuePair.split("=")[0];
                    if (searchItemsArray.indexOf(name) > -1) {
                        value = nameValuePair.split("=")[1];
                        return value;
                    }
                }
            }
        }
        return "";
    }
}


function threedsojs(exitSplashPageUrl, timeDelayToShowBuyLink) {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        /*** Redirect all mobile traffic to landing page ***/
        window.onbeforeunload = function() {}; // Disable exit pop.
        var sourceCode = LastChanceOnExit.GetSourceCode(window.location.href);
        // Strip hard-coded source. All *mobile* traffic should keep the incoming source.
        var redirectUrl = exitSplashPageUrl.replace(/[\?&]source=.{16}/, '');
        var sourceParam = (/\?/.test(redirectUrl)) ?
            "&source=" + sourceCode : "?source=" + sourceCode;
        var mobileRedirectParam = "&mobileredirect=true";
        window.location.replace(redirectUrl + sourceParam + mobileRedirectParam);
    }

    var trackCell = function(testName, cellName) {
        var img = document.createElement('img');
        img.src = "http://www.fool.com/tracking/vs/vs_track.gif?log=1&TestID=" + testName + "&CellID=" + cellName;
        img.width = 0;
        img.height = 0;
        img.className = 'vs-tracking-px';
        document.body.appendChild(img);
    };


    /*** These can be overridden by Testing Shim component rendered prior to this component. ***/
    var defaultSourceCode = defaultSourceCode || ''; // Can be empty so long as you call the page with a source in the query string
    var exitSplashMessage = exitSplashMessage || '\n\nWhoa! Hold on there Foolish investor... \n\n You are about to navigate away and miss the presentation. \n\n Press OK to continue.\n\n Or press Cancel to read the transcript. \n\n It could be the most profitable decision you have ever made!\n\n';
    var defaultAidCode = defaultAidCode || '';

    jQuery(window).load(function() {

        Date.now = Date.now || function() {
            return (new Date).valueOf();
        };
        pageLoadTime = Math.round(Date.now() / 1000);
        var specifiedStartNowDisplay = Math.round(timeDelayToShowBuyLink / 1000);


        // Intercept leaving the page
        window.onbeforeunload = LastChanceOnExit.DisplayExitSplash;


        // Make link to Start Now appear after some predetermined time
        if (document.getElementById("startNow")) {

            setTimeout(function() {
                jQuery(".hideUntilStartNow").each(function(i) {
                    jQuery(this).css('visibility', 'visible');
                });

                // Send dataLayer event for floodlight retargeting
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'startNowAppeared'
                });

                jQuery("#startNow").css('visibility', 'visible');
                jQuery("#startNow > a").css('visibility', 'visible');
                actualStartNowDisplay = Math.round(Date.now() / 1000) - pageLoadTime;
                if (typeof(Wistia) !== "undefined") {
                    jQuery('#video_container').click(function() {
                        window.onbeforeunload = function() {};
                        var href = jQuery("#startNow a").attr("href");
                        window.location.href = href;
                    });
                }
            }, timeDelayToShowBuyLink);

            jQuery("#startNow").on("click", function() {
                window.onbeforeunload = function() {};
                var specifiedStartNowDisplay = 1000;
                var startNowClickAfterDisplay = Math.round(Date.now() / 1000) - actualStartNowDisplay - pageLoadTime;
                var clickDataParams = "&specifiedStartNowDisplay=" + specifiedStartNowDisplay + "&actualStartNowDisplay=" + actualStartNowDisplay + "&startNowClickAfterDisplay=" + startNowClickAfterDisplay;
                var href = jQuery("#startNow a").attr("href");
                jQuery("#startNow a").attr("href", href + clickDataParams);
            });

        };


        jQuery(".noExitPop").on("click", function() {
            window.onbeforeunload = function() {};
        });


        if (window.location.href.indexOf('exitpop=false') > -1) {
            window.onbeforeunload = function() {};
        }


        // Ensure source/aid codes are appended to links
        LastChanceOnExit.SetSourceCodes();
        LastChanceOnExit.SetAidCodes();
    });

}

