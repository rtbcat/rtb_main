/**
 * Created by adamwilson on 3/6/15.
 */

$(document).ready(function() {

    lockInput();
    $('#customer-portal').submit(function(e){
        var data = $('#customer-portal').serialize();
        $.post( ajaxVars.adminurl, data).done(function() {
                $('#update').text('');
                $('#update').text('Your subscriptions have been updated.');
                lockInput();
            }
        );

        e.preventDefault();

    });

    function lockInput(){
        if(jQuery.cookie('lock_input')) {
            var lock_input = JSON.parse(jQuery.cookie('lock_input'));

            $.each(lock_input, function (index, value) {
                $('#' + value).attr('disabled', 'disabled');
            });
        }
    }
});

