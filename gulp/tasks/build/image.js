var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    gulpif = require('gulp-if'),
    environmentVariable = require('../environment-variable'),
    config = require('../config.json');

gulp.task('image', function(){

    var is_prod = environmentVariable.getEnv();

    return gulp.src([config.src + '/img/**/*', '!' + config.src + '/img/sprite/*'])
        .pipe(gulpif(is_prod, imagemin({
            progressive: true
        })))
        .pipe(gulp.dest(config.dest + '/img'));
});
