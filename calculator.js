"use strict";

var temp;
var save1;
var save2;
var opcal;
var currentOpcal;

function digitOnClick() {
    opOffClick();
    let currentDisplay = document.getElementById("currentDisplay");
    let clickedDigit = this.innerHTML;
    if ((currentDisplay.innerHTML == "0") || (temp)) {
        currentDisplay.innerHTML = clickedDigit;
        temp = null;
    } else {
        if ((currentDisplay.innerHTML.length < 9 && currentDisplay.innerHTML.indexOf(".") == -1) ||
        (currentDisplay.innerHTML.length < 10 && currentDisplay.innerHTML.indexOf(".") != -1)) {
            currentDisplay.innerHTML += clickedDigit;
        }
    }
}

function decimalOnClick() {
    opOffClick();
    let currentDisplay = document.getElementById("currentDisplay");
    let clickedDecimal = this.innerHTML;
    if ((currentDisplay.innerHTML.indexOf(".") == -1) && (currentDisplay.innerHTML.length < 9)) {
        currentDisplay.innerHTML += clickedDecimal;
    }
}

function opOnClick() {
    opOffClick();
    let currentDisplay = document.getElementById("currentDisplay");
    currentOpcal = this.innerHTML;
    temp = currentDisplay.innerHTML;

    if (save1) {
        save2 = temp;
        exeOnClick();
    } else {
        save1 = temp;
        opcal = currentOpcal;
    }
    this.classList.add("active");
}

function opOffClick() {
    let opBtns = document.getElementsByClassName("op");
    for( let i=0; i<opBtns.length; i++ ) {
        opBtns[i].classList.remove("active");
    }
}

function clearOnClick() {
    opOffClick();
    let currentDisplay = document.getElementById("currentDisplay");
    currentDisplay.innerHTML = "0";
    save1 = null;
    save2 = null;
    opcal = null;
}

function exeOnClick() {
    opOffClick();
    let currentDisplay = document.getElementById("currentDisplay");
    let firstNum=parseFloat(save1);
    let secondNum;
    if (save2) {
        secondNum=parseFloat(save2);
    } else {
        secondNum=parseFloat(currentDisplay.innerHTML);
    }

    let answer;
    if (opcal == "+") {
        answer = firstNum + secondNum;
    } else if (opcal == "-") {
        answer = firstNum - secondNum;
    } else if (opcal == "x") {
        answer = firstNum * secondNum;
    } else {
        answer = firstNum / secondNum;
    }

    let decimalIndex = answer.toString().indexOf(".");
    if (decimalIndex != -1) {
        let decimalPlace = answer.toString().substring(decimalIndex+1);
        if (decimalPlace.length > 8) {
            answer = parseFloat(answer).toFixed(8);
        }
    }

    if (answer.toString().length > 10) {
        answer = parseFloat(answer).toPrecision(9);
        if (answer.toString().indexOf("e") != -1) {
            answer = parseFloat(answer).toExponential(5);
            answer = answer.replace("+", "");
        }
    }

    if (save1 == null && save2 == null && opcal == null) {
        currentDisplay.innerHTML = "0";
    } else {
        currentDisplay.innerHTML = answer;
    }

    if (save2) {
        save1 = answer;
        opcal = currentOpcal;
    } else {
        save1 = null;
        opcal = null;
    }
    save2 = null;
}

document.addEventListener('DOMContentLoaded', function() {
    let digitBtns = document.getElementsByClassName("digit");
    for( let i=0; i<digitBtns.length; i++ ) {
        digitBtns[i].addEventListener("click", digitOnClick);
    }

    let decimalBtns = document.getElementById("decimal");
    decimalBtns.addEventListener("click", decimalOnClick);

    let opBtns = document.getElementsByClassName("op");
    for( let i=0; i<opBtns.length; i++ ) {
        opBtns[i].addEventListener("click", opOnClick);
    }

    let clearBtns = document.getElementById("clear");
    clearBtns.addEventListener("click", clearOnClick);

    let exeBtns = document.getElementById("exe");
    exeBtns.addEventListener("click", exeOnClick);
});