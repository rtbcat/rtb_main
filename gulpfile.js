var fs   = require('fs');
var gulp = require('gulp');
var must = require("gulp-mustache");
var beau = require('gulp-html-beautify');
var name = require('gulp-rename');
var repl = require('gulp-replace');
var msql = require('mysql');
var brnd =
{
    acxiom  			: "acxiom",
    adadvisor			: "adadvisorbyneustar",
    addthis 			: "addthis",
    affinity_answers	: "affinityanswers",
    alc                 : "alc",
    alliant 			: "alliant",
    analyticsIQ			: "analyticsiq",
    areyouhuman			: "areyouahuman",
    beintoo 			: "beintoo",
    blue_kangaroo		: "bluekangaroo",
    bombora 			: "bombora",
    comscore			: "comscore",
    connexity			: "connexity",
    crosspixel			: "crosspixel",
    datacratic			: "datacratic",
    datalab 			: "datalab",
    dataline			: "dataline",
    datalogix			: "datalogix",
    datamentors			: "datamentors",
    datamyx 			: "datamyx",
    dataxpand			: "dataxpand",
    delidatax			: "delidatax",
    dun_and_bradstreet	: "dunbradstreet",
    evite   			: "evite",
    experian			: "experian",
    experian_uk			: "experianuk",
    financial_audiences	: "financialaudiences",
    forbes  			: "forbes",
    gfk     			: "gfkmri",
    i_behavior			: "ibehavior",
    infogroup			: "infogroup",
    iri     		   	: "iriproscorescpg",
    ixi     			: "ixi",
    kantar_media		: "kantarmediatgi",
    lotame  			: "lotame",
    mastercard			: "mastercard",
    media_source        : "mediasource",
    merkle              : "merkle",
    omni                : "omnidigitalbymeritdirect",
    omnibus             : "omnibus",
    profound            : "profound",
    pushspring          : "pushspring",
    scanbuy             : "scanbuy",
    sirdata             : "sirdata",
    sms                 : "sms",
    solve_media         : "solvemedia",
    transunion          : "transunion",
    trusignal           : "trusignal",
    twine               : "twinedata",
    v12                 : "v12group",
    vendigi             : "vendigi",
    visavue             : "visavueaudiencespoweredbydlx",
    webbula             : "webbula"
}
gulp.task('build', function(){
    gulp.src([
            'dev/pages/index.mustache',
            'dev/pages/dmp.mustache',
            'dev/pages/inventory.mustache',
            'dev/pages/world-map-imps.mustache',
            'dev/pages/about-us.mustache',
            'dev/pages/template.mustache',
            'dev/pages/story-board.mustache',
            'dev/pages/fill-rate-tool.mustache',
            'dev/pages/appnexus-co-pilot.mustache',
            'dev/pages/programmatic-audio.mustache',
            'dev/pages/proprietary-bidder.mustache'
        ])
        .pipe(must()).pipe(beau())
        .pipe(name(function(path){path.extname = ".html";}))
        .pipe(gulp.dest('./'))
});

gulp.task('write_standard_ads',function(){
    var con = msql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "appnexus_data"
    });
    con.connect(function(err){if(err){console.log('Error connecting to Db');return;};console.log('Connection established');});
    var query = "SELECT * FROM `inventory_all` WHERE `inventory_type`='standard' AND `include`=1 ORDER BY `total_imps` DESC";
    con.query(query,function(err,rows){
        if(err) throw err;
        var html = "";
        for(let i in rows){
            var id   = rows[i].seller_member_id;
            var name = rows[i].seller_member_name;
            var logo = rows[i].logo_name;
            var url  = rows[i].website_url;
            var file = 'images/sellers-logo/';

            if(logo.length > 0){
                file += logo+'.jpg';
            }else{
                file += id+'.jpg';
            }
            html +=
            '<div class="item-square">'+
                '<a href="'+url+'" target="_blank" title="'+name+'"'+
                ' style="background-image: url(\''+file+'\')"></a>'+
            '</div>';
        }
        fs.writeFileSync('dev/partials/standard_ads.html',html);
    });
    con.end(function(err){console.log("DB connection end.");});
});

gulp.task('write_native_ads',function(){
    var con = msql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "appnexus_data"
    });
    con.connect(function(err){if(err){console.log('Error connecting to Db');return;};console.log('Connection established');});
    var query = "SELECT * FROM `inventory_all` WHERE `inventory_type`='native' AND `include`=1 ORDER BY `total_imps` DESC";
    con.query(query,function(err,rows){
        if(err) throw err;
        var html = "";
        for(let i in rows){
            var id   = rows[i].seller_member_id;
            var name = rows[i].seller_member_name;
            var logo = rows[i].logo_name;
            var url  = rows[i].website_url;
            var file = 'images/sellers-logo/';

            if(logo.length > 0){
                file += logo+'.jpg';
            }else{
                file += id+'.jpg';
            }
            html +=
            '<div class="item-square">'+
                '<a href="'+url+'" target="_blank" title="'+name+'"'+
                ' style="background-image: url(\''+file+'\')"></a>'+
            '</div>';
        }
        fs.writeFileSync('dev/partials/native_ads.html',html);
    });
    con.end(function(err){console.log("DB connection end.");});
});

gulp.task('watch', function(){
    gulp.watch(['dev/pages/*.mustache','dev/partials/*'],['build']);
});
// gulp.task('temp', function(){
//     var fs = require('fs');
//     var logos = fs.readdirSync('temp/images/suppliers');
//     var table = "";
//     for(let i=0; i<logos.length; i++){
//         var pscs = String(logos[i]).replace('-','_').split('.');
//         var bkey = pscs[0];
//         table += '<div class="item"><a href="dmp.html#brand='+brnd[bkey]+'" style="background-image:url(\'images/suppliers/'+logos[i]+'\')"></a></div>';
//     }
//
//     gulp.src('dev/partials/megamenu_tpl.html')
//         .pipe(repl(/\{\{\icons}\}/g, table))
//         .pipe(name('megamenu_html.html'))
//         .pipe(gulp.dest('dev/partials'))
// });

gulp.task('default',function(){});
