function setCookie (name, value, expires, path, domain, secure) 
{
	document.cookie = name + "=" + escape(value) +
		((expires) ? "; expires=" + expires : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
}

function getCookie(name) 
{
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) 
	{
		offset = cookie.indexOf(search);
		if (offset != -1) 
		{
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) 
			{
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}

function removeRightSidebar()
{
	var needRemove = getCookie('needRemove');
	if (needRemove == 'true')
	{
		document.getElementById('right-sidebar').style.display = 'none';
	}
}

function chooseHowitworksContent()
{
	var needRemove = getCookie('needRemove');
	if (needRemove == 'true')
	{
		document.getElementById('howitworksContent').innerHTML = '<img src="images2/title_2.gif" alt="" border="0" style="float: right; margin-left: 20px; margin-top: 0px;">'+
		            '<img src="images2/how_works_01.jpg" alt="" border="0" style="float: right; margin-right: 100px; margin-top: 0px;">'+
		            '<img src="images2/title_2.gif" alt="" border="0" style="float: right; margin-left: 20px; margin-top: 0px;">'+
		            '<img src="images2/how_works_02.jpg" alt="" border="0" style="float: right; margin-right: 100px; margin-top: 0px;">'+
		            '<img src="images2/title_2.gif" alt="" border="0" style="float: right; margin-left: 20px; margin-top: 0px;">'+
		            '<img src="images2/how_works_03.jpg" alt="" border="0" style="float: right; margin-right: 100px; margin-top: 0px;">'+
		            '<img src="images2/title_2.gif" alt="" border="0" style="float: right; margin-left: 20px; margin-top: 0px;">'+
		            '<img src="images2/how_works_04.jpg" alt="" border="0" style="float: right; margin-right: 100px; margin-top: 0px;">';
	}
	
}