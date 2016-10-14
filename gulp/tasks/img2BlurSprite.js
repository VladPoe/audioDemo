var sizeOf = require('image-size');
var fs = require('fs');
var Jimp = require('jimp');
var path = require('path');
var base64Img = require('base64-img');
var mainConfigs = require('./config.json');


//configs
var config = {
    svgPatternFile: mainConfigs.src + '/scss/svg-blur-pattern.svg',
    widthToResize: 30,
    scssFile: mainConfigs.src + '/scss/set/' + 'blur-sprite.scss'
};
var imageDir = mainConfigs.src + '/img/blur_min';

//если директории не существует - выходим
if (!fs.existsSync(imageDir)){
    return;
}

var images = fs.readdirSync(imageDir).map(function(image){
    return imageDir + '/' + image;
});
//очищаем css
fs.exists(config.scssFile, function(exists){
    if (exists){
        if (exists){
            fs.writeFileSync(config.scssFile, '');
        }
    }
});
images.forEach(function(image){
    var imageFullName = path.basename(image);
    var imageExtension = path.extname(image);
    var imageName = imageFullName.replace(/\..*/g,'');

    //Если не jpg, то выходим
    if (!/jpe?g/im.test(imageExtension)) {
        return;
    }
    var dimensions = sizeOf(image);
    var heightPercentage = dimensions.height / dimensions.width;

    var dimensionsToResize = {
        width: config.widthToResize,
        height: config.widthToResize * heightPercentage
    };

    //ресайзим
    Jimp
        .read(image)
        .then(function (image) {
            var prom = new Promise(function(resolve, reject){
                image.resize(dimensionsToResize.width, dimensionsToResize.height)
                    .quality(60)
                    .write(imageDir + '/' + imageName + '--min-tmp' + imageExtension);
                resolve(imageDir + '/' + imageName + '--min-tmp' + imageExtension);
            });
            return prom;
        })
    //переводим в base64
        .then(function(image){
            var prom = new Promise(function(resolve){
                base64Img.base64(image, function(err, data) {
                    fs.unlink(image, function(err){
                        if (err) {
                            throw err
                        }
                    });
                    resolve(data);
                })
            });
            return prom;
        })
    //формируем закодированный в uri svg из svg шаблона и пехаем в scss спрайт
        .then(function(base64Image){
            var prom = new Promise(function(resolve){
                fs.readFile(config.svgPatternFile, "utf-8", function(err, data) {
                    var outputPattern = data
                        .replace(/{{width}}/g,dimensions.width)
                        .replace(/{{height}}/g, dimensions.height)
                        .replace(/{{image}}/g, base64Image);
                    //fs.writeFileSync('test.svg', outputPattern);
                    var svgUried = 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(outputPattern);
                    var outputScssString = '.blur--' + imageName + '{' + '\n' + 'background-image:' + 'url("' + svgUried + '");' + '\n' + '}' + '\n';
                    fs.appendFile(config.scssFile, outputScssString);
                    resolve();
                });
            });
        })
});
