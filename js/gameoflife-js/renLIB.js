"use strict";
// IIFE Library
(function () {
    let renLIB = {
        drawBackground() {
            ctx.save();
            ctx.fillStyle = "black";
            ctx.globalAlpha = 4 / fps;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            ctx.restore();
        },

        // Param: shape, alive
        // Pass to change the shape of the cell
        drawWorld(shape = "rect", alive = "0.3") {
            ctx.save();
            for (let col = 0; col < lifeworld.numCols; col++) {
                for (let row = 0; row < lifeworld.numRows; row++) {
                    this.drawCell(shape, col, row, cellWidth, lifeworld.world[col][row], alive);
                }
            }
            ctx.restore();
        },

        // Param: shape, col row, dimensions, alive
        // Change canvas code by the shape parameter
        drawCell(shape, col, row, dimensions, alive) {
            ctx.beginPath();
            if (shape == "rect") {
                ctx.rect(col * dimensions, row * dimensions, dimensions, dimensions);
            } else if (shape == "circle") {
                ctx.arc(col * dimensions, row * dimensions, dimensions / 2, 0, 2 * Math.PI);
            } else if (shape == "half-circle") {
                ctx.arc(col * dimensions, row * dimensions, dimensions / 2, 0, Math.random() * Math.PI);
            }
            ctx.fillStyle = alive ? color : 'rgba(0,0,0,0)';
            ctx.fill();
        },

        // Rainbow Color Graident
        getRainbowGradient() {
            let grad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
            grad.addColorStop(0, 'red');
            grad.addColorStop(1 / 6, 'orange');
            grad.addColorStop(2 / 6, 'yellow');
            grad.addColorStop(3 / 6, 'green')
            grad.addColorStop(4 / 6, 'aqua');
            grad.addColorStop(5 / 6, 'blue');
            return grad;
        },

        // Rainbow Radial Color Graident
        getRadGradient() {
            let radGrad = ctx.createRadialGradient(canvasWidth / 2, canvasHeight / 2, 0, canvasWidth / 2, canvasHeight, canvasWidth);
            radGrad.addColorStop(0, 'red');
            radGrad.addColorStop(1 / 6, 'orange');
            radGrad.addColorStop(2 / 6, 'yellow');
            radGrad.addColorStop(3 / 6, 'green')
            radGrad.addColorStop(4 / 6, 'aqua');
            radGrad.addColorStop(5 / 6, 'blue');
            return radGrad;
        },

        // Blue to purple Color Graident
        getBluePurpleGradient() {
            let bluePurpleGrad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
            bluePurpleGrad.addColorStop(0, 'blue');
            bluePurpleGrad.addColorStop(1, "purple");
            return bluePurpleGrad;
        },

        // Yellow to Green Gradient
        getYellowGreenGradient() {
            let yellowGreenGrad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
            yellowGreenGrad.addColorStop(0, 'yellow');
            yellowGreenGrad.addColorStop(1, "green");
            return yellowGreenGrad;
        },

        // setColor 
        // change the color of whole page
        setColor(color = "white") {
            canvas.style.borderColor = color;
            document.querySelector("h1").style.color = color;
            for (let i = 0; i < document.querySelectorAll("hr").length; i++) {
                document.querySelectorAll("hr")[i].style.borderColor = color;
            }
            for (let i = 0; i < document.querySelectorAll("button").length; i++) {
                document.querySelectorAll("button")[i].style.backgroundColor = color;
                if (color == "white") {
                    document.querySelectorAll("button")[i].style.color = "black";
                }
            }
            document.querySelector("footer").style.color = color;
        },

        // randomness
        // random all variables we have
        randomness() {
            let seed = Math.random();
            radioButtons[Math.floor(seed * 3)].checked = true;
            shape = radioButtons[Math.floor(seed * 3)].value;
            const baseWidth = 5;
            cellWidth = seed * 30 + baseWidth;
            fps = seed * 144;
            let randomColor = `rgb(${55 + Math.round(Math.random() * 200)},${55 + Math.round(Math.random() * 200)},${55 + Math.round(Math.random() * 200)}`;
            color = randomColor;
            this.setColor(randomColor);
            return randomColor;
        }
    }

    if (window) {
        window["renLIB"] = renLIB;
    } else {
        throw "'window' not defined!";
    }
})();