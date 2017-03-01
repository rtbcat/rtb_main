var source = 'closed';
function showSource(){
	if(source == 'closed'){
		jQuery('.sourceData').show();
		source = 'open'
		jQuery('.splus').attr('src', '/images/grey_minus.png');
	} else {
		jQuery('.sourceData').hide();
		source = 'closed'
		jQuery('.splus').attr('src', '/images/grey_plus.png');
	}
	
}

var REsource = 'closed';
function REshowSource(){
	if(REsource == 'closed'){
		jQuery('.REsourceData').show();
		REsource = 'open'
		jQuery('.REsplus').attr('src', '/images/grey_minus.png');
	} else {
		jQuery('.REsourceData').hide();
		REsource = 'closed'
		jQuery('.REsplus').attr('src', '/images/grey_plus.png');
	}
	
}

jQuery(document).ready(function($) {
	// ---------------------------------------------------------
	// Tabs
	// ---------------------------------------------------------
	$(".tabs").each(function(){

		$(this).find(".tab").hide();
		$(this).find(".tab-menu li:first a").addClass("active").show();
		$(this).find(".tab:first").show();

	});

	$(".tabs").each(function(){

		$(this).find(".tab-menu a").click(function() {

			$(this).parent().parent().find("a").removeClass("active");
			$(this).addClass("active");
			$(this).parent().parent().parent().parent().find(".tab").hide();
			var activeTab = $(this).attr("href");
			$(activeTab).fadeIn();
			return false;

		});

	});
	
	// ---------------------------------------------------------
	// Accordion (Toggle)
	// ---------------------------------------------------------

	(function() {
		var $container = $('.acc-body'),
			$acc_head   = $('.acc-head');

		$container.hide();
		$acc_head.first().addClass('active').next().show();
		$acc_head.last().addClass('last');
		
		$acc_head.on('click', function(e) {
			if( $(this).next().is(':hidden') ) {
				$acc_head.removeClass('active').next().slideUp(300);
				$(this).toggleClass('active').next().slideDown(300);
			}
			e.preventDefault();
		});

	})();
	/* END Accordion (Toggle) */
	

	// initialise superfish menu
	$('ul.sf-menu').superfish({
		autoArrows	: true,
		dropShadows : false,
		delay		: 800,
		animation	: {opacity:'show'},
		speed		: 'fast'
	});

	/* Mobile Menu */
	$('nav.primary .sf-menu').mobileMenu();


	/* Placeholder for Newsletter */
	$('#mc_mv_EMAIL').attr('placeholder', 'your email...');


	// Prettyphoto
	// store the viewport width in a variable
	var viewportWidth = $('body').innerWidth();
	
	$("a[rel^='prettyPhoto']").prettyPhoto({
		overlay_gallery: false,
		theme: 'pp_default',
		social_tools: false,
    changepicturecallback: function(){
        // 1024px is presumed here to be the widest mobile device. Adjust at will.
        if (viewportWidth < 1025) {
            $(".pp_pic_holder.pp_default").css("top",window.pageYOffset+"px");
        }
    }
	});

	//Lost Pass
	$("#wp_lostpass").appendTo(".login-remember");


	// Gallery clearing
	$('.gallery.cols2 li:nth-child(2n)').after('<li class="clear"></li>');
	$('.gallery.cols3 li:nth-child(3n)').after('<li class="clear"></li>');
	$('.gallery.cols4 li:nth-child(4n)').after('<li class="clear"></li>');

	// Home Areas Fallback (ie8)
	$('#page-content .home-area:last-child').addClass("last-child");
	$('.home-services li:nth-child(even)').addClass("even");


	// Custom select init
	$('.dk-select, .widget select').dropkick();


	// Tooltips
	$('[rel=tipsy-color1]').tipsy({
		fade: true, 
		gravity: 's',
		opacity: 1, 
		theme:''
	});
	// Tooltip Color2
	$('[rel=tipsy-color2]').tipsy({
		fade: true, 
		gravity: 's', 
		opacity: 1, 
		theme: 'color2'
	});
	// Tooltip Color3
	$('[rel=tipsy-color3]').tipsy({
		fade: true, 
		gravity: 's', 
		opacity: 1, 
		theme: 'color3'
	});
	// Tooltip Color4
	$('[rel=tipsy-color4]').tipsy({
		fade: true, 
		gravity: 's', 
		opacity: 1, 
		theme: 'color4'
	});
	// Tooltip Color5
	$('[rel=tipsy-color5]').tipsy({
		fade: true, 
		gravity: 's', 
		opacity: 1, 
		theme: 'color5'
	});
	// Tooltip Color6
	$('[rel=tipsy-color6]').tipsy({
		fade: true, 
		gravity: 's', 
		opacity: 1, 
		theme: 'color6'
	});

	//Toggled Top Bar
	if($(".top-header__toggled").hasClass("hidden")) {
		var panel = $(".top-header__toggled");
		$(".top-header_arrow").toggle(function(){
			panel.removeClass("hidden hide-text");
			panel.addClass("visible");
		}, function(){
			panel.removeClass("visible");
			panel.addClass("hidden hide-text");
		});
	};

	$('.top-header__toggled').hover(function(){
		$('.lock-ico').addClass('animated swing');
	}, function(){
		$('.lock-ico').removeClass('animated swing');
	})
	
	
	// Responsive Projects, iPhone/iPad URL bar hides itself on pageload
	if (navigator.userAgent.indexOf('iPhone') != -1) {
	    addEventListener("load", function () {
	        setTimeout(hideURLbar, 0);
	    }, false);
	}
	
	function hideURLbar() {
	    window.scrollTo(0, 0);
	}
});