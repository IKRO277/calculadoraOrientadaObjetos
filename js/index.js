class Calculator {
  constructor() {
    this.upperValue = document.querySelector('#upper-number');
    this.resultValue = document.querySelector('#result-number');
    this.hasClick();
  }

  hasClick() {
    let buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
      button.addEventListener('click', () => this.addValueInput(button.textContent));
    });
  }

  addValueInput(input) {
    let upperValue = this.upperValue.textContent;

    if (input == 'AC') {
      this.upperValue.textContent = '0';
    } else if(input == '='){
      this.resolution(upperValue)
    } else {
      this.upperValueValidation(upperValue, input);
    }
  }
  
  verifyUpperValueEqualZero(upperValue, input) {
    if (upperValue === '0') {
      this.upperValue.textContent = input;
    } else {
      this.upperValue.textContent += input;
    }
  }

  verifyUpperValueRegEx(upperValue, input) {
    let reg = new RegExp('^\\d+$');
    if (!reg.test(input) && !reg.test(upperValue.substr(upperValue.length - 1))) {
      return false;
    }else if(upperValue[0] == '0' && !reg.test(input)) {
      return false
    } else {
      return true
    }
  }

  upperValueValidation(upperValue, input) {
    let verifiedInput = this.upperValueNotNumberReturn(input);
    if (this.verifyUpperValueRegEx(upperValue, input) == false) {
      console.log('Insira um número.');
    } else {
      this.verifyUpperValueEqualZero(upperValue, verifiedInput);
    }
  }

  upperValueNotNumberReturn(input) {
    if (input !== '+' && input !== '-' && input !== 'x' && input !== '/') {
      return input;
    } else {
      return ` ${input} `;
    }
  }

  resolution(upperValue) {
    let upperValueArray = upperValue.split(' ')
    let result = 0
    
    result = this.resolutionUpperValueIteration(upperValueArray, result)

    this.resolutionRefreshValue(result)
  }

  resolutionUpperValueIteration(upperValueArray, result) {
    let operation = false
    for(let i = 0; upperValueArray.length > i; i++){
      let item = upperValueArray[i]
      let beforeItem = parseFloat(upperValueArray[i -1])
      let afterItem = parseFloat(upperValueArray[i + 1])
      result = this.resolutionGetResult(beforeItem, item, afterItem, upperValueArray)
      if(result) {
        operation = true
      }
      if(operation) {
        upperValueArray[i - 1] = result
        upperValueArray.splice(i, 2)
        i = 0
      }
    }
    return result
  }

  resolutionGetResult(beforeOperator, operator, afterOperator, upperValueArray) {
    let operatorFunctions = {
      'x': (a, b) => a * b,
      '/': (a, b) => a / b,
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
    }
    if (operator == 'x' || operator == '/') {
      return operatorFunctions[operator](beforeOperator, afterOperator)
    } else if ((operator == '+' || operator == '-') && !upperValueArray.includes('x') && !upperValueArray.includes('-')) {
      return operatorFunctions[operator](beforeOperator, afterOperator);
    }
  }

  resolutionRefreshValue(result) {
    if(result) {
      this.resultValue.textContent = result
      this.upperValue.textContent = result
    }
  }
}

let calculatorOne = new Calculator();
