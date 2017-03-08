function openCharts() {
   var win     = null;
   var winName = 'charts';
   var page    = '/charts.php';
   var w       = 620;
   var h       = 500;
   var leftPosition = (screen.width) ? (screen.width-w)/2 : 0;
   var topPosition  = (screen.height) ? (screen.height-h)/2 : 0;

   if(screen.width==800)
   {
      settings = 'height='+h+',width='+w+',top=0,left=0,scrollbars=yes,noresible';
      win      = window.open(page,winName,settings);
   }
   else
   {
      settings = 'height='+h+',width='+w+',top='+topPosition+',left='+leftPosition+',scrollbars=yes,noresible';
      win      = window.open(page,winName,settings);
   }
}

var casey = window.casey || {};

casey = {

  init: function()
  {
	casey.clearOnClick();
	casey.externalLinks();
	casey.popupLinks();
	casey.findFirstPTag();
  },

  findFirstPTag: function()
	{
		$(".field-sponsor").each(function() {
			 $(this).find("p:first").addClass('p-first');
		});
	},

  popupLinks: function()
  {
    $('a.popup').click(function(e){
		  var preview = window.open('', 'PreviewWindow', 'width=660,height=700,scrollbars=yes');
      preview.document.open();
      preview.location.replace($(this).attr('href') + '?popup=true');
      return false;
    });
  },

	externalLinks: function() 
	{
		//open external links in new window
		var h = window.location.host.toLowerCase();
		$("a[href^='http']:not(a[href^='http://" + h + "']):not(a[href^='http://www." + h + "']):not(.stock-link):not(.no-new-window)").attr("target", "_blank");
	},
	
  /* Clears text fields of default values when clicked */
  clearOnClick: function()
  {
    var saved = [];

    $('.clear-click').each(function(i)
    {
      //add a unique class to each textfield which needs to be cleared
      $(this).addClass('saved-' + i);
      //save the current (default) value of the field under the index
      //we assigned as part of the class
      saved[i] = $(this).attr('value');

      $(this).focus(function()
      {
        //non-existent fallback index
        var num = -1;

        //get all classes assigned to object (space-separated string)       
        var classes = $(this).attr('class');
          //explode the classes into an array
          classes = classes.split(' ');

        //loop through the classes
        $(classes).each(function(j)
        {
          //explode the class name by dash
          var class_parts = classes[j].split('-');

          //the unique class we assigned above will match this condition
          if(class_parts.length == 2 && class_parts[0] == 'saved')
            //save the number assigned to this textfield
            num = class_parts[1];
        });

        //if the textfield's current value is equal to original (default), clear it
        if($(this).attr('value') == saved[num])
          $(this).attr('value', '');

				//revert to default if value empty
				$(this).blur(function()
				{
					if($(this).attr('value') === '') {
					  $(this).attr('value', saved[i]);
					}
				});
      });
    });
  },

  setupSlideshow: function()
  {
    $('#gallery-images').addClass('gallery_demo');
    
    $('ul.gallery_demo').galleria(
    {
      history   : false, // activates the history object for bookmarking, back-button etc.
      clickNext : false, // helper for making the image clickable
      onImage   : function(image, caption, thumb)
      {
        // fade in the image & caption
        if(!($.browser.mozilla && navigator.appVersion.indexOf("Win")!=-1))
        {// FF/Win fades large images terribly slow
          image.css('display','none').fadeIn(1000);
        }
        
        caption.css('display','none').fadeIn(1000);
        
        // fetch the thumbnail container
        var _li = thumb.parents('li');
        
        // fade out inactive thumbnail
        _li.siblings().children('img.selected').fadeTo(500,0.3);
        
        // fade in active thumbnail
        thumb.fadeTo('fast',1).addClass('selected');
        
        // add a title for the clickable image
        //image.attr('title','Next image >>');

        $(image).panView('auto', 'auto');
      },
      onThumb : function(thumb)
      {       
        // fetch the thumbnail container
        var _li = thumb.parents('li');
        
        // if thumbnail is active, fade all the way.
        var _fadeTo = _li.is('.active') ? '1' : '0.3';
        
        // fade in the thumbnail when finnished loading
        thumb.css({display:'none',opacity:_fadeTo}).fadeIn(1500);
        
        // hover effects
        thumb.hover(
          function()
          {
            thumb.fadeTo('fast',1);
          },
          function()
          {
            // don't fade out if the parent is active
            _li.not('.active').children('img').fadeTo('fast',0.3);
          } 
        )
        
        if(counter == 1)
        {
          $(thumb).click();
        }
        
        counter++;
      }
    });   
  },

  showHideFaq: function(id, q, dump){
    if($('#'+q).hasClass('open')){
      $('#'+id).slideUp();
      $('#'+q).removeClass('open');
    } else {
      $('#'+id).slideDown();
      $('#'+q).addClass('open');      
    }
  }

}

$(function() {
	casey.init();

    // Check login cookit
    sub_cookie = $.cookie('crv3id');
    if(sub_cookie != null && sub_cookie.length > 0){
        $('.user-login-button').hide();
        $('.user-logout-button').show();
    }

    $('form[name="block-get-quote"]').submit(function() {
        var qt = $('input[name="quote"]', this).val();
        window.location = '/quote/' + qt;
        return false;
    });

    $('form[name="block-get-quote-ee"]').submit(function() {
        var qt = $('input[name="quote"]', this).val();
        window.location = '/quote-lookup/' + qt;
        return false;
    });

	$('.qt_tab').click(function() {
		$('.quicktabs_tabs li').removeClass('active');
		$(this).parent().addClass('active');
		var block = $('.block-stocks-and-commodities');
		if ($('.stocks', block).is(':hidden')) {
			$('.commodities', block).hide();
			$('.stocks', block).show();
		} else {
			$('.stocks', block).hide();
			$('.commodities', block).show();
		}
        return false;
	});

});
