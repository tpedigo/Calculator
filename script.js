function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "ERROR: cannot divide by zero";
    }
    return a / b;
}

function operate(a, b, operator) {
    if (operator==="+") {
        return add(a, b);
    } else if (operator==="-") {
        return subtract(a, b);
    } else if (operator==="*") {
        return multiply(a, b);
    } else {
        return divide(a, b);
    }
}

function updateDisplay(e) {
    if (display.textContent.length % 12 === 0) {
        display.textContent += ("\n" + e.target.textContent);
    } else {
        display.textContent += e.target.textContent;
    }
}

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
numbers.forEach(number => number.addEventListener("click", updateDisplay));