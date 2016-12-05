;(function($){
    var config = {
        url : "http://sandbox.lat.com.es/index.php/info/inventory",
        loading: false,
        last_data: null,
        sellers: [
            {id:181,link:"stats.html?seller=google&name=Google%20AdExchange"},
            {id:357,link:"stats.html?seller=openx&name=OpenX"},
            {id:459,link:"stats.html?seller=rubicon&name=Rubicon"},
            {id:1752,link:"stats.html?seller=smaato&name=Smaato%20Inc."},
            {id:280,link:"stats.html?seller=microsoft&name=Microsoft%20Advertising%20Exchange"}
        ]
    }
    var data = {items:[],page:{current:1,total:0}};
    var obj = {
        $form : $('#search_form'),
        $country_selected: $('#filter_country_choice'),
        $country_modal: $('#country_modal'),
        $country_modal_options: $('#country_modal li[data-code]'),
        $country_modal_cancel: $('#country_modal button.btn-cancel'),
        $th : $('#table_container th'),
        $tbody : $('#table_container tbody'),
        $sort_box: $('.table-control select.sorting'),
        $order_box: $('.table-control select.ordering'),
        $prev_btn: $('.table-control .btn-prev'),
        $next_btn: $('.table-control .btn-next'),
        $page_tot: $('.table-control span.page-total'),
        $page_num: $('.table-control select.page-number')
    };
    function init(){
        obj.$form.on('submit',update);
        obj.$form.find('input[name="country"]').on('click',getCountry);
        obj.$form.find('input[name="device_type"]').on('click',update);
        obj.$form.find('input[name="supply_type"]').on('click',update);
        obj.$sort_box.on('change',sortBy);
        obj.$order_box.on('change',orderBy);
        obj.$page_num.on('change',setPage);
        obj.$prev_btn.on('click',prevPage);
        obj.$next_btn.on('click',nextPage);
        obj.$country_modal_options.on('click',setCountry);
        obj.$country_modal_cancel.on('click',closeCountryModal);
        obj.$th.on('click',sortColumn);
        update();
    }
    function render(){
        // Loading status.
        if(config.loading){
            $('#loader').css('display','block');

        }else{
            $('#loader').css('display','none');
        }
        // Update table entries.
        var entries = '';
        if(data.items.length > 0){
            for(var i=0;i<data.items.length;i++){
                var item = data.items[i];
                var seller_link = "";
                for(var j=0;j<config.sellers.length;j++){
                    var seller = config.sellers[j];
                    if(item.seller_member_id == seller.id){
                        seller_link = seller.link;
                    }
                }
                if(seller_link != ""){
                    entries += '<tr><td><a href="'+seller_link+'" target="_blank">'+item.seller_member_name+'</a></td><td>'+formatNumber(item.filtered_imps)+'</td></tr>';
                }else{
                    entries += '<tr><td>'+item.seller_member_name+'</td><td>'+formatNumber(item.filtered_imps)+'</td></tr>';
                }
            }
            obj.$sort_box.prop('disabled',false);
            obj.$order_box.prop('disabled',false);
            obj.$prev_btn.prop('disabled',false);
            obj.$page_num.prop('disabled',false);
            obj.$next_btn.prop('disabled',false);
        }
        else{
            entries = '<tr><td colspan="2">No entries found.</td></tr>';
            obj.$sort_box.prop('disabled',true);
            obj.$order_box.prop('disabled',true);
            obj.$prev_btn.prop('disabled',true);
            obj.$page_num.prop('disabled',true);
            obj.$next_btn.prop('disabled',true);
        }
        obj.$tbody.html(entries);
        // Update pagination.
        var pages = '';
        if(data.page.current > 1){
            obj.$prev_btn.prop('disabled',false);
        }else{
            obj.$prev_btn.prop('disabled',true);
        }
        if(data.page.total > 1){
            for(var i=0;i<data.page.total;i++){
                var n = i+1;
                pages += '<option value="'+n+'">'+n+'</option>';
            }
        }else{
            pages = '<option value="1">1</option>';
        }
        obj.$page_tot.text(data.page.total);
        obj.$page_num.html(pages).val(data.page.current);
        if(data.page.current < data.page.total){
            obj.$next_btn.prop('disabled',false);
        }else{
            obj.$next_btn.prop('disabled',true);
        }
    }
    function update(e){
        if(e){if(e.target.nodeName == "FORM") e.preventDefault();};
        var new_data = obj.$form.serialize();
        if(config.last_data != new_data){
            config.loading = true;
            render();
            $.ajax({
                method: "GET",
                url: config.url,
                data: new_data,
                success: function(response){
                    data = response;
                    config.loading = false;
                    config.last_data = new_data;
                    setTimeout(function(){
                        // Remove sidebar toggle.
                        $('#side_bar').removeClass('toggled');
                        render();
                    },500);
                }
            });
        }
    }
    function sortBy(e){
        var sort_input = obj.$form.find('input[name="sort_by"]');
        var order_input = obj.$form.find('input[name="order_by"]');
        var th = $('#table_container th[data-sort="'+e.target.value+'"]');

        var new_sort = e.target.value;
        var new_order = order_input.val();

        obj.$th.removeClass('active asc des').addClass('sort');
        th.removeClass('sort').addClass('active '+new_order);
        sort_input.val(new_sort);
        obj.$sort_box.val(new_sort);
        update();
    }
    function orderBy(e){
        var order_input = obj.$form.find('input[name="order_by"]');
        var sort_input = obj.$form.find('input[name="sort_by"]');
        var th = $('#table_container th[data-sort="'+sort_input.val()+'"]');
        var new_order = e.target.value;

        obj.$th.removeClass('active asc des').addClass('sort');
        th.removeClass('sort').addClass('active '+new_order);
        order_input.val(new_order);
        obj.$order_box.val(new_order);
        update();
    }
    function prevPage(e){
        if(data.page.current > 1){
            var current_page = obj.$form.find('input[name="page"]');
            current_page.val(Number(current_page.val())-1);
            update();
        }
    }
    function setPage(e){
        var page_number = e.target.value;
        obj.$form.find('input[name="page"]').val(page_number);
        obj.$page_num.val(page_number)
        update();
    }
    function nextPage(e){
        if(data.page.current < data.page.total){
            var current_page = obj.$form.find('input[name="page"]');
            current_page.val(Number(current_page.val())+1);
            update();
        }
    }
    function getCountry(e){
        if(e.target.value == "all"){
            $('#filter_country_single').val("");
            obj.$country_selected.text("Select Country");
            update();
        }else{
            e.preventDefault();
            obj.$country_modal.css('display','block');
        }
    }
    function setCountry(e){
        var country_code = $(e.target).attr('data-code');
        var country_name = $(e.target).text();
        obj.$country_selected.text(country_name);
        obj.$form.find('input[name="country"]').prop('checked',false);
        $('#filter_country_single').val(country_code).prop('checked',true);
        closeCountryModal();
        update();
    }
    function sortColumn(e){
        var sort_input = obj.$form.find('input[name="sort_by"]');
        var order_input = obj.$form.find('input[name="order_by"]');
        var column = (e.target.nodeName === "TH")? $(e.target) : $(e.target).parents("th");
        var new_sort = column.attr('data-sort');
        var new_order = (order_input.val() === "asc")? "des" : "asc";
        obj.$th.removeClass('active asc des').addClass('sort');
        column.removeClass('sort').addClass('active '+new_order);
        sort_input.val(new_sort);
        order_input.val(new_order);
        obj.$sort_box.val(new_sort);
        obj.$order_box.val(new_order);
        update();
        console.log(obj.$form.serialize());
    }
    function closeCountryModal(){
        obj.$country_modal.css('display','none');
    }
    function formatNumber(n){return Number(n).toLocaleString('en-US')}
    // Initialize app.
    init()
}(jQuery))

;(function($){
    var obj = {
        $side_bar: $('#side_bar'),
        $side_bar_toggle: $('#side_bar .toggle-icon')
    }
    function init(){
        obj.$side_bar_toggle.on('click',toggleSidebar);
    }
    function toggleSidebar(e){
        if(obj.$side_bar.hasClass('toggled')){
            obj.$side_bar.removeClass('toggled');
        }else{
            obj.$side_bar.addClass('toggled');
        }
        console.log("Toggle triggered.");
    }
    init();
}(jQuery))