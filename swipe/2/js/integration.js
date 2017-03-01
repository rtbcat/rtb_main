/*
 * The information and software code below,
 * located at http://www.invoca.net/integration.js,
 * are confidential and are the sole property of Invoca.
 * Your application or use of this information in any way is subject to
 * Invoca's Terms of Service, which are located at
 * http://www.invoca.com/terms-of-service. In accordance with those terms, your
 * use of this information and code may be terminated by Invoca at any time
 * for any reason.  The rights granted to you under those terms are expressly
 * non-exclusive. You may not sell, assign, sublicense, or otherwise transfer or
 * agree to transfer all or any portion of those rights without Invoca's
 * prior written consent.  You agree not to copy, republish, frame, download,
 * transmit, modify, rent, lease, loan, sell, assign, distribute, license,
 * sublicense, reverse engineer, or create derivative works based on the
 * information and/or software code on this page except as expressly authorized
 * in Invoca's Terms of Service.  Your use and continued use of this
 * information and/or code constitute your acceptance of Invoca's Terms of Service.
 *
 * Copyright (c) 2014 Invoca (r)
 */


if ( typeof( Invoca ) == "undefined" )
{
  var Invoca = {};
}

if ( typeof( Invoca.log ) == "undefined" )
{
  Invoca.log = function( message, error )
  {
    if ( typeof console != 'undefined' )
    {
      if ( error && typeof console.error != 'undefined' )
      {
        console.error( message );
      }
      else if ( this.debugMode && typeof console.log != 'undefined' )
      {
        console.log( message );
      }
    }
    else
    {
        // alert( message ); uncomment for debugging older IEs
    }
  };
}

if ( typeof( Invoca.now ) == "undefined" )
{
  Invoca.now = function( )
  {
      return new Date().getTime();
  };
}

// for stubbing location in tests
Invoca.getCurrentLocation = function( )
{
  return window.location.toString();
};

Invoca.countHash = function( obj ) {
  var count = 0;
  for (var item in obj) {
    if(obj.hasOwnProperty(item)) {
      count += 1;
    }
  }
  return count;
}
;


Invoca.AdvertiserIntegration = { URL         : "//json4.ringrevenue.com/4/map_number",
                                 TEST_DOMAIN : "invoca\.net",
                                 TEST_NUMBER : "9999999999",
                                 HUBSPOT_USER_TOKEN_COOKIE_NAME : "hubspotutk" };

Invoca.AdvertiserIntegration.loaded = false;

/*
 *  Originally from:
    http://www.JSON.org/json2.js
    2011-02-23

    Public Domain.
    See http://www.JSON.org/js.html

        Invoca.JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = Invoca.JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = Invoca.JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = Invoca.JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        Invoca.JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = Invoca.JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = Invoca.JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/


(function(Invoca)
{
    Invoca.JSON = window.JSON || {};

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof Invoca.JSON.stringify !== 'function') {
        Invoca.JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof Invoca.JSON.parse !== 'function') {
        Invoca.JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }

})(Invoca);
/**
 * Cookie plugin (without jQuery)
 *
 * Original version:
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example Invoca.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 *
 * @example Invoca.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
 * @desc Create a cookie with all available options.
 *
 * @example Invoca.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 *
 * @example Invoca.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 *   @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 *   @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 *   @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 *   @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

(function(namespace)
{
  function trim( text )
  {
    return (text || "").replace( /^\s+|\s+$/g, "" );
  }

  namespace.cookie = function(name, value, options)
  {
    if (typeof value != 'undefined')
    {
        // name and value given, set cookie
        options = options || {};
        if (value === null)
        {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString))
        {
            var date;
            if (typeof options.expires == 'number')
            {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            }
            else
            {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        return null;
    }
    else
    {
        // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '')
        {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++)
            {
                var cookie = trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
  };
})( Invoca );
/*
* Original version:
* Lightweight JSONP fetcher
* Copyright 2010 Erik Karlsson. All rights reserved.
* BSD licensed
*/


/*
* Usage:
*
* jsonp = new Invoca.JSONP.requestWithLandingPage('/url?param=123', { id : 11 }, { user_id : 33 }, '', function(data) { ... });
* jsonp.get();
*
*/

(function(namespace)
{
    var head, query, key, window = this;

    namespace.JSONP = namespace.JSONP || {};
    namespace.JSONP.counter = 0;

    namespace.JSONP.load = function(url) {
        var script = document.createElement('script'),
                done = false;
        script.src = url;
        script.async = true;

        script.onload = script.onreadystatechange = function() {
            if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if ( script && script.parentNode ) {
                    script.parentNode.removeChild( script );
                }
            }
        };
        if ( !head ) {
            head = document.getElementsByTagName('head')[0];
        }
        head.appendChild( script );
    };

    namespace.JSONP.requestWithLandingPage = function(baseUrl, baseParamsHash, landingPageUrlParamName, additionalLandingParamsHash, redirectUrlTemplate, callback) {
      var baseUrlEscaped = false;

      // track whether we are putting this URL out as a query param of a redirect URL
      if (redirectUrlTemplate && redirectUrlTemplate.search(/%ESCAPED_URL%/) != -1) {
        baseUrlEscaped = true;
      }

      return {
        get : function()
        {
          var jsonp = "json_rr" + (++namespace.JSONP.counter);
          window[ jsonp ] = function(data){
            callback(data);
            try {
              delete window[ jsonp ];
            } catch (e) {}
            window[ jsonp ] = null;
          };

          baseParamsHash['jsoncallback'] = jsonp;

          // callback passed as second param for test stubbing
          namespace.JSONP.load(this.encodeUrl(), callback);
          return jsonp;
        },


        // ---------------------------
        // private implementation
        // ---------------------------

        encodeUrl : function() {
          var query = baseUrl.search(/\?/) == -1 ? "?" : "&";

          for (key in baseParamsHash) {
            if (baseParamsHash.hasOwnProperty(key)) {
              query += encodeURIComponent(key) + "=" + encodeURIComponent(baseParamsHash[key]) + "&";
            }
          }

          baseUrl = this.encodeVal(baseUrl + query, baseUrlEscaped ? 1 : 0);
          baseUrl += landingPageUrlParamName + this.encodeVal("=", baseUrlEscaped ? 1 : 0) + this.buildLandingPageUrl();

          // return final url for JSONP call (our URL in a redirect template, or just our URL)
          if (redirectUrlTemplate) {
            if (baseUrlEscaped) {
              return redirectUrlTemplate.replace(/%ESCAPED_URL%/, baseUrl);
            }
            else {
              return redirectUrlTemplate.replace(/%UNESCAPED_URL%/, baseUrl);
            }
          }
          else {
            return baseUrl;
          }
        },

        buildLandingPageUrl : function() {
          // get landing page URL from current window location
          var landingPageUrl = Invoca.getCurrentLocation();
          var landingPageUrlSeparator = '', landingPageUrlQuery = '';

          // add additional params from integration options to landing page URL param (for DynamicNumberPools)
          if (additionalLandingParamsHash) {
            landingPageUrlSeparator = landingPageUrl.search(/\?/) == -1 ? "?" : "&";

            for (key in additionalLandingParamsHash) {
              if (additionalLandingParamsHash.hasOwnProperty(key)) {
                // the "value" in the hash can be either a string or another hash which then consists of the string value and whether to escape the param or not
                var value_hash = additionalLandingParamsHash[key];
                var escape, param;

                if (typeof value_hash == "object") {
                  escape = (typeof value_hash['escape'] == "undefined") || value_hash['escape'];
                  param  = value_hash['value'];
                }
                else {
                  escape = true;
                  param  = value_hash.toString();
                }

                // carefully construct URL ensuring we escape the param separators (& and = signs) one less time than each param key & value
                // provide N layers of escaping on param name/value because it will go through that many layers of unescape on server side
                // have to do this separately because some params may be specifically not escaped at all (for token substitution)
                landingPageUrlQuery += this.encodeVal(key, baseUrlEscaped ? 3 : 2) +
                                       this.encodeVal("=", baseUrlEscaped ? 2 : 1) +
                                       (escape ? this.encodeVal(param, baseUrlEscaped ? 3 : 2) : param) +
                                       this.encodeVal("&", baseUrlEscaped ? 2 : 1);
              }
            }

            landingPageUrlQuery = landingPageUrlQuery.replace((baseUrlEscaped ? /(%2526)$/ : /(%26)$/), '');
          }

          return this.encodeVal(landingPageUrl + landingPageUrlSeparator, baseUrlEscaped ? 2 : 1) + landingPageUrlQuery;
        },

        encodeVal : function(val, timesToEncode) {
          var encodedVal = val;

          for (var i = 0; i < timesToEncode; ++i)
          {
            encodedVal = encodeURIComponent(encodedVal);
          }

          return encodedVal;
        }
      };
    }
})(Invoca);
(function(Invoca)
{
    /* ------------------------------
    // onReady code
    //   pulled in from jQuery 1.3.2 with a few simplifications
    /  ------------------------------ */
    var readyBound = false;
    var isReady    = false;
    var readyList  = [];

    Invoca.onReady = function(fn)
    {
        // Attach the listeners
        bindReady();

        // If the DOM is already ready
        if ( isReady )
            // Execute the function immediately
            fn.call( document, Invoca );

        // Otherwise, remember the function for later
        else
            // Add the function to the wait list
            readyList.push( fn );

        return this;
    }

    function ready()
    {
        // Make sure that the DOM is not already loaded
        if ( !isReady ) {
            // Remember that the DOM is ready
            isReady = true;

            // If there are functions bound, to execute
            if ( readyList ) {
                // Execute all of them
                for ( var i = 0; i < readyList.length; i++ )
                {
                    readyList[i].call( document, Invoca );
                }

                // Reset the list of functions
                readyList = [];
            }
        }
    }

    function bindReady( func )
    {
	if ( readyBound ) return;
	readyBound = true;

  // this supports asynchronous installation where this file doesn't even get parsed until document is already fully ready
  //   must mark as ready otherwise the callbacks never get fired
  if (document.readyState && document.readyState === "complete" || document.readyState === "loaded")
  {
    isReady = true;
    return;
  }

	// Mozilla, Opera and webkit nightlies currently support this event
	if ( document.addEventListener ) {
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", function(){
			document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
			ready();
		}, false );

	// If IE event model is used
	} else if ( document.attachEvent ) {
		// ensure firing before onload,
		// maybe late but safe also for iframes
		document.attachEvent("onreadystatechange", function(){
			if ( document.readyState === "complete" ) {
				document.detachEvent( "onreadystatechange", arguments.callee );
				ready();
			}
		});

		// If IE and not an iframe
		// continually check to see if the document is ready
		if ( document.documentElement.doScroll && window == window.top ) (function(){
			if ( isReady ) return;

			try {
				// If IE is used, use the trick by Diego Perini
				// http://javascript.nwbox.com/IEContentLoaded/
				document.documentElement.doScroll("left");
			} catch( error ) {
				setTimeout( arguments.callee, 0 );
				return;
			}

			// and execute any waiting functions
			ready();
		})();
	}

	// A fallback to window.onload, that will always work
        // Do not blow away old method if set
        var originalOnLoad = window.onload;
        window.onload = function()
        {
            if ( typeof originalOnLoad == "function" )
            {
                originalOnLoad();
            }
            ready();
        }
    }

    Invoca.DOM = { support : {} };

    /* ------------------------------
    // support code
    //   pulled in from jQuery 1.3.2 - jQuery.support
    /  ------------------------------ */
    function addSupport()
    {
        Invoca.DOM.support = {};

        var div = document.createElement("div");
        div.style.width = div.style.paddingLeft = "1px";

        document.body.appendChild( div );
        Invoca.DOM.support.boxModel = div.offsetWidth === 2;
        document.body.removeChild( div ).style.display = 'none';
    }

    Invoca.onReady( addSupport );


    /* ------------------------------
    // DOM manipulation
    /  ------------------------------ */
    Invoca.DOM.show = function( selector )
    {
        var elements = Invoca.DOM.selectElements( selector );

        for( var i = 0, len = elements.length; i < len; i++ )
        {
            elements[i].style.display = '';
        }
    }

    Invoca.DOM.hide = function( selector, set_visibility )
    {
        var elements = Invoca.DOM.selectElements( selector );

        for( var i = 0, len = elements.length; i < len; i++ )
        {
            set_visibility ? elements[i].style.visibility = 'hidden' : elements[i].style.display = 'none';
        }
    }

    Invoca.DOM.setHTML = function( value, selector, root )
    {
        if ( value === undefined ) return;

        var elements = Invoca.DOM.selectElements( selector, root );

        for( var i = 0, len = elements.length; i < len; i++ )
        {
            try
            {
                elements[i].innerHTML = value;
            }
            catch( ex )
            {
                // IE can throw an exception if trying to set innerHTML on the following elements:
                //  COL, COLGROUP, FRAMESET, HEAD, HTML, STYLE, TABLE, TBODY, TFOOT, THEAD, TITLE, TR, IFRAME
                Invoca.log( "Could not set HTML of element type " + elements[i].nodeName + " from selector " + selector + ". Error: " + ex.message, true );
            }
        }
    }

    Invoca.DOM.getHTML = function( selector, root )
    {
        var elements = Invoca.DOM.selectElements( selector, root );

        if ( elements.length > 0 )
        {
            return elements[0].innerHTML;
        }

        return '';
    }

    Invoca.DOM.addClass = function( className, selector, root )
    {
        var elements = Invoca.DOM.selectElements( selector, root );

        for( var i = 0, len = elements.length; i < len; i++ )
        {
            try
            {
                var originalClasses = elements[i].className;
                elements[i].className = originalClasses ? ( originalClasses + " " + className ) : className;
            }
            catch( ex )
            {
                Invoca.log( "Could not add class " + className + " to " + elements[i].nodeName + " from selector " + selector + ". Error: " + ex.toString(), true );
            }
        }
    }

    Invoca.DOM.addCss = function( cssHash, selector, root )
    {
        var elements = Invoca.DOM.selectElements( selector, root );

        for( var i = 0, len = elements.length; i < len; i++ )
        {
            Invoca.DOM.addCssToElement( elements[i], cssHash );
        }
    }

    Invoca.DOM.addCssToElement = function( element, cssHash )
    {
        try
        {
            for ( var style in cssHash )
            {
                element.style[style] = cssHash[style];
            }
        }
        catch( ex )
        {
            Invoca.log( "Could not add css styles " + cssHash + " to " + element.nodeName + ". Error: " + ex.toString(), true );
        }
    }

    /* ------------------------------
    // DOM Selectors
    /  ------------------------------ */

    // Examples:
    //   Find all elements with a class name
    //     Invoca.DOM.selectElements( '.promoNumber' )
    //
    //   Find all elements with two classes
    //     Invoca.DOM.selectElements( '.rr .number' )
    //
    //   Find all elements with either class
    //     Invoca.DOM.selectElements( '.number, .phone_number' )
    //
    //   Find all elements with specific ID
    //     Invoca.DOM.selectElements( '#promoNumber' )
    //
    //   Find all elements with a class name that is a descendant of a specific element
    //     Invoca.DOM.selectElements( '.ppc_10_5', document.getElementById( 'content' ) )

    Invoca.DOM.selectElements = function( selectors, root )
    {
        var selectorList = selectors.split( "," );
        var elements     = [];
        var element, selector;
        var tag          = undefined;

        for ( var i = 0, l = selectorList.length; i < l; i++ )
        {
            selector = trim( selectorList[i] );

            // currently do not support both # and . in a single selector (e.g. "#foo .bar")
            if ( selector.indexOf( '.' ) > -1 && selector.indexOf( '#' ) > -1 )
            {
                Invoca.log( "Selector not supported: '" + selector + "'. Can not combine ID and class in a single selector.", true );
                continue;
            }
            else if ( selector.indexOf( '.' ) > -1 )
            {
                elements = elements.concat( getElementsByClassName( selector.replace( /\./g, '' ), tag, root ) );
            }
            else if ( selector.indexOf( '#' ) > -1 )
            {
                if ( ( element = document.getElementById( selector.replace( "#", '' ) ) ) )
                {
                    elements.push( element );
                }
            }
            else
            {
                Invoca.log( "Selector not supported: '" + selector + "'. Specify an ID or class using '#' or '.' respectively.", true );
                continue;
            }
        }

        // remove duplicates
        if ( selectorList.length > 1 )
        {

            var uniqElements = [];
            for ( var j = 0; j < elements.length; j++ )
            {
                var found = false;
                for ( var k = 0; k < uniqElements.length; k++ )
                {
                    if( !found && uniqElements[k] == elements[j] )
                    {
                        found = true;
                    }
                }

                if ( !found )
                {
                    uniqElements.push(elements[j]);
                }
            }

            return uniqElements;
        }

        return elements;
    }

    Invoca.DOM.filterElementsByClass = function( elements, className )
    {
        var list = [];
        for ( var i = 0; i < elements.length; i++ )
        {
            if ( new RegExp("(^|\\s)" + className + "(\\s|$)").test(elements[i].className) )
            {
                list.push( elements[i] );
            }
        }

        return list;
    }

    Invoca.DOM.selectTags = function( tagName )
    {
        return document.getElementsByTagName( tagName );
    }

    // getElementsByClassName
    /*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
    */
    function getElementsByClassName(className, tag, elm)
    {
        var getElementsByClassName;
        if (document.getElementsByClassName)
        {
            getElementsByClassName = function (className, tag, elm)
            {
                elm = elm || document;
                var elements = elm.getElementsByClassName(className),
                    nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
                    returnElements = [],
                    current;
                for(var i=0, il=elements.length; i<il; i+=1){
                    current = elements[i];
                    if(!nodeName || nodeName.test(current.nodeName)) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        else if (document.evaluate)
        {
            getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = "",
                    xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                    namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
                    returnElements = [],
                    elements,
                    node;
                for(var j=0, jl=classes.length; j<jl; j+=1){
                    classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
                }
                try {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
                }
                catch (e) {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
                }
                while ((node = elements.iterateNext())) {
                    returnElements.push(node);
                }
                return returnElements;
            };
        }
        else {
            getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = [],
                    elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
                    current,
                    returnElements = [],
                    match;
                for(var k=0, kl=classes.length; k<kl; k+=1){
                    classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                }
                for(var l=0, ll=elements.length; l<ll; l+=1){
                    current = elements[l];
                    match = false;
                    for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                        match = classesToCheck[m].test(current.className);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        return getElementsByClassName(className, tag, elm);
    }

    /* ------------------------------
     * Events
     * ------------------------------ */

    Invoca.DOM.Event = {};

    // inspired by: http://www.dustindiaz.com/add-remove-elements-reprise/
    Invoca.DOM.Event.add = function()
    {
        // DOM standard
        if (window.addEventListener)
        {
            return function(element, eventType, listener)
            {
                element.addEventListener( eventType, listener, false);
            };
        }
        // IE8 and earlier
        else if (window.attachEvent)
        {
            return function(element, eventType, listener)
            {
                var f = function() { listener.call( element, window.event); };
                element.attachEvent( 'on' + eventType, f );
            };
        }
        // fallback to old style (does not support more than 1 listener per event)
        else
        {
            return function(element, eventType, listener)
            {
                element['on' + eventType] = listener;
            }
        }
    }();

    Invoca.DOM.Event.remove = function()
    {
        // DOM standard
        if (window.removeEventListener)
        {
            return function(element, eventType, listener)
            {
                element.removeEventListener( eventType, listener, false);
            };
        }
        // don't try to remove old style events
        return function( ) { };
    }();

    /* ------------------------------
     * Utilities
     * ------------------------------ */
    function trim( text )
    {
      return (text || "").replace( /^\s+|\s+$/g, "" );
    }

})(Invoca);
/**
 * Adapted from findAndReplaceDOMText for Invoca
 * https://github.com/padolsey/findAndReplaceDOMText
 * findAndReplaceDOMText
 * @author James Padolsey http://james.padolsey.com
 * @license http://unlicense.org/UNLICENSE
 *
 * Matches the text of a DOM node against a regular expression
 * and replaces each match (or node-separated portions of the match)
 * in the specified element.
 *
 * Example: Wrap 'test' in <em>:
 *   <p id="target">This is a test</p>
 *   <script>
 *     findAndReplaceDOMText(
 *       /test/,
 *       document.getElementById('target'),
 *       'em'
 *     );
 *   </script>
 */


(function(Invoca) {

  /**
   * findAndReplaceDOMText
   *
   * Locates matches and replaces with replacementNode
   *
   * @param {RegExp} regex The regular expression to match
   * @param {Node} node Element or Text node to search within
   * @param {String|Element|Function} replacementNode A NodeName,
   *  Node to clone, or a function which returns a node to use
   *  as the replacement node.
   */
  function findAndReplaceDOMText(regex, node, replacementNode) {

    var m, index, matches = [], text = _getText(node);
    var replaceFn = _genReplacer(replacementNode);

    if (!text) { return; }

    if (regex.global) {
      while (m = regex.exec(text)) {
        if (!m[0]) throw 'findAndReplaceDOMText cannot handle zero-length matches';
        matches.push([regex.lastIndex - m[0].length, regex.lastIndex, m]);
      }
    } else {
      m = text.match(regex);
      index = text.indexOf(m[0]);
      if (!m[0]) throw 'findAndReplaceDOMText cannot handle zero-length matches';
      matches.push([index, index + m[0].length, m]);
    }

    Invoca.log("Matches found: " + matches.length);
    if (matches.length) {
      _stepThroughMatches(node, matches, replaceFn);
    }

  }

  /**
   * Gets aggregate text of a node without resorting
   * to broken innerText/textContent
   */
  function _getText(node) {

    if (node.nodeType === 3) {
      return node.data;
    }

    var txt = '';

    if (node = node.firstChild) do {
      txt += _getText(node);
    } while (node = node.nextSibling);

    return txt;

  }

  /**
   * Steps through the target node, looking for matches, and
   * calling replaceFn when a match is found.
   */
  function _stepThroughMatches(node, matches, replaceFn) {

    var after, before,
        startNode,
        endNode,
        startNodeIndex,
        endNodeIndex,
        innerNodes = [],
        atIndex = 0,
        curNode = node,
        matchLocation = matches.shift(),
        matchIndex = 0;

    var GIVE_UP_AND_RETURN_TIME = Invoca.now() + (2 * 1000);

    out: while (true) {
      if (Invoca.now() > GIVE_UP_AND_RETURN_TIME)
      {
        Invoca.log("Advertiser Integration Error: Could not finish iterating through DOM to replace numbers. Likely you have an invalid DOM structure, or perhaps unclosed tags.", true);
        break;
      }

      if (curNode.nodeType === 3) {
        if (!endNode && curNode.length + atIndex >= matchLocation[1]) {
          // We've found the ending
          endNode = curNode;
          endNodeIndex = matchLocation[1] - atIndex;
        } else if (startNode) {
          // Intersecting node
          innerNodes.push(curNode);
        }
        if (!startNode && curNode.length + atIndex > matchLocation[0]) {
          // We've found the match start
          startNode = curNode;
          startNodeIndex = matchLocation[0] - atIndex;
        }
        atIndex += curNode.length;
      }

      if (startNode && endNode) {
        curNode = replaceFn({
          startNode: startNode,
          startNodeIndex: startNodeIndex,
          endNode: endNode,
          endNodeIndex: endNodeIndex,
          innerNodes: innerNodes,
          match: matchLocation[2],
          matchIndex: matchIndex
        });
        // replaceFn has to return the node that replaced the endNode
        // and then we step back so we can continue from the end of the
        // match:
        atIndex -= (endNode.length - endNodeIndex);
        startNode = null;
        endNode = null;
        innerNodes = [];
        matchLocation = matches.shift();
        matchIndex++;
        if (!matchLocation) {
          break; // no more matches
        }
      } else if (curNode.firstChild || curNode.nextSibling) {
        // Move down or forward:
        curNode = curNode.firstChild || curNode.nextSibling;
        continue;
      }

      // Move forward or up:
      while (true) {
        if (curNode.nextSibling) {
          curNode = curNode.nextSibling;
          break;
        } else if (curNode.parentNode !== node) {
          if (Invoca.now() > GIVE_UP_AND_RETURN_TIME)
          {
            // message is logged in outer loop
            break;
          }

          curNode = curNode.parentNode;
        } else {
          break out;
        }
      }

    }

  }

  var reverts;
  /**
   * Reverts the last findAndReplaceDOMText process
   */
  findAndReplaceDOMText.revert = function revert() {
    for (var i = 0, l = reverts.length; i < l; ++i) {
      reverts[i]();
    }
    reverts = [];
  };

  /**
   * Generates the actual replaceFn which splits up text nodes
   * and inserts the replacement element.
   */
  function _genReplacer(nodeName) {

    reverts = [];

    var makeReplacementNode;

    if (typeof nodeName != 'function') {
      var stencilNode = nodeName.nodeType ? nodeName : document.createElement(nodeName);
      makeReplacementNode = function(fill) {
        var clone = document.createElement('div'),
        el;
        clone.innerHTML = stencilNode.outerHTML || new XMLSerializer().serializeToString(stencilNode);;
        el = clone.firstChild;
        if (fill) {
          el.appendChild(document.createTextNode(fill));
        }
        return el;
      };
    } else {
      makeReplacementNode = nodeName;
    }

    return function replace(range) {

      var startNode = range.startNode,
          endNode = range.endNode,
          matchIndex = range.matchIndex;

      if (startNode === endNode) {
        var node = startNode;
        if (range.startNodeIndex > 0) {
          // Add `before` text node (before the match)
          var before = document.createTextNode(node.data.substring(0, range.startNodeIndex));
          node.parentNode.insertBefore(before, node);
        }
        // Create the replacement node:
        var el = makeReplacementNode(range.match[0], matchIndex);
        node.parentNode.insertBefore(el, node);
        if (range.endNodeIndex < node.length) {
          // Add `after` text node (after the match)
          var after = document.createTextNode(node.data.substring(range.endNodeIndex));
          node.parentNode.insertBefore(after, node);
        }
        node.parentNode.removeChild(node);
        reverts.push(function() {
          var pnode = el.parentNode;
          pnode.insertBefore(el.firstChild, el);
          pnode.removeChild(el);
          pnode.normalize();
        });
        return el;
      } else {
        // Replace startNode -> [innerNodes...] -> endNode (in that order)
        var before = document.createTextNode(startNode.data.substring(0, range.startNodeIndex));
        var after = document.createTextNode(endNode.data.substring(range.endNodeIndex));
        var elA = makeReplacementNode(startNode.data.substring(range.startNodeIndex), matchIndex);
        var innerEls = [];

        for (var i = 0, l = range.innerNodes.length; i < l; ++i) {
          var innerNode = range.innerNodes[i];
          var innerEl = makeReplacementNode(innerNode.data, matchIndex);
          innerNode.parentNode.replaceChild(innerEl, innerNode);
          innerEls.push(innerEl);
        }
        var elB = makeReplacementNode(endNode.data.substring(0, range.endNodeIndex), matchIndex);
        startNode.parentNode.insertBefore(before, startNode);
        startNode.parentNode.insertBefore(elA, startNode);
        startNode.parentNode.removeChild(startNode);
        endNode.parentNode.insertBefore(elB, endNode);
        endNode.parentNode.insertBefore(after, endNode);
        endNode.parentNode.removeChild(endNode);

        reverts.push(function() {
          innerEls.unshift(elA);
          innerEls.push(elB);
          for (var i = 0, l = innerEls.length; i < l; ++i) {
            var el = innerEls[i];
            var pnode = el.parentNode;
            pnode.insertBefore(el.firstChild, el);
            pnode.removeChild(el);
            pnode.normalize();
          }
        });
        return elB;
      }
    };

  }

  Invoca.DOM.findAndReplaceText = findAndReplaceDOMText;

}(Invoca));
(function(Invoca)
{
    var DEFAULT_NANP_SEPARATOR = '-';
    var DEFAULT_INTL_SEPARATOR = ' ';

    var NANP_COUNTRY_CODE = '1';
    var INTL_PREFIX       = '0';

    Invoca.NANP_COUNTRY_CODE = NANP_COUNTRY_CODE;

    Invoca.PhoneNumber = function( cc_or_full_number, national )
    {
        var countryCode             = stripNonDigits( national ? cc_or_full_number : '' );
        var nationalNumber          = stripNonDigits( national ? national : cc_or_full_number );
        var originalNationalNumber  = national ? national : cc_or_full_number;

        // infer CC - not fully ported from ruby PhoneNumber class
        if ( !countryCode )
        {
            if ( nationalNumber.length == 11 && nationalNumber.charAt(0) == NANP_COUNTRY_CODE )
            {
                countryCode = NANP_COUNTRY_CODE;
                nationalNumber = nationalNumber.substr(1);
            }
            else if ( nationalNumber.length == 10 && nationalNumber.charAt(0) != INTL_PREFIX )
            {
                countryCode = NANP_COUNTRY_CODE;
            }
            else if (cc_or_full_number.charAt(0) == '+' || cc_or_full_number.charAt(0) == '0')
            {
                var starts_with_intl = /[\+|0]([\d]{1,2})[^\d]/;
                var matches = cc_or_full_number.match(starts_with_intl);
                if (matches){
                    countryCode = matches[1].replace(/^\s+|\s+$/g, "");
                    nationalNumber = nationalNumber.substr(countryCode.length);
                }

                else
                {
                    Invoca.log("When prefixing a number with + or 0, include a non digit character after the country code");
                }
            }
        }

        if ( countryCode == NANP_COUNTRY_CODE && nationalNumber.length != 10 )
        {
            Invoca.log( 'Invalid number: ' + countryCode + ', ' + originalNationalNumber, true );
        }

        // does all the formatting, from scratch (useful when coming from URL or user input)
        // TODO: push this logic back to the server since it is not complete
        this.format = function( include_nanp_leading_one, include_cc, user_separator )
        {
            var separator;
            if ( this.isNANP() )
            {
                separator = user_separator || DEFAULT_NANP_SEPARATOR;

                var part1 = nationalNumber.slice(0,3);
                var part2 = nationalNumber.slice(3,6);
                var part3 = nationalNumber.slice(6);
                var finalNumber = part1 + separator + part2 + separator + part3;
                if ( include_nanp_leading_one )
                {
                    finalNumber = "1" + separator + finalNumber;
                }

                return finalNumber;
            }
            else
            {
                separator = user_separator || DEFAULT_INTL_SEPARATOR;
                return ( include_cc && countryCode ? '+' + countryCode + separator : '' ) + nationalNumber;
            }
        }

        // assumes phone number was already formatted on server and just changes the separator out
        // handles case where second parameter, the "national number" had a +<country code> in it
        this.formatFromOriginal = function( include_nanp_leading_one, user_separator )
        {
            var separator = '';
            var replace_regex = /[\s-]/g;
            var number = '';

            if ( this.isNANP() )
            {
              separator = user_separator || DEFAULT_NANP_SEPARATOR;
              number = originalNationalNumber.replace( replace_regex, separator );

              if ( include_nanp_leading_one && number.charAt(0) != "+" )
              {
                  number = NANP_COUNTRY_CODE + separator + number;
              }
            }
            else
            {
              separator = user_separator || DEFAULT_INTL_SEPARATOR;
              number = originalNationalNumber.replace( replace_regex, separator );
            }

            return number;
        }

        this.isNANP = function( )
        {
            return countryCode == NANP_COUNTRY_CODE;
        }

        this.isEmpty = function( )
        {
            return !nationalNumber;
        }

        this.toParam = function( )
        {
            if ( countryCode == NANP_COUNTRY_CODE )
            {
                return nationalNumber;
            }
            else
            {
                return "00" + countryCode + nationalNumber;
            }
        }

        this.toString = function( )
        {
            return this.format( true );
        }

        this.countryCode    = countryCode;
        this.nationalNumber = nationalNumber;

        var UP_TO_10_NON_DIGITS = "([^0-9]{0,10})";
        var LEADING_PUNCTUATION = "([([])?";
        var LEADING_ZERO = "([([]?0[^0-9]{0,10})?"

        this.to_replacement_regex = function()
        {
            var accumulating_regex = "";

            if(nationalNumber.charAt(0) == '0')
            {
                accumulating_regex += LEADING_ZERO + LEADING_PUNCTUATION;
            }
            else
            {
                accumulating_regex = "(1[^0-9]{0,10})?" + LEADING_PUNCTUATION + nationalNumber.charAt(0) + UP_TO_10_NON_DIGITS;
            }

            for(var i = 1; i < nationalNumber.length; i++)
            {
                accumulating_regex += (i == nationalNumber.length - 1) ? nationalNumber.charAt(i) : (nationalNumber.charAt(i) + UP_TO_10_NON_DIGITS);
            }

            return new RegExp(accumulating_regex, "gi");
        }


        this.formatFromOther = function( input_string, other_phone_number )
        {
            var matches = other_phone_number.to_replacement_regex().exec(input_string);

            if(matches == null)
            {
                return input_string;
            }

            var new_string = '';
            // The leading zero is used in UK phone numbers. If there is no leading zero in the input string, set j to
            // 0 so that the leading zero is included in the formatted number. If there is a leading zero in the input
            // string, set j to 1 so that we include just one leading zero in the formatted number (instead of two)
            var j = input_string.match(LEADING_ZERO)[1] ? 1 : 0;

            // start at 1 because the first match is the entire string
            //  go one past the matches length because there is an extra
            //  match at the beginning that needs to be handled
            for(var i = 1; i <= matches.length + 1; i++)
            {
                if(typeof(matches[i]) != 'undefined'){
                    new_string += matches[i];
                }

                if (i > 1)
                {
                  new_string += nationalNumber.charAt(j);
                  j++;
                }
            }
            return new_string;
        }
    }

    function stripNonDigits( number )
    {
       var stripNonDigitsRegex = /[^\d]/g;
       var strippedNumber = number.replace( stripNonDigitsRegex, "" );

       return strippedNumber;
    }

})(Invoca);
/* dependencies:
 *   invoca.js
 *   dom.js
 */


(function(Invoca)
{
    var MODAL_DIALOG_ID       = 'rr_modalWindow';
    var MODAL_OVERLAY_ID      = 'rr_modalWindowOverlay';
    var MODAL_IFRAME_ID       = 'rr_modalIframe';
    var MODAL_SELECTOR        = '#' + MODAL_DIALOG_ID;

    Invoca.ModalIframe = {};

    Invoca.ModalIframe.isIE6 = navigator.userAgent.toLowerCase().match( /msie 6/ );
    Invoca.ModalIframe.isIE7 = navigator.userAgent.toLowerCase().match( /msie 7/ );

    function loadDialog( iframeUrl )
    {
      var modalContent = Invoca.DOM.selectElements( '#' + MODAL_IFRAME_ID );
      if ( modalContent.length > 0 )
      {
          Invoca.ModalIframe.updateIframeSrc(modalContent[0], iframeUrl);
      }

      var bodyTag = Invoca.DOM.selectTags( 'body' )[0];
      
      if ( Invoca.ModalIframe.isIE6 || !Invoca.DOM.support.boxModel )
      {
          // move modal window (to stay "fixed") when scrolling
          var modalWindow = Invoca.DOM.selectElements( MODAL_SELECTOR )[0];
          if ( modalWindow )
          {
              if ( modalWindow.style.setExpression )
              {
                  modalWindow.style.setExpression( "top","(document.documentElement.scrollTop || document.body.scrollTop) + Math.round(17 * (document.documentElement.offsetHeight || document.body.clientHeight) / 100) + 'px'" );
              }
              Invoca.DOM.addCssToElement( modalWindow, { position: 'absolute', 'zIndex': 99 } );
          }
      }
      else
      {
          // IE6, and older IEs in quirks mode do not get overlay (fixes involved messing with styles of advertiser page)
          var modalOverlay = document.createElement("div");
          modalOverlay.setAttribute( "id", MODAL_OVERLAY_ID );
          Invoca.DOM.addCssToElement( modalOverlay, { height  : "100%",
                                                           width   : "100%",
                                                           position: "fixed",
                                                           left    : "0px",
                                                           top     : "0px",
                                                           zIndex  : "2999",
                                                           opacity : ".3",
                                                           filter  : "alpha(opacity = 50)",
                                                           backgroundColor: "#000" } );
          modalOverlay.innerHTML = '';
          bodyTag.insertBefore( modalOverlay, bodyTag.firstChild );

          Invoca.DOM.addCss( { zIndex: "3000" }, MODAL_SELECTOR );
      }

      Invoca.DOM.show( MODAL_SELECTOR );
    }

    Invoca.ModalIframe.insert = function( selector, iframeUrl, width, height )
    {
      if ( Invoca.DOM.selectElements( MODAL_SELECTOR ).length == 0 )
      {
          var bodyTag = Invoca.DOM.selectTags( 'body' )[0];
          var modalWindowDiv = document.createElement("div");
          modalWindowDiv.setAttribute( "id", MODAL_DIALOG_ID );
          Invoca.DOM.addCssToElement( modalWindowDiv, { display    : "none",
                                                             position   : "fixed",
                                                             top        : "17%",
                                                             left       : "50%",
                                                             marginLeft : (0-(width / 2)).toString() + "px",
                                                             width      : width.toString() + "px",
                                                             height     : height.toString() + "px",
                                                             backgroundColor: "#EEE",
                                                             color      : "#333",
                                                             border     : "1px solid black",
                                                             padding    : "12px" } );

          modalWindowDiv.innerHTML = '<div style="float: right; color: #000099; font-size: 11px; cursor: pointer; font-weight: bold; font-family: Arial" onfocus="this.blur();" onclick="Invoca.ModalIframe.closeModal();">close</div><div style="float: left; font-weight: bold; font-size: 13px; font-family: Arial; margin-bottom: 5px">Call Now</div></div>' + ( Invoca.DOM.support.boxModel ? '' : '<br /><br />' ) + '<iframe id="' + MODAL_IFRAME_ID + '" style="' + ( Invoca.DOM.support.boxModel || ( !Invoca.ModalIframe.isIE6 && !Invoca.ModalIframe.isIE7 ) ? 'width:100%' : 'width:94%' ) + '; height:280px; border: none" border="0" src=""></iframe>';
          bodyTag.appendChild( modalWindowDiv );
      }

      var items = Invoca.DOM.selectElements( selector );
      for ( var i = 0; i < items.length; i++ )
      {
          Invoca.DOM.Event.add( items[i], "click", function( ) { loadDialog( iframeUrl ) } );
      }
    };

    Invoca.ModalIframe.closeModal = function()
    {
        Invoca.DOM.hide( MODAL_SELECTOR );
        var overlay = Invoca.DOM.selectElements( '#' + MODAL_OVERLAY_ID )[0];

        if ( overlay )
        {
            overlay.parentNode.removeChild( overlay );
        }
    };

    // separate method for test stubbing, since it causes warnings in test runner about "did your tests try to submit a form and you haven't prevented that?"
    Invoca.ModalIframe.updateIframeSrc = function(frame, url) {
      frame.setAttribute('src', url);
    };

})(Invoca);
(function(Invoca)
{
  Invoca.Hubspot = function()
  {
    var POLLING_TIMEOUT_MS  = 5 * 1000;
    var POLLING_INTERVAL_MS = .5 * 1000;
    var CALLBACK_TIMEOUT_MS = 30 * 1000;
    var timers = {};
    var cookies = {};
    var load_callback = null;
    var load_callback_context = null;

    this.isInstalled = function()
    {
      Invoca.log("Hubspot: checking if tracking code exists...");

      // backwarks compatible in case old Hubspot script tags used a different domain for the src
      if ( typeof( window._hsq ) != "undefined" )
      {
        return true;
      }

      var script_tags = document.getElementsByTagName("script");

      for ( var i = 0; i < script_tags.length; i++ )
      {
        if ( script_tags[i].src.search(/hubspot\.com/) != -1 )
        {
          return true;
        }
      }

      return false;
    };

    this.getUserTokenAndFireCallback = function(callback, context)
    {
      load_callback         = callback;
      load_callback_context = context;
      Invoca.log("Hubspot: tracking code detected. Looking for user token...");

      timers['polling_timeout'] = setTimeout( function()
      {
        clearInterval(timers['polling']);
        Invoca.log("Running based on polling timeout");
        load_callback.apply(load_callback_context, [cookies]);
      }, POLLING_TIMEOUT_MS );

      timers['polling'] = setInterval(pollForHubspot, POLLING_INTERVAL_MS);
      pollForHubspot();
    };

    function insertCallbackOntoHubspotQueue(hubspot_api)
    {
      try
      {
        Invoca.log("Hubspot: adding our callback to hubspot API");
        clearTimeout(timers['polling_timeout']);
        timers['callback_timeout'] = setTimeout( function()
        {
          Invoca.log("Running based on callback timeout");
          load_callback.apply(load_callback_context, [cookies]);
        }, CALLBACK_TIMEOUT_MS );

        hubspot_api.push(
          function( tracker /*, hubspot */ )
          {
            try
            {
              Invoca.log("Hubspot: callback triggered");
              Invoca.log(tracker);
              cookies[ Invoca.AdvertiserIntegration.HUBSPOT_USER_TOKEN_COOKIE_NAME ] = tracker.utk.visitor;
            }
            catch(ex)
            {
              // in case the arguments passed to the callback change, we want to handle the error and still run
              Invoca.log(ex.toString());
            }

            clearTimeout(timers['callback_timeout']);
            load_callback.apply(load_callback_context, [cookies]);
          } );
      }
      catch(ex)
      {
        // in case _hsq no longer has a push() method, we want to handle the error and run right away
        Invoca.log(ex.toString());
        clearTimeout(timers['callback_timeout']);
        load_callback.apply(load_callback_context, [cookies]);
      }
    }

    function pollForHubspot()
    {
      Invoca.log( "Polling..." );
      if ( typeof window._hsq != "undefined" )
      {
        clearInterval(timers['polling']);
        insertCallbackOntoHubspotQueue(window._hsq);
      }
    };
  }
})(Invoca);
/* Advertiser Integration library
 *
 * Required
 *  Namespaces:
 *      Invoca, Invoca.AdvertiserIntegration namespaces
 *  Following constants should be set:
 *      Invoca.AdvertiserIntegration = { URL,
                                              TEST_DOMAIN
                                              TEST_NUMBER };
 */


Invoca.AdvertiserIntegration.COOKIE_NAME_PREFIX    = 'rrCookie_affiliateInfo';
Invoca.AdvertiserIntegration.COOKIE_CACHE_LIFETIME = 1000 * 60 * 60 * 24 * 1;  // 1 day
Invoca.AdvertiserIntegration.COOKIE_POLLING_RATE   = 100;

Invoca.AdvertiserIntegration.init = function( config )
{
    function param_or_default( param, default_val )
    {
      return ( typeof param == "undefined" ) ? default_val : param;
    }

    var advertiser_id          = config['id'];
    var ring_pool_id           = config['ringPoolId'];
    var advertiser_campaign_id = config['campaignId'];
    var selector               = param_or_default( config['numberSelector'],     '' );
    var show_selector          = param_or_default( config['showSelector'],       '' );
    var hide_selector          = param_or_default( config['hideSelector'],       '' );
    var not_visible_selector   = param_or_default( config['notVisibleSelector'], '' );
    var show_number_callback   = param_or_default( config['onLoadWithNumber'],   null );
    var no_number_callback     = param_or_default( config['onLoadNoNumber'],     null );
    var promo_numberid_name    = param_or_default( config['networkParamName'],   'sid' );
    var leadingOne             = param_or_default( config['numberLeadingOne'],   true );
    var mobileTapToCall        = param_or_default( config['mobileClickToCall'],  true );
    var buttonMode             = param_or_default( config['ctcUseButton'],       true );
    var buttonContent          = param_or_default( config['ctcButtonContent'],   null );
    var user_separator         = param_or_default( config['numberSeparator'],    null );
    var number_to_replace      = param_or_default( config['numberToReplace'],    null );

    /* A string that is a valid thirdParty URL which redirects back to our URL
       Sometimes referred to as a beacon URL, and can be used to get a cookie value that is stored in
        another domain

       Provide one of the following in the string template to indicate where our URL should be placed:
        %ESCAPED_URL%
        %UNESCAPED_URL%

       Example:
        http://example.com/beacon/%UNESCAPED_URL%
        http://example.com/redirect.php?url=%ESCAPED_URL%
     */
    var redirectUrlTemplate    = param_or_default( config['redirectUrl'],        null );

    /* A key value pair of DynamicNumberPool params with their values

        Example:
          poolParams : { user_id : window.acmeCompany.userID,
                         source  : 'PaidAd' }

      An object can also be provided as the 'value', where the raw value is provided via data param
      Additional keys for the nested object are:
        escape : (defaults to true) whether or not to encode the value before adding to the URL
                                    only set to false if the encoding has already been done

        Example:
          poolParams : { user_id : { data   : window.acmeCompany.escapedUserID,
                                     escape : false } }
    */
    var poolParamsHash         = param_or_default( config['poolParams'],         null );

    /* A string that uniquely identifies the cookie used for this page
       If not set, default cookie name will be used.

       This allows client to have different parts of a site (in the same domain) use different
       DynamicNumberPools rather than having one number cached across entire site for a given user.

       Up to client to manage the browser cookie limit and not exceed it.
    */
    var cookieId               = param_or_default( config['cookieId'],           null );

    var testMode               = false;
    var originalContent        = selector ? Invoca.DOM.getHTML( selector ) : null;
    var cookieName             = Invoca.AdvertiserIntegration.COOKIE_NAME_PREFIX + (cookieId ? "_" + cookieId : "");
    var cookie                 = parseCookie(cookieName);
    var queryHash              = Invoca.AdvertiserIntegration.getQueryStringHash( window.location.search );
    var queryHashComposite     = queryHash['ppcpn'];
    var referrer               = Invoca.AdvertiserIntegration.getReferrer( );
    var referrerDomain         = referrer.replace( /^https?\:\/\/([^\/]+)\/.*/, "$1" );

    var timers                 = {};
    var start                  = new Date().getTime();

    Invoca.debugMode      = param_or_default( config['debug'], queryHash['rr_debug'] == '1' );

    if ( typeof advertiser_id == 'undefined' || advertiser_id == 'YOUR_ID_HERE' )
    {
      Invoca.log( 'PayPerCall Web Integration: id must be set', true );
      return;
    }

    if ( number_to_replace && number_to_replace.replace( /[^\d]/g, "" ).length <= 7 )
    {
      Invoca.log( "numberToReplace format is invalid: '" + number_to_replace + "'", true );
      number_to_replace = null;
    }


    function parseCookie( name )
    {
      var value = Invoca.cookie( name );
      var parsed = null;

      if ( value )
      {
        try
        {
            parsed = Invoca.JSON.parse( value );
        }
        catch( ex )
        {
            Invoca.log( "Could not parse cookie: '" + name + "', value: '" + value + "', error: " + ex.toString(), true );
        }

      }

      return parsed;
    }

    function insertCTC( number_settings )
    {
      Invoca.log( "Inserting CTC..." );
      var number_selector = selector || ".rr_number_to_replace_node";

      if ( buttonMode )
      {
        if ( number_to_replace )
        {
          insertNumberWithRegex( number_settings, number_selector );
        }

        Invoca.log( "in button mode. Adding button to: '" + number_selector + "'" );
        Invoca.DOM.setHTML( buttonContent || '<button type="button">Call Now!</button>', number_selector );
        Invoca.DOM.addClass( 'click_to_call_button', number_selector );
      }
      else
      {
        // insert number or restore original content, and allow the number to be clicked on
        if ( number_settings && ( number_settings.pn || number_settings.pn_formatted ) )
        {
          insertNumber( formatPhoneNumberFromCookie( number_settings ), number_settings, number_selector );
        }
        else
        {
          restoreOriginalContent( true );
        }
      }

      Invoca.ModalIframe.insert( number_selector, number_settings.ctc.url, 430, 335 );
    }

    function insertNumberWithRegex( settings, wrapping_selector )
    {
      var phone_number_to_replace = new Invoca.PhoneNumber(number_to_replace);
      var phone_number_to_insert = new Invoca.PhoneNumber(settings.pn_country_code || "", settings.pn_formatted || "");


      var replace_given_number = function(found_text){
        var similar_text = phone_number_to_insert.formatFromOther(found_text, phone_number_to_replace);
        var node = document.createTextNode(similar_text);

        if ( phone_number_to_insert && settings.pn_national && settings.mobile && mobileTapToCall )
        {
          var tel_link = document.createElement("a");
          tel_link.href = "tel:+" + settings.pn_country_code + settings.pn_national;
          tel_link.appendChild(node);
          node = tel_link;
          Invoca.log("Adding tel link around text: '" + similar_text + "'");
        }

        if (wrapping_selector === undefined && !!navigator.userAgent.match(/Trident.*rv[ :]*11\./)) {
          wrapping_selector = '.invoca_ie11_normalize_fix';
        }

        if (wrapping_selector)
        {
          var span = document.createElement("span");

          span.className = wrapping_selector.replace(/\./,'');
          span.appendChild(node);

          Invoca.log("Returning text in a span: '" + similar_text + "'");
          return span;
        }
        else
        {
          Invoca.log("Returning text node: '" + similar_text + "'");
          return node;
        }
      };

      Invoca.DOM.findAndReplaceText(phone_number_to_replace.to_replacement_regex(), document.body, replace_given_number);
      document.body.normalize();
    }

    function insertNumber( number, settings, number_wrapper )
    {
      if ( number_to_replace )
      {
        insertNumberWithRegex( settings, number_wrapper );
      }

      if ( selector )
      {
        originalContent = Invoca.DOM.getHTML( selector );

        if ( number && settings.pn_national && settings.mobile && mobileTapToCall )
        {
            number = '<a href="tel:+' + settings.pn_country_code + settings.pn_national + '">' + number + '</a>';
        }

        Invoca.DOM.setHTML( number, selector );
      }

    }

    function skip_preview_updates( preview_only )
    {
       return preview_only && number_to_replace;
    }

    function updateNumberOnPage( number_settings, preview_only )
    {
      if ( skip_preview_updates( preview_only ) )
      {
          return;
      }

      if ( number_settings )
      {
          // prefer client side if that was set
          if ( !number_to_replace && number_settings.number_to_replace )
          {
              number_to_replace = number_settings.number_to_replace;
          }

          var formattedNumber = formatPhoneNumberFromCookie( number_settings );

          if ( number_settings.ctc )
          {
              insertCTC( number_settings );
              fireShowNumberCallback( preview_only, true, formattedNumber );
              return;
          }

          if ( formattedNumber !== '' )
          {
              insertNumber( formattedNumber, number_settings );
              fireShowNumberCallback( preview_only, false, formattedNumber );
              return;
          }
      }

      // no number settings object, or an empty phone number in the settings
      restoreOriginalContent();
    }

    function fireShowNumberCallback( preview_only, is_ctc, number )
    {
      if ( show_selector && !is_ctc && buttonMode )
      {
        Invoca.log( "Showing element: " + show_selector );
        Invoca.DOM.show( show_selector );
      }

      if ( hide_selector )
      {
        Invoca.log( "Hiding element: " + hide_selector );
        Invoca.DOM.hide( hide_selector, false );
      }

      if ( not_visible_selector )
      {
        Invoca.log( "Setting element to invisible: " + not_visible_selector );
        Invoca.DOM.hide( not_visible_selector, true );
      }

      if ( !preview_only && typeof( show_number_callback ) == "function" )
      {
        Invoca.log( "Calling onLoadWithNumber callback" );
        try
        {
            show_number_callback.apply( this, [ is_ctc, number ] );
        }
        catch( ex )
        {
            Invoca.log( "Error in onLoadWithNumber callback method: " + ex.message, true );
        }
      }
    }

    function fireNoNumberCallback( )
    {
      if ( typeof( no_number_callback ) == "function" )
      {
        Invoca.log( "Calling onLoadNoNumber callback" );
        try
        {
            no_number_callback.apply( this );
        }
        catch( ex )
        {
            Invoca.log( "Error in onLoadNoNumber callback method: " + ex.message, true );
        }
      }
    }

    function formatPhoneNumberFromCookie( settings )
    {
        if ( settings.pn_formatted )
        {
            return ( new Invoca.PhoneNumber( settings.pn_country_code,
                                                  settings.pn_formatted ) ).formatFromOriginal( leadingOne, user_separator );
        }

        if ( settings.pn )
        {
            return ( new Invoca.PhoneNumber( settings.pn ) ).format( leadingOne, false, user_separator );
        }

        return '';
    }

    function restoreOriginalContent( is_ctc )
    {
      if ( originalContent !== null && selector )
      {
        Invoca.log( "Restoring original content." );
        Invoca.DOM.setHTML( originalContent, selector );
      }

      if ( !is_ctc )
      {
        fireNoNumberCallback( );
      }
    }

    function getCookieValuesAsHash(cookieList) {
      var cookiesToSend = {};
      for (var i=0; i < cookieList.length; i++) {
        var cookieName = cookieList[i];
        var cookieValue = Invoca.cookie(cookieName);

        if (cookieValue != null) {
          cookiesToSend[cookieName] = cookieValue;
        }
      }
      return cookiesToSend;
    }

    function onResponse( data )
    {
      if ( data.error )
      {
        Invoca.log( "Error from server: " + data.error );
      }

      if ( !data.settings || data.settings.status == 'invalid' )
      {
        restoreOriginalContent( );
      }
      else
      {
        Invoca.log("Full server response: " + Invoca.JSON.stringify(data));

        if (data.dynamic_number_pool_cookies) {
          // do cookie lookup here and then rerun with the cookies that we just pulled in
          var delayTime = data.dynamic_number_pool_cookies.delay;
          var foundAllCookies = false;

          var findCookies = function() {
            var timeDiff = new Date().getTime() - start;
            var timeLeft = delayTime - timeDiff;
            var cookiesToSend = getCookieValuesAsHash(data.dynamic_number_pool_cookies.names);
            if (timeLeft <= 0) {
              run(cookiesToSend);
            } else {
              var count = Invoca.countHash(cookiesToSend);
              if (count == data.dynamic_number_pool_cookies.names.length) {
                foundAllCookies = true;
              }

              if (foundAllCookies) {
                run(cookiesToSend);
              } else {
                setTimeout(function() { findCookies(); }, Invoca.AdvertiserIntegration.COOKIE_POLLING_RATE);
              }
            }
          };

          setTimeout(findCookies, 0);
        }
        else {
          updateNumberOnPage(data.settings);
        }
      }
      if (!testMode && !data.test_mode && data.settings) {
          data.settings['last_validated_at'] = Invoca.now();
          Invoca.cookie( cookieName,
                              Invoca.JSON.stringify( data.settings ),
                              { expires: data.integration_cookie_life,
                                domain: data.domain,
                                path: '/' } );
      }
    }

    function getCurrentStatus( queryPhoneNumber )
    {
        var status = cookie ? cookie.status : null;
        var now_ms = Invoca.now();

        if ( cookie )
        {
            Invoca.log("Read " + cookieName + " cookie at " + now_ms + ": " + Invoca.JSON.stringify(cookie));
        }

        if ( ( !status ) ||
             ( status == 'invalid' && !queryPhoneNumber.isEmpty() ) ||
             ( queryNumberContradictsCookie( queryPhoneNumber ) )   ||
             ( cookie && cookie.last_validated_at < now_ms - Invoca.AdvertiserIntegration.COOKIE_CACHE_LIFETIME ) )

        {
            status = 'unknown';
        }

        return status;
    }

    function queryNumberContradictsCookie( queryPhoneNumber )
    {
        return ( cookie &&
                 !queryPhoneNumber.isEmpty() && ( cookie.pn           != queryPhoneNumber.toParam() &&
                                                  cookie.validated_pn != queryPhoneNumber.toParam() ) );
    }

    function insertQueryNumber( queryPhoneNumber, preview_only )
    {
        if ( queryPhoneNumber.isEmpty() || skip_preview_updates( preview_only ) ) return;

        if ( queryPhoneNumber.isNANP() )
        {
            Invoca.log( 'Setting initial number from query param: ' + queryPhoneNumber.toParam() );
            insertNumber( queryPhoneNumber.format( leadingOne, false, user_separator ), { pn_country_code : Invoca.NANP_COUNTRY_CODE,
                                                                                          pn_national     : queryPhoneNumber.nationalNumber,
                                                                                          mobile          : ( cookie ? cookie.mobile : false ) } );
        }
        else
        {
            Invoca.log( 'International number detected: ' + queryPhoneNumber.toParam() );
        }
    }

    // RUN


    var queryHashPair, queryHashPpcpn, queryHashTestAncId;
    if ( queryHashComposite )
    {
        queryHashPair       = queryHashComposite.split("_");
        queryHashPpcpn      = queryHashPair[0];
        queryHashTestAncId  = queryHashPair[1];
    }

    var queryPhoneNumber      = new Invoca.PhoneNumber( queryHashPpcpn || queryHash[promo_numberid_name.toLowerCase()] || queryHash['ppcan'] || '' );
    var hubspotIntegration    = new Invoca.Hubspot();

    testMode                  = queryHashTestAncId ||
                                ( !queryPhoneNumber.isEmpty() && queryPhoneNumber.toParam() == Invoca.AdvertiserIntegration.TEST_NUMBER ) ||
                                ( referrerDomain.match( new RegExp( Invoca.AdvertiserIntegration.TEST_DOMAIN + "$" ) ) &&
                                  !referrer.match( new RegExp( Invoca.AdvertiserIntegration.TEST_DOMAIN + "\\/?(index|corporate\\/|\\?|$)" ) ) );

    function run( cookies_from_page )
    {
        var jsonArgs =
        {
            av_id                       : advertiser_id,
            referer                     : referrer,
            cookies_for_url             : Invoca.JSON.stringify(cookies_from_page || {}),
            url_without_pool_params     : Invoca.getCurrentLocation()
        };


        // optional params, only include if set
        if ( advertiser_campaign_id )
        {
            jsonArgs['advertiser_campaign_id'] = advertiser_campaign_id;
        }

        if ( ring_pool_id )
        {
            jsonArgs['ring_pool_id'] = ring_pool_id;
        }

        var mapNumberUrl = window.location.protocol + Invoca.AdvertiserIntegration.URL;


        // if we are on the first pass we want to pass a argument to request cookies from the server
        if (cookies_from_page == null) {
          jsonArgs["request_cookies"] = true;
        }

        var jsonp = new Invoca.JSONP.requestWithLandingPage(mapNumberUrl, jsonArgs, 'url', poolParamsHash, redirectUrlTemplate, onResponse);

        if ( testMode )
        {
            Invoca.log( 'In test mode: skipping cookie' );
            jsonp.get();
            return;
        }

        var status = getCurrentStatus( queryPhoneNumber );

        if ( status == 'invalid' )
        {
            Invoca.log( 'Server found nothing last time. Aborting web integration for this session.' );
            fireNoNumberCallback( );
            return;
        }

        if ( cookie )
        {
            jsonArgs.cookie = Invoca.JSON.stringify( cookie );

            switch( status )
            {
                case 'promo_number':
                case 'ctc':
                case 'advertiser_number':
                Invoca.log( 'Valid state detected, using persistent data.' );
                updateNumberOnPage( cookie );
                return;

                case 'unknown':
                Invoca.log( 'Valid state detected, verifying data with server.' );

                // Use the cookie if we don't have an initial value.
                if ( queryPhoneNumber.isEmpty() )
                {
                    Invoca.log( 'Setting initial number with cached data.' );
                    updateNumberOnPage( cookie, true );
                }
                else
                {
                    insertQueryNumber( queryPhoneNumber, true );
                }

                jsonp.get();
                return;
            }

            // unrecognized cookie status value
            Invoca.log( 'Unknown state found (' + status + '). Aborting web integration for this session.' );
            fireNoNumberCallback( );
            return;
        }

        // no cookie, not test mode
        insertQueryNumber( queryPhoneNumber, true );
        jsonp.get();
    }

    if ( hubspotIntegration.isInstalled() )
    {
      if (testMode || getCurrentStatus(queryPhoneNumber) == 'unknown')
      {
        hubspotIntegration.getUserTokenAndFireCallback(run, this);
      }
      else
      {
        // cookie exists and is valid
        run(null);
      }
    }
    else
    {
      run(null);
    }
};


// to allow stubbing
Invoca.AdvertiserIntegration.getQueryStringHash = function( query_string )
{
  var query_hash = {};
  var query_params = query_string.substr(1).split( "&" );

  for ( var i = 0; i < query_params.length; ++i )
  {
    var param = query_params[i].split( "=" );
    query_hash[ param[0].toLowerCase() ] = param[1];
  }

  return query_hash;
};

Invoca.AdvertiserIntegration.getReferrer = function( )
{
    return document.referrer;
};











// To maintain old contract
var PayPerCall = {};
PayPerCall.load = function(options)
{
  Invoca.advertiser_integration = options || {};
}

// deprecated interface - supported for backwards compatibility
function setPayPerCallTarget( selector, advertiser_id, promo_numberid_name, separator, leadingOne, buttonMode, debug )
{
  Invoca.advertiser_integration = {
    id                 : advertiser_id,
    numberSelector     : selector,
    numberSeparator    : separator,
    numberLeadingOne   : leadingOne,
    ctcUseButton       : buttonMode,
    networkParamName   : promo_numberid_name,
    jqueryNoConflict   : false,
    debug              : debug
  };
}

Invoca.onReady( function() {
  var pollForOptions   = true;
  var POLL_DURATION_MS = 3 * 1000;

  // support clients that insert our code asynchronously after page has been loaded
  //  in those cases, document is already ready so this onReady callback gets called
  //  prior to the client's Invoca.advertiser_integration call to set the config params

  // Stop looping after 3 seconds and assume client did not insert config params
  setTimeout(function()
  {
    pollForOptions = false;
  }, POLL_DURATION_MS);

  function initWhenOptionsSet()
  {
    if (!Invoca.AdvertiserIntegration.loaded && pollForOptions)
    {
      if (Invoca.advertiser_integration)
      {
        Invoca.AdvertiserIntegration.init(Invoca.advertiser_integration);
        Invoca.AdvertiserIntegration.loaded = true;
      }
      else
      {
        setTimeout(initWhenOptionsSet, 50);
      }
    }
  };

  initWhenOptionsSet();
});

var RingRevenue = Invoca;
