!function(r){"use strict";var a=!1,i=function(r){var a=r.find("input[type=email]"),i=!0;if(a.length>0){var o=r.find('label[for="'+a[0].id+'"]').removeClass("field_with_errors");/.+@.+\..{2,}/i.test(a.val())||(o.addClass("field_with_errors"),i=!1)}return i},o=function(a,i){var o=a.querySelector('[name="landing[zip_code]"]').value,e=r(a).data("popunder-domain")||location.protocol+"//"+location.host,n="quick";a.target=n,setTimeout(function(){var r=window.open("",n),a=(r?"/exits?&path=0&zip_code=":"/auto_policies?zip_code=")+o;window.location.href=e+a},i)},e=function(){var e=this,n=r(e),t=!0;return n.find(".error, .field_with_errors").removeClass("error field_with_errors"),a&&0==i(n)&&(t=!1),r.ajax({url:"/validators/landing_validator",data:n.serialize(),async:!1,success:function(r){if("fail"==r.status){t=!1;for(var a in r.errors)if(r.errors.hasOwnProperty(a)){var i=n.find(":input[name*="+a+"]").not("[type=hidden]").addClass("error");n.find('[for="'+(i.data("error-label")||i[0].id)+'"]').addClass("field_with_errors")}"function"==typeof window.landingFormErrorCallback&&window.landingFormErrorCallback()}}}),t&&r(e).data("form-popunder")===!0&&o(e,n.data("popunder-timeout")),t};r(function(){var i=r("[data-form-type=landing]");a=i.data("validate-email"),i.on("submit",e),r("#states").on("change",function(){var a=r(this).val().toLowerCase().replace(/ /gi,"-"),i=a+"/auto-insurance";return a&&(window.location.pathname=i),!1})})}(jQuery);