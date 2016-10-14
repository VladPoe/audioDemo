var gulp = require('gulp'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    data = require('gulp-data'),
    file = require('gulp-file'),
    merge = require('merge-stream'),
    config = require('../config.json');

gulp.task('svg', function(){

    var js_sprite_stream,
        svg_stream;

    js_sprite_stream = gulp
        .src(config.src + '/svg/js-sprite/**/*.svg')
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(data(function(svgFile){

            var string = 'var svgsprite = \'' + svgFile.contents + '\'';
            return file('js-sprite.js', string, {src: true}).pipe(gulp.dest(config.dest + '/svg'));
        }));

    svg_stream = gulp
        .src(config.src + '/svg/svg-icons/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest(config.dest + '/svg'));

    return merge(js_sprite_stream, svg_stream);
});
