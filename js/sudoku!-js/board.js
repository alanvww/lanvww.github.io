// Storage Variables
let lSstoredCells = window.localStorage.getItem("storedCells");
let lSstoredGame = window.localStorage.getItem("storedGame");
let parsingArray = undefined;
let ranArray = undefined;


// Class: Board
class Board {
    // Constructor
    constructor(size, blockCount) {
        this.size = size;
        this.blockSize = Math.floor(this.size / blockCount);
        this.cells = [];
        this.restore = false;
        if (lSstoredCells == undefined && lSstoredGame == undefined) {
            this.restore = false;
            this.storedCells = [];
            this.storedGame = [];
        } else {
            this.restore = true;
        }
        this.hints = true;
        this.cellContainer = document.getElementsByClassName('sudokuCells')[0];
        this.inputContainer = document.getElementsByClassName('inputCells')[0];
    }

    // Function: init()
    // Creating the empty 2d cells array by the size
    // And putting number into the array
    init() {
        let number = 0;

        for (let x = 0; x < this.size; x++) {
            this.cells.push([]);

            for (let y = 0; y < this.size; y++) {
                this.cells[x][y] = new Cell(number + 1);
                number = (number + 1) % this.size;
            }

            number += this.blockSize;
            if ((x + 1) % this.blockSize === 0) {
                number++;
            }
            number %= this.size;
        }
    }

    // Function: gameRestore()
    // Restore the game from the Localstorage
    // Reloading the cells array by the parsing arra
    gameRestore() {
        parsingArray = JSON.parse(lSstoredCells);
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                this.cells[x][y].number = parsingArray[x][y].number;
                this.cells[x][y].isFixed = parsingArray[x][y].isFixed;
                this.cells[x][y].selectedOne = parsingArray[x][y].selectedOne;
            }
        }
    }

    // Function: clearbraodStorage()
    // Clean all the localStorage
    clearbroadStorage() {
        window.localStorage.clear();
        this.restore = false;
        parsingArray = undefined;
        ranArray = undefined;
    }

    // Function: checkValidity()
    // Check the answer (use for when user input value) by checkCellValidity()
    checkValidity() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                this.cells[x][y].setMistake(!this.cells[x][y].isFixed && !this.checkCellValidity(x, y));

            }
        }
    }

    // Function: checkAnswer()
    // Checking all answers are correct or not by checkCellValidity()
    checkAnswer() {
        let allCorrect = false;
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (this.checkCellValidity(x, y)) {
                    allCorrect = false;
                } else {
                    allCorrect = true;
                }
            }
        }
        return allCorrect;
    }

    // Function: checkCellValidity()
    // Param: cellX, cellY
    // Checking the single cell's answer is valid or not by match with the original cells array
    checkCellValidity(cellX, cellY) {
        const cellValue = this.cells[cellX][cellY].number;

        if (cellValue === null) {
            return true;
        }

        for (let x = 0; x < 9; x++) { // Check same row
            if (x === cellX) {
                continue;
            }
            if (this.cells[x][cellY].number === cellValue) {
                return false;
            }
        }

        for (let y = 0; y < 9; y++) { // Check same column
            if (y === cellY) {
                continue;
            }
            if (this.cells[cellX][y].number === cellValue) {
                return false;
            }
        }

        const blockX = Math.floor(cellX / 3);
        const blockY = Math.floor(cellY / 3);
        for (let innerX = 0; innerX < 3; innerX++) {
            for (let innerY = 0; innerY < 3; innerY++) {
                const x = blockX * 3 + innerX;
                const y = blockY * 3 + innerY;
                if (x === cellX && y === cellY) {
                    continue;
                }

                if (this.cells[x][y].number === cellValue) {
                    return false;
                }
            }
        }

        return true;
    }

    // Function: showAnswer()
    // Set all the cells to show the cells array numbers
    showAnswer() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (this.cells[x][y].number == null || !this.checkCellValidity(x, y)) {
                    this.cells[x][y].setNumber(this.storedCells[x][y].number);
                    this.cells[x][y].correct();
                }
            }
        }
        this.checkValidity();
    }

    // Function: restvBoard()
    // Set the game board to the original game
    resetBoard() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                this.cells[x][y].setNumber(this.storedGame[x][y].number);
                this.cells[x][y].reset();
            }
        }
        this.checkValidity();
    }

    // Function: clearCells()
    // Clear the cells from the block, to create the game board
    clearCells() {
        ranArray = JSON.parse(window.localStorage.getItem("ranArray"));
        if (ranArray == null) {
            ranArray = [];
            for (let i = 0; i < .8 * this.size ** 2; i++) {
                let ranX = ranInt(0, this.size);
                let ranY = ranInt(0, this.size);
                let ranObj = {
                    "ranX": ranX,
                    "ranY": ranY
                };
                ranArray.push(ranObj);
                this.clearCell(ranArray[i].ranX, ranArray[i].ranY);
            }
            window.localStorage.setItem("ranArray", JSON.stringify(ranArray));
        } else {
            for (let i = 0; i < .8 * this.size ** 2; i++) {
                this.clearCell(ranArray[i].ranX, ranArray[i].ranY);
            }
        }
    }

    // Function: clearCell()
    // Param: x,y
    // Clear the cell in x, y position (in the array)
    clearCell(x, y) {
        this.cells[x][y].setNumber(null);
        this.cells[x][y].setFixed(false);
        this.cells[x][y].setMistake(false);
    }


    // Function: storingCells()
    // Storing the full cells array to local storage
    storingCells() {
        this.storedCells = JSON.parse(JSON.stringify(this.cells));
        if (parsingArray == null) {
            window.localStorage.setItem("storedCells", JSON.stringify(this.storedCells));
        } else {
            parsingArray = JSON.parse(lSstoredCells);
            for (let x = 0; x < 9; x++) {
                for (let y = 0; y < 9; y++) {
                    this.storedCells[x][y].number = parsingArray[x][y].number;
                    this.storedCells[x][y].isFixed = parsingArray[x][y].isFixed;
                    this.storedCells[x][y].selectedOne = parsingArray[x][y].selectedOne;
                }
            }

        }
    }

    // Function: storingGame()
    // Storing the game cells array to local storage
    storingGame() {
        this.storedGame = JSON.parse(JSON.stringify(this.cells));
    }

    // Function: createCellElements()
    // Create html element in the page
    createCellElements() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                this.cellContainer.appendChild(this.cells[x][y].createElement());
                this.cells[x][y].setFixed(true);
            }
        }

        for (let num = 1; num < 10; num++) {
            let input = new Cell(num);
            this.inputContainer.appendChild(input.createInputElement());
        }
    }

    // Function: enterNumber()
    // Param: x, y, number
    // Set the number to the single cell
    enterNumber(x, y, number) {
        if (!this.cells[x][y].isFixed) {
            this.cells[x][y].setNumber(number);
            this.checkValidity();
        }
    }

    // Function: getCellValue()
    // Param: cell
    // get the number of the cell
    getCellValue(cell) {
        return this.cells[cell.x][cell.y].number;
    }

    // Function: shuffle()
    // shuffle the array by calling shuffleStep()
    shuffle() {
        const shuffleAmount = ranInt(10, 35);

        for (let i = 0; i < shuffleAmount; i++) {
            this.shuffleStep(ranInt(0, 3));
        }
    }

    // Function: shuffleStep()
    // Param: shuffleType
    // doing 4 types of shuffling for the cell array
    shuffleStep(shuffleType) {
        const a = ranInt(0, 8);
        const b = (a - Math.floor(a / 3) * 3 + ranInt(1, 2)) % 3 + Math.floor(a / 3) * 3;

        const c = Math.floor(a / 3) * 3;
        const d = (c + ranInt(1, 2) * 3) % 9;

        switch (shuffleType) {
            case 0:
                this.shuffleRow(a, b);
                break;
            case 1:
                this.shuffleCol(a, b);
                break;
            case 2:
                this.shuffleRow(c, d);
                this.shuffleRow(c + 1, d + 1);
                this.shuffleRow(c + 2, d + 2);
                break;
            case 3:
                this.shuffleCol(c, d);
                this.shuffleCol(c + 1, d + 1);
                this.shuffleCol(c + 2, d + 2);
                break;
            default:
                break;
        }
    }

    // Function: shuffleRow()
    // Param: row1, row2
    // swap the rows
    shuffleRow(row1, row2) {
        for (let x = 0; x < 9; x++) {
            [this.cells[x][row1], this.cells[x][row2]] = [this.cells[x][row2], this.cells[x][row1]];
        }
    }

    // Function: shuffleCol()
    // Param: col1, col2
    // swap the cols
    shuffleCol(col1, col2) {
        [this.cells[col1], this.cells[col2]] = [this.cells[col2], this.cells[col1]];
    }

    // Function: updateCells
    // Param: activeCell
    // Set the cells to be activated
    updateCells(activeCell) {
        const activeValue = this.getCellValue(activeCell);

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.hints) {
                    const isActive = activeValue !== null && this.cells[x][y].number === activeValue;
                    this.cells[x][y].setActive(isActive);
                } else {
                    this.cells[x][y].setActive(this.hints);
                }
                this.cells[x][y].deselected();
            }
        }
        this.cells[activeCell.x][activeCell.y].selected();
    }

    // Function: inputValue()
    // Param: actvieCell, inputValue
    // Change the cell's value
    inputValue(activeCell, inputValue) {
        if (!this.cells[activeCell.x][activeCell.y].isFixed) {
            this.cells[activeCell.x][activeCell.y].setNumber(inputValue);
        }
        this.checkValidity();

    }

    // Function: hintSwitch()
    // Switch the boolean hints
    hintSwitch() {
        if (this.hints) {
            this.hints = false;
        } else {
            this.hints = true;
        }
    }
}

// Function: ranInt()
// Param: min, max
// Getting random Int
function ranInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Function: clearStorage()
// Clean all the localStorage
function clearStorage() {
    window.localStorage.clear();
    parsingArray = undefined;
    ranArray = undefined;
}