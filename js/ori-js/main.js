"use strict";


const DEFAULT = {
    oWidth: 300,
    oHeight: 400,
    oGap: 0,
    oX: window.innerWidth * 1.5 / 4,
    oY: window.innerHeight * 2 / 4 + 50,
    iWidth: 300,
    iHeight: 200,
    iGap: 60,
    iX: window.innerWidth * 1.5 / 4,
    iY: window.innerHeight * 2 / 4 + 50
};

let oWidth = 300,
    oHeight = 400,
    oGap = 0,
    oX, oY;
let rWidth, rHeight, rX, rY, rGap;
let iWidth = 300,
    iHeight = 200,
    iGap = 60,
    iX, iY;

let controlX, oControlY, controlWidth, controlHeight;

let seed;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight * 0.97);
    colorMode(HSB);
    strokeWeight(4);

    oX = window.innerWidth * 1.5 / 4;
    oY = window.innerHeight * 2 / 4 + 50;

    iX = window.innerWidth * 1.5 / 4;
    iY = window.innerHeight * 2 / 4 + 50;

    rX = window.innerWidth * 1.5 / 4;
    rY = window.innerHeight * 2 / 4 + 50;


    seed = Math.random();
    print(seed);
}

window.addEventListener("resize", () => {
    setup();
    console.log("Canvas Resized");
});

function draw() {
    colorApply("Background");

    noFill();
    stroke(100);

    // Outer
    beginShape();
    vertex(oX, oY);
    vertex(oX + oWidth, oY);
    vertex(oX + oWidth + oGap, oY - oHeight);
    vertex(oX - oGap, oY - oHeight);
    vertex(oX, oY);
    endShape();

    // Inner
    beginShape();
    vertex(iX, iY);
    vertex(iX + iWidth, iY);
    vertex(iX + iWidth + iGap, iY + iHeight);
    vertex(iX - iGap, iY + iHeight);
    vertex(iX, iY);
    endShape();



    // Reality
    rWidth = oWidth;
    rHeight = -0.8 * (oHeight - iHeight);
    rGap = 0.6 * iGap;
    strokeJoin(ROUND);
    colorApply("RFill");
    noStroke();

    beginShape();
    vertex(rX, rY);
    vertex(rX + rGap, rY + rHeight);
    vertex(rX + rWidth - rGap, rY + rHeight);
    vertex(rX + oWidth, rY);
    endShape();

    controlX = window.innerWidth * 3.25 / 4;
    controlHeight = 100;
    controlWidth = 100;

    colorApply("Stroke");
    // Outer Line
    line(oX - oGap, oY - oHeight, controlX, oY - oHeight);
    // Inner Line
    line(iX - iGap, iY + iHeight, controlX, iY + iHeight);

    // Reality
    colorApply("RStroke");
    line(rX + rGap + 2, rY + rHeight, controlX, rY + rHeight);


    noStroke();
    colorApply("ControlFill");
    // Outer Control Box
    rect(controlX, oY - oHeight - controlHeight / 2, controlWidth, controlHeight);
    // Inner Control Box
    rect(controlX, iY + iHeight - controlHeight / 2, controlWidth, controlHeight);
    // Reality Indicator
    colorApply("RFill");
    rect(controlX, rY + rHeight - controlHeight / 8, controlWidth, controlHeight / 4);

    stroke(100);
    // Controls Line 
    line(controlX, 0, controlX, window.innerHeight);
    line(controlX + controlWidth, 0, controlX + controlWidth, window.innerHeight);

    noStroke();
    textSize(32);
    colorApply("ControlFill");
    text('O', controlX - 50, oY - oHeight - 5);
    text('I', controlX - 50, iY + iHeight - 5);
    colorApply("RFill");
    text('R', controlX - 50, rY + rHeight - 5);

    textSize(150);
    text('Reality', 40, 250);
    colorApply("ControlFill");
    text('Inner', 100, 320);
    text('Outer', 20, 175);


}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function mouseDragged() {
    let temOHeight;
    // Outer Control
    if (oY - winMouseY >= 0 && winMouseY >= DEFAULT.oY - 400 && winMouseY >= oY - oHeight - controlHeight / 2 && winMouseY <= oY - oHeight + controlHeight / 2) {
        oHeight = oY - winMouseY;
        oGap = 0.2 * (DEFAULT.oHeight - oHeight);
    }
    //gapCheck(temOHeight);


    // Inner Control
    if (-iY + winMouseY > 0 && winMouseY <= DEFAULT.iY + DEFAULT.iHeight && winMouseY > iY + iHeight - controlHeight / 2 && winMouseY < iY + iHeight + controlHeight / 2) {
        let iNewHeight = winMouseY;
        let temIHeight = iHeight;
        iHeight = -iY + iNewHeight;
    }
}


function colorApply(type) {
    if (type == "Stroke") {
        if (seed < 1 / 4) {
            stroke('#1E9C89');
        } else if (seed < 2 / 4) {
            stroke('#35179E');
        } else if (seed < 3 / 4) {
            stroke('#9E261A');
        } else {
            stroke('F0F0F0');
        }
    } else if (type == "ControlFill") {
        if (seed < 1 / 4) {
            fill('#1E9C89');
        } else if (seed < 2 / 4) {
            fill('#35179E');
        } else if (seed < 3 / 4) {
            fill('#9E261A');
        } else {
            fill('F0F0F0');
        }
    } else if (type == "RFill") {
        if (seed < 1 / 4) {
            fill('#9C2E2D');
        } else if (seed < 2 / 4) {
            fill('#835BC9');
        } else if (seed < 3 / 4) {
            fill('#1E9E94');
        } else {
            fill('#4D4D4D');
        }
    } else if (type == "RStroke") {
        if (seed < 1 / 4) {
            stroke('#9C2E2D');
        } else if (seed < 2 / 4) {
            stroke('#835BC9');
        } else if (seed < 3 / 4) {
            stroke('#1E9E94');
        } else {
            stroke('#4D4D4D');
        }
    } else if (type == "Background") {
        if (seed < 1 / 4) {
            background('#0A3316');
        } else if (seed < 2 / 4) {
            background('#081533');
        } else if (seed < 3 / 4) {
            background('#330808');
        } else {
            background(0);
        }
    }
}