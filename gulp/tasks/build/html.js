var gulp = require('gulp'),
    jade = require('gulp-jade'),
    config = require('../config.json'),
    environmentVariable = require('../environment-variable'),
    gulpif = require('gulp-if'),
    connect = require('gulp-connect'),
    use_jade = false;

gulp.task('html', function(){

    var livereload = environmentVariable.getLive(),
        markup_path = '**/*.html';

    if (use_jade) {

        markup_path = 'pages/**/*.jade';
    }

    return gulp.src(config.src + '/html-template/' + markup_path)
        .pipe(gulpif(use_jade, jade({
            pretty: true
        })))
        .on('error', function(err){

            console.error('Error!', err.message);
        })
        .pipe(gulp.dest(config.dest))
        .pipe(gulpif(livereload, connect.reload()));
});
