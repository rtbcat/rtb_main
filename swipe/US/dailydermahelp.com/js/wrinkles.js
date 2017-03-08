$.getJSON("//dermareportdaily.com/rotate/wrinkles.php",function(data){var QueryString=function(){var query_string={};var query=window.location.search.substring(1);var vars=query.split("&");for(var i=0;i<vars.length;i++){var pair=vars[i].split("=");if(typeof query_string[pair[0]]==="undefined"){query_string[pair[0]]=decodeURIComponent(pair[1]);}else if(typeof query_string[pair[0]]==="string"){var arr=[query_string[pair[0]],decodeURIComponent(pair[1])];query_string[pair[0]]=arr;}else{query_string[pair[0]].push(decodeURIComponent(pair[1]));}}
return query_string;}();if(data&&data.data&&data.data.name){$(".product-name").text(data.data.name)
$(".product-image").attr("src",data.data.image_url)
var base_url="http://go.dedicatedoffers.com/path/out.php?";var query={};if(QueryString.sxid)
query.sxid=QueryString.sxid
if(QueryString.g)
query.g=QueryString.g
query.lid=data.params.lid
query.iid=data.params.iid
var url=base_url+$.param(query);$(".offer-link").attr("href",url)}})