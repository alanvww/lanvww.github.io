"use strict";
let canvas, ctx;
const canvasWidth = window.innerWidth * 0.9,
    canvasHeight = window.innerHeight * 0.7;
let fps = 12;
let grad;
let color = "red";
let cellWidth = 10;
let lifeworld;
let mouseX, mouseY;
let titleHeight = 100;
let shape;
let radioButtons;

window.onload = _ => {
    init();
    setUI();
}

// init()
function init() {
    canvas = document.querySelector("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");

    lifeworld = new LifeWorld(Math.round(canvasWidth / cellWidth), Math.round(canvasHeight / cellWidth));
    loop();
}

// loop()
function loop() {
    setTimeout(loop, 1000 / fps);
    renLIB.drawBackground();
    renLIB.drawWorld(shape);
    lifeworld.step();
}

function setUI() {

    // Mouse Click event
    canvas.addEventListener('click', event => {
        mouseX = event.clientX;
        mouseY = event.clientY - titleHeight;
        console.log(mouseX, mouseY);
        lifeworld = new LifeWorld(Math.round(mouseX / cellWidth), Math.round(mouseY / cellWidth));

    });

    // RadioButtons event
    radioButtons = document.querySelectorAll(".radioButton");
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', function () {
            if (radioButtons[i].checked) {
                shape = radioButtons[i].value;
                lifeworld = new LifeWorld(Math.round(canvasWidth / cellWidth), Math.round(canvasHeight / cellWidth));
            }
        })
    }

    // FPS Slider
    let fpsSlider = document.querySelector("#fpsRange");
    let fpsOutput = document.querySelector("#fpsValue");
    fpsOutput.innerHTML = fpsSlider.value;

    fpsSlider.oninput = function () {
        fpsOutput.innerHTML = this.value;
    }

    // FPS Slider - Regenerate the world after value change
    document.querySelector('#fpsRange').onchange = function (e) {
        fps = e.target.value;
        lifeworld = new LifeWorld(Math.round(canvasWidth / cellWidth), Math.round(canvasHeight / cellWidth));
    };

    // Cell Size Slider
    let cellSizeSlider = document.querySelector("#cellSizeRange");
    let cellSizeOutput = document.querySelector("#cellSizeValue");
    cellSizeOutput.innerHTML = cellSizeSlider.value;

    cellSizeSlider.oninput = function () {
        cellSizeOutput.innerHTML = this.value;
    }

    // Cell Size Slider - Regenerate the world after value change
    document.querySelector('#cellSizeRange').onchange = function (e) {
        cellWidth = e.target.value;
        lifeworld = new LifeWorld(Math.round(canvasWidth / cellWidth), Math.round(canvasHeight / cellWidth));
    };

    // Replay Button
    document.querySelector("#replayButton").addEventListener('click', event => {
        lifeworld = new LifeWorld(Math.round(canvasWidth / cellWidth), Math.round(canvasHeight / cellWidth));
    });

    // Random Button
    document.querySelector("#randomButton").addEventListener('click', event => {
        renLIB.randomness();
        lifeworld = new LifeWorld(Math.round(canvasWidth / cellWidth), Math.round(canvasHeight / cellWidth));
    });

    // Color Select
    document.querySelector('#colorChooser').onchange = function (e) {
        if (e.target.value == "Rainbow gradient") {
            color = renLIB.getRainbowGradient();
            renLIB.setColor();
        } else if (e.target.value == "radGradient") {
            color = renLIB.getRadGradient();
            renLIB.setColor();
        } else if (e.target.value == "Blue purple gradient") {
            color = renLIB.getBluePurpleGradient();
            renLIB.setColor();
        } else if (e.target.value == "Yellow green gradient") {
            color = renLIB.getYellowGreenGradient();
            renLIB.setColor();
        } else {
            color = e.target.value;
            renLIB.setColor(color);
        }
        lifeworld = new LifeWorld(Math.round(canvasWidth / cellWidth), Math.round(canvasHeight / cellWidth));
    };

}
