var visitor_guid_from_cookie = "";
var account_guid_from_cookie = "";
var visitor_uuid_from_cookie = "";

function getCookieContents(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }

    return "";
}

function getCookieDict(cookieName) {
    var cookieContents = getCookieContents(cookieName);
    var returnDict = {};

    if (!cookieContents) { return returnDict; }

    var keysPlusValues = cookieContents.split("&");

    for (var i = 0; i < keysPlusValues.length; i++) {
        var keyPlusValue = keysPlusValues[i];

        var key = keyPlusValue.substring(0, keyPlusValue.indexOf("="));
        var value = keyPlusValue.substring(keyPlusValue.indexOf("=") + 1);
        returnDict[key] = value;
    }

    return returnDict;
};






var getQueryStringParam = function (param) {
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



function GetArticlePageData() {






    function combine(obj1, obj2) {
        var obj3 = {};
        for (var key in obj1) {
            if (validKey(key) && typeof (obj1[key]) !== "function") {
                obj3[key] = obj1[key];
            }
        }
        for (var key in obj2) {
            if (validKey(key) && typeof (obj2[key]) !== "function") {
                obj3[key] = obj2[key];
            }
        }
        return obj3;
    }

    function validKey(key) {
        return key != "eventType" && key != "event" && key.indexOf("gtm") == -1 && key != "pitchId";
    }

    function getSubCookie(input, param) {
        param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + param + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(input);
        if (results == null) {
            return "";
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    };

    var cookieItems = {};

    if (typeof (Fool) !== "undefined" && typeof (Fool.Cookie) !== "undefined") {

        var sessionCount = 1;

        if (Fool.Cookie.exists('Visitor')) {
            var visitCountCookie = Fool.Cookie.getValues('Visitor')['visits'];
            if (typeof (visitCountCookie) !== "undefined") {
                sessionCount = visitCountCookie;
            }
        }

        cookieItems = {
            "Ecapped": Fool.Cookie.getValues("Fool")["R"] == "true" ? "true" : "false",
            "Buyer": Fool.Cookie.getValues("PlookieUsmf")["C"] > 0,
            "SessionCount": sessionCount,
            "HasVisitorUid": Fool.Cookie.getValues("Visitor")["uid"] != "" ? "true" : "false",
            "EngagedUnecapped": sessionCount >= 10 ? "true" : "false"
        };
    } else if (typeof jQuery !== "undefined" && typeof (jQuery.cookie) !== "undefined") {
        cookieItems = {
            "Ecapped": getSubCookie(jQuery.cookie('Fool'), 'R') == "true" ? "true" : "false",
            "Buyer": getSubCookie(jQuery.cookie('PlookieUsmf'), 'C') > 0,
            "SessionCount": sessionCount,
            "HasVisitorUid": getSubCookie(jQuery.cookie('Visitor'), 'uid'),
            "EngagedUnecapped": sessionCount >= 10 ? "true" : "false"
        };
    }

    var otherItems = {};
    var dataLayerCopy = [];
    if (typeof window.dataLayer !== "undefined") {
        dataLayerCopy = window.dataLayer.slice(0);

        dataLayerCopy.push({ 'url': document.URL });

        var infotronItems = {};
        var infotronIndex = [];

        for (var i = 0; i < dataLayerCopy.length; i++) {
            if ("infotron" in dataLayerCopy[i]) {
                infotronItems = combine(infotronItems, dataLayerCopy[i]);
                infotronIndex.push(i);
            }
        }

        for (var i = 0; i < infotronIndex.length; i++) {
            dataLayerCopy.pop(infotronIndex[i]);
        }

        if (typeof (dataLayerCopy) !== "undefined") {
            for (var key in dataLayerCopy) {
                var obj = dataLayerCopy[key];
                otherItems = combine(obj, otherItems);
            }
        }
    }

    if (typeof (FoolAnalyticsData) !== "undefined" && FoolAnalyticsData[0] != "undefined") {
        otherItems = combine(FoolAnalyticsData[0], otherItems);
    }


    if (typeof jQuery !== "undefined") {

        if (jQuery('#swapTRPitch').length > 0 && jQuery('#swapTRPitch').data('cell') == 'On') { }
        else {
            if (jQuery('.ticker_report#pitch').length > 0) {
                otherItems['pitch_type'] = 'tickerReport';
            }

            if (jQuery('.sfr#pitch').length > 0) {
                otherItems['pitch_type'] = 'sfr';
            }

            if (jQuery('.sfr#pitch').length == 0 && jQuery('.ticker_report#pitch').length == 0 && jQuery('#pitchEnginePitch').length == 0) {
                otherItems['pitch_type'] = 'none';
            }

            if (jQuery('#pitchEnginePitch').length > 0) {
                var pitchEngineCell = jQuery('#pitchEnginePitch').data('cell');
                otherItems['pitch_type'] = 'pitchEngine';
                otherItems['pitchEngineCell'] = pitchEngineCell;
            }
        }

        if (jQuery("iframe[name='wistia_embed']").size()) {
            otherItems['HasWistiaVideo'] = 'true';
        }

        if (jQuery('#addToMyWatchlist').length > 0) {
            otherItems['HasWatchlist'] = !jQuery('#addToMyWatchlist').hasClass('hidden');
        }
    }

    if (document.URL.match('www.fool.com')) {
        otherItems['Site'] = 'www.fool.com';
    }

    if (document.URL.match('beta.fool.com')) {
        otherItems['Site'] = 'beta.fool.com';
    }



    otherItems['referrer'] = document.referrer;

    otherItems['articleImage'] = jQuery('#content img').length > 0;

    otherItems = combine(otherItems, infotronItems);
    var results = combine(cookieItems, otherItems);

    return results;
}





function D() {
    var a = "{}";
    if ("userDataBehavior" == k) {
        d.load("jStorage");
        try {
            a = d.getAttribute("jStorage")
        } catch (b) { }

        try {
            r = d.getAttribute("jStorage_update")
        } catch (c) { }

        h.jStorage = a
    }
    E();
    x();
    F()
}



function u() {
    var a;
    clearTimeout(G);
    G = setTimeout(function () {
        if ("localStorage" == k || "globalStorage" == k)
            a = h.jStorage_update;
        else if ("userDataBehavior" == k) {
            d.load("jStorage");
            try {
                a = d.getAttribute("jStorage_update")
            } catch (b) { }

        }
        if (a && a != r) {
            r = a;
            var l = m.parse(m.stringify(c.__jstorage_meta.CRC32)),
            p;
            D();
            p = m.parse(m.stringify(c.__jstorage_meta.CRC32));
            var e,
            z = [],
            f = [];
            for (e in l)
                l.hasOwnProperty(e) && (p[e] ? l[e] != p[e] && "2." == String(l[e]).substr(0, 2) && z.push(e) : f.push(e));
            for (e in p)
                p.hasOwnProperty(e) && (l[e] || z.push(e));
            s(z, "updated");
            s(f, "deleted")
        }
    }, 25)
}
function s(a, b) {
    a = [].concat(a || []);
    if ("flushed" == b) {
        a = [];
        for (var c in g)
            g.hasOwnProperty(c) && a.push(c);
        b = "deleted"
    }
    c = 0;
    for (var p = a.length; c < p; c++) {
        if (g[a[c]])
            for (var e = 0, d = g[a[c]].length; e < d; e++)
                g[a[c]][e](a[c], b);
        if (g["*"])
            for (e = 0, d = g["*"].length; e < d; e++)
                g["*"][e](a[c], b)
    }
}
function v() {
    var a = (+new Date).toString();
    if ("localStorage" == k || "globalStorage" == k)
        try {
            h.jStorage_update = a
        } catch (b) {
            k = !1
        }
    else
        "userDataBehavior" == k && (d.setAttribute("jStorage_update", a), d.save("jStorage"));
    u()
}
function E() {
    if (h.jStorage)
        try {
            c = m.parse(String(h.jStorage))
        } catch (a) {
            h.jStorage = "{}"
        }
    else
        h.jStorage = "{}";
    A = h.jStorage ? String(h.jStorage).length : 0;
    c.__jstorage_meta || (c.__jstorage_meta = {});
    c.__jstorage_meta.CRC32 || (c.__jstorage_meta.CRC32 = {})
}
function w() {
    if (c.__jstorage_meta.PubSub) {
        for (var a = +new Date - 2E3, b = 0, l = c.__jstorage_meta.PubSub.length; b < l; b++)
            if (c.__jstorage_meta.PubSub[b][0] <= a) {
                c.__jstorage_meta.PubSub.splice(b, c.__jstorage_meta.PubSub.length - b);
                break
            }
        c.__jstorage_meta.PubSub.length || delete c.__jstorage_meta.PubSub
    }
    try {
        h.jStorage = m.stringify(c),
        d && (d.setAttribute("jStorage", h.jStorage), d.save("jStorage")),
        A = h.jStorage ? String(h.jStorage).length : 0
    } catch (p) { }

}
function q(a) {
    if (!a || "string" != typeof a && "number" != typeof a)
        throw new TypeError("Key name must be string or numeric");
    if ("__jstorage_meta" == a)
        throw new TypeError("Reserved key name");
    return !0
}
function x() {
    var a,
    b,
    l,
    d,
    e = Infinity,
    h = !1,
    f = [];
    clearTimeout(H);
    if (c.__jstorage_meta && "object" == typeof c.__jstorage_meta.TTL) {
        a = +new Date;
        l = c.__jstorage_meta.TTL;
        d = c.__jstorage_meta.CRC32;
        for (b in l)
            l.hasOwnProperty(b) && (l[b] <= a ? (delete l[b], delete d[b], delete c[b], h = !0, f.push(b)) : l[b] < e && (e = l[b]));
        Infinity != e && (H = setTimeout(x, e - a));
        h && (w(), v(), s(f, "deleted"))
    }
}
function F() {
    var a;
    if (c.__jstorage_meta.PubSub) {
        var b,
        l = B;
        for (a = c.__jstorage_meta.PubSub.length - 1; 0 <= a; a--)
            if (b = c.__jstorage_meta.PubSub[a], b[0] > B) {
                var l = b[0],
                d = b[1];
                b = b[2];
                if (t[d])
                    for (var e = 0, h = t[d].length; e < h; e++)
                        t[d][e](d, m.parse(m.stringify(b)))
            }
        B = l
    }
}
var y = window.jQuery,
m = {
    parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function (a) {
        return String(a).evalJSON()
    }
     || y.parseJSON || y.evalJSON,
    stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || y.toJSON
};
if (!("parse" in m && "stringify" in m))
    throw Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
var c = {
    __jstorage_meta: {
        CRC32: {}

    }
},
h = {
    jStorage: "{}"
},
d = null,
A = 0,
k = !1,
g = {},
G = !1,
r = 0,
t = {},
B = +new Date,
H,
C = {
    isXML: function (a) {
        return (a = (a ? a.ownerDocument || a : 0).documentElement) ? "HTML" !== a.nodeName : !1
    },
    encode: function (a) {
        if (!this.isXML(a))
            return !1;
        try {
            return (new XMLSerializer).serializeToString(a)
        } catch (b) {
            try {
                return a.xml
            } catch (c) { }

        }
        return !1
    },
    decode: function (a) {
        var b = "DOMParser" in window && (new DOMParser).parseFromString || window.ActiveXObject && function (a) {
            var b = new ActiveXObject("Microsoft.XMLDOM");
            b.async = "false";
            b.loadXML(a);
            return b
        };
        if (!b)
            return !1;
        a = b.call("DOMParser" in window && new DOMParser || window, a, "text/xml");
        return this.isXML(a) ? a : !1
    }
};
y.jStorage = {
    version: "0.4.4",
    set: function (a, b, d) {
        q(a);
        d = d || {};
        if ("undefined" == typeof b)
            return this.deleteKey(a), b;
        if (C.isXML(b))
            b = {
                _is_xml: !0,
                xml: C.encode(b)
            };
        else {
            if ("function" == typeof b)
                return;
            b && "object" == typeof b && (b = m.parse(m.stringify(b)))
        }
        c[a] = b;
        for (var h = c.__jstorage_meta.CRC32, e = m.stringify(b), k = e.length, f = 2538058380 ^ k, g = 0, n; 4 <= k;)
            n = e.charCodeAt(g) & 255 | (e.charCodeAt(++g) & 255) << 8 | (e.charCodeAt(++g) & 255) << 16 | (e.charCodeAt(++g) & 255) << 24, n = 1540483477 * (n & 65535) + ((1540483477 * (n >>> 16) & 65535) << 16), n ^= n >>> 24, n = 1540483477 * (n & 65535) + ((1540483477 * (n >>> 16) & 65535) << 16), f = 1540483477 * (f & 65535) + ((1540483477 * (f >>> 16) & 65535) << 16) ^ n, k -= 4, ++g;
        switch (k) {
            case 3:
                f ^= (e.charCodeAt(g + 2) & 255) << 16;
            case 2:
                f ^= (e.charCodeAt(g + 1) & 255) << 8;
            case 1:
                f ^= e.charCodeAt(g) & 255,
				f = 1540483477 * (f & 65535) + ((1540483477 * (f >>> 16) & 65535) << 16)
        }
        f ^= f >>> 13;
        f = 1540483477 * (f & 65535) + ((1540483477 * (f >>> 16) & 65535) << 16);
        h[a] = "2." + ((f ^ f >>> 15) >>> 0);
        this.setTTL(a, d.TTL || 0);
        s(a, "updated");
        return b
    },
    get: function (a, b) {
        q(a);
        return a in c ? c[a] && "object" == typeof c[a] && c[a]._is_xml ? C.decode(c[a].xml) : c[a] : "undefined" == typeof b ? null : b
    },
    deleteKey: function (a) {
        q(a);
        return a in c ? (delete c[a], "object" == typeof c.__jstorage_meta.TTL && a in c.__jstorage_meta.TTL && delete c.__jstorage_meta.TTL[a], delete c.__jstorage_meta.CRC32[a], w(), v(), s(a, "deleted"), !0) : !1
    },
    setTTL: function (a, b) {
        var d = +new Date;
        q(a);
        b = Number(b) || 0;
        return a in c ? (c.__jstorage_meta.TTL || (c.__jstorage_meta.TTL = {}), 0 < b ? c.__jstorage_meta.TTL[a] = d + b : delete c.__jstorage_meta.TTL[a], w(), x(), v(), !0) : !1
    },
    getTTL: function (a) {
        var b = +new Date;
        q(a);
        return a in c && c.__jstorage_meta.TTL && c.__jstorage_meta.TTL[a] ? (a = c.__jstorage_meta.TTL[a] - b) || 0 : 0
    },
    flush: function () {
        c = {
            __jstorage_meta: {
                CRC32: {}

            }
        };
        w();
        v();
        s(null, "flushed");
        return !0
    },
    storageObj: function () {
        function a() { }

        a.prototype = c;
        return new a
    },
    index: function () {
        var a = [],
        b;
        for (b in c)
            c.hasOwnProperty(b) && "__jstorage_meta" != b && a.push(b);
        return a
    },
    storageSize: function () {
        return A
    },
    currentBackend: function () {
        return k
    },
    storageAvailable: function () {
        return !!k
    },
    listenKeyChange: function (a, b) {
        q(a);
        g[a] || (g[a] = []);
        g[a].push(b)
    },
    stopListening: function (a, b) {
        q(a);
        if (g[a])
            if (b)
                for (var c = g[a].length - 1; 0 <= c; c--)
                    g[a][c] == b && g[a].splice(c, 1);
            else
                delete g[a]
    },
    subscribe: function (a, b) {
        a = (a || "").toString();
        if (!a)
            throw new TypeError("Channel not defined");
        t[a] || (t[a] = []);
        t[a].push(b)
    },
    publish: function (a, b) {
        a = (a || "").toString();
        if (!a)
            throw new TypeError("Channel not defined");
        c.__jstorage_meta || (c.__jstorage_meta = {});
        c.__jstorage_meta.PubSub || (c.__jstorage_meta.PubSub = []);
        c.__jstorage_meta.PubSub.unshift([+new Date, a, b]);
        w();
        v()
    },
    reInit: function () {
        D()
    }
};
(function () {
    var a = !1;
    if ("localStorage" in window)
        try {
            window.localStorage.setItem("_tmptest", "tmpval"),
            a = !0,
            window.localStorage.removeItem("_tmptest")
        } catch (b) { }

    if (a)
        try {
            window.localStorage && (h = window.localStorage, k = "localStorage", r = h.jStorage_update)
        } catch (c) { }

    else if ("globalStorage" in window)
        try {
            window.globalStorage && (h = "localhost" == window.location.hostname ? window.globalStorage["localhost.localdomain"] : window.globalStorage[window.location.hostname], k = "globalStorage", r = h.jStorage_update)
        } catch (g) { }

    else if (d = document.createElement("link"), d.addBehavior) {
        d.style.behavior = "url(#default#userData)";
        document.getElementsByTagName("head")[0].appendChild(d);
        try {
            d.load("jStorage")
        } catch (e) {
            d.setAttribute("jStorage", "{}"),
            d.save("jStorage"),
            d.load("jStorage")
        }
        a = "{}";
        try {
            a = d.getAttribute("jStorage")
        } catch (m) { }

        try {
            r = d.getAttribute("jStorage_update")
        } catch (f) { }

        h.jStorage = a;
        k = "userDataBehavior"
    } else {
        d = null;
        return
    }
    E();
    x();
    "localStorage" == k || "globalStorage" == k ? "addEventListener" in window ? window.addEventListener("storage", u, !1) : document.attachEvent("onstorage", u) : "userDataBehavior" == k && setInterval(u, 1E3);
    F();
    "addEventListener" in window && window.addEventListener("pageshow", function (a) {
        a.persisted && u()
    }, !1)
})()
var jStorage = y.jStorage;


var gtmAid = getQueryStringParam('vsaid');
var gtmSource = getQueryStringParam('src');
if (typeof gtmSource === "undefined" || gtmSource == "") {
     gtmSource = getQueryStringParam('source');
}
var gtmIid = getQueryStringParam('iid');

if (typeof dataLayer !== "undefined") {
    for (i = 0; i < dataLayer.length; i++) {
        var myDataLayerObj = dataLayer[i];
        if (typeof (myDataLayerObj.aid) !== "undefined") { gtmAid = myDataLayerObj.aid; }
        if (typeof (myDataLayerObj.source) !== "undefined") { gtmSource = myDataLayerObj.source; }
    }
}


function findEvent(source, eventName) {
    for (var i = 0; i < source.length; i++) {
        if (source[i].event === eventName) {
            return true;
        }

    }
    return false;
}


function ecapTrackingPixels() {

    var getCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    var getCookieValue = function (address) {
        cookie = address.split('.')[0];
        param = address.split('.')[1];
        cookieString = getCookie(cookie);
        if (cookieString == null) {
            return '';
        } else {
            obj = [];
            parts = cookieString.split('&');
            for (var i = 0; i < parts.length; i++) {
                pair = parts[i].split('=');
                obj[pair[0]] = pair[1];
            }
            return obj[param];
        }
    };

    var getQueryStringParam = function (param) {
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

    var rnd = Math.random().toString().substr(-10);
    var uid =  getCookieDict('Visitor').uid;
    var vsaid = getQueryStringParam('vsaid');
    var email = getQueryStringParam('email');
    var img = new Image(0, 0);
    img.src = '//www.fool.com/tracking/vs/drm_track.gif?_rnd=' + rnd + '&log=1&uid=' + uid + '&vsaid=' + vsaid + '&email=' + email;

    TrackingPixel.image('http://conversion-pixel.invitemedia.com/pixel?pixelID=38547&partnerID=115&clientID=4596&key=conv');
    TrackingPixel.image('http://view.atdmt.com/action/apmtmf_FoolcomLandingpage_10');
    TrackingPixel.image('http://ads.bluelithium.com/pixel?id=735260&t=2');
    TrackingPixel.image('http://socialcodedev.com/tracking/pixel_fires.php?app_id=B6377C5803BC11E0AEA6404018151C99&app_action_type_id=FC8CDA0E03BC11E0AEA6404018151C99');
    TrackingPixel.image('http://insight.adsrvr.org/track/evnt/?ct=0:jjot75ma&adv=5ss88alt&fmt=3" name="Trade Desk Tracking - Email Capture Retargeting Pixel');
    TrackingPixel.image('http://d.liadm.com/pixel?c=13985'); //LiveIntent


    //<![CDATA[
    // Evolve TMF Conversion
    rsi_account = '4BC98EE77B207F9744F534C95B9081BF';
    rsi_site = '154B9A371BCB7C7E598B0AEE540EF091';
    rsi_event = '4DA2F0F8AA839F10A1AF49CEF1DBD10A';
    //]]>

    //<![CDATA[
    var google_conversion_id = 1002499420;
    var google_conversion_label = "MacYCNSC-wQQ3NqD3gM";
    var google_custom_params = window.google_tag_params;
    var google_remarketing_only = true;
    //]]>

    //<![CDATA[
    OAS_rn = new String(Math.random());
    OAS_rns = OAS_rn.substring(2, 11);
    var tfsm_protocol = window.location.protocol;
    if (tfsm_protocol == "https:") {
        DataColl = "https://";
    } else {
        DataColl = "http://";
    }

    TrackingPixel.image(DataColl + 'oascentral.investingmediasolutions.com/RealMedia/ads/adstream.track/1' + OAS_rns + '?XE&epmAccountKey=1818&epmXTransKey=574&epmXtransStep=0&ProductCategory=&ItemDescription=&XE');
    //]]>

    //Investing Channel
    var axel = Math.random() + "";
    var a = axel * 10000000000000;
    TrackingPixel.image('//pubads.g.doubleclick.net/activity;xsp=316339;ord=' + a);

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        'EcapOccurred': 'true'
    });

    window.dataLayer.push({
        'event': 'Ecap'  // Note: Filtering of Ecaps missing Iids not implemented in EcapFromGtm
    });
    window.ecapsFired = true;
}

jQuery().ready(function () {
    var referrer = document.referrer;

    if (typeof (referrer) !== "undefined" && referrer != "" && referrer.indexOf("motleyfool.com") == -1 && referrer.indexOf("/thank-you/") <= -1) {
        ecapTrackingPixels();
    } else {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'ReportPageViewNonEcap'
        });
        window.ecapsFired = false;
    }

    if (typeof reportType !== "undefined" && reportType === "video") {
        visitor_guid_from_cookie = getCookieDict('Visitor').visitor;
        account_guid_from_cookie = getCookieDict('Visitor').account;
        visitor_uuid_from_cookie = getCookieDict('Visitor').uid;

        var videoWatch = {};
        // let's stop tracking this nonsense 
	// if(typeof wistiaEmbed!=="undefined"){
	// 	videoWatch['wistia_video_id']=wistiaEmbed.hashedId();
	// } else if(typeof wistiaPlaylist!=="undefined"){
	// 	videoWatch['wistia_video_id']=wistiaPlaylist.currentVideo().hashedId();
	// }
	// videoWatch['visitor_guid']=visitor_guid_from_cookie;
	// videoWatch['account_guid']=account_guid_from_cookie;
	// videoWatch['URL']=window.location.href;
	// videoWatch['campaign']=videoCampaign;
	// videoWatch['visitor_uid']=visitor_uuid_from_cookie;
	// window.analytics.track('VideoWatch',videoWatch);
     }
});
