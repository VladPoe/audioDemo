var gulp = require('gulp'),
    del = require('del'),
    config = require('../config.json');

gulp.task('clean', function(cb){

    del([config.dest], cb);
});
