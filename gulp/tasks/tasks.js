var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    minimist = require('minimist'),
    environmentVariable = require('./environment-variable'),
    config = require('./config.json'),
    argv = require('yargs').argv;

gulp.task('watch', function(){

    gulp.watch(config.src + '/scss/**/*.scss', ['css']);
    gulp.watch(config.src + '/js/**/*.js', ['js']);
    gulp.watch(config.src + '/html-template/**/*', ['html']);
    gulp.watch(config.src + '/img/**/*', ['image']);
    gulp.watch(config.src + '/img/sprite/*', ['sprite']);
    gulp.watch(config.src + '/font/**/*', ['font']);
    gulp.watch(config.src + '/mock/**/*', ['mock']);
    gulp.watch(config.src + '/svg/**/*', ['svg']);
});

gulp.task('assets', function(){

    del(
        [
            config.backend_resources_path + '/img',
            config.backend_resources_path + '/svg',
            config.backend_resources_path + '/js',
            config.backend_resources_path + '/css'
        ],
        function(){

            gulp.src(config.dest + '/svg/**/*')
                .pipe(gulp.dest(config.backend_resources_path + '/svg'));

            gulp.src(config.dest + '/img/**/*')
                .pipe(gulp.dest(config.backend_resources_path + '/img'));

            gulp.src(config.dest + '/js/**/*')
                .pipe(gulp.dest(config.backend_resources_path + '/js'));

            gulp.src(config.dest + '/css/**/*')
                .pipe(gulp.dest(config.backend_resources_path + '/css'));
        }
    );
});

gulp.task('build', function(callback){

    runSequence(
        'clean',
        [
            'css',
            'image',
            'sprite',
            'svg',
            'js',
            'mock',
            'font',
            'html'
        ],
        callback
    );
});

var options = minimist(process.argv.slice(2), {string: 'only'});
gulp.task('build-prod', function(callback){

    environmentVariable.setEnv(true);

    var onlyWhichTask = options.only;

    if (onlyWhichTask) {

        runSequence(
            onlyWhichTask,
            callback
        );
    } else {

        runSequence(
            'build',
            callback
        );
    }
});

gulp.task('install', function(callback){

    environmentVariable.setEnv(true);

    runSequence(
        'build',
        'assets',
        callback
    );
});

gulp.task('default', function(callback){

    if (argv.l) {

        environmentVariable.setLive();
    }

    runSequence(
        'clean',
        'build',
        [
            'watch',
            'connect'
        ],
        callback
    );
});
