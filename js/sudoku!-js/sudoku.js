// Class: Sudoku
class Sudoku {
    constructor() {
        this.container = document.getElementsByClassName('sudokuContainer')[0];
        this.cellContainer = document.getElementsByClassName('sudokuCells')[0];
        this.sudokuInputBoard = document.getElementsByClassName('sudokuInputBoard')[0];
        this.cursor = new Cursor(this.cellSize);
        this.board = new Board(9, 3);
        this.cellSize = (window.innerWidth - 27) / 9;
    }

    // Function: init()
    // Setting up the game if the restore is false. If true, reloading the game
    init() {
        if (this.board.restore == false) {
            this.board.init();
            this.board.shuffle();
            this.board.storingCells();
            this.board.createCellElements();
            this.board.clearCells();
            this.board.storingGame();
            this.windowResizeEvent();
            this.addListeners();
            this.setActiveCell({
                x: 0,
                y: 0
            });
        } else {
            this.gameRestore();
        }
    }

    // Function: gameRestore()
    // Restoring the game
    gameRestore() {
        this.board.init();
        this.board.gameRestore();
        this.board.storingCells();
        this.board.createCellElements();
        this.board.clearCells();
        this.board.storingGame();
        this.windowResizeEvent();
        this.addListeners();
        this.setActiveCell({
            x: 0,
            y: 0
        });
    }

    // Function: addListeners()
    // Set eventhandlers for all cells
    // Set the keybroad event
    // Set the double click event
    // set the windows resize event
    addListeners() {
        this.cellContainer.addEventListener('click', (e) => {
            this.setActiveCell(this.getPosition(e.pageX, e.pageY));
        });

        window.addEventListener('keydown', (e) => {
            const activeCell = this.cursor.pos;
            if (!isNaN(parseInt(e.key))) {
                const number = parseInt(e.key);
                if (number > 0) {
                    this.board.enterNumber(activeCell.x, activeCell.y, number);
                }
            } else if (e.key === "Backspace") {
                this.board.clearCell(activeCell.x, activeCell.y);
            } else if (e.key === "ArrowDown") {
                activeCell.y++;
            } else if (e.key === "ArrowUp") {
                activeCell.y--;
            } else if (e.key === "ArrowLeft") {
                activeCell.x--;
            } else if (e.key === "ArrowRight") {
                activeCell.x++;
            } else {
                return;
            }

            activeCell.x = Math.min(8, activeCell.x);
            activeCell.y = Math.min(8, activeCell.y);
            activeCell.x = Math.max(0, activeCell.x);
            activeCell.y = Math.max(0, activeCell.y);

            this.setActiveCell(activeCell);
        });

        let inputCells = document.getElementsByClassName("input-cell");
        for (let i = 1; i < 10; i++) {
            inputCells[i - 1].addEventListener("click", (e) => {
                this.input(this.cursor.pos, i)
            });
        }

        this.cellContainer.addEventListener('dblclick', (e) => {
            this.input(this.cursor.pos, null);
            this.setActiveCell(this.cursor.pos);
        });

        window.addEventListener('resize', this.windowResizeEvent());

    }

    // Function: getPostion()
    // Param: mouseX, mouseY
    // get the position
    getPosition(mouseX, mouseY) {
        mouseX -= this.container.offsetLeft - this.container.clientWidth / 2;
        mouseY -= this.container.offsetTop;

        let x = Math.floor(mouseX / this.cellSize);
        let y = Math.floor(mouseY / this.cellSize);

        x = Math.min(x, 8);
        y = Math.min(y, 8);

        return {
            x: x,
            y: y
        };
    }

    // Function: setActiveCell()
    // Param: pos
    // Activate the cell
    setActiveCell(pos) {
        this.cursor.setPosition(pos.x, pos.y);
        this.board.updateCells(pos);
    }

    // Function: input
    // Param: pos, inputValue
    // set the value to the activated cell
    input(pos, inputValue) {
        this.board.inputValue(pos, inputValue);
        this.cursor.setPosition(pos.x, pos.y);
        this.board.updateCells(pos);
    }

    // Function: windowResizeEvent()
    // change the size when the windows is resize
    windowResizeEvent() {
        this.container.style.width = this.board.size * 100 + "px";
        this.sudokuInputBoard.style.width = this.board.size * 100 + "px";
        this.cellSize = this.container.clientWidth / this.board.size;
        this.cursor.cellSize = this.cellSize;
        this.cursor.setPosition(this.cursor.pos);
    }
}