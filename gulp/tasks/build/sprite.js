var gulp = require('gulp'),
    spritesmith = require('gulp.spritesmith'),
    config = require('../config.json');

//запускается ручками, по мере необходимости
gulp.task('sprite', function () {
    var spriteData = gulp.src(config.src + '/img/sprite/*.*').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        padding: 4,
        algorithm: 'binary-tree',
        cssTemplate: config.src + '/scss/sprite.handlebars'
    }));
    spriteData.img.pipe(gulp.dest(config.src + '/img/'));
    spriteData.css.pipe(gulp.dest(config.src + '/scss/'));
});
