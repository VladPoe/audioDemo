var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    environmentVariable = require('../environment-variable'),
    merge = require('merge-stream'),
    config = require('../config.json'),
    connect = require('gulp-connect');

gulp.task('js', ['html', 'js-lint'], function(){

    var is_prod = environmentVariable.getEnv(),
        livereload = environmentVariable.getLive(),
        assets = useref.assets(),
        use_ref_stream,
        copy_js_stream,
        copy_bower_stream;

    // for prod
    use_ref_stream = gulpif(is_prod, gulp.src(config.dest + '/*.html'))
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(config.dest));

    // for dev
    copy_js_stream = gulp.src(config.src + '/js/**/*.js')
        .pipe(gulpif(!is_prod, gulp.dest(config.dest + '/js')))
        .pipe(gulpif(livereload, connect.reload()));

    copy_bower_stream = gulp.src('./bower_components/**/*.js')
        .pipe(gulpif(!is_prod, gulp.dest(config.dest + '/bower_components')));

    if (is_prod) {

        return use_ref_stream;
    }

    return merge(copy_js_stream, copy_bower_stream);
});
