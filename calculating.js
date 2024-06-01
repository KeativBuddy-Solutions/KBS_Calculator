const display = document.getElementById('display');
let currentValue = '';
let previousValue = null;
let currentOperation = null;

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
  if (num2 !== 0) {
    return num1 / num2;
  }
  alert('Cannot divide by zero');
  return;
};

const operate = (operator, num1, num2) => {
  const n1 = Number(num1);
  const n2 = Number(num2);
  switch (operator) {
    case '+':
      return add(n1, n2);
    case '-':
      return subtract(n1, n2);
    case '*':
      return multiply(n1, n2);
    case '/':
      return divide(n1, n2);
    default:
      return n1;
  }
};

const appendToDisplay = (char) => {
  const lastChar = display.innerText.slice(-1);

  if (!isNaN(char) || char === '.') {
    currentValue += char;
    display.innerText += char;
  } else if (['+', '-', '*', '/'].includes(char)) {
    if (['+', '-', '*', '/'].includes(lastChar)) {
      return;
    }
    if (
      previousValue !== null &&
      currentOperation !== null &&
      currentValue !== ''
    ) {
      const result = operate(
        currentOperation,
        previousValue,
        parseFloat(currentValue)
      );
      display.innerText = formatNumber(result) + char;
      previousValue = result;
      currentValue = '';
      currentOperation = char;
    } else {
      previousValue = parseFloat(currentValue);
      currentValue = '';
      currentOperation = char;
      display.innerText += char;
    }
  }
};

const calculateResult = () => {
  if (previousValue !== null && currentOperation !== null) {
    const result = operate(
      currentOperation,
      previousValue,
      parseFloat(currentValue)
    );
    display.innerText = formatNumber(result);
    previousValue = result;
    currentValue = '';
    currentOperation = null;
  }
};

const formatNumber = (num) => {
  return Math.round(num * 100000000) / 100000000;
};

const clearDisplay = () => {
  currentValue = '';
  previousValue = null;
  currentOperation = null;
  display.innerText = '';
};
