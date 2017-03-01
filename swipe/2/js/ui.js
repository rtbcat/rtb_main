// timeout function
// after 31 Minutes, display session expired screen.
// after 28 Minutes, display pop up warning screen.
idleTime = 0;
ii = 0;
timeDifference = 0;
//timeInterval 1 Minutes
timeInterval = 60000; 
// set idle interval
var idleInterval;
var warning = false;
//read time stamp from Cookie
var cookieName = "ACR_COOKIE";
var MAX_IDLE_TIME = 30;
var IDLE_TIME_WARNING = 28;
readCookie(cookieName);
idleInterval = setInterval("timerIncrement()", timeInterval); 
$(document).ready(function() {
	startInterval = function() {
	    //Zero the idle timer on mouse movement.
	    $(this).mousemove(function(e) {
	 //       idleTime = 0;
	    });
	    $(this).keypress(function(e) {
	 //       idleTime = 0;
	    });			
	}
	startInterval();
})
function timerIncrement() {		
	idleTime = idleTime + 1;
	ii++;
	// close windows after 31 Mins.
	if (idleTime==MAX_IDLE_TIME){		
		readCookie(cookieName);
		idleTime = 0;
		if (timeDifference > timeInterval*(MAX_IDLE_TIME-1)){
	//		closeWindows();
			
			window.location='/sessionExpired.action';
			// disable cookie	
			createCookie(cookieName,"",-1);	
		}
	} else {
		// display pop up windows after 28 Mins
		if (idleTime==IDLE_TIME_WARNING){
			readCookie(cookieName);
			if (timeDifference>timeInterval*(IDLE_TIME_WARNING-1)){
				var r=confirm("For security reasons, your session will soon expire due to inactivity.\r\n Would you like to continue this session?");
				if (r==true){		
					// refresh screen	
					idleTime = 0;
					continueSession();
					// rewrite Cookie
					//		mins = 31;
					//	   	setCookie('expires', now, mins);
				}		
			}	
		}
	}
 }
 function continueSession() {     
    warning=false;
	location.reload(true); 
//	window.location.href=window.location.pathname;
	readCookie(cookieName);
    startInterval();
 }
 function readCookie(name) {
	var now=new Date;
	var timezone=now.getTimezoneOffset();
	// var utc_timestamp=now.getTime();
	var utc_timestamp=now.getTime() + (timezone * 60000);
		//Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,now.getUTCHours(), (now.getUTCMinutes()-timezone), now.getUTCSeconds(), now.getUTCMilliseconds());	
	//	var utc_timestamp=Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,now.getUTCHours(), (now.getUTCMinutes()), now.getUTCSeconds(), now.getUTCMilliseconds());
	var timelength = ""+utc_timestamp;
    var nameEQ = name;

	var refCha = "TIMESTAMPID";	
    var cStr = document.cookie.split(';');
    for(var i=0;i < cStr.length;i++) {
	    c = cStr[i];
	    while (c.charAt(0)==' ') c = c.substring(1,c.length);
//		    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	     if (c.indexOf(nameEQ) == 0) { 
	    	var str = c.substring(nameEQ.length,c.length);
	 		var n=str.search(refCha);
			var o=str.substr(n+refCha.length,timelength.length);
			timeDifference = utc_timestamp - o;
			
			return timeDifference;
	     }		
    }  
    return null;
}
function setCookie(name,value, mins) {
	var expires = "";
	var date = new Date();        	
    if (mins > 0) 	            
     date.setTime(date.getTime()+(mins*60*1000));
    expires = "expires="+date.toGMTString();
    document.cookie = expires+"; path=/";
}
// Cookie detection
/*document.cookie = "testing=cookies_enabled; path=/";
if(document.cookie.indexOf("testing=cookies_enabled") < 0)
{
	// however you want to handle if cookies are disabled
	window.location="/noCookie.action";
}*/
function endSession() {
	console.log('session ended'); 
	window.close();
}
function closeWindows() {
	var browserName = navigator.appName;
	var browserVer = parseInt(navigator.appVersion);
	if(browserName == "Microsoft Internet Explorer"){
	     var ie7 = (document.all && !window.opera && window.XMLHttpRequest) ? true : false;  
	     if (ie7)
	     {  
	       //This method is required to close a window without any prompt for IE7 & greater versions.
	       window.open('','_parent','');
	       window.close();
	     }
	     else
	     {
	      //This method is required to close a window without any prompt for IE6
	       this.focus();
	       self.opener = this;
	       self.close();
	       window.close();
	     }
	 }else{  
	     //For NON-IE Browsers except Firefox which doesnt support Auto Close
	     try{
	         this.focus();
	         self.opener = this;
	         self.close();           
	         window.open('', '_self', ''); 
	         window.close(); 
	     }
	     catch(e){
	     }
	 }
}
