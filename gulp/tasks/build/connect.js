var gulp = require('gulp'),
    environmentVariable = require('../environment-variable'),
    config = require('../config.json'),
    connect = require('gulp-connect');

gulp.task('connect', function(){

    var livereload = environmentVariable.getLive();

    connect.server({
        root: config.dest,
        port: 1234,
        livereload: livereload
    });
});
