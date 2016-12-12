var gulp = require('gulp');
var must = require("gulp-mustache");
var beau = require('gulp-html-beautify');
var name = require('gulp-rename');

gulp.task('default', function(){
    gulp.src([
            'dev/pages/index.mustache',
            'dev/pages/dmp.mustache',
            'dev/pages/inventory.mustache',
            'dev/pages/world-map-imps.mustache'
        ])
        .pipe(must())
        .pipe(beau())
        .pipe(name(function(path){path.extname = ".html";}))
        .pipe(gulp.dest('dev'))
});
