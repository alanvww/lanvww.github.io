// Junhao Ren
// audio.js

// WebAudio context
let audioCtx;

// variables
let element, sourceNode, analyserNode, gainNode, distortionFilter;
let distortionAmount = 20;

// Chrome Player Fix
const DEFAULTS = Object.freeze({
    gain: .5,
    numSamples: 256
});

// create a new array of 8-bit integers (0-255)
let audioData = new Uint8Array(DEFAULTS.numSamples / 2);

// setupWebaudio()
// Param: filePath
function setupWebaudio(filePath) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // creates an <audio> element
    element = new Audio();

    // Link audio file
    loadSoundFile(filePath);

    // create an a source node
    sourceNode = audioCtx.createMediaElementSource(element);

    //create an analyser node
    analyserNode = audioCtx.createAnalyser();

    // fft stands for Fast Fourier Transform
    analyserNode.fftSize = DEFAULTS.numSamples;

    // create a gain (volume) node
    gainNode = audioCtx.createGain();
    gainNode.gain.value = DEFAULTS.gain;

    // create distortionFilter
    distortionFilter = audioCtx.createWaveShaper();

    // connect the nodes
    sourceNode.connect(distortionFilter);
    distortionFilter.connect(gainNode);
    gainNode.connect(analyserNode);
    analyserNode.connect(audioCtx.destination);
}

// loadSoundFile()
// Param: filePath
// load the audio file
function loadSoundFile(filePath) {
    element.src = filePath;
}

// playCurrentSound()
function playCurrentSound() {
    element.play();
}

// pauseCurrentSound()
function pauseCurrentSound() {
    element.pause();
}

// setVolume()
// Param： value
function setVolume(value) {
    value = Number(value); // make sure that it's a Number rather than a String
    gainNode.gain.value = value;
}

// duration()
// Return the duration of music in element
// Formatted by the timeFormat()
function duration() {
    let minutes = Math.floor(element.duration / 60);
    let seconds = Math.floor(element.duration % 60);
    return timeFormat(minutes, seconds);

}

// currentTime()
// Return the current time of music in element
// Formatted by the timeFormat()
function currentTime() {
    let minutes = Math.floor(element.currentTime / 60);
    let seconds = Math.floor(element.currentTime % 60);
    return timeFormat(minutes, seconds);
}

// timeFormat()
// Param: min, sec
// Get the min and sec and format them into the string
function timeFormat(min, sec) {
    let minutesResult, secondsResult;

    // Add one leading zero when the number smaller than 10
    if (min < 10) {
        minutesResult = `0${min}`
    } else {
        minutesResult = `${min}`
    }

    if (sec < 10) {
        secondsResult = `0${sec}`
    } else {
        secondsResult = `${sec}`
    }

    return `${minutesResult}:${secondsResult}`;
}

// durationInSeconds()
// Return duration in seconds
function durationInSeconds() {
    return element.duration;
}

// currentTimeInSeconds()
// Return currentTime in seconds
function currentTimeInSeconds() {
    return element.currentTime;
}

// makeDistortionCurve()
// Setup the distortion curve
function makeDistortionCurve(amount = 20) {
    let n_samples = 256,
        curve = new Float32Array(n_samples);
    for (let i = 0; i < n_samples; ++i) {
        let x = i * 2 / n_samples - 1;
        curve[i] = x * Math.cos(x) * amount;
    }
    return curve;
}

// toggleDistortion()
// Turn on and off the distortion
function toggleDistortion(distortion = false) {
    if (distortion) {
        distortionFilter.curve = null;
        distortionFilter.curve = makeDistortionCurve(distortionAmount);
        console.log("Distortion on");
    } else {
        distortionFilter.curve = null;
        console.log("Distortion off");
    }
}

// setDistortionAmount()
// PAram: val, distortion
function setDistortionAmount(val,distortion){
    distortionAmount = val;
    toggleDistortion(distortion);
}

export {
    audioCtx,
    setupWebaudio,
    playCurrentSound,
    pauseCurrentSound,
    loadSoundFile,
    setVolume,
    analyserNode,
    duration,
    currentTime,
    durationInSeconds,
    currentTimeInSeconds,
    toggleDistortion,
    setDistortionAmount
}
