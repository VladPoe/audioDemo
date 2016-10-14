var gulp = require('gulp'),
    config = require('../config.json');

gulp.task('mock', function(){

    return gulp.src(config.src + '/mock/**/*')
        .pipe(gulp.dest(config.dest + '/mock/'));
});