function ExitSplashManager(config) {
    window.IsCurrentPageActive = true;
    var TIMEOUT = 1000,INTERVAL = 100;
    var self = this;
    var preventExitSplash = false,
        url = config.url,
        message = config.message,
        isRedirect = config.isRedirect,
        timeOutId;
    var iframeContainer;
    var contentBody,
        content,
        exitSplahFrmae,
        exitsplashFrameName = 'exitSplashframe';

    var replaceAllScriptsExcetpAllowed = function(content){
        var regexp = new RegExp('<\\s*script\\b[^<]*(?:(?!<\\s*\/\\s*script\\s*>)<[^<]*)*<\\s*\/\\s*script\\s*>', 'gi');
        var requiredScriptSign = 'data-type="required"';
        var contentWithoutScripts = content.replace(regexp, function (script) {
            if (script.indexOf(requiredScriptSign) > -1) {
                return script;
            }

            return '';
        });

        return contentWithoutScripts;
    }

    var downloadContent = function () {
        var xhr;

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xhr = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    content = xhr.responseText;
                    var contentWithoutScripts = replaceAllScriptsExcetpAllowed(content);

                    var frameDoc = getExitSplashFrame().document;
                    frameDoc.write(contentWithoutScripts);
                }
            }
        }

        xhr.open("GET", url, true);
        xhr.send();
    };

    var tryGetFrameName = function(frame) {
        try {
            return frame.name;
        } catch (e) {
            return '';
        }
    }

    var getExitSplashFrame = function() {
        if (exitSplahFrmae) return exitSplahFrmae;

        for (var i = 0; i < window.frames.length; i++) {
            var frameName = tryGetFrameName(window.frames[i]);
            if (frameName === exitsplashFrameName) {
                exitSplahFrmae = window.frames[i];
                break;
            }
        }

        return exitSplahFrmae;
    }

    var disableLinks = function () {
        var a = document.getElementsByTagName('A');
        for (var i = 0; i < a.length; i++) {
            if (a[i].target !== '_blank') {
                __attachEventHandler(a[i], 'click', function () {
                    self.setPreventExitSplash(true);
                });
            } else {
                __attachEventHandler(a[i], 'click', function () {
                    self.setPreventExitSplash(false);
                });
            }
        }
    };

    var disableForms = function () {
        var f = document.getElementsByTagName('FORM');
        for (var i = 0; i < f.length; i++) {
            __attachEventHandler(f[i], 'submit', function () {
                self.setPreventExitSplash(true);
            });
        }
    };

    var getBody = function () {
        if (!contentBody) {
            contentBody = document.body;
            if (!contentBody) {
                contentBody = document.getElementById("body");
                if (!contentBody) {
                    contentBody = document.getElementsByTagName("body")[0];
                }
            }
        }

        return contentBody;
    };

    var preparePage = function () {
        var x = document.getElementsByTagName("style");
        for (var i = 0; i < x.length; i++) {
            x[i].parentElement.removeChild(x[i]);
        }
    }

    var getExitsplashIFrame = function (src) {
        src = src || '';
        var onLoadAttribute = typeof (__onFrameLoad) != typeof (undefined) ? 'onload="__onFrameLoad(this)"' : '';
        var iFrameDiv = '<div id="ExitSplashDiv"  style="display:block; width:100%; height:100%; background:#FFFFFF; margin-top:0px; margin-left:0px;" align="center">';
        iFrameDiv = iFrameDiv + '<iframe name="' + exitsplashFrameName + '"' + src +
            ' width="100%" height="100%" align="middle" ' +
            onLoadAttribute + ' frameborder="0"></iframe>';
        iFrameDiv = iFrameDiv + '</div>';
        return iFrameDiv;
    };

    var getExitsplashIFrameWithoutSrc = function() {
        var src = '';
        return getExitsplashIFrame(src);
    }

    var getExitsplashIFrameWithSrc = function () {
        var src = 'src="' + url + '"';
        return getExitsplashIFrame(src);
    }

    var setupExitSplash = function () {
        disableLinks();
        disableForms();
        if (!isRedirect) {
            downloadContent();
        }
    };

    var redrawIframe = function() {
        var div = window.document.getElementById('ExitSplashMainOuterLayer');
        exitSplahFrmae = null;
        div.innerHTML = getExitsplashIFrameWithSrc();
    }

    var repalaceContentWithoutScriptsInFrame = function () {
        var timeOut = setTimeout(function () {
            redrawIframe(true);
        }, 10);
    }

    var displayExitSplash = function () {

        if (preventExitSplash == false) {
            preventExitSplash = true;
            detachEvents();
            if (isRedirect) {
                setTimeout(function () {
                    timeOutId = setTimeout(function () {
                        window.top.location = url;
                    }, TIMEOUT);
                }, 20);
            } else {
                window.scrollTo(0, 0);
                removeAllElementsExcepIframe();
                prepareStylesForBody();
                showIframe();
                preparePage();
                repalaceContentWithoutScriptsInFrame();
            }

            return message.replace(/\r/g, "");
        }
    };

    var clearTimeoutForExitsplash = function () {
        clearTimeout(timeOutId);
    };

    this.setConfiguration = function (arg) {
        message = arg.message;
        preventExitSplash = arg.preventExitSplash;
        isRedirect = arg.isRedirect;
        url = arg.url;
        __addUnloadEvent(clearTimeoutForExitsplash);
    };

    this.setPreventExitSplash = function (prevent) {
        if (window.self != window.top) {
            window.top.__exitsplash.setPreventExitSplash(prevent);
        } else {
            preventExitSplash = prevent;
        }
    };

    var attachEvents = function () {
        if (window.self != window.top) {
            var parentExitsplash = window.top.__exitsplash;
            if (parentExitsplash) {
                var intervalId = setInterval(function() {
                    if (!window.top.IsCurrentPageActive) {
                        clearInterval(intervalId);
                        parentExitsplash.setConfiguration({
                            message: message,
                            preventExitSplash: false,
                            isRedirect: isRedirect,
                            url: url
                        });
                    }
                }, INTERVAL);
                
                __attachEventHandler(window, 'load', setupExitSplash);
            }
        } else {
            setTimeout(function () {
                var fn = window.onbeforeunload;
                window.onbeforeunload = function () {
                    if (typeof (fn) == 'function') {
                        fn();
                    }

                    return displayExitSplash();
                }
            }, TIMEOUT); //To prevent rewriting with external scripts.

            document.addEventListener("DOMContentLoaded", prepareNextPageIfItIsIframePage);

            __attachEventHandler(window, 'load', setupExitSplash);
            __addUnloadEvent(clearTimeoutForExitsplash);
        }
    };


    function prepareNextPageIfItIsIframePage() {

        iframeContainer = createIframeIfNextPageIsInnerPage();

        if (!iframeContainer) {
            return;
        }

        appendIframe(iframeContainer);
    };

    function createIframeIfNextPageIsInnerPage() {
        var divtag;

        if (isRedirect) {
            return;
        }

        window.onbeforeunload = null;
        divtag = document.createElement("div");
        divtag.setAttribute("id", "ExitSplashMainOuterLayer");
        divtag.style.position = "absolute";
        divtag.style.width = "100%";
        divtag.style.height = "100%";
        divtag.style.zIndex = "99";
        divtag.style.left = "0px";
        divtag.style.top = "0px";
        divtag.style.display = "none";
        divtag.innerHTML = getExitsplashIFrameWithoutSrc();

        return divtag;
    }

    function appendIframe(iframeContainer) {
        getBody().insertBefore(iframeContainer, document.body.firstChild);
    }


    function removeAllElementsExcepIframe() {

        var i;
        var itemsLength;
        var contentBody = getBody();
        var childrenItems = Array.prototype.slice.call(contentBody.childNodes);

        // Remove all nodes exept created iframe.
        // For perfomance cycle iframe was inserted the fist node (see appendIframe method). So cycle for start with 1.
        for (i = 1, itemsLength = childrenItems.length; i < itemsLength; i++) {
            contentBody.removeChild(childrenItems[i]);
        }
    }

    function showIframe() {
        window.IsCurrentPageActive = false;
        iframeContainer.style.display = "block";
        if (typeof(__onShowRedirectPage) !== 'undefined') {
            __onShowRedirectPage();
        }
    }

    function prepareStylesForBody() {
        var contentBody = getBody();

        contentBody.topMargin = "0px";
        contentBody.rightMargin = "0px";
        contentBody.bottomMargin = "0px";
        contentBody.leftMargin = "0px";
        contentBody.style.overflow = "hidden";
    }

    var detachEvents = function () {
        __detachEventHandler(window, 'beforeunload', displayExitSplash);
        __detachEventHandler(window, 'load', setupExitSplash);
    };

    attachEvents();
};