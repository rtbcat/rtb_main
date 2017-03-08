jQuery.noConflict();var error_reporting=false;jQuery.noConflict();function clearText(thefield){if(thefield.defaultValue==thefield.value){thefield.value="";}}
function fillText(thefield){if(thefield.value==''){thefield.value=thefield.defaultValue;}}
function enterPressed(e){if(e.keyCode==13){checkLogin()}}
function hideDiv(Div){jQuery(Div).hide();}
function showDiv(Div){jQuery(Div).show();}
function toggle(Div){jQuery(Div).toggle();}
function createCookie(name,value,days){jQuery('.ajax').load('/handlers/cookie_create.php?name='+name+'&value='+value+'&days='+days,function(response,status,xhr){console.log('cookie:'+status);});}
function createSession(name,value){jQuery('.ajax').load('/handlers/session_create.php?name='+name+'&value='+value,function(response,status,xhr){console.log('session:'+status);});}
function signupCheckout(tagId,listId,softroot)
{console.log('signup');var noticeText=encodeURIComponent('Redirecting to checkout');var formId='checkout';var email=encodeURIComponent(document.getElementById('email').value);jQuery('.notice').html('Working...');jQuery('.notice').show();if(typeof softroot==='undefined')
{jQuery('.notice').load('/handlers/optin.php?email='+email+'&tagId='+tagId+'&listId='+listId+'&noticeText='+noticeText+'&formId='+formId,function(){setTimeout(function(){jQuery('.notice').slideUp();},5000);});}
else if(softroot===false)
{jQuery('.notice').load('/handlers/optin.php?email='+email+'&tagId='+tagId+'&listId='+listId+'&noticeText='+noticeText+'&formId='+formId,function(){setTimeout(function(){jQuery('.notice').slideUp();},5000);});}
else
{jQuery('.notice').load('optin.php?email='+email+'&tagId='+tagId+'&listId='+listId+'&noticeText='+noticeText+'&formId='+formId,function(){setTimeout(function(){jQuery('.notice').slideUp();},5000);});}}
function signupCheckoutWithPhone(tagId,listId){console.log('signup');var noticeText=encodeURIComponent('Redirecting to checkout');var formId='checkout';var email=encodeURIComponent(document.getElementById('email').value);var phone=encodeURIComponent(document.getElementById('phone').value);jQuery('.notice').html('Working...');jQuery('.notice').show();jQuery('.notice').load('/handlers/optin_vsl_phone.php?email='+email+'&phone='+phone+'&tagId='+tagId+'&listId='+listId+'&noticeText='+noticeText+'&formId='+formId,function(){setTimeout(function(){jQuery('.notice').slideUp();},5000);});}
function signupReport(tagId,listId){var noticeText=encodeURIComponent('Report will be sent to your email');var email=encodeURIComponent(document.getElementById('email').value);jQuery('.notice').html('Working...');jQuery('.notice').show();jQuery('.notice').load('/handlers/optin.php?email='+email+'&tagId='+tagId+'&listId='+listId+'&noticeText='+noticeText,function(){setTimeout(function(){jQuery('.notice').slideUp();jQuery('#myModal').modal('hide');},5000);});}
jQuery(".CartAdd").click(function(){var sku=jQuery(this).attr('sku');var qty=jQuery(this).attr('qty');var price=jQuery(this).attr('price');var shipping=jQuery(this).attr('shipping');console.log("price="+price+" shipping="+shipping+" sku="+sku+" qty="+qty);jQuery.post("/handlers/cart_item.php",{sku:sku,qty:qty,price:price,shipping:shipping},function(response,status){console.log(response);console.log(status);if(status=='success'){var cartCount=(jQuery('#cartCount').html()*1);console.log(cartCount);jQuery('#cartCount').html(cartCount+ 1)}});});function ButtonChangeValues(NextUrl,ProductName,Sku,Price,Qty){var FunnelId=document.getElementById('funnelId').value
document.getElementById('productName').value=ProductName
document.getElementById('sku').value=Sku
document.getElementById('price').value=Price
document.getElementById('qty').value=Qty
document.getElementById('nextUrl').value='/news/'+FunnelId+'/'+NextUrl
OutLink();orderProcessUpsale()}
function ButtonChangeAll(NextUrl,ProductName,Sku,Price,Shipping,Qty,Subscription,Monthly){var FunnelId=document.getElementById('funnelId').value
document.getElementById('productName').value=ProductName
document.getElementById('sku').value=Sku
document.getElementById('price').value=Price
document.getElementById('qty').value=Qty
document.getElementById('shipping').value=Shipping
document.getElementById('subscription').value=subscription
document.getElementById('monthly').value=monthly
document.getElementById('nextUrl').value='/news/'+FunnelId+'/'+NextUrl
OutLink();orderProcessUpsale()}
function ButtonChange(What,NextUrl,ProductName,Sku,Price,Shipping,Qty,Subscription,Monthly){console.log('Change Buy Button');var FunnelId=document.getElementById('funnelId').value
document.getElementById('productName').value=ProductName
document.getElementById('sku').value=Sku
document.getElementById('price').value=Price
document.getElementById('qty').value=Qty
document.getElementById('shipping').value=Shipping
document.getElementById('subscription').value=Subscription
document.getElementById('monthly').value=Monthly
OutLink();if(What=='Front'){document.getElementById('nextUrl').value=NextUrl
checkout();}
if(What=='Upsell'){document.getElementById('nextUrl').value='/news/'+FunnelId+'/'+NextUrl
orderProcessUpsale();}}
function checkout(){document.forms["checkout"].submit();}
jQuery(document).ready(function(){setTimeout(function(){allowLeave=false;},1000);});var time;function checkTime(){time=jwplayer('VidePlayer7').getPosition();createCookie(cookieName,time,30);if(time>=showButton){jQuery('.greyBack').fadeOut('fast');jQuery('.buyButton').fadeIn('slow');jQuery('.hideit').fadeIn('slow');jQuery('.lowerData').fadeIn('slow')
createCookie('ReturnVisit','true',100)}else{setTimeout(function(){checkTime();},10000);}}
function recordTime(ip,domain,video,funnel){time=jwplayer('VidePlayer7').getPosition();state=jwplayer('VidePlayer7').getState();if(state=='playing'||state=='PLAYING'){jQuery('.data').load('/handlers/processor.php?file=video_track.php&ip='+ip+'&time='+time+'&domain='+domain+'&video='+video+'&funnel='+funnel,function(response,status,xhr){console.log('time tracked:'+xhr.status);});setTimeout(function(){recordTime(ip,domain,video,funnel);},5000);}}
function hideAll(){if(leftOff<showButton){jQuery('.buyButton').hide();jQuery('.hideit').hide();jQuery('.lowerData').hide();}else{jQuery('.buyButton').show();jQuery('.hideit').show();jQuery('.lowerData').show();}
if(leftOff==0){setTimeout(function(){jQuery('.greyBack').fadeIn(10000);},500);}}
function seekTo(time){console.log('seekTo: '+time);jwplayer('VidePlayer7').seek(time)}
function resumeVideo(){if(jumped==false){seekTo(leftOff);jumped=true;}}
function popitup(url,Width,Height){newwindow=window.open(url,'SocialMedia','height='+Height+',width='+Width);if(window.focus){newwindow.focus()}
return false;}
var popupGood=true;function openPopup(File,Width){if(popupGood){if(Width!=0){jQuery('.popupBorder').css("width",Width+"px")}
jQuery('.popup').load('./popups/'+File,function(response,status,xhr){jQuery('.popupFrame').show();});}}
function openFunnelPopup(File,Width){if(Width<100){jQuery('.popupBorder').css("width",Width+"%")}else{jQuery('.popupBorder').css("width",Width+"px")}
jQuery('.popup').load(File,function(response,status,xhr){jQuery('.popupFrame').show();});}
function openCustomPopup(File,Width){if(Width<100){jQuery('.popupBorder').css("width",Width+"%")}else{jQuery('.popupBorder').css("width",Width+"px")}
jQuery('.popup').load(File,function(response,status,xhr){jQuery('.popupFrame').show();});}
function PopWarning(){if(allowLeave==false){return exitText;}}
function openModal(File,softroot)
{if(typeof softroot==='undefined')
{jQuery('.modal').load('./popups/'+File,function(response,status,xhr)
{jQuery('#myModal').modal('toggle');});}
else if(softroot===false)
{jQuery('.modal').load('./popups/'+File,function(response,status,xhr)
{jQuery('#myModal').modal('toggle');});}
else
{jQuery('.modal').load('./popups/'+File,function(response,status,xhr)
{jQuery('#myModal').modal('toggle');});}}
var mobile=false;var exitFile='exit.php'
var allowLeave=false;var exitText='Wait!!!  Get The Digital Version For 50% Off!';function PopIt(){if(allowLeave==false){jQuery('.popupFrame').show();openPopup(exitFile,80);return exitText;}}
function PopItFunnel(){if(allowLeave==false){jQuery('.popupFrame').show();openFunnelPopup(exitFile,80);return exitText;}}
function PopItModal(){console.log('PopItModal '+ allowLeave)
if(allowLeave==false){openModal(exitFile);ga('send','pageview',{'page':exitFile,'title':exitFile,});return exitText;}}
function OutLink(){allowLeave=true}
function showAddon(){var add_sku=(document.getElementById('add_sku').value);if(add_sku!=''){jQuery('.addonDetails').slideDown();}}
var x='';var y='';jQuery(document).ready(function(){jQuery('.hp').click(function(e){x=e.pageX;y=e.pageY;var data=(jQuery(this).attr('helpfullContent'));jQuery('.helpfullContent').html(data);var width=jQuery('.helpfull').width();var height=jQuery('.helpfull').height();if(width>x){var left=width- x;}
if(width<=x){var left=x- width;}
if(left<20){left=25;}
if(height>y){var top=y- 25;}
if(height<=y){var top=y-(height);}
if(top<20){top=25;}
jQuery('.helpfull').css("left",left);jQuery('.helpfull').css("top",top);jQuery('.helpfull').show();});});function sendThereEmail(){var thereEmail=encodeURIComponent(document.getElementById('thereEmail').value);var thereMsg=encodeURIComponent(document.getElementById('thereMsg').value);jQuery('.thereNotice').load('/handlers/processor.php?file=email_send.php&thereEmail='+thereEmail+'&thereMsg='+thereMsg,function(response,status,xhr){jQuery('.thereNotice').show();});}
function setDigital(Sku){jQuery('.notice').html('Converting to Digital... One Moment.');jQuery('.notice').show();document.getElementById('sku').value=Sku;var ProductName=document.getElementById('productName').value+' (Digital) ';document.getElementById('productName').value=ProductName;jQuery('.dynamicName').html(ProductName);document.getElementById('shipping').value=0;jQuery('.Shipping').hide();jQuery('.InternationNotice').slideUp();setTimeout(function(){jQuery('.notice').hide();jQuery('.notice').html('<img src="https://cdn.primalhealthcrm.com/images/ajax-loader-3.gif" alt="loading" /><small> <b>Validating...</b></small>');},3000);}
function applyDiscount(){jQuery('.notice').hide();jQuery('.error').hide();var code=encodeURI(document.getElementById('couponCode').value);jQuery('.data').load('/handlers/processor.php?file=coupon_code.php&code='+code,function(response,status,xhr){var response=jQuery.parseJSON(response);if(response.error=='1'){jQuery('.error').html(response.message);jQuery('.error').show();jQuery('.notice').hide();document.getElementById('couponCode').value='Enter your coupon code';}else
if(response.success=='1'){jQuery('.notice').html(response.message);jQuery('.notice').slideDown();setTimeout(function(){jQuery('.notice').hide();jQuery('.notice').html('<img src="https://cdn.primalhealthcrm.com/images/ajax-loader-3.gif" alt="loading" /><small> <b>Validating...</b></small>');},5000);var discount=response.value
document.getElementById('discount').value=discount
setTotal();}})}
function checkLetters(e){var a=[];var k=e.which;for(i=48;i<58;i++)
a.push(i);if(!(a.indexOf(k)>=0))
e.preventDefault();}
var ship=0;function setShipAdd(){if(ship==0){ship=1;jQuery('.shippingData').show();document.getElementById('useShip').value=1;}else{ship=0
jQuery('.shippingData').hide();document.getElementById('useShip').value=0;}}
function changeCountry(pos){if(pos=='bill'){jQuery('#CityFrame').html('<input name="BillingCity" type="text" class="textField"  id="BillingCity"  value="Enter your city name" onfocus="clearText(this);" onblur="fillText(this);" />');document.getElementById('BillingState').value='Enter your state name';}else{jQuery('#s_CityFrame').html('<input name="ShippingCity" type="text" class="textField"  id="ShippingCity"  value="Enter your city name" onfocus="clearText(this);" onblur="fillText(this);" />');document.getElementById('ShippingState').value='Enter your state name';}
jQuery('.taxTotal').html('$0.00');document.getElementById('tax').value=0
if(document.getElementById('shipping').value>1){jQuery('.shippingTotal').html('$'+document.getElementById('shipping').value);}else{jQuery('.shippingTotal').html('$0.00');}
setTotal();}
var flatShipping='false'
function getShipping(pos){if(document.getElementById('shipping').value!=1&&flatShipping=='false'){if(document.getElementById('shipping').value>1){flatShipping=true;}
setTotal();}else{if(flatShipping=='false'){if(pos=='bill'){var country=encodeURI(document.getElementById('BillingCountry').value);}else{var country=encodeURI(document.getElementById('ShippingCountry').value);}
var Sku=document.getElementById('sku').value;var Qty=document.getElementById('qty').value;var AddonSku=document.getElementById('add_sku').value;var AddonQty=document.getElementById('add_qty').value;<!-- need to look at addon shipping
var addon=(document.getElementById('addon').value);if(addon==1){var shippingString='&Country='+country+'&Sku='+Sku+'&Qty='+Qty+'&AddonSku='+AddonSku+'&AddonQty='+AddonQty;}else{var shippingString='&Country='+country+'&Sku='+Sku+'&Qty='+Qty;}
jQuery('.data').load('/handlers/processor.php?file=shipping_cost_get.php'+shippingString,function(response,status,xhr){if(error_reporting){alert(response);}
var response=jQuery.parseJSON(response);if(response.error!=null){jQuery('.error').html(response.message);jQuery('.error').show();jQuery('.notice').hide();}else
if(response.success=='1'){var shipping=response.message;document.getElementById('shipping').value=shipping;if(shipping==0){jQuery('.shippingTotal').html('$0.00');jQuery('.Shipping').hide();}else{jQuery('.Shipping').show();jQuery('.shippingTotal').html('$'+document.getElementById('shipping').value);}
setTotal()}});}}}
function getTax(){var state=document.getElementById('BillingState').value.toUpperCase();var rate=0;if(state=='TX'){rate=0.0825;}
document.getElementById('taxRate').value=rate;setTotal();}
function getCity(pos){if(pos=='bill'){var country=document.getElementById('BillingCountry').value;var postalCode=document.getElementById('BillingZip').value;}else{var country=document.getElementById('ShippingCountry').value;var postalCode=document.getElementById('ShippingZip').value;}
if(country=='United States'||country=='US'){jQuery('.data').load('/handlers/processor.php?file=shipping_get_state.php&Zip='+postalCode+'&pos='+pos,function(response,status,xhr){if(error_reporting){alert(response);}
var response=jQuery.parseJSON(response);if(response.error=='1'){jQuery('.error').html(response.message);jQuery('.error').show();jQuery('.notice').hide();}else
if(response.success=='1'){var cityHtml=response.city;var cityHtml=response.city;var state=response.state;if(pos=='bill'){jQuery('#CityFrame').html(cityHtml);document.getElementById('BillingState').value=state;getTax()}else{jQuery('#s_CityFrame').html(cityHtml);document.getElementById('ShippingState').value=state;}}});}}
function setTotal(){var price=(document.getElementById('price').value*document.getElementById('qty').value)*1;var taxRate=(document.getElementById('taxRate').value)*1;var shipping=(document.getElementById('shipping').value)*1;var discount=((document.getElementById('discount').value)*1).toFixed(2);var addon=(document.getElementById('addon').value);if(addon==1){var addonPrice=((document.getElementById('add_price').value*document.getElementById('add_qty').value))*1;}else{var addonPrice=0;}
if(discount>0){jQuery('.Discount').show();jQuery('.discountTotal').html('-$'+discount);}
var tax=((price+addonPrice-discount)*taxRate).toFixed(2)*1;document.getElementById('tax').value=tax
jQuery('.taxTotal').html('$'+tax);var total=(price+shipping+addonPrice-discount+tax).toFixed(2);document.getElementById('total').value=total;jQuery('.theTotal').html('$'+total);}
function changeCard(){var cardType=document.getElementById('cardType').value
if(cardType=='American Express'){jQuery('#cvcImage').attr('src','https://cdn.primalhealthcrm.com/images/cvv.png');}else{jQuery('#cvcImage').attr('src','https://cdn.primalhealthcrm.com/images/cvc.png');}
if(cardType=='Check'){jQuery('.checkInfo').show();document.getElementById('cardType').value='0';}}
function addProduct(){var addon=document.getElementById('addon').value;if(addon==1){document.getElementById('addon').value=0;jQuery('#addonCheck').attr('src','https://cdn.primalhealthcrm.com/images/addonEmpty.png');jQuery('.addonProductName').hide();}else{document.getElementById('addon').value=1;jQuery('#addonCheck').attr('src','https://cdn.primalhealthcrm.com/images/addonChecked.png');jQuery('.addonProductName').show();}
getShipping('bill')}
function orderProcessUpsale(){console.log('Upsell Process 2');jQuery('.notice').slideDown();jQuery('.error').slideUp();console.log(jQuery("#upsale").serialize());jQuery.post('/handlers/processor.php',jQuery("#upsale").serialize(),'',"json").done(function(response){if(error_reporting){alert(response);}
console.log('response is '+ JSON.stringify(response));console.log('Twilight Zone');if(response.error=='1'){jQuery('.error').html(response.message);jQuery('.error').show();jQuery('.notice').hide();if(response.nextUrl!=null){setTimeout(function(){window.location=response.nextUrl;},2000);}}else
if(response.success=='1'){window.location=response.message;}}).error(function(error){console.log(JSON.stringify(error)+" error in .error()");});}
function orderProcess1Click(){jQuery('.notice').slideDown();jQuery('.error').slideUp();jQuery.post('/handlers/processor.php',jQuery("#1click").serialize()).done(function(response){if(error_reporting){alert(response);}
var response=jQuery.parseJSON(response);if(response.error=='1'){jQuery('.error').html(response.message);jQuery('.error').show();jQuery('.notice').hide();if(response.nextUrl!=null){setTimeout(function(){window.location=response.nextUrl;},2000);}}else
if(response.success=='1'){window.location=response.message;}});}
var checkbox=true;var orderClicked=false;function orderProcess(){if(orderClicked==false){orderClicked=true;if(checkbox==false){var response=confirm("I want to be part of the 7 Day Challenge and I agree to the following payment terms:  An initial payment of 1.00 today, and recurring payments of $19.99 per month. I understand that I can cancel at any time.");}else{response=true;}
if(response==true){checkbox=true
jQuery('.notice').slideDown();jQuery('.error').slideUp();jQuery.post('/handlers/processor.php',jQuery("#orderform").serialize()).done(function(response){console.log(response);var response=jQuery.parseJSON(response);if(response.error=='1'){orderClicked=false;jQuery('.error').html(response.message);jQuery('.error').show();jQuery('.notice').hide();if(response.nextUrl!=null){setTimeout(function(){window.location=response.nextUrl;},2000);}}else
if(response.success=='1'){window.location=response.message;}});}}else{alert('Stop clicking the buy button, you will be charged twiced.');}}
function submitForm(FormId){jQuery('.error').hide();jQuery('.notice').html('<img src="https://cdn.primalhealthcrm.com/images/ajax-loader-3.gif" /> Processing...');jQuery('.notice').show();var handler=document.getElementById(FormId).action;setTimeout(function(){jQuery.post(handler,jQuery("#"+FormId).serialize()).done(function(response){if(error_reporting){alert(response);}
var response=jQuery.parseJSON(response);if(response.error=='1'){jQuery('.error').html(response.message);jQuery('.error').show();jQuery('.notice').hide();}else
if(response.success=='1'){jQuery('.notice').html(response.message);if(response.session!=null){var name=response.session[0];var value=response.session[1];createSession(name,value);if(response.session[2]!=null){var name=response.session[2];var value=response.session[3];createSession(name,value);}
if(response.session[3]!=null){var name=response.session[3];var value=response.session[4];createSession(name,value);}}
if(response.cookie!=null){var name=response.session[0];var value=response.session[1];var days=response.session[2];createCookie(name,value,days)
if(response.session[3]!=null){var name=response.session[3];var value=response.session[4];var days=response.session[5];createCookie(name,value,days)}}
if(response.nextUrl!=null){setTimeout(function(){window.location=response.nextUrl;},2000);}
setTimeout(function(){jQuery('.notice').slideUp();},5000);}});},500);}