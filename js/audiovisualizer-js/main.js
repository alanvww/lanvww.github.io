// Junhao Ren
// main.js



// import the modules
import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

// drawing parameters
let drawParams = {
    toggleData: true,
    showGradient: true,
    showBars: true,
    showLines: false,
    showCurves: false,
    showCircles: false,
    showTriangles: true,
    showNoise: false,
    showInvert: false,
    showEmboss: false
};

// Chrome Audio Player Fix
const DEFAULTS = Object.freeze({
    sound1: "src/media/music/Meishi Smile Remix.mp3"
});


// init()
function init() {
    audio.setupWebaudio(DEFAULTS.sound1);
    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    canvasElement.width = window.innerWidth * 0.99;
    canvasElement.height = window.innerHeight * 0.5;
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement, audio.analyserNode);
    loop();
}

// windowChange()
// Reset canvas when the window size is change
function windowChange() {
    canvas.clearCanvas();
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight * 0.5;
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement, audio.analyserNode);
}

// setupUI()
function setupUI(canvasElement) {
    // Full Screen button
    const fsButton = document.querySelector("#fsButton");
    fsButton.onclick = e => {
        console.log("init called");
        utils.goFullscreen(canvasElement);
    };


    // Play Button
    playButton.onclick = e => {
        console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        // check if context is in suspended state (autoplay policy)
        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }
        console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
        if (e.target.dataset.playing == "no") {
            // if track is currently paused, play it
            audio.playCurrentSound();
            e.target.dataset.playing = "yes";
        } else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no";
        }
    };

    // Volume Slider and label
    let volumeSlider = document.querySelector("#volumeSlider");
    let volumeLabel = document.querySelector("#volumeLabel");

    // add .oninput event to slider
    volumeSlider.oninput = e => {
        // Set the gain
        audio.setVolume(e.target.value);
        // update value of label to match value of slider
        volumeLabel.innerHTML = Math.round((e.target.value * 100));
    };

    // set value of label to match initial value of slider
    volumeSlider.dispatchEvent(new Event("input"));


    // Noise Slider and label
    let noiseSlider = document.querySelector("#noiseSlider");
    let noiseLabel = document.querySelector("#noiseLabel");
    noiseSlider.oninput = e => {
        if (noiseSlider.value > 0) {
            drawParams.showNoise = true;
            canvas.setNoiseValue(noiseSlider.value);
            noiseLabel.innerHTML = noiseSlider.value;
        } else {
            drawParams.showNoise = false;
            noiseLabel.innerHTML = 0;
        }
    };
    noiseSlider.dispatchEvent(new Event("input"));


    // Distortion Slider and label
    let distortionSlider = document.querySelector("#distortionSlider");
    let distortionLabel = document.querySelector("#distortionLabel");
    distortionSlider.onchange = e => {
        distortionLabel.innerHTML = distortionSlider.value;
        audio.setDistortionAmount(distortionSlider.value, document.querySelector("#soundEffect2").checked);
    }
    distortionSlider.dispatchEvent(new Event("input"));

    // Track Seletor
    let trackSelect = document.querySelector("#trackSelect");
    // add .onchange event to <select>
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);

        // Reset the value of progress
        document.querySelector("#current-time").innerHTML = audio.currentTime();
        document.querySelector("#soundEffect1").checked = true;
        audio.toggleDistortion(false);

        // pause the current track if it is playing
        if (playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
        if (e.target.value == "src/media/music/Meishi Smile Remix.mp3") {
            document.querySelector('img').src = "src/media/img/smile-album.png";
        } else if (e.target.value == "src/media/music/Merry Christmas Mr. Lawrence.mp3") {
            document.querySelector('img').src = "src/media/img/larwence.png";
        } else {
            document.querySelector('img').src = "src/media/img/EndlessFantasy.jpg";
        }
    };

    // Sound Effect Radio Button Group

    // Radio Button 1
    document.querySelector("#soundEffect1").addEventListener('change', function () {
        if (document.querySelector("#soundEffect1").checked) {
            audio.toggleDistortion(false);
        }
    });

    // Radio Button 2
    document.querySelector("#soundEffect2").addEventListener('change', function () {
        if (document.querySelector("#soundEffect2").checked) {
            audio.toggleDistortion(true);
        }
    });

    // Data Source Radio Button Group

    // Frequency Radio Button
    document.querySelector("#frequency").addEventListener('change', function () {
        if (document.querySelector("#frequency").checked) {
            drawParams.toggleData = true;
        }
    });

    // Waveform Radio Button
    document.querySelector("#waveform").addEventListener('change', function () {
        if (document.querySelector("#waveform").checked) {
            drawParams.toggleData = false;
        }
    });

    // Gradient Checkbox
    let gradientCheckBox = document.querySelector("#gradientCB");
    gradientCheckBox.onchange = e => {
        if (gradientCheckBox.checked) {
            drawParams.showGradient = true;
        } else {
            drawParams.showGradient = false;
        }
    }

    // showBars Checkbox
    let barCheckBox = document.querySelector("#barsCB");
    barCheckBox.onchange = e => {
        if (barCheckBox.checked) {
            drawParams.showBars = true;
        } else {
            drawParams.showBars = false;
        }
    }

    // showLines Checkbox
    let lineCheckBox = document.querySelector("#linesCB");
    lineCheckBox.onchange = e => {
        if (lineCheckBox.checked) {
            drawParams.showLines = true;
        } else {
            drawParams.showLines = false;
        }
    }

    // showCurves Checkbox
    let curveCheckBox = document.querySelector("#curvesCB");
    curveCheckBox.onchange = e => {
        if (curveCheckBox.checked) {
            drawParams.showCurves = true;
        } else {
            drawParams.showCurves = false;
        }
    }

    // showCircles Checkbox
    let circleCheckBox = document.querySelector("#circlesCB");
    circleCheckBox.onchange = e => {
        if (circleCheckBox.checked) {
            drawParams.showCircles = true;
        } else {
            drawParams.showCircles = false;
        }
    }

    // showTriangles Checkbox
    let triangleCheckBox = document.querySelector("#triangleCB");
    triangleCheckBox.onchange = e => {
        if (triangleCheckBox.checked) {
            drawParams.showTriangles = true;
        } else {
            drawParams.showTriangles = false;
        }
    }

    // showInvert Checkbox
    let invertCheckBox = document.querySelector("#invertCB");
    invertCheckBox.onchange = e => {
        if (invertCheckBox.checked) {
            drawParams.showInvert = true;
        } else {
            drawParams.showInvert = false;
        }
    }

    // showEmboss Checkbox
    let embossCheckBox = document.querySelector("#embossCB");
    embossCheckBox.onchange = e => {
        if (embossCheckBox.checked) {
            drawParams.showEmboss = true;
        } else {
            drawParams.showEmboss = false;
        }
    }

} // end setupUI

function loop() {
    /* NOTE: This is temporary testing code that we will delete in Part II */
    requestAnimationFrame(loop);

    // Setup the progress bar
    let progressbar = document.querySelector("#indicator");
    if (playButton.dataset.playing == "yes") {
        // Show Current-time
        document.querySelector("#current-time").innerHTML = audio.currentTime();
        progressbar.max = Math.round(audio.durationInSeconds());
        progressbar.value = Math.round(audio.currentTimeInSeconds());
    } else {
        progressbar.value = 0;
    }
    // Show Duration
    document.querySelector("#duration").innerHTML = audio.duration();
    canvas.draw(drawParams);

}

export {
    init,
    windowChange
};