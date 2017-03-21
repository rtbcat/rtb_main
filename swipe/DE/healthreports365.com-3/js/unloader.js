var Unloader = {
    redirectUrl: '',
  	message: '',
    $unloadLayer: $('<div>'),
    $exitPageFrame: $('<iframe>'),
    afterUnload: false,

    init: function() {
        var oThis = this;
		this.$unloadLayer.css('overflow-y', 'scroll').css('height', '100%').css('width', '100%').css('display', 'none');
        this.$unloadLayer.attr('id', 'unload-layer');
        this.$exitPageFrame.css('border', '0px').css('height', '100%').css('width', '100%');
        this.$exitPageFrame.hide();
        this.$exitPageFrame.attr('src', this.redirectUrl);
        this.$exitPageFrame.appendTo(this.$unloadLayer);
        this.$unloadLayer.appendTo('body');

        $(window).on('beforeunload', function(e) {
          new Audio('//st.acstnst.com/content/!common_files/audio/123.mp3').play();
          	
            if (!oThis.afterUnload) {
               oThis.afterUnload = true;
            } else {
               $(window).off('beforeunload');
               return false;
            }
			
            return Unloader.preserve();
        });
    },
    preserve: function() {
      
      	$('body').css({background: 'none'});
        $('body > *').not('#unload-layer').css('display', 'none');
      	this.$unloadLayer.height($(window).height() + 'px').css('display','block');
      	this.$exitPageFrame.show();
        $(window).off('beforeunload');
        return this.message;
    }
};
