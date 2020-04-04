class Cursor {
    constructor(cellSize) {
        this.cursorElement = document.getElementsByClassName('cursor')[0];
        this.cellSize = cellSize;
        this.pos = {
            x: 0,
            y: 0
        };
    }

    setPosition(x, y) {
        this.pos = {
            x: x,
            y: y
        };
    }
}