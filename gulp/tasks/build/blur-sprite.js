var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('blur-sprite', function (cb) {
    exec('node gulp/tasks/img2BlurSprite.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

//в конце мы получаем классы в спрайте blur-sprite.scss с размытым background-image, их можно использовать через @extend либо инлайнить в атрибут src у img