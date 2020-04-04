"use strict";

class Circle {
    constructor(x, y, radius, side) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.side = side;
    }

    changeSide() {
        if (this.side == 0) {
            this.side = 1;
            this.y += 150;
        } else {
            this.side = 0;
            this.y -= 150;
        }
        this.drawIt();
    }

    changeX() {
        if (this.side == 0) {
            this.x += window.innerWidth/2;
        } else if (this.side == 1) {
            this.x -= window.innerWidth/2;
        }
    }

    drawIt() {
        if (this.side == 0) {
            fill('black');
        } else if (this.side == 1) {
            fill('white');
        }
        arc(this.x, this.y, this.radius*2, this.radius*2, 0, PI * 2);
    }

    dead(){
        fill('red');
        arc(this.x, this.y, this.radius*2, this.radius*2, 0, PI * 2);
    }
}