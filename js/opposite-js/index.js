"use strict";

let radius;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight * 0.95);
    colorMode(HSB);
    blendMode(DIFFERENCE);
    background(0);
    radius = height / 5;


    for (let i = 0; i < width / radius - 1; i++) {
        fill('white');
        arc((0.5 + i) * radius + radius * 0.25, height / 5, radius, radius, 0, PI * 2);
        arc((0.5 + i) * radius + radius * 0.25, height * 2 / 5, radius, radius, 0, PI * 2);
        arc((0.5 + i) * radius + radius * 0.25, height * 3 / 5, radius, radius, 0, PI * 2);
        arc((0.5 + i) * radius + radius * 0.25, height * 4 / 5, radius, radius, 0, PI * 2);
    }

    textSize(width / 6);
    textAlign(CENTER, CENTER);
    text('OPPOSITE', width * 1 / 2, height * 1 / 3);

    textSize(width / 12);
    textAlign(CENTER, CENTER);
    text('START', width * 1 / 2, height * 2 / 3);
}

function draw() {}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function mouseClicked() {
    window.open("./opposite.html", "_self");
}