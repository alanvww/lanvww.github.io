// Create object
let sudoku = new Sudoku();
// init the game
sudoku.init();

// Adding event handlers
document.getElementById("newGameButton").addEventListener('click', function () {
    document.querySelector(".sudokuContainer").innerHTML = `<div class="sudokuCells"></div>`;
    document.querySelector(".sudokuInputBoard").innerHTML = `<div class="inputCells"></div>`;

    sudoku = new Sudoku();
    clearStorage();
    sudoku.board.clearbroadStorage();
    sudoku.init();

});

document.getElementById("showAnswerButton").addEventListener('click', function () {
    sudoku.board.showAnswer();
});

document.getElementById("clearButton").addEventListener('click', function () {
    sudoku.board.resetBoard();
});

document.getElementById("hintsButton").addEventListener('click', function () {
    sudoku.board.hintSwitch();
    let hintsButton = document.getElementById("hintsButton");
    if (hintsButton.innerText == "Turn off Hints") {
        hintsButton.innerText = "Turn on Hints";
        hintsButton.style.backgroundColor = "Grey";

    } else {
        hintsButton.innerText = "Turn off Hints";
        hintsButton.style.backgroundColor = "lightblue";
    }
    sudoku.setActiveCell(sudoku.cursor.pos);
});

document.getElementById("closebtn").addEventListener('click', function () {
    document.getElementById("mySidenav").style.width = "0";
});

document.getElementById("sideNavOpen").addEventListener('click', function () {
    document.getElementById("mySidenav").style.width = "250px";
});
