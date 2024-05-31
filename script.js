document.addEventListener('DOMContentLoaded', () => {
    const themes = ['theme1', 'theme2', 'theme3'];
    let currentThemeIndex = 0;
    const button = document.getElementById('img');
    const body = document.body;
    const themeImg = document.querySelector('.theme_img');
    const themeNumbers = document.querySelectorAll('.theme_num li');

    const updateTheme = () => {
        body.className = '';
        body.classList.add(themes[currentThemeIndex]);
        themeImg.className = 'theme_img';
        themeImg.classList.add(themes[currentThemeIndex]);
    };

    button.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        updateTheme();
    });

    themeNumbers.forEach((number, index) => {
        number.addEventListener('click', () => {
            currentThemeIndex = index;
            updateTheme();
        });
    });

    updateTheme(); // Initialize with the first theme
});


document.addEventListener('DOMContentLoaded', (event) => {
    const display = document.querySelector('.displays h1');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';
    let resultDisplayed = false;
    let errorOccurred = false;

    const inputs = document.querySelectorAll('.inputs input');
    inputs.forEach(input => {
        input.addEventListener('click', () => {
            const value = input.value;

            if (value === 'RESET') {
                resetCalculator();
            } else if (value === 'DEL') {
                deleteLastCharacter();
            } else if (['+', '-', 'X', '/'].includes(value)) {
                setOperator(value);
            } else if (value === '=') {
                calculateResult();
            } else {
                appendNumber(value);
            }
        });
    });

    function resetCalculator() {
        currentInput = '0';
        operator = '';
        firstOperand = '';
        secondOperand = '';
        errorOccurred = false;
        display.textContent = '0';
    }

    function deleteLastCharacter() {
        if (!errorOccurred) {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            display.textContent = currentInput;
        }
    }

    function setOperator(op) {
        if (errorOccurred) return;
        if (resultDisplayed) {
            resultDisplayed = false;
        }
        if (currentInput !== '') {
            if (firstOperand === '') {
                firstOperand = currentInput;
            } else if (operator !== '' && currentInput !== '') {
                secondOperand = currentInput;
                firstOperand = operate(operator, firstOperand, secondOperand);
                if (firstOperand === 'Error') {
                    return;
                }
            }
            operator = op === 'X' ? '*' : op;
            currentInput = '';
        }
    }

    function calculateResult() {
        if (errorOccurred) return;
        if (firstOperand !== '' && operator !== '' && currentInput !== '') {
            secondOperand = currentInput;
            currentInput = operate(operator, firstOperand, secondOperand);
            display.textContent = formatDisplay(currentInput);
            resultDisplayed = true;
            operator = '';
            firstOperand = '';
            secondOperand = '';
        }
    }

    function appendNumber(num) {
        if (errorOccurred) return;
        if (resultDisplayed) {
            currentInput = num;
            resultDisplayed = false;
        } else {
            if (currentInput === '0' && num !== '.') {
                currentInput = num;
            } else if (currentInput.length < 12) {
                currentInput += num;
            }
        }
        display.textContent = formatDisplay(currentInput);
    }

    function operate(operator, num1, num2) {
        let result = 0;
        switch (operator) {
            case '+':
                result = parseFloat(num1) + parseFloat(num2);
                break;
            case '-':
                result = parseFloat(num1) - parseFloat(num2);
                break;
            case '*':
                result = parseFloat(num1) * parseFloat(num2);
                break;
            case '/':
                if (parseFloat(num2) === 0) {
                    currentInput = 'Error';
                    alert('Error: Division by zero is not allowed.');
                    display.textContent = 'Error';
                    errorOccurred = true;
                    return 'Error';
                }
                result = parseFloat(num1) / parseFloat(num2);
                break;
        }
        return result.toString();
    }

    function formatDisplay(input) {
        if (input.length > 12) {
            return parseFloat(input).toExponential(6);
        }
        return input;
    }

    // Initialize display to zero
    resetCalculator();
});
