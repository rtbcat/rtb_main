function openbox(id){
    display = document.getElementById(id).style.display;

    if(display=='none'){
       document.getElementById(id).style.display='block';
    }else{
       document.getElementById(id).style.display='none';
    }
};
$('.video__a').on('click', function(e) {
	e.preventDefault();
	
	var self = $(this);
	var videoSrc = self.attr('href');
	var videoId = videoSrc.substr(videoSrc.length - 11) + '?rel=0&autoplay=1&controls=0&showinfo=0';
	
	self.find('img').css('z-index', '0');
	self.find('iframe').attr('src', 'https://www.youtube.com/embed/' + videoId);

});