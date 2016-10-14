
var context = new AudioContext(),
    mousedown = false,
    oscillator;
var gainNode = context.createGain();

document.body.addEventListener('mousedown', function (e) {
    mousedown = true;
    oscillator = context.createOscillator();
    oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.05);
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(context.currentTime);
});


document.body.addEventListener('mouseup', function () {
    mousedown = false;
    oscillator.stop(context.currentTime);
    oscillator.disconnect();
});


document.body.addEventListener('mousemove', function (e) {
    if (mousedown) {
        oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.05);
        gainNode.gain.setTargetAtTime(calculateGain(e.clientY), context.currentTime, 0.01);
    }
});


var calculateFrequency = function (mouseXPosition) {
    var minFrequency = 20;
    var maxFrequency = 2000;
    var windowWidth = window.innerWidth;

    return ((mouseXPosition / windowWidth) * maxFrequency) + minFrequency;
};

var calculateGain = function (mouseYPosition) {
    var minVolume = 0;
    var maxVolume = 1;
    var windowHeight = window.innerHeight;

    return 1 - ((mouseYPosition / window.innerHeight) * maxVolume) + minVolume;

};
