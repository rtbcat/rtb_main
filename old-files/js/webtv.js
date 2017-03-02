var memberId = 15130; // Utoolize memberpage id.
var playerId = 2453; // Player id.
var panelId = 0; // Change the panel id if want to show panel other than default panel selected for webtv player.
var webTvPanel = 0; // Panel id for controlling dynamic color.

var sharedSkinId = 4; // Select skin id with which player will be posted to different sites like facebook, twitter etc.
var useVideoLang = 0; // Use language for video filtration on the TV.
var cId = getParameterByName('cId');
var vId = getParameterByName('vId');
var lang = '';
var isPreview = 0;
var pageLink = location.protocol + '//www.utoolize.com';

// Please enter key for getting language parameter from the url.
var langKey = '';

if(('' != langKey) && ('' != getParameterByName(langKey))) {
	lang = getParameterByName(langKey);
} else if('undefined' !== typeof pageLang) {
	lang = pageLang; //pageLang: global language variable set in client's page for getting the default language.
}

if('undefined' !== typeof preview) {
	isPreview = preview;
}

// Responsible for getting value of url parameters by name.
function getParameterByName(name) {
	name = name.replace(/[[]/, "[").replace(/[]]/, "]");
	var regexS = "[?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results == null) {
		return "";
	} else {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}

// Responsible for loading iframe and cross domain communication.
var transport = new easyXDM.Socket({
	remote: pageLink + "/partners/resizeIntermediate.html?url=../package?mId-" + memberId + "qqwId-" + playerId + "qqcatId-" + panelId + "qqlang-" + lang + "qqpage-webtvqqcId-" + cId + "qqvId-" + vId + "qqwtvpanel-" + webTvPanel + "qqsharedSkin-" + sharedSkinId + "qqvideoLang-" + useVideoLang + "qqp-" + isPreview,
	swf: pageLink + "/partners/easyxdm.swf",
	container: "embedded",
	props: {style: {background: "url('" + pageLink + "/pre_loader.gif') no-repeat center", width: "100%", height: "700px"}},
	onReady: function() {
		this.container.getElementsByTagName("iframe")[0].style.width = "100%";
		this.container.getElementsByTagName("iframe")[0].style.height = "700px";
		setTimeout(function(){document.getElementsByTagName("iframe")[0].style.background = ""}, 10000); 
	},
	onMessage: function(message, origin){
	if("scrollToPlayer" == message) {
	var position = $("div#embedded").position();
	window.scrollTo(0, position.top);
	$("body").append($("<div></div>").addClass("iosfix"));
	setTimeout(function() {
	$(".iosfix").remove(); }, 500);
	} else {
		this.container.getElementsByTagName("iframe")[0].style.height = message + "px";
		this.container.getElementsByTagName("iframe")[0].marginheight = "0";
		this.container.getElementsByTagName("iframe")[0].marginwidth = "0"; 
	}
	}
});