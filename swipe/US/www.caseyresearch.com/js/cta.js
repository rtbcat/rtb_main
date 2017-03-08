var ctas = null;

var tmplProcess = function(tpl, data) {
  console.log(data);
  var re = /<%([^%>]+)?%>/g;
  while(match = re.exec(tpl)) {
    tpl = tpl.replace(match[0], data[match[1]]);
  }
  return tpl;
};

var buildCtaUrl = function(options) {
  if(options.ctaId) {
    return '/cta/'+options.ctaId;
  }
  return options.category?'/cta/'+options.category:'/cta';
};

var insertInline = function() {
  total = 0;
  $('div[data-inline-cta]').each(function(i,that) {
    $(that).children().each(function(x,el) {
      words = $(el).text().match(/\S+/g);
      if(words !== null) total += words.length;
      if(total >= 700) {
        $(el).after($('#'+$(that).data('inline-cta')).html()); 
        total = 0;
      }
      if(typeof(ajaxifySubscribeForms) != 'undefined') {ajaxifySubscribeForms();}

    });
  });
};

var validateEmail = function(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

var showAlert = function(text, type) {
  type = type || 'success';
  $('.top-alert').remove();
  $('header').prepend('<div class="top-alert alert alert-'+type+' navbar-fixed-top"> <div class="container"> <div class="row"> <div class="col-md-8"><p>'+text+'</p></div> <div class="col-md-4">  <div class="hide-top-alert"><img src="//d1w116sruyx1mf.cloudfront.net/images/icons/close_lite.gif"></div> </div> </div> </div>');
  $('.hide-top-alert').on('click', function(e) {
    e.preventDefault();
    $('.top-alert').remove();
  });
};


var ajaxifyForms = function() {
  $('.ajax-form').on('submit', function(e) {
    e.preventDefault();
    that = this;
    if(!validateEmail($(e.target).find('input[name=email]').val())) {
      showAlert('Invalid email', 'error');

      return;
    }

    $.ajax({
      url: $(e.target).attr('action').replace(/\/$/, ""),
      data:$(this).serialize(),
      type: $(e.target).attr('method'),
      success: function(data) {
        if(data === 0) {
          showAlert('Oops! Something is wrong. Please try again.', 'error');
        } else {
          console.log($(that).data('hide-on-success'));
          if($(that).data('hide-on-success')) { $($(that).data('hide-on-success')).hide(); }
          if($(that).data('success-message')) { 
            showAlert($(that).data('success-message'), $(that).data('success-status'));
          } else {
            showAlert('Your request has been processed successfully');
          }

          if(typeof ga != 'undefined') {
            ga('send', 'event', 'Account', 'Lead',$(e.target).parent().attr('data-location'));
          }
          if(typeof dataLayer != 'undefined') {
            dataLayer.push({
              'event': 'gaTriggerEvent',
              'gaEventCategory': 'account',
              'gaEventAction': 'optin',
              'gaEventLabel': $(e.target).parent().attr('data-location')
            });
          }
          if(typeof _ouibounce != 'undefined') {
            _ouibounce.disable();
          }

        }
      }
    });
  });
};

var buildCta = function(element, override) {
  var options = {
    'category':$(element).data('category'),
    'template':$(element).data('location'),
    'ctaId':$(element).data('cta-id')||false,
    'variation':$(element).data('variation') || 0,
    'callback':$(element).data('callback') || null
  };

  //todo: allow override options

  $.ajax({
    url: buildCtaUrl(options),
    dataType:'json',
    success: function(data) {
          tpl = $("#"+options.template).html();
          if(typeof(data[options.variation]) != 'undefined') {
            data[options.variation].action = "/?ACT=67";
            $(element).html( tmplProcess(tpl, data[options.variation]) );
            ajaxifyForms();
          } else {
            $(element).hide();
          }

          callback = window[options.callback];
          if(typeof callback  === 'function') {
            callback();
          }
    },
    error: function(data, error, errorthrown) {$(element).hide();}
  });
};

$(document).ready(function() {
  $('.cta').each( function(i,e) {
    buildCta(e);
  });
  ajaxifyForms();
});

