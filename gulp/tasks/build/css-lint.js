var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    environmentVariable = require('../environment-variable'),
    config = require('../config.json'),
    scsslint = require('gulp-scss-lint');

gulp.task('css-lint', function(){

    var is_prod = environmentVariable.getEnv();

    return gulp.src([config.src + '/scss/**/*.scss', '!' + config.src + '/scss/set/reset.scss'])
        .pipe(scsslint({
            config: 'scss-lint.yml'
        }));
});
