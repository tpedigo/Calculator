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
    return a / b;
}

function updateDisplay(e) {
    if (display.textContent == result) {
        display.textContent = 0;
    }
    if (display.textContent.length === 0 && operators.includes(e.target.textContent)) {
        display.textContent = "ERROR: must start with number";
        display.style.fontSize = "22px";
        display.style.textAlign = "start";
    
    } else if (display.textContent.length < 12) {
        display.textContent += e.target.textContent;
    } else {
        display.style.fontSize = "24px";
        display.style.textAlign = "start";
        display.textContent = "ERROR: number too large";
    }
    for (i=0; i<display.textContent.length - 1; i++) {
        if (operators.includes(display.textContent[i]) && operators.includes(display.textContent[i+1])) {
            display.textContent = display.textContent.slice(0, -1);
            display.textContent = "ERROR: two operators in a row";
            display.style.fontSize = "20px";
            display.style.textAlign = "start";
        }
    }
}

function clearDisplay() {
    display.textContent = "";
    currentExpression = {A: "", hasOperator: false, B: ""};
}

function storeExpression(e) {
    if (e.target.classList.contains("number") && !currentExpression.hasOperator) {
        currentExpression.A += e.target.textContent;
    } else if (e.target.classList.contains("operator")&& !currentExpression.hasOperator) {
        currentExpression.operator = e.target.textContent;
        currentExpression.hasOperator = true;
    } else if (e.target.classList.contains("number") && currentExpression.hasOperator) {
        currentExpression.B += e.target.textContent;
    } else if (e.target.classList.contains("operator") && currentExpression.hasOperator) {
        display.textContent = operate(+currentExpression.A, +currentExpression.B, currentExpression.operator);
    } else {
        console.log("bye");
    }
    console.log(currentExpression);
    return currentExpression;
}

function operate(a, b, operator) {
    if (operator==="+") {
        return add(a, b);
    } else if (operator==="-") {
        return subtract(a, b);
    } else if (operator==="x") {
        return multiply(a, b);
    } else {
        return divide(a, b);
    }
}

let result;
let currentExpression = {A: "", hasOperator: false, B: ""};
const operators = ["+", "-", "x", "%"];
const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const operatorButtons = document.querySelectorAll(".operator");
clear.addEventListener("click", clearDisplay);
numberButtons.forEach(number => number.addEventListener("click", updateDisplay));
numberButtons.forEach(number => number.addEventListener("click", storeExpression));
operatorButtons.forEach(operator => operator.addEventListener("click", updateDisplay));
operatorButtons.forEach(operator => operator.addEventListener("click", storeExpression));
equals.addEventListener("click", () =>
    display.textContent = operate(+currentExpression.A, +currentExpression.B, currentExpression.operator));