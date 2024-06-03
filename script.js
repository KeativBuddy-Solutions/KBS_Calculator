const MAX_DISPLAY_LENGTH = 14;
const display = document.getElementById('display');
let currentValue = '';
let previousValue = null;
let currentOperation = null;
let resultDisplayed = null;
let dotEntered = false;

document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key)) {
    appendToDisplay(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    appendToDisplay(key);
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape') {
    clearDisplay();
  } else if (key === '.') {
    appendToDisplay(key);
  }
});

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
  if (num2 !== 0) {
    return num1 / num2;
  }
  alert('Numbers divided by zero are equal to infinity');
  return Infinity;
};

const operate = (operator, num1, num2 = num1) => {
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
function updateDisplay() {
  const display = document.getElementById('display');
  display.innerText = displayValue;
  if (displayValue.length > 9) {
    display.innerText = displayValue.substring(0, 9);
  }
}

const appendToDisplay = (char) => {
  if (display.innerText.length >= MAX_DISPLAY_LENGTH) {
    return;
  }

  const lastChar = display.innerText.slice(-1);

  if (char === '.') {
    if (dotEntered) {
      return;
    }
    dotEntered = true;
  }

  if (!isNaN(char) || char == '.') {
    if (resultDisplayed) {
      // If a result was just displayed, start fresh
      display.innerText = char === '.' ? '0.' : char; // Reset display for new input
      currentValue = char === '.' ? '0.' : char;
      resultDisplayed = false;
    } else {
      currentValue += char;
      display.innerText += char;
    }
  } else if (['+', '-', '*', '/'].includes(char)) {
    if (['+', '-', '*', '/'].includes(lastChar)) {
      // Replace the last operator with the new one
      display.innerText = display.innerText.slice(0, -1) + char;
      currentOperation = char; // Update the current operation
    } else {
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
      } else {
        if (!previousValue) {
          previousValue = currentValue;
        }

        currentValue = '';
        display.innerText += char;
      }
      currentOperation = char;
    }
    resultDisplayed = false; // Ensure flag is reset for further operations
    dotEntered = false; // Reset dotEntered flag for next number input
  }
};
const calculateResult = () => {
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
    display.innerText = formatNumber(result);
    previousValue = result;
    currentValue = '';
    currentOperation = null;
    resultDisplayed = true; // Indicate that a result was just displayed
  } else if (
    previousValue !== null &&
    currentOperation !== null &&
    currentValue === ''
  ) {
    // Handle case where user presses "=" immediately after an operator
    display.innerText = formatNumber(previousValue);
    resultDisplayed = true;
  }
};

const formatNumber = (num) => {
  return Math.round(num * 100000000) / 100000000;
};

const clearDisplay = () => {
  currentValue = '';
  previousValue = null;
  currentOperation = null;
  resultDisplayed = false;
  dotEntered = false;
  display.innerText = '';
};

const backspace = () => {
  // Remove the last character from the currentValue
  currentValue = currentValue.slice(0, -1);
  // Update the display with the modified currentValue
  display.innerText = currentValue;
};
