$(document).ready(function(){
    $('.topBanner').css('display','list-item').css('margin-bottom','10px');
    
    if(window.isIE)
	// carousel
        $('.secondaryActionButton').on('click',function(){
            window.location.href=$(this).attr('nav');
        });
	if ($('.bxslider').length>0) {
		$('.bxslider').bxSlider({
			auto: true,
			autoControls: true,
			pause:7000,
			mode: 'fade',
			buildPager: function(slideIndex){
				switch (slideIndex){
		        case 0:
		          	return 'SPOT IDENTITY THEFT';
		        case 1:
		          	return 'GOOD CREDIT';
		        case 2:
		          	return 'DON\'T BE FOOLED';
		        case 3:
		          	return 'MORE THAN A SCORE';
				case 4:
					return 'NOT LIKE THE OTHERS';
				}
			}
		});
	}
$('.primaryActionButton').removeClass('primaryIE');
$('.secondaryActionButton').removeClass('secondaryIE');
	if (window.PIE) {

		$('.primaryActionButton, .secondaryActionButton').each(function() {
			PIE.attach(this);
		});
	}
	
	$("a.disabled").on("click", function(){
		 return false; 
	});
   
   
     
});

function browserType()
{							
	var browserAgent = navigator.userAgent;
	var agentName = browserAgent.split(/[\s;/(),]/);	
	var strBrowserType = "UNKNOWN";
	var IE  = "Trident";
	var EDGE = "Edge";
	var FIREFOX = "Firefox";
	var CHROME = "Chrome";
	var MAC = "Macintosh";
        var IPAD = "iPad";
	var MOBILE = "Mobile";
							
	for(i=0; i <= agentName.length; ++i)
	{
		if((agentName[i] == IE))
		{ 								 	
		 	strBrowserType = agentName[i];							 
		}		
		else if(agentName[i] == EDGE)
		{
			strBrowserType = agentName[i];
		}
		else if(agentName[i] == FIREFOX)
		{
			strBrowserType = agentName[i];
		}
		else if(agentName[i] == CHROME)
		{
			strBrowserType = agentName[i];
		}
		else if(agentName[i] == MAC)
		{
			strBrowserType = agentName[i];
			break;
		}
		else if(agentName[i] == IPAD)
		{
			strBrowserType = agentName[i];
			break;
		}
		else if(agentName[i] == MOBILE)
		{
			strBrowserType = agentName[i];
			break;
		}
	}							
	return strBrowserType;						
}

function textCounter(field, countfield, maxlimit) {
    //console.log('test')
    if (field.value.length > maxlimit) {
        field.value = field.value.substring(0, maxlimit);
    } else {
        countfield.value = maxlimit - field.value.length;
    }
}
