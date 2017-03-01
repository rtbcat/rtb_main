function ProspectSubmit(){
$('#kform').submit(false);
	var errors = [];
	$('.required').each(function() {
	    var $this = $(this);
	    if(!$this.val()) { 
	    	if(errors.length == 0) { errors.push("<b>Please fix the following errors..</b><br /><br />"); }
	    	$this.addClass('has-error');  
	    	errors.push($this.attr("data-error-message"));
	    }else{
	    	$this.removeClass('has-error');  
	    	if($this.attr("data-validate") == 'email') {
	    		if(!validate_email($this.val())) {
	    			if(errors.length == 0) { errors.push("<b>Please fix the following errors..</b><br /><br />"); }
	    			errors.push("Email address is not valid");
	    			$this.addClass('has-error');  
	    		}
	    	}
	    	if($this.attr("data-validate") == 'phone') {
	    		if(!validate_phone($this.val())) {
	    			if(errors.length == 0) { errors.push("<b>Please fix the following errors..</b><br /><br />"); }
	    			errors.push("Phone number is not valid");
	    			$this.addClass('has-error');  
	    		}
	    	}
	    }
	});
	if(errors.length) { 
		error_handler(errors);
		return false;
	}else{
		$('#loading-indicator').show();
		//alert(1);
		document.getElementById("kform").submit();
		return true;	
	} 
	
	e.preventDefault(); 
}

function SubmitUpsellForm(){ 
$('#upsell_form').submit(false);
var errors = [];
	$('.required').each(function() {
	    var $this = $(this);
	    if(!$this.val()) { 
	    	if(errors.length == 0) { errors.push("<b>Please fix the following errors..</b><br /><br />"); }
	    	$this.addClass('has-error');  
	    	errors.push($this.attr("data-error-message"));
	    }else{
	    	$this.removeClass('has-error');  
	    	if($this.attr("data-validate") == 'email') {
	    		if(!validate_email($this.val())) {
	    			if(errors.length == 0) { errors.push("<b>Please fix the following errors..</b><br /><br />"); }
	    			errors.push("Email address is not valid");
	    			$this.addClass('has-error');  
	    		}
	    	}
	    	if($this.attr("data-validate") == 'phone') {
	    		if(!validate_phone($this.val())) {
	    			if(errors.length == 0) { errors.push("<b>Please fix the following errors..</b><br /><br />"); }
	    			errors.push("Phone number is not valid");
	    			$this.addClass('has-error');  
	    		}
	    	}
	    }
	});
	if(errors.length) { 
		error_handler(errors);
		return false;
	}else{
		$('#loading-indicator').show();
		 jQuery.ajax({
				type:'POST', 
				url: 'lib/new_order_trial.php', 
				data:jQuery('#upsell_form').serialize(), 
				success: function(response) {
                  var res = response.split("|");  
                  if( res[0]=='success' ) { 
                      window.onbeforeunload = null;
                      window.location.href = 'thankyou.php'+res[1]+'&upsell=yes';
                  } 
                  else {   
				  	 jQuery('#loading-indicator').hide(); 
					 errors.push(res[1]);
					 error_handler(errors); 
                  }
            }});
            return false;
	}
	e.preventDefault(); 
	  
}

function SubmitCheckoutForm(){ 
$('#kform_checkout').submit(false);
var errors = [];
	$('.required').each(function() {
	    var $this = $(this);
	    if(!$this.val()) { 
	    	if(errors.length == 0) { errors.push("<b>Please fix the following errors..</b><br /><br />"); }
	    	$this.addClass('has-error');  
	    	errors.push($this.attr("data-error-message"));
	    }else{
	    	$this.removeClass('has-error');  
	    	if($this.attr("data-validate") == 'email') {
	    		if(!validate_email($this.val())) {
	    			if(errors.length == 0) { errors.push("<b>Please fix the following errors..</b><br /><br />"); }
	    			errors.push("Email address is not valid");
	    			$this.addClass('has-error');  
	    		}
	    	}
	    	if($this.attr("data-validate") == 'phone') {
	    		if(!validate_phone($this.val())) {
	    			if(errors.length == 0) { errors.push("<b>Please fix the following errors..</b><br /><br />"); }
	    			errors.push("Phone number is not valid");
	    			$this.addClass('has-error');  
	    		}
	    	}
	    }
	});
	if(errors.length) { 
		error_handler(errors);
		return false;
	}else{
		$('#loading-indicator').show();
		 jQuery.ajax({
				type:'POST', 
				url: 'lib/new_order_trial.php', 
				data:jQuery('#kform_checkout').serialize(), 
				success: function(response) {
                  var res = response.split("|");  
                  if( res[0]=='success' ) { 
                      window.onbeforeunload = null;
                      window.location.href = 'upsell1.php'+res[1];
                  } 
                  else {   
				  	 jQuery('#loading-indicator').hide(); 
					 errors.push(res[1]);
					 error_handler(errors); 
                  }
            }});
            return false;
	}
	e.preventDefault(); 
	  
}


 
$(function() {
	 
	$("input:checkbox[name=billShipSame]").click(function(){
		if($(this).val()=='0'){
			$('#kform_hiddenAddress').css('display','none');
			$('#billingSameAsShipping').val('yes');
			$("#kform_hiddenAddress :input").removeClass("required");
			$(this).val(1)
			}
		else{
			$('#kform_hiddenAddress').css('display','block');
			$("#kform_hiddenAddress :input").addClass("required");
			$("#billing_street_address2").removeClass("required");
			$('#billingSameAsShipping').val('no');	
			$(this).val(0)			
		}
	});
	
	if($('.required').length) { 
		$('.required').bind('blur', function() {
		    var $this = $(this);
		    if(!$this.val()) { 
		    	$this.addClass('has-error'); 
		    }else{
		    	$this.removeClass('has-error');  
		    }
		});
	}
	$(window).keydown(function(e) {
		if (e.which === 27 && $('#error_handler_overlay').length) {
			$('#error_handler_overlay').remove();
		}
	});
	$(window).keydown(function(e) {
		if (e.which === 27 && $('#app_common_modal').length) {
			$('#app_common_modal').remove();
		}
	});
	$(document).off('click', '#error_handler_overlay');
	$(document).on('click', '#error_handler_overlay', function() {
		$(this).remove();
	});

	$(document).off('click', '#error_handler_overlay_close');
	$(document).on('click', '#error_handler_overlay_close', function() {
		$('#error_handler_overlay').remove();
	});
    $(document).off('click', '#app_common_modal_close');
    $(document).on('click', '#app_common_modal_close', function () {
        $('#app_common_modal').remove();
    });
	
});
function validate_email(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validate_phone(phone) { 
	var re = /^\d{10}$/;
	return re.test(phone);
}
function error_handler(errors) {
	if ($('#error_handler_overlay').length) {
		$('#error_handler_overlay').remove();
	}
	$('body').append(get_ui(errors));
	$('#error_handler_overlay').fadeIn(500);
}
function get_ui(errors) {
	var li = '';
	$.each(errors, function(key, value) {
		li += '<li>' + value + '</li>';
	});
	var html = '';
	html += '<div id="error_handler_overlay">';
	html += '<div class="error_handler_body"><a href="javascript:void(0);" id="error_handler_overlay_close">X</a><ul>' + li + '</ul></div>';
	html += '</div>';

	return html;
}
function openNewWindow(page_url, type, window_name, width, height, top, left, features) {
    if(!type) { type = 'popup'; }
    if(!width) { width = 480; }
    if(!height) { height = 480; }
    if(!top) { top = 50; }
    if(!left) { left = 50; }
    if(!features) { features = 'resizable,scrollbars'; }
    if(type == 'popup') {
        var settings = 'height=' + height + ',';
        settings += 'width=' + width + ',';
        settings += 'top=' + top + ',';
        settings += 'left=' + left + ',';
        settings += features;
        win = window.open(page_url, window_name, settings);
        win.window.focus();
    } else if (type == 'modal') {
        var html = '';
        html += '<div id="app_common_modal">';
        html += '<div class="app_modal_body"><a href="javascript:void(0);" id="app_common_modal_close">X</a><iframe src="' + page_url + '" frameborder="0"></iframe></div>';
        html += '</div>';
        if (!$('#app_common_modal').length) {
            $('body').append(html);
        }
        $('#app_common_modal').fadeIn();
    }
}
function onlyNumbers(e,type) {
	   var keynum;
	   var keychar;
	   var numcheck;
	   if(window.event) {
	      keynum = e.keyCode;
	   } else if(e.which) {
	      keynum = e.which;
	   }
	   keychar = String.fromCharCode(keynum);
	   numcheck = /\d/;

	   switch (keynum)
	   {
	      case 8:    //backspace
	      case 9:    //tab
	      case 35:   //end
	      case 36:   //home
	      case 37:   //left arrow
	      case 38:   //right arrow
	      case 39:   //insert
	      case 45:   //delete
	      case 46:   //0
	      case 48:   //1
	      case 49:   //2
	      case 50:   //3
	      case 51:   //4
	      case 52:   //5
	      case 54:   //6
	      case 55:   //7
	      case 56:   //8
	      case 57:   //9
	      case 96:   //0
	      case 97:   //1
	      case 98:   //2
	      case 99:   //3
	      case 100:  //4
	      case 101:  //5
	      case 102:  //6
	      case 103:  //7
	      case 104:  //8
	      case 105:  //9
	         result2 = true;
	         break;
	      case 109: // dash -
	         if (type == 'phone')
	         {
	            result2 = true;
	         }
	         else
	         {
	         result2 = false;
	         }
	      break;
	      default:
	         result2 = numcheck.test(keychar);
	         break;
	   }

	   return result2;
}


width = screen.width;
height=screen.height;
document.cookie="screen_resolution="+width+"X"+height;