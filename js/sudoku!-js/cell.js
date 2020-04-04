// Class: Cell
// For all the single block on the broad
class Cell {
    constructor(value) {
        this.number = value;
        this.isFixed = true;
        this.selectedOne = false;
    }

    // Function: createElement()
    // create div element and hold number
    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('cell');
        this.updateNumberElement();

        return this.element;
    }
    
    // Function: createInputElement()
    // create div element for input number
    createInputElement() {
        this.element = document.createElement('div');
        this.element.classList.add('input-cell');
        this.updateNumberElement();

        return this.element;
    }

    // Function: setActive()
    // Param: isActive
    // Set the status of active or not
    setActive(isActive) {
        if (isActive) {
            this.element.classList.add('active');
            this.element.style.backgroundColor = "Lightblue";
        } else {
            this.element.classList.remove('active');
            this.element.style.backgroundColor = "";
        }
    }

    // Function: selected()
    // Change the background if selected
    selected() {
        this.selectedOne = true;
        this.element.style.backgroundColor = "Lightblue";
    }

    // Function: deselected()
    // Change the background back to normal if deselected
    deselected() {
        this.selectedOne = false;
        this.element.style.backgroundColor = "";
    }

    // Function: correct()
    // change background if correct
    correct() {
        this.element.style.backgroundColor = "Aquamarine";
    }

    // Function: reset()
    // set the normal
    reset() {
        this.element.style.backgroundColor = "";
    }

    // Function: setFixed()
    // Param: isFixed
    // check if the cell is fixed or not, and add the class type
    setFixed(isFixed) {
        this.isFixed = isFixed;
        if (isFixed)
            this.element.classList.add('is-fixed');
        else
            this.element.classList.remove('is-fixed');
    }

    // Function: setMistake()
    // Param: hasMistake
    // check if the cell is correct or not, and add the class type 
    setMistake(hasMistake) {
        if (hasMistake)
            this.element.classList.add('has-mistake');
        else
            this.element.classList.remove('has-mistake');
    }

    // Function: setNumber()
    // Param: number
    // update the number
    setNumber(number) {
        this.number = number;
        this.updateNumberElement();
    }

    // Function: updateNumberElement()
    // change the numeber that the block holding
    updateNumberElement() {
        if (this.element)
            this.element.innerHTML = `<h1>${this.number !== null ? this.number : ''}</h1>`;
    }
}