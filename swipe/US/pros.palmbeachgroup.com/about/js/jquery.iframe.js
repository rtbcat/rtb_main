
$(function(){
    $.receiveMessage(
        function( event ){
            $("#csportal").css({
                height: event.data
            });
        });
});

