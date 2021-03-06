"use strict";

var entryForm = document.getElementById("enteries");
var expDes = document.getElementById('textField');
var fdBack1 = document.getElementById('feedBack1');
var expAmt = document.getElementById('amount');
var fdBack2 = document.getElementById('feedBack2');
var addItem = document.getElementById('addItem');
var UList = document.getElementById('UList');
var income = document.getElementById('tIncomes');
var expense = document.getElementById('tExpenses');
var balance = document.getElementById('tBalances');
var deleteAll = document.getElementById('clearAll');

function newTrack(e) {
  e.preventDefault();

  if (expDes.value === '' && expAmt.value !== '') {
    fdBack1.innerHTML = 'You have to enter a Description';
    fdBack2.innerHTML = '';
  } else if (expDes.value !== '' && expAmt.value === '') {
    fdBack1.innerHTML = '';
    fdBack2.innerHTML = 'You have to enter an amount';
  } else if (expDes.value === '' && expAmt.value === '') {
    fdBack1.innerHTML = 'You have to enter a Description';
    fdBack2.innerHTML = 'You have to enter an amount';
  } else {
    addToList(expDes.value, parseFloat(expAmt.value));
    tIncomesExpenses(parseFloat(expAmt.value));
    expDes.value = '';
    expAmt.value = '';
    fdBack1.innerHTML = '';
    fdBack2.innerHTML = '';
    expDes.focus();
    balance.value = tBalance(); // console.log(sumIncome);
  }
}

addItem.addEventListener('click', newTrack, false);

function addToList(a, b) {
  var li = document.createElement('li');
  li.className = 'trackItem';
  li.appendChild(document.createTextNode(a));
  var price = document.createElement('span');
  price.setAttribute('id', 'prices');
  price.appendChild(document.createTextNode('$ ' + b.toLocaleString()));

  if (b > 0) {
    li.setAttribute('class', 'incomePrice');
  } else {
    li.setAttribute('class', 'expensePrice');
  }

  li.appendChild(price); // li.appendChild(document.createTextNode('$' +  b));

  var removeTrack = document.createElement('button');
  removeTrack.setAttribute('id', 'deleteTrack');
  removeTrack.textContent = 'X';
  removeTrack.addEventListener('click', deleteItemList, false);
  li.appendChild(removeTrack);
  UList.appendChild(li);
} //function to calculate totalIncome


var sumIncome = [];
var sumExpense = [];

function tIncomesExpenses(x) {
  if (x >= 0) {
    sumIncome.push(x);
    addt = sumIncome.reduce(function (a, b) {
      return a + b;
    }, 0);
    income.value = addt;
  } else {
    sumExpense.push(x);
    subt = sumExpense.reduce(function (a, b) {
      return a + b;
    }, 0);
    expense.value = subt;
  }
} // Delete an item from the list


function deleteItemList() {
  var li = this.parentNode;
  li.remove(); // sumExpense;
  // for (i=0; i<sumIncome; i++) {
  //     sumIncome.pop(i);
  // }
  // console.log(sumIncome);
} //function to clear all list item


var deleteAll = document.getElementById('clearAll');

function clearList() {
  UList.innerHTML = '';
  income.value = parseFloat(0.00);
  expense.value = parseFloat(0.00);
  balance.value = parseFloat(0.00);
}

deleteAll.addEventListener('click', clearList, false); // Making the total amount field non-editable

income.readOnly = true;
expense.readOnly = true;
balance.readOnly = true;

function tBalance() {
  var elTincomes = parseFloat(income.value);
  var elTexpenses = parseFloat(expense.value);
  var elBalance = elTincomes + elTexpenses;
  return elBalance;
}