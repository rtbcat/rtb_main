var gulp = require('gulp');
var must = require("gulp-mustache");
var beau = require('gulp-html-beautify');
var name = require('gulp-rename');
var repl = require('gulp-replace');
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
            'dev/pages/world-map-imps.mustache'
        ])
        .pipe(must()).pipe(beau())
        .pipe(name(function(path){path.extname = ".html";}))
        .pipe(gulp.dest('temp'))
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
