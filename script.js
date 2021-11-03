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
operatorButtons.forEach(operator => operator.addEventListener("click", updateDisplay));
equals.addEventListener("click", equalsEvent);

function equalsEvent(e) {
    if (!currentExpression.hasOperator) {
        return;
    } else {
        result = calculate(e, +currentExpression.A, +currentExpression.B, currentExpression.operator);
        display.textContent = result;
        currentExpression = {A: result, hasOperator: false, B: ""};
    }
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

function updateDisplay(e) {
    if (display.textContent.length === 0 && e.target.classList.contains("operator")) {
        display.style.fontSize = "22px";
        display.style.textAlign = "start";
        display.textContent = "ERROR: must start with number";
        numberButtons.forEach(number => number.removeEventListener("click", updateDisplay));
        operatorButtons.forEach(operator => operator.removeEventListener("click", updateDisplay));
        clear.removeEventListener("click", updateDisplay);
        equals.removeEventListener("click", equalsEvent); 
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
                return;
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
    }
}

function clearDisplay() {
    display.textContent = "";
    display.style.fontSize = "32px";
    display.style.textAlign = "end";
    currentExpression = {A: "", hasOperator: false, B: ""};
    clear.addEventListener("click", clearDisplay);
    numberButtons.forEach(number => number.addEventListener("click", updateDisplay));
    operatorButtons.forEach(operator => operator.addEventListener("click", updateDisplay));
    equals.addEventListener("click", equalsEvent);
}

function storeExpression(e) {
    if (e.target.classList.contains("number") && !currentExpression.hasOperator) {
        if (currentExpression.A == result) {
            display.textContent = "";
            display.textContent += e.target.textContent;
            currentExpression.A = e.target.textContent;
        } else {
            currentExpression.A += e.target.textContent;
        }
    } else if (e.target.classList.contains("operator")&& !currentExpression.hasOperator) {
        currentExpression.operator = e.target.textContent;
        currentExpression.hasOperator = true;
    } else if (e.target.classList.contains("number") && currentExpression.hasOperator) {
        currentExpression.B += e.target.textContent;
    } else if (e.target.classList.contains("operator") && currentExpression.hasOperator) {
        result = calculate(e, +currentExpression.A, +currentExpression.B, currentExpression.operator);
        display.textContent = result + " " + e.target.textContent;
        currentExpression = {A: result, hasOperator: true, B: "", operator: e.target.textContent}
    }
    return currentExpression;
}

function calculate(e, a, b, operator) {
    if (operator==="+") {
        return result = add(a, b);
    } else if (operator==="-") {
        return result = subtract(a, b);
    } else if (operator==="x") {
        return result = multiply(a, b);
    } else {
        return result = divide(a, b);
    }
}