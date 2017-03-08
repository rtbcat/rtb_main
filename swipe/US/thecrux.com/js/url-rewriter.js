(function ($) {
    $(function () {
        var mixpanelWaiter = setInterval(function () {
            if (mixpanel) {
                $('a').each(function () {
                    if (this.href.indexOf('orders.cloudsna.com') != -1) {
                        this.href += '&mp_distinct_id=' + mixpanel.get_distinct_id();
                    }
                });

                clearInterval(mixpanelWaiter);
            }
        }, 100);
    })
})(jQuery);
