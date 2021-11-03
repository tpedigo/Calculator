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
// numberButtons.forEach(number => number.addEventListener("click", storeExpression));
operatorButtons.forEach(operator => operator.addEventListener("click", updateDisplay));
// operatorButtons.forEach(operator => operator.addEventListener("click", storeExpression));
equals.addEventListener("click", equalsEvent);

function equalsEvent() {
    display.textContent = operate(+currentExpression.A, +currentExpression.B, currentExpression.operator);
}

function add(a, b) {
    return (a+b) % 1 === 0 ? a+b : (a+b).toFixed(3);
}

function subtract(a, b) {
    return (a-b) % 1 === 0 ? a-b : (a-b).toFixed(3);
}

function multiply(a, b) {
    return (a*b) % 1 === 0 ? a*b : (a*b).toFixed(3);
}

function divide(a, b) {
    return (a/b) % 1 === 0 ? a/b : (a/b).toFixed(3);
}

function checkErrors() {
    for (i=0; i<display.textContent.length-1; i++) {
        if (operators.includes(display.textContent[i]) && operators.includes(display.textContent[i+1])) {
            display.style.fontSize = "20px";
            display.style.textAlign = "start";
            display.textContent = "ERROR: two operators in a row";
            return true;
        } else {
            return false;
        }
    }
}
function updateDisplay(e) {
    // if (display.textContent == result) {
    //     display.textContent = 0;
    // }
    if (display.textContent.length === 0 && operators.includes(e.target.textContent)) {
        display.style.fontSize = "22px";
        display.style.textAlign = "start";
        display.textContent = "ERROR: must start with number";
        numberButtons.forEach(number => number.removeEventListener("click", updateDisplay));
        operatorButtons.forEach(operator => operator.removeEventListener("click", updateDisplay));
        clear.removeEventListener("click", updateDisplay);
        equals.removeEventListener("click", equalsEvent); 
        currentExpression = {A: "", hasOperator: false, B: ""};
    } else if (display.textContent.length < 12) {
        display.textContent += e.target.textContent;
        for (i=0; i<display.textContent.length - 1; i++) {
            if (operators.includes(display.textContent[i]) && operators.includes(display.textContent[i+1])) {          
                display.style.fontSize = "20px";
                display.style.textAlign = "start";
                display.textContent = "ERROR: two operators in a row";
                numberButtons.forEach(number => number.removeEventListener("click", updateDisplay));
                operatorButtons.forEach(operator => operator.removeEventListener("click", updateDisplay));
                clear.removeEventListener("click", updateDisplay);
                equals.removeEventListener("click", equalsEvent); 
                currentExpression = {A: "", hasOperator: false, B: ""};
            }
        }
        storeExpression(e);
    } else {
        display.style.fontSize = "24px";
        display.style.textAlign = "start";
        display.textContent = "ERROR: number too large";
        numberButtons.forEach(number => number.removeEventListener("click", updateDisplay));
        operatorButtons.forEach(operator => operator.removeEventListener("click", updateDisplay));
        clear.removeEventListener("click", updateDisplay);
        equals.removeEventListener("click", equalsEvent);
        currentExpression = {A: "", hasOperator: false, B: ""};
    }
}

function clearDisplay() {
    display.textContent = "";
    display.style.fontSize = "32px";
    display.style.textAlign = "end";
    currentExpression = {A: "", hasOperator: false, B: ""};
    clear.addEventListener("click", clearDisplay);
    numberButtons.forEach(number => number.addEventListener("click", updateDisplay));
    // numberButtons.forEach(number => number.addEventListener("click", storeExpression));
    operatorButtons.forEach(operator => operator.addEventListener("click", updateDisplay));
    // operatorButtons.forEach(operator => operator.addEventListener("click", storeExpression));
    equals.addEventListener("click", equalsEvent);
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
        currentExpression = {A: add(a, b), hasOperator: false, B: ""};
        return add(a, b);
    } else if (operator==="-") {
        currentExpression = {A: subtract(a, b), hasOperator: false, B: ""};
        return subtract(a, b);
    } else if (operator==="x") {
        currentExpression = {A: multiply(a, b), hasOperator: false, B: ""};
        return multiply(a, b);
    } else {
        currentExpression = {A: divide(a, b), hasOperator: false, B: ""};
        return divide(a, b);
    }
}