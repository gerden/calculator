let outputWindow = document.getElementById("outputWindow");

const inputButton0 = document.getElementById("0");
const inputButton1 = document.getElementById("1");
const inputButton2 = document.getElementById("2");
const inputButton3 = document.getElementById("3");
const inputButton4 = document.getElementById("4");
const inputButton5 = document.getElementById("5");
const inputButton6 = document.getElementById("6");
const inputButton7 = document.getElementById("7");
const inputButton8 = document.getElementById("8");
const inputButton9 = document.getElementById("9");
const inputButtonDot = document.getElementById(".");
const inputButtonPlus = document.getElementById("+");
const inputButtonMinus = document.getElementById("-");
const inputButtonMultiply = document.getElementById("x");
const inputButtonDivide = document.getElementById("÷");
const inputButtonEqual = document.getElementById("=");
const inputButtonPercent = document.getElementById("%");
const inputButtonSquareRoot = document.getElementById("√");
const inputButtonReverseSigh = document.getElementById("+/-");
const inputButtonGetMemory = document.getElementById("MRC");
const inputButtonAddMemory = document.getElementById("M+");
const inputButtonMinusMemory = document.getElementById("M-");
const inputButtonClear = document.getElementById("C.CE");

// var numberButtons = document.getElementsByClassName("number");

let oldOutput = "";
let currentOutput = "";
let oldMathSigh = "";
let calcMemory = 0;
outputWindow.innerText = 0;
const maxOutputDigits = 6;

inputButton0.addEventListener("click", () => {
  addDigit(inputButton0);
});
inputButton1.addEventListener("click", () => {
  addDigit(inputButton1);
});
inputButton2.addEventListener("click", () => {
  addDigit(inputButton2);
});
inputButton3.addEventListener("click", () => {
  addDigit(inputButton3);
});
inputButton4.addEventListener("click", () => {
  addDigit(inputButton4);
});
inputButton5.addEventListener("click", () => {
  addDigit(inputButton5);
});
inputButton6.addEventListener("click", () => {
  addDigit(inputButton6);
});
inputButton7.addEventListener("click", () => {
  addDigit(inputButton7);
});
inputButton8.addEventListener("click", () => {
  addDigit(inputButton8);
});
inputButton9.addEventListener("click", () => {
  addDigit(inputButton9);
});
inputButtonDot.addEventListener("click", () => {
  addPoint(inputButtonDot);
});
inputButtonPlus.addEventListener("click", () => {
  useMathSigh(inputButtonPlus);
});
inputButtonMinus.addEventListener("click", () => {
  useMathSigh(inputButtonMinus);
});
inputButtonMultiply.addEventListener("click", () => {
  useMathSigh(inputButtonMultiply);
});
inputButtonDivide.addEventListener("click", () => {
  useMathSigh(inputButtonDivide);
});
inputButtonEqual.addEventListener("click", () => {
  useMathSigh(inputButtonEqual);
});
inputButtonPercent.addEventListener("click", () => {
  useMathSigh(inputButtonPercent);
});
inputButtonSquareRoot.addEventListener("click", () => {
  useMathSigh(inputButtonSquareRoot);
});
inputButtonReverseSigh.addEventListener("click", () => {
  useMathSigh(inputButtonReverseSigh);
});
inputButtonGetMemory.addEventListener("click", () => {
  storeMemory(inputButtonGetMemory);
});
inputButtonAddMemory.addEventListener("click", () => {
  storeMemory(inputButtonAddMemory);
});
inputButtonMinusMemory.addEventListener("click", () => {
  storeMemory(inputButtonMinusMemory);
});
inputButtonClear.addEventListener("click", () => {
  clear();
});

function outputValue(value) {
  //remove leading zeros and allows . at the end of output
  while (("" + value).length > 1 && value[0] === "0" && value[1] !== ".") {
    value = value.substring(1);
  }

  console.log("value " + value);
  if (value.length > maxOutputDigits) {
    if (parseFloat(value) > 10 ** maxOutputDigits + 1 - 1) {
      outputWindow.innerText =
        value.substring(0, maxOutputDigits) +
        "E" +
        (("" + (outputWindow.innerText = parseFloat(value).toFixed(0))).length -
          maxOutputDigits);
    } else {
      outputWindow.innerText = value.substring(0, maxOutputDigits);
    }
  } else {
    outputWindow.innerText = value;
  }
}

function addDigit(button) {
  currentOutput += button.innerText;

  outputValue(currentOutput);
}

function addPoint(button) {
  if (!(currentOutput === "")) {
    console.log(button);
    if ((currentOutput.match(/\./g) || []).length < 1) {
      addDigit(button);
    }
  }
}
function useMathSigh(button) {
  if (!(currentOutput === "")) {
    //all signs that store a value for later oldOutput
    if (oldMathSigh === "+") {
      oldOutput = parseFloat(oldOutput) + parseFloat(currentOutput);
    } else if (oldMathSigh === "-") {
      oldOutput = parseFloat(oldOutput) - parseFloat(currentOutput);
    } else if (oldMathSigh === "x") {
      oldOutput = parseFloat(oldOutput) * parseFloat(currentOutput);
    } else if (oldMathSigh === "÷") {
      oldOutput = parseFloat(oldOutput) / parseFloat(currentOutput);
    } else {
      oldOutput = currentOutput;
    }

    oldMathSigh = button.innerText;

    //all signs that change the currentOutput value
    if (button.innerText === "%") {
      currentOutput = (parseFloat(currentOutput) / 100).toFixed(5);
      outputValue(currentOutput);
    } else if (button.innerText === "√") {
      currentOutput = Math.sqrt(currentOutput);
      outputValue(currentOutput);
    } else if (button.innerText === "+/-") {
      currentOutput = currentOutput * -1;
      outputValue(currentOutput);
    } else if (button.innerText === "=") {
      outputValue(oldOutput);
      currentOutput = oldOutput;
      oldOutput = "";
      oldMathSigh = "";
    } else {
      // oldMathSigh = button.innerText;
      currentOutput = "";
      // outputWindow.innerText = oldOutput;
      outputValue(oldOutput);
    }
  }
}
// currentOutput calcMemory
function storeMemory(button) {
  if (button.innerText === "MRC") {
    currentOutput = calcMemory;
    outputValue(currentOutput);
  } else if (button.innerText === "M+") {
    calcMemory += parseFloat(currentOutput);
  } else if (button.innerText === "M-") {
    calcMemory -= parseFloat(currentOutput);
  }
}

function clear() {
  oldOutput = "";
  currentOutput = "";
  oldMathSigh = "";
  outputWindow.innerText = 0;
}
