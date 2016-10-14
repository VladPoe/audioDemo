var gulp = require('gulp'),
    config = require('../config.json');

gulp.task('font', function(){

    return gulp.src(config.src + '/font/**/*')
        .pipe(gulp.dest(config.dest + '/css/font'));
});