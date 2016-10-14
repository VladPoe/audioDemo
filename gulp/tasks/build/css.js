var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    environmentVariable = require('../environment-variable'),
    sourcemaps = require('gulp-sourcemaps'),
    config = require('../config.json'),
    connect = require('gulp-connect'),
    inject = require('gulp-inject');

gulp.task('css-inject-block', function(){

    return gulp
        .src(config.src + '/scss/controller.scss')
        .pipe(inject(
            gulp.src(config.src + '/scss/block/**/*.scss', {read: false}),
            {
                name: 'block',
                relative: true,
                transform: function (filepath) {

                    var ext = '.scss';
                    return '@import \'' + filepath.substring(0, filepath.length - ext.length) + '\';';
                }
            }
        ))
        .pipe(gulp.dest(config.src + '/scss/'));
});

gulp.task('css', ['css-lint', 'css-inject-block'], function(){

    var is_prod = environmentVariable.getEnv(),
        livereload = environmentVariable.getLive();

    return sass(
        config.src + '/scss/controller.scss',
        {
            style: 'expanded',
            sourcemap: !is_prod
        }
    )
        .on('error', function(err){

            console.error('Error!', err.message);
        })
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulpif(is_prod, minifyCss()))
        .pipe(rename({basename: 'style'}))
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(gulpif(livereload, connect.reload()));
});
