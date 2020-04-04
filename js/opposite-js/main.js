"use strict";

let blackArray = [];
let whiteArray = [];
let redArray = [];
let totalLength = 2 * getRandomInt(5) + 4;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight*0.95);
    colorMode(HSB);
    background(100);
    noStroke();
    fill(100);
    rect(0, 0, window.innerWidth / 2, window.innerHeight);
    fill(0);
    rect(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);

    for (let i = 0; i < totalLength / 2; i++) {
        blackArray.push(new Circle((i + 0.5) * window.innerWidth / totalLength, window.innerHeight / 2, 25, 0));
        blackArray[i].drawIt();
        whiteArray.push(new Circle((i + 0.5) * window.innerWidth / totalLength + window.innerWidth / 2, window.innerHeight / 2, 25, 1));
        whiteArray[i].drawIt();
    }
}

function draw() {
    background(100);
    fill(100);
    rect(0, 0, window.innerWidth / 2, window.innerHeight);
    fill(0);
    rect(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);

    for (let i = 0; i < blackArray.length; i++) {
        blackArray[i].drawIt();
    }

    for (let j = 0; j < whiteArray.length; j++) {
        whiteArray[j].drawIt();
    }

    if (blackArray.length >= totalLength) {
        redArray.push(blackArray.pop());
    }

    if (whiteArray.length >= totalLength) {
        redArray.push(whiteArray.pop());
    }

    deadWalk();
}

function mousePressed() {

    if (blackArray.length != 0 && whiteArray.length != 0) {
        totalLength = whiteArray.length + blackArray.length;
        for (let i = 0; i < blackArray.length; i++) {
            if ((mouseX > blackArray[i].x - blackArray[i].radius && mouseY > blackArray[i].y - blackArray[i].radius) && (mouseX < blackArray[i].x + blackArray[i].radius && mouseY < blackArray[i].y + blackArray[i].radius)) {
                blackArray[i].changeX();
                blackArray[i].changeSide();
                whiteArray.push(blackArray[i]);
                blackArray.splice(i, 1);
            }
        }

        for (let j = 0; j < whiteArray.length; j++) {
            if ((mouseX > whiteArray[j].x - whiteArray[j].radius && mouseY > whiteArray[j].y - whiteArray[j].radius) && (mouseX < whiteArray[j].x + whiteArray[j].radius && mouseY < whiteArray[j].y + whiteArray[j].radius)) {
                whiteArray[j].changeX();
                whiteArray[j].changeSide();
                blackArray.push(whiteArray[j]);
                whiteArray.splice(j, 1);
            }
        }
    } else if (blackArray.length == 0) {
        let lastOne = whiteArray.pop();
        lastOne.changeX();
        lastOne.changeSide();
        blackArray.push(lastOne);
    } else if (whiteArray.length == 0) {
        let lastOne = blackArray.pop();
        lastOne.changeX();
        lastOne.changeSide();
        whiteArray.push(lastOne);
    }
}

function deadWalk() {
    if (redArray.length != 0) {
        for (let i = 0; i < redArray.length; i++) {
            redArray[i].x = window.innerWidth / 2;
            redArray[i].y = (i + 0.5) * window.innerHeight / redArray.length + redArray[i].radius;
            redArray[i].dead();
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}