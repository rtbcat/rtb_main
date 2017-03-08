window['optimizely'] = window['optimizely'] || [];
window['optimizely'].push({
  type: 'integration',
  OAuthClientId: '5406430409'
});


/**
 * GET ACCOUNT ID
 *
 * @return {Number} the account id 
 */
function getAccountId() {
    return optimizely.getAccountId();
}


/**
 * GET PROJECT ID (sometimes the same as the project id)
 *
 * @return {Number} the project id
 */
function getProjectId() {
    return optimizely.getProjectId();
}


/**
 * EXPERIMENT IDS USING THE OBJECT transferring it to the correct string:
 *
 * @return {String} a string that displays all the experiments and variations in a list of query parameters 
 */
function getVariationsInParameters() {
    var resultstring = "";
    for (exp in optimizely.variationIdsMap) {
        resultstring += "&x" + exp + "=" + optimizely.variationIdsMap[exp].join("_");
    }
    return resultstring;
}

/**
 * EXPERIMENT IDS USING A THE OPTIMIZELY OBJECT IN JSON FORMAT
 *
 * @return {String} a JSON formatted string that contains all the experiments and the variations someone is bucketed in 
 */
function getVariationsInJSON() {
    var result = {}
    for (exp in optimizely.variationIdsMap) {
        result[exp] = optimizely.variationIdsMap[exp].join("_");
    }
    return JSON.stringify(result);
}


/**
 * REQUIRED FOR COOKIE FUNCTIONS
 *
 * @param {String} cname (cookie name)
 * @return {String} a string representing the cookievalue
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

/**
 * EXPERIMENT IDS USING A COOKIE
 *
 * @return {String} a string that displays all the experiments and variations in a list of query parameters
 */
function getVariationsInParameters() {

    var variations = JSON.parse(decodeURIComponent(getCookie("optimizelyBuckets")));
    resultstring = "";
    for (var variation in variations) {
        resultstring += "&x" + variation + "=" + variations[variation];
    }
    return resultstring;
}

/**
 * EXPERIMENT IDS USING A COOKIE IN JSON FORMAT
 *
 * @return {String} a JSON formatted string that contains all the experiments and the variations someone is bucketed in
 */
function getVariationsInJSON() {
    return decodeURIComponent(getCookie("optimizelyBuckets"));
}

/**
 * SEGMENT VALUES USING THE OBJECT you can use this for the segments (gold+ feature):
 *
 * @return {String} a string that displays all the segments and their values in a list of query parameters
 */
function getSegmentsInParameters() {
    var resultstring = "";
    for (var seg in optimizely.data.visitor.segments) {
        resultstring += "&s" + seg + "=" + optimizely.data.visitor.segments[seg];
    }
    return resultstring;
}

/**
 * SEGMENT VALUES USING THE OBJECT IN JSON FORMAT
 *
 * @return {String} a JSON formatted string that contains all the segments and their values
 */
function getSegmentsInJSON() {
    return JSON.stringify(optimizely.data.visitor.segments);
}

/**
 * SEGMENT VALUES USING A COOKIE
 *
 * @return {String} a string that displays all the segments and their values in a list of query parameters
 */
function getSegmentsInParameters() {
    var segments = JSON.parse(decodeURIComponent(getCookie("optimizelySegments")));
    var resultstring = "";
    for (var seg in segments) {
        resultstring += "&s" + seg + "=" + segments[seg];
    }
    return resultstring;
}

/**
 * SEGMENT VALUES USING A COOKIE IN JSON FORMAT
 *
 * @return {String} a JSON formatted string that contains all the segments and their values 
 */
function getSegmentsInJSON() {
    return decodeURIComponent(getCookie("optimizelySegments"));
}

/**
 * Getting the user id is only possible using the cookie value
 *
 * @return {String} a JSON formatted string that contains all the segments and their values  
 */
function getUserId() {
    return getCookie("optimizelyEndUserId");
}

/** 
 * Generate the entire URL that you can use to create a conversion, given a goalname. The goalname 
 * is required, if you also provide a value, there will be a revenue value added to the conversion call. 
 * The goalname will be encoded if it isn't already. 
 *
 * @param {String} goalname (the goal were you are creating a conversion for)
 * @param {Number} value (a value representing the revenue of the conversion)
 * @return {String} a JSON formatted string that contains all the segments and their values   
 */
function generateConversionUrl(goalname, value) {
    var goalname = decodeURIComponent(goalname) == goalname ? encodeURIComponent(goalname) : goalname;


    var result = "http://" + getProjectId() + ".log.optimizely.com/event?a=" + getAccountId() + "&n=" + goalname + "&u=" + getUserId() + getVariationsInParameters() + getSegmentsInParameters();
    if (typeof (value) != "undefined") {
        result += "&v=" + value;
    }
    return result;
}