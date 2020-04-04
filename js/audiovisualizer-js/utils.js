// Junhao Ren
// utils.js

// makeColor()
// Param: red, green, blue, alpha = 1
// return color string
const makeColor = (red, green, blue, alpha = 1) => {
    return `rgba(${red},${green},${blue},${alpha})`;
};

// getRandom()
// Param: min, max
// return random number
const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
};


// getRandomColor()
// return random color
const getRandomColor = () => {
    const floor = 35; // so that colors are not too bright or too dark 
    const getByte = () => getRandom(floor, 255 - floor);
    return `rgba(${getByte()},${getByte()},${getByte()},1)`;
};

// getLinearGradient()
// Param: ctx, startX, startY, endX, endY, colorStops
// Return linear gradient
const getLinearGradient = (ctx, startX, startY, endX, endY, colorStops) => {
    let lg = ctx.createLinearGradient(startX, startY, endX, endY);
    for (let stop of colorStops) {
        lg.addColorStop(stop.percent, stop.color);
    }
    return lg;
};

// goFullscreen()
// Param: element
// Set the element to fullScreen
const goFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullscreen) {
        element.mozRequestFullscreen();
    } else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
};

export {
    makeColor,
    getRandomColor,
    getLinearGradient,
    goFullscreen
};