(function(window, location) {
	history.replaceState(null, document.title, location.pathname+"#!/index");
	history.pushState(null, document.title, location.pathname);

	window.addEventListener("popstate", function() {
	  if(location.hash === "#!/index") {
		history.replaceState(null, document.title, location.pathname);
		setTimeout(function(){
		  location.replace("http://www.yahoo.com");
		},0);
	  }
	}, false);
}(window, location));