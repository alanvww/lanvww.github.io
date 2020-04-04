// Junhao Ren
// canvas.js

import * as utils from './utils.js';

// Variables
let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData, noiseValue;

// setupCanvas()
// Param: canvasElement, analyserNodeRef
function setupCanvas(canvasElement, analyserNodeRef) {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;

    // create a gradient that runs top to bottom
    gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{
        percent: 0,
        color: "black"
    }, {
        percent: 0.75,
        color: "purple"
    }, {
        percent: 1,
        color: "black"
    }]);

    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;

    // this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 2);
}

// clearCanvas()
// clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasWidth);
}

// draw()
// Param: params object
function draw(params = {}) {
    // populate the audioData array with the frequency/waveform data from the analyserNode
    if (params.toggleData) {
        analyserNode.getByteFrequencyData(audioData);
    } else {
        analyserNode.getByteTimeDomainData(audioData);
    }

    // draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // draw gradient
    if (params.showGradient) {
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
    }

    // draw bars
    if (params.showBars) {
        let fullCircle = 2 * Math.PI;
        let barSpacing = 4;
        let margin = 5;
        let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2;
        let barWidth = screenWidthForBars / audioData.length;
        let barHeight = window.innerHeight * 0.05;
        let topSpacing = window.innerHeight * 0.1;

        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.50)';
        ctx.strokeStyle = 'rgba(0,0,0,0.50)';
        for (let i = 0; i < audioData.length; i++) {
            ctx.fillRect(margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight);
            ctx.strokeRect(margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight);
        }
        ctx.restore();
    }

    // draw lines
    if (params.showLines) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();

        let sliceWidth = canvasWidth / analyserNode.frequencyBinCount;
        let x = 0;

        for (let i = 0; i < analyserNode.frequencyBinCount; i++) {
            let y = audioData[i] / 256 * canvasHeight / 2;

            // Change mode base on data source
            if (params.toggleData) {
                if (i == 0) {
                    ctx.moveTo(x, canvasHeight / 2 - y);
                } else {
                    ctx.lineTo(x, canvasHeight / 2 - y);
                }
            }

            if (!params.toggleData) {
                if (i == 0) {
                    ctx.moveTo(x, canvasHeight / 2);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            x += sliceWidth;
        }
        ctx.lineTo(canvasWidth, canvasHeight / 2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    // draw bezier curves
    if (params.showCurves) {
        let bufferLength = analyserNode.frequencyBinCount;
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.beginPath();


        for (let i = 0; i < bufferLength; i++) {
            ctx.moveTo(0, canvasHeight * (2 / 3))
            ctx.quadraticCurveTo(audioData[i], audioData[i], canvasWidth, canvasHeight * (2 / 3));
        }
        ctx.stroke();
        ctx.restore();
    }

    // draw circles
    if (params.showCircles) {
        let maxRadius = canvasHeight / 4;
        ctx.save();
        ctx.globalAlpha = 0.5;

        for (let i = 0; i < audioData.length; i++) {
            let percent = audioData[i] / 255;
            let circleRadius = percent * maxRadius;

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(255, 111, 111, .34 - percent / 3.0);
            ctx.arc(canvasWidth * percent, canvasHeight * percent, circleRadius, 0, 2 * Math.PI, false);
            ctx.arc(canvasWidth * (1 - percent), canvasHeight * percent, circleRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();


            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(0, 0, 111, .10 - percent / 10.0);
            ctx.arc(canvasWidth * percent, canvasHeight * percent, circleRadius * 1.5, 0, 2 * Math.PI, false);
            ctx.arc(canvasWidth * (1 - percent), canvasHeight * percent, circleRadius * 1.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(200, 200, 0, .5 - percent / 5.0);
            ctx.arc(canvasWidth * percent, canvasHeight * percent, circleRadius * 0.5, 0, 2 * Math.PI, false);
            ctx.arc(canvasWidth * (1 - percent), canvasHeight * percent, circleRadius * 0.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore();
    }

    // draw triangles
    if (params.showTriangles) {
        let triWidth = canvasHeight / 3;
        let triHeight = canvasHeight / 3;
        ctx.save();
        ctx.globalAlpha = 0.5;

        for (let i = 0; i < audioData.length; i++) {
            let percent = audioData[i] / 255;
            triWidth = triWidth * percent;
            triHeight = triHeight * percent;

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(255, 111, 111, .5 - percent / 3.0);
            ctx.moveTo(canvasWidth / 2, canvasHeight / 2 - triHeight);
            ctx.lineTo(canvasWidth / 2 - triWidth, canvasHeight / 2);
            ctx.lineTo(canvasWidth / 2 + triWidth, canvasHeight / 2);
            ctx.fill();
            ctx.closePath();
            ctx.restore();


            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(0, 0, 111, .5 - percent / 3.0);
            ctx.moveTo(canvasWidth / 2, canvasHeight / 2 + triHeight);
            ctx.lineTo(canvasWidth / 2 - triWidth, canvasHeight / 2);
            ctx.lineTo(canvasWidth / 2 + triWidth, canvasHeight / 2);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore();
    }

    // Draw Noise
    // grab all of the pixels on the canvas and put them in the `data` array
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;
    // Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i += 4) {
        // randomly change every 20th pixel to red
        if (params.showNoise && Math.random() < noiseValue) {
            // data[i] is the red channel
            // data[i+1] is the green channel
            // data[i+2] is the blue channel
            // data[i+3] is the alpha channel
            data[i] = data[i + 1] = data[i + 2] = 0; // zero out the red and green and blue channels
            // White noise
            data[i] = 100;
            data[i + 1] = 100;
            data[i + 2] = 100;
        } // end if

        if (params.showInvert) {
            let red = data[i],
                green = data[i + 1],
                blue = data[i + 2];
            data[i] = 255 - red;
            data[i + 1] = 255 - green;
            data[i + 2] = 255 - blue;
        }
    } // end for

    // Draw Emboss
    if (params.showEmboss) {
        for (let i = 0; i < length; i++) {
            if (i % 4 == 3) continue;
            data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
    }

    // copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);
}

// setNoiseValue
// Param: val
function setNoiseValue(val) {
    noiseValue = val;
}

export {
    setupCanvas,
    draw,
    clearCanvas,
    setNoiseValue
};