var vt;

$(function () {
  try {
    window.optimizely = window.optimizely || [];

    var pageview = null;
    vt = new VisitorTracker;
    
    vt.init(getOptimizelyData(), window.billsEnv || 'production', function () {
      var queryString = 'vt_session_id=' + vt.sessionObject.session_id + '&vt_visitor_id=' + vt.visitorObject.visitor_id;

      // Session call has returned
      // Track current pageview
      try {
        window.optimizely.push(['trackEvent', 'pageview_' + window.location.hash.substr(1)]);
      } catch (e) {
        vtHandleError(err);
      }

      try {
        pageview = vt.defineEvent('pageview', {}, null);
        vt.trackEvent(pageview, {});
      } catch (err) {
        vtHandleError(err);
      }

      // Add the visitor tracking ids to each link
      $('a').each(function () {
        try {
          var $el = $(this);
          var href = $el.attr('href');
          var a = document.createElement('a');

          a.href = href;
          a.search = a.search ? a.search + '&' + queryString : '?' + queryString;

          $el.attr('href', a.href);
        } catch (err) {
          vtHandleError(err);
        }
      });

      // Track events on all links
      // Delay following link until api call returns (max 1s)
      $('a').on('click', function () {
        var $el = $(this);

        try {
          if ($el.attr('target') !== '_blank') {
            e.preventDefault();
          }

          // Get element attributes
          var target = $el.attr('target');
          var href = $el.attr('href');
          var id = $el.attr('id');

          // Get event data
          var eventData = {
            event_element: 'a',
            event_value: href
          };

          if (id) {
            eventData['event_element_name'] = id;
          }

          // Create the click event
          var clickEvent = vt.defineEvent('click', eventData, pageview);

          // Ensure callback runs after 1s if event call does not return
          var callback = vtCreateFunctionWithTimeout(function () {
            if (target !== '_blank') {
              window.location.href = href;
            }
          });

          // Track the click event
          vt.trackEvent(clickEvent, {}, callback);
        } catch (err) {

          // If tracking fails, go to original href
          window.location.href = $el.attr('href');
        }
      });
    });
  } catch (err) {
    vtHandleError(err);
  }
  
});

/**
 * Track an event
 * @param  {String}   eventName
 * @param  {String}   eventElement
 * @param  {String}   eventValue
 * @param  {String}   eventElementName
 * @param  {Function} callback
 * @return {undefined}
 */
function vtTrackEvent(eventName, eventElement, eventValue, eventElementName, callback) {
  try {
    window.optimizely.push(['trackEvent', eventName + '_' + eventElementName]);
  } catch (e) {
    vtHandleError(err);
  }

  try {
    if (typeof eventElementName === 'function') {
      callback = eventElementName;
      eventElementName = 'n/a';
    }

    // Make sure callback is a function
    if (typeof callback !== 'function') {
      callback = new Function;
    }

    // Make sure callback is run after at most 1s
    callback = vtCreateFunctionWithTimeout(callback);

    // Create event
    var event = vt.defineEvent(eventName, {
      event_element: eventElement,
      event_value: eventValue,
      event_element_name: eventElementName
    }, null);

    // Track event
    vt.trackEvent(event, {}, callback);
  } catch (err) {
    vtHandleError(err);
    callback();
  }
}

/**
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits#handling_timeouts
 * @param  {Function} callback
 * @param  {Number}   opt_timeout
 * @return {Function}
 */
function vtCreateFunctionWithTimeout(callback, opt_timeout) {
  var called = false;
  setTimeout(callback, opt_timeout || 1000);
  return function() {
    if (!called) {
      called = true;
      callback();
    }
  }
}

/**
 * Log an error
 * @param  {Error} err
 * @return {undefined}
 */
function vtHandleError(err) {
  if (console.log) {
    console.log(err);
  }
}

/**
 * @return {{}}
 */
function getOptimizelyData() {
  var experimentIds = [];
  var variationIds = [];

  // Capture variation ids for active optimizely experiments
  try {
    $.each(window.optimizely.variationIdsMap, function (experimentId, experimentVariationIds) {
      experimentIds.push(experimentId);

      $.each(experimentVariationIds, function (k, variationId) {
        variationIds.push(variationId);
      });
    });
  } catch (err) {
    vtHandleError(err);
  }

  return {
    experiment_id: experimentIds,
    variation_id: variationIds
  };
}