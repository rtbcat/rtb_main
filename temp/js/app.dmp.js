;(function($){
    var config = {
        url : "http://sandbox.lat.com.es/index.php/info/dmp",
        loading: false,
        last_data: null,
        brands: {
            bk_branded_data : "All",
            bk_branded_data_acxiom : "Acxiom",
            bk_branded_data_adadvisorbyneustar : "AdAdvisor",
            bk_branded_data_addthis : "AddThis",
            bk_branded_data_affinityanswers : "Afinity Answers",
            bk_branded_data_alc : "ALC",
            bk_branded_data_alliant : "Alliant",
            bk_branded_data_analyticsiq : "AnalyticsIQ",
            bk_branded_data_areyouahuman : "Are You a Human",
            bk_branded_data_beintoo : "Beintoo",
            bk_branded_data_bluekangaroo : "Bluekangaroo",
            bk_branded_data_bombora : "Bombora",
            bk_branded_data_comscore : "Comscore",
            bk_branded_data_connexity : "Connexity",
            bk_branded_data_crosspixel : "Crosspixel",
            bk_branded_data_datacratic : "Datacratic",
            bk_branded_data_datalab : "Datalab",
            bk_branded_data_dataline : "Dataline",
            bk_branded_data_datalogix : "Datalogix",
            bk_branded_data_datamentors : "Datamentors",
            bk_branded_data_datamyx : "Datamyx",
            bk_branded_data_dataxpand : "Dataxpand",
            bk_branded_data_delidatax : "DelidataX",
            bk_branded_data_dunbradstreet : "Dun & Bradstreet",
            bk_branded_data_evite : "Evite",
            bk_branded_data_experian : "Experian",
            bk_branded_data_experianuk : "Experian UK",
            bk_branded_data_financialaudiences : "Financial Audiences",
            bk_branded_data_forbes : "Forbes",
            bk_branded_data_gfkmri : "GFK",
            bk_branded_data_ibehavior : "iBehavior",
            bk_branded_data_infogroup : "infogroup",
            bk_branded_data_iriproscorescpg : "IRi",
            bk_branded_data_ixi : "IXI",
            bk_branded_data_kantarmediatgi : "Kantar Media",
            bk_branded_data_lotame : "Lotame",
            bk_branded_data_mastercard : "Mastercard",
            bk_branded_data_mediasource : "Media Source",
            bk_branded_data_merkle : "Merkle",
            bk_branded_data_omnidigitalbymeritdirect : "OmniDigital",
            bk_branded_data_omnibus : "Omnibus",
            bk_branded_data_profound : "Profound",
            bk_branded_data_pushspring : "Pushsprin",
            bk_branded_data_scanbuy : "Scanbuy",
            bk_branded_data_sirdata : "Sirdata",
            bk_branded_data_sms : "SMS",
            bk_branded_data_solvemedia : "Solve Media",
            bk_branded_data_transunion : "Transunion",
            bk_branded_data_trusignal : "Trusignal",
            bk_branded_data_twinedata : "Twinedata",
            bk_branded_data_v12group : "V12 Group",
            bk_branded_data_vendigi : "Vendigi",
            bk_branded_data_visavueaudiencespoweredbydlx : "VisaVue",
            bk_branded_data_webbula : "Webbula"
        }
    }
    var data = {items:[],page:{current:1,total:0}};
    var obj = {
        $form : $('#search_form'),
        $brands : $('#search_form li[data-category]'),
        $brands_scrollbox: $('#search_form ul'),
        $th : $('#table_container th[data-sort]'),
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
        obj.$brands.on('click',setBrand);
        obj.$sort_box.on('change',sortBy);
        obj.$order_box.on('change',orderBy);
        obj.$page_num.on('change',setPage);
        obj.$prev_btn.on('click',prevPage);
        obj.$next_btn.on('click',nextPage);
        obj.$th.on('click',sortColumn);
        $('.suppliers .item a').click(setBrand);
        if(location.hash){
            var hashed_brand = location.hash.replace('#','').split('=');
            if(hashed_brand.length === 2){
                if(hashed_brand[0] === "brand" && hashed_brand[1].length > 2){
                    setBrand('bk_branded_data_'+hashed_brand[1]);
                }
            }
            else{update();}
        }
        else{update();}
    }
    function render(){
        // Update page title.
        var brand_data = obj.$form.find('input[name="category"]').val();
        var brand_nraw = "";
        if(brand_data.length > 15){brand_nraw = brand_data.replace('bk_branded_data_',"");}
        else{brand_nraw = brand_data.replace('bk_branded_data',"");}
        if(brand_nraw != ""){location.hash = "brand="+brand_nraw;}
        $('#page_title_brand').text(config.brands[brand_data]);
        // Update selected brand.
        obj.$brands.removeClass('active');
        var brand_scroller = obj.$form.find('ul');
        var brand_selected = obj.$form.find('[data-category="'+brand_data+'"]');
        brand_selected.addClass('active');
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
                entries += '<tr>';
                //entries +=     '<td>'+item.bk_id+'</td>';
                //entries +=     '<td>'+item.apn_id+'</td>';
                entries +=     '<td>'+item.path+'</td>';
                entries +=     '<td>'+formatNumber(item.size)+'</td>';
                entries +=     '<td>'+item.description+'</td>';
                //entries +=     '<td>'+item.cpm+'</td>';
                entries += '</tr>';
            }
            obj.$sort_box.prop('disabled',false);
            obj.$order_box.prop('disabled',false);
            obj.$prev_btn.prop('disabled',false);
            obj.$page_num.prop('disabled',false);
            obj.$next_btn.prop('disabled',false);
        }
        else{
            entries = '<tr><td colspan="6">No entries found.</td></tr>';
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
                        $('body').animate({scrollTop:0},250);
                        var brand_selected = obj.$form.find('li.active');
                        var amount_scroll = Math.abs((brand_selected.offset().top + obj.$brands_scrollbox.scrollTop()) - obj.$brands_scrollbox.offset().top);
                        obj.$brands_scrollbox.animate({scrollTop:amount_scroll},300);
                    },500);
                }
            });
        }
    }
    function setBrand(e){
        if(e){
            if(e.type === "click"){
                var tagel = e.target.nodeName;
                var entry = "";
                if(tagel === "LI"){
                    entry = $(e.target);
                    obj.$form.find('input[name="category"]').val(entry.attr('data-category'));
                    obj.$form.find('input[name="page"]').val(1);
                }
                else if(tagel === "IMG"){
                    entry = $(e.target).parents("li");
                    obj.$form.find('input[name="category"]').val(entry.attr('data-category'));
                    obj.$form.find('input[name="page"]').val(1);
                }
                else if(tagel === "A"){
                    entry = $(e.target);
                    var brand = 'bk_branded_data_'+entry.attr('href').split('=')[1];
                    obj.$form.find('input[name="category"]').val(brand);
                    obj.$form.find('input[name="page"]').val(1);
                    $('.megamenu li.active').trigger('click');
                }
                update();
            }
            else if(typeof e === "string"){
                var brand = obj.$form.find('[data-category="'+e+'"]');
                if(brand.length == 1){
                    obj.$brands.removeClass('active');
                    brand.addClass('active');
                    obj.$form.find('input[name="category"]').val(e);
                    update();
                }
                else{update();}
            }
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
    function formatNumber(n){return Number(n).toLocaleString('en-US')}
    // Initialize app.
    init()
}(jQuery))

// Toggle Sidebar
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
    }
    init();
}(jQuery))
