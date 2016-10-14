var gulp = require('gulp'),
    config = require('../config.json'),
    jscs = require('gulp-jscs');

gulp.task('js-lint', function(){

    return gulp.src(config.src + '/js/**/*.js')
        .pipe(jscs({configPath: './.jscsrc'}))
        .pipe(jscs.reporter());
});
