jQuery.noConflict();

var survey_answer = '';
function surveyEndFunction(){
	alert('function called, about to redirect '+survey_answer );
	setTimeout(function() {  
			window.location = "http://bloodpressuresolution.com/news/";
	}, 1500);
}

function clearText(thefield){
	if (thefield.defaultValue==thefield.value){
		thefield.value = "";
	}
} 

function fillText(thefield){
	if(thefield.value == ''){
		thefield.value = thefield.defaultValue;
	}
}

function enterPressed(e) {
    if (e.keyCode == 13) {
      	checkLogin()
    }
} 


function setCookie(){
	jQuery('.cookie').load('/handlers/setCookie.php', function(response, status, xhr) {
	});
}

/* FORM SUBMIT 
-------------------------------------- */
function checkLogin(Var){
	console.log('chekcing login');
	jQuery('.loginNotice').slideDown();
	jQuery('.error').slideUp();
	
	var email = encodeURIComponent(document.getElementById('user').value);
	var pass = encodeURIComponent(document.getElementById('pass').value);
	
	if ( jQuery("#keep").attr('checked') ){
		var keep = 'yes';
	} else {
		var keep = 'no';
	}
	
	
	setTimeout(function() {  
	jQuery('.error').load('/handlers/do_login.php?email='+email+'&pass='+pass+'&keep='+keep, function(response, status, xhr) {
		console.log(xhr.status + " " + xhr.statusText+' '+xhr.response);
		//alert(xhr.status + " " + xhr.statusText+xhr.response);
		jQuery('.loginNotice').slideUp();
		//jQuery('.error').show();

	});
	}, 500);
	
	
}


function saveSettings(){
	var id = encodeURIComponent(document.getElementById('id').value);
	var fname = encodeURIComponent(document.getElementById('fname').value);
	var lname = encodeURIComponent(document.getElementById('lname').value);
	var email = encodeURIComponent(document.getElementById('email').value);
	var pass = encodeURIComponent(document.getElementById('pass').value);
	
	var street1 = encodeURIComponent(document.getElementById('street1').value);
	var street2 = encodeURIComponent(document.getElementById('street2').value);
	var city = encodeURIComponent(document.getElementById('city').value);
	var state = encodeURIComponent(document.getElementById('state').value);
	var zip = encodeURIComponent(document.getElementById('zip').value);
	var country = encodeURIComponent(document.getElementById('country').value);
	
	jQuery('.settingsNotice').show();
	jQuery('.settingsNotice').load('/handlers/saveProfile.php?fname='+fname+'&lname='+lname+'&email='+email+'&pass='+pass+'&street1='+street1+'&street2='+street2+'&city='+city+'&state='+state+'&zip='+zip+'&country='+country+'&id='+id, function() {
		setTimeout(function() { jQuery('.settingsNotice').slideUp(); }, 5000);
	});
	
}


function sendPassword(){
	var email = encodeURIComponent(document.getElementById('email').value);
	jQuery('.pss_notice').load('/handlers/do_sendPass.php?email='+email, function() {
		jQuery('.pss_notice').show();
		setTimeout(function() { jQuery('.pss_notice').slideUp(); }, 5000);
	});
	
}

function sendWelcome(){
	var email = encodeURIComponent(document.getElementById('email').value);
	jQuery('.pss_notice').load('/handlers/do_sendWelcome.php?email='+email, function() {
		jQuery('.pss_notice').show();
		setTimeout(function() { jQuery('.pss_notice').slideUp(); }, 5000);
	});
	
}

function becomeAffiliate(){
	var email = encodeURIComponent(document.getElementById('email').value);
	jQuery('.notice').show();
	jQuery('.notice').load('/handlers/becomeAffiliate.php?email='+email, function() {
		//setTimeout(function() { jQuery('.notice').slideUp(); }, 5000);
	});
}

function completeAffiliate(){
	
	var id = encodeURIComponent(document.getElementById('id').value);
	var pass = encodeURIComponent(document.getElementById('pass').value);
	var clickbank = encodeURIComponent(document.getElementById('clickbank').value);
	var fname = encodeURIComponent(document.getElementById('fname').value);
	var lname = encodeURIComponent(document.getElementById('lname').value);
	jQuery('.notice').show();
	jQuery('.notice').load('/handlers/activateAffiliate.php?clickbank='+clickbank+'&pass='+pass+'&fname='+fname+'&lname='+lname+'&id='+id, function() {
		setTimeout(function() { jQuery('.notice').slideUp(); resetNotice(); }, 4000);
	});
}

function resetNotice(){
	setTimeout(function() {  
		jQuery('.notice').html('<img src="/images/ajax-loader-3.gif" alt="loading" style="position:relative; top:3px;" /><small> <b>Validating...</b></small>')
	}, 1000);
}




/* CART FUNCTIONS 
-------------------------------------- */

function setPayPal(Value){
	if(Value == 1){
		jQuery('.paypalImage').attr('src', '/images/paypal.png');
		jQuery('.visaImage').attr('src', '/images/visa_grey.png');
		jQuery('.cardInfo').slideUp();
		document.getElementById('cardType').value = 'Visa'
	} else 
	if(Value == 0){
		jQuery('.paypalImage').attr('src', '/images/paypal_grey.png');
		jQuery('.visaImage').attr('src', '/images/visa.png');
		jQuery('.cardInfo').slideDown();
	}
	document.getElementById('paypalFlag').value = Value
	
}

function checkCardType(){
	var Value = document.getElementById('cardType').value;
	if(Value == 'PayPal'){
		setPayPal(1)
	}
}

function processOrder(){
	
	window.scrollTo(0, 0);
	jQuery('.notice').slideDown();
	jQuery('.error').slideUp();
	
	setTimeout(function() {  
		var productName = encodeURIComponent(document.getElementById('productName').value);
		var productId = encodeURIComponent(document.getElementById('productId').value);
		var price = encodeURIComponent(document.getElementById('price').value);
		var discount = encodeURIComponent(document.getElementById('discount').value);
		
		var email = encodeURIComponent(document.getElementById('email').value);
		var fname = encodeURIComponent(document.getElementById('fname').value);
		var lname = encodeURIComponent(document.getElementById('lname').value);
		var phone = encodeURIComponent(document.getElementById('phone').value);
		
		var street1 = encodeURIComponent(document.getElementById('street1').value);
		var street2 = encodeURIComponent(document.getElementById('street2').value);
		var city = encodeURIComponent(document.getElementById('city').value);
		var state = encodeURIComponent(document.getElementById('state').value);
		var region = encodeURIComponent(document.getElementById('region').value);
		var postalCode = encodeURIComponent(document.getElementById('postalCode').value);
		var country = encodeURIComponent(document.getElementById('country').value);
		
		var s_street1 = encodeURIComponent(document.getElementById('s_street1').value);
		var s_street2 = encodeURIComponent(document.getElementById('s_street2').value);
		var s_city = encodeURIComponent(document.getElementById('s_city').value);
		var s_state = encodeURIComponent(document.getElementById('s_state').value);
		var s_region = encodeURIComponent(document.getElementById('s_region').value);
		var s_postalCode = encodeURIComponent(document.getElementById('s_postalCode').value);
		var s_country = encodeURIComponent(document.getElementById('s_country').value);
		var useShip = encodeURIComponent(document.getElementById('useShip').value);
		
		var cardType = encodeURIComponent(document.getElementById('cardType').value);
		var cardNumber = encodeURIComponent(document.getElementById('cardNumber').value);
		var expMonth = encodeURIComponent(document.getElementById('expMonth').value);
		var expYear = encodeURIComponent(document.getElementById('expYear').value);
		var cvCode = encodeURIComponent(document.getElementById('cvCode').value);
		
		var payments = encodeURIComponent(document.getElementById('payments').value);
		var paypal = encodeURIComponent(document.getElementById('paypalFlag').value);
		
		var tax = encodeURIComponent(document.getElementById('tax').value);
		var shipping = encodeURIComponent(document.getElementById('shipping').value);
		var gateway = encodeURIComponent(document.getElementById('gateway').value);
		var nextUrl = encodeURIComponent(document.getElementById('nextUrl').value);
		var sku = encodeURIComponent(document.getElementById('sku').value);
		
		
		
		jQuery('.error').load( '/handlers/process_order_form.php?email='+email+'&fname='+fname+'&lname='+lname+'&street1='+street1+'&street2='+street2+'&city='+city+'&state='+state+'&postalCode='+postalCode+'&country='+country+'&cardType='+cardType+'&cardNumber='+cardNumber+'&expMonth='+expMonth+'&expYear='+expYear+'&cvCode='+cvCode+'&productName='+productName+'&productId='+productId+'&price='+price+'&payments='+payments+'&paypal='+paypal+'&s_street1='+s_street1+'&s_street2='+s_street2+'&s_city='+s_city+'&s_state='+s_state+'&s_postalCode='+s_postalCode+'&s_country='+s_country+'&useShip='+useShip+'&phone='+phone+'&shipping='+shipping+'&tax='+tax+'&gateway='+gateway+'&nextUrl='+nextUrl+'&sku='+sku+'&discount='+discount+'&region='+region+'&s_region='+s_region, function(response, status, xhr) {
			jQuery('.notice').slideUp();
			
			//jQuery('.error').slideDown();
			//alert(xhr.status + " " + xhr.statusText);
		});
	
	}, 500);
}


function process1Click(){ 
	
	//window.scrollTo(0,0);
	jQuery('.notice').slideDown();
	jQuery('.error').slideUp();
	
	setTimeout(function() {  
		var productId = encodeURIComponent(document.getElementById('productId').value);
		var price = encodeURIComponent(document.getElementById('price').value);
		var subscription = encodeURIComponent(document.getElementById('subscription').value);
		var sku = encodeURIComponent(document.getElementById('sku').value);
		var payments = encodeURIComponent(document.getElementById('payments').value);
		var nextUrl = encodeURIComponent(document.getElementById('nextUrl').value);		
		
		jQuery('.error').load( '/handlers/process_instant_upsell.php?productId='+productId+'&price='+price+'&payments='+payments+'&nextUrl='+nextUrl+'&sku='+sku+'&subscription='+subscription, function(response, status, xhr) {
			jQuery('.notice').slideUp();
			//jQuery('.error').slideDown();
			//alert(xhr.status + " " + xhr.statusText);
		});
	
	}, 500);
}


function chargeCardOnFile(){
	
	jQuery('.notice').slideDown();
	jQuery('.error').slideUp();
	
	jQuery.post('/handlers/process_instant_sale.php', jQuery("#1click").serialize())
		.done(function(response) {
			//alert(response);
			var response = jQuery.parseJSON(response);
			if(response.data == 'success'){
				jQuery('.notice').html(response.message);
				
				if(response.action == 'none'){
					setTimeout(function() { 
						jQuery('.notice').slideUp();
					}, 5000);
				} else 
				
				if(response.action != 'undefined'){
					setTimeout(function() { 
						window.location = response.action;
					}, 1000);
				}
				
				
			} else { 
				jQuery('.notice').slideUp();
				jQuery('.error').html(response.message);
				jQuery('.error').slideDown();
				
				setTimeout(function() { 
					jQuery('.error').slideUp();
				}, 3000);
			}
		}
	);
}


/* Body Fat Calculator
-------------------------------------- */
function changeGender(){
	var gender = document.getElementById('gender').value;
	if(gender == 'male'){
		jQuery('.male').show();
		jQuery('.female').hide();
	} else {
		jQuery('.female').show();
		jQuery('.male').hide();
	}
}
function calculateFat(){
	var gender = document.getElementById('gender').value;
	var height = document.getElementById('height').value;
	var neck = document.getElementById('neck').value;
	var abdominal = document.getElementById('abdominal').value;
	var waste = document.getElementById('waste').value;
	var hip = document.getElementById('hip').value;
	
	jQuery('.notice').load( '/handlers/calculateFat.php?gender='+gender+'&height='+height+'&height='+height+'&neck='+neck+'&abdominal='+abdominal+'&waste='+waste+'&hip='+hip, function(response, status, xhr) {
		//alert(root+'templates/'+File+' '+xhr.status + " " + xhr.statusText+xhr.response);
		jQuery('.notice').show();
	});
}



function saveEntry(){
	var t = encodeURIComponent(document.getElementById('t').value);
	var s = encodeURIComponent(document.getElementById('s').value);
	var d = encodeURIComponent(document.getElementById('d').value);
	var p = encodeURIComponent(document.getElementById('p').value);
	
	jQuery('.notice').load('/handlers/add_bps.php?t='+t+'&s='+s+'&d='+d+'&p='+p, function(response, status, xhr) {
		//alert(xhr.status + " " + xhr.statusText + " " + xhr.response);
		jQuery('.notice').show();
	});

}

function deleteEntry(tracker_id){
	var response = confirm("Are you sure you want to delete that!");
	if (response == true) {
		jQuery('.notice').load('/handlers/delete_bps.php?tracker_id='+tracker_id, function(response, status, xhr) {
			jQuery('.notice').show();
		});
	}
}



/* EXIT POP
-------------------------------------- */
var mobile = false;
var exitFile = 'exit.php'
var allowLeave = true;
var exitText = 'Wait!!!  Get The Digital Version For 50% Off!';
function PopIt() { 
	
	if(allowLeave == false){
		jQuery('.popupFrame').show();
		openPopup( exitFile, 800);
		return  exitText;
	}
}

function OutLink(){
	allowLeave = true
}
	



 

/* POPUP RELATED  
-------------------------------------- */
function openPopup(File, Width){
	jQuery('.popupBorder').css("width", Width+"px")
	jQuery('.popup').load( '/templates/'+File, function(response, status, xhr) {
		//alert('http://bloodpressuresolution.com/templates/'+File+' '+xhr.status + " " + xhr.statusText+xhr.response);
		jQuery('.popupFrame').show(); 

	});
}

function closeDiv(Div){
	jQuery(Div).hide();
	jQuery('.popup').load('/templates/'+exitFile, function(response, status, xhr) {});
}

function showDiv(Div){
	jQuery(Div).show();
}



/* JWPLAYER RELATED  
-------------------------------------- */

// you must definethese vairables
// on the vsl page, before including this script
// leftOff = get from the vsl cookie value
// showButton = the time the button will appear
// jump = a true or flase depending on if they are a new visit
// cookieName = a true or flase depending on if they are a new visit

// remember to look for the cookie of the same name



function checkTime(){
	var time = jwplayer('VidePlayer7').getPosition()
	createCookie(cookieName, time, 30);
	
	if(time >= showButton){
		jQuery('.greyBack').fadeOut('fast'); 
		jQuery('.buyButton').fadeIn('slow'); 
		jQuery('.hideit').fadeIn('slow');
		jQuery('.lowerData').fadeIn('slow')
		
		setCookie();
	} else {
		setTimeout(function() { checkTime(); }, 10000);	
	}
}


function hideAll(){
	if(leftOff < showButton){
		jQuery('.buyButton').hide();
		jQuery('.hideit').hide();
		jQuery('.lowerData').hide(); 
	} else {
		jQuery('.buyButton').show();
		jQuery('.hideit').show();
		jQuery('.lowerData').show(); 
	}
	
	if(leftOff == 0){
		// start the grey
		setTimeout(function() { jQuery('.greyBack').fadeIn(10000); }, 500);
	}
}

function seekTo(time){
	jwplayer('VidePlayer7').seek(time)
}


function resumeVideo(){
	if(jumped == false){
		seekTo(leftOff);
		jumped = true;
	}
}

function createCookie(name, value, days){
	jQuery('.cookie').load('/handlers/cookie-create.php?name='+name+'&value='+value+'&days='+days, function(response, status, xhr) {
	});
}



