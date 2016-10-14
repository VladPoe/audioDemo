
var context = new AudioContext(),
    oscillator = null;

document.body.addEventListener('mousedown', function (e) {
    console.log(e.clientY);
    oscillator = context.createOscillator();
    //oscillator.frequency.value = calculateFrequency(e.clientY);
    oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientY), context.currentTime, 0.2);
    oscillator.connect(context.destination);
    oscillator.start(context.currentTime);
});

document.body.addEventListener('mouseup', function () {
    if (oscillator) {
        oscillator.stop(context.currentTime);
        oscillator.disconnect();
    }
});


var calculateFrequency = function (mouseYPosition) {
    var minFrequency = 20;
    var maxFrequency = 2000;
    var windowHeight = window.innerHeight;

    return ((mouseYPosition / windowHeight) * maxFrequency) + minFrequency;
};
