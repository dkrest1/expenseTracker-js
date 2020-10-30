// ui Element
const container = document.querySelector('.container'),
      expenseHeader = document.querySelector('.expense-title'),
      expenseForm = document.querySelector('#expense-form'),
      expenseDescription = document.querySelector('#expense-description'),
      expenseAmount = document.querySelector('#expense-amount'),
      expenseSelection = document.querySelector('#expense-select'),
      expenseBtn = document.querySelector('#expense-btn'),
      expenses = document.querySelector('#expenses'),
      expensesList = document.querySelector('.expenses-list'),
      clearBtn = document.querySelector('#clear-btn'),
      totalIncome = document.querySelector('#total-income'),
      totalOutcome = document.querySelector('#total-outcome'),
      totalBalance = document.querySelector('#total-balance');



eventlisteners();     

function eventlisteners() {
    // listen for submit
    expenseForm.addEventListener('submit', displayExpenses);
    // expensesList listen for click
    expensesList.addEventListener('click', deleteExpense);
}


// displayExpenses function
function displayExpenses(e) {
    // prevent form from submitting
    e.preventDefault();

    // define the input value
    let descriptionValue = expenseDescription.value,
        amountValue = expenseAmount.value;

    //   if input is empty
    if((descriptionValue === '') || (amountValue === '')) {
        displayAlert(`Please Check Your Values`);
        clearAlert()
    }else {
        //   create element li
        const li = document.createElement('li');
        // add class name
        li.className = 'expenses-item';
        // append li to expenseList
        expensesList.appendChild(li);
        // create element p for description of expense
        const p = document.createElement('p');
        p.className = 'expense-text';
        p.appendChild(document.createTextNode(descriptionValue));
        // append p to li
        li.appendChild(p);
        // create element div
        const div = document.createElement('div');
        // add class name 
        div.className = 'expense-amount';
        // append amount value to div
        div.innerHTML = `<span>$</span><span>${Math.abs((expenseAmount.value))}</span>`
        // append div to li
        li.appendChild(div);
        // create element a
        const a = document.createElement('a');
        a.className = 'expense-link';
        a.innerHTML = `<i class="fa fa-remove"></i>`;
        // append a to li
        li.appendChild(a);
        
        // clear input
        expenseDescription.value = '';
        expenseAmount.value = '';

        // display netExpenses
        netExpenses(amountValue);

        console.log(allTotalInCome);
        console.log(allTotalOutome)

        
    };

};


  // total income
const allTotalInCome = [];
 // total outcome
const allTotalOutome = [];

// net expenses
function netExpenses(amount) {
    // convert input amount to number
    let  amountToNum = parseFloat(amount);
  
    // condition for totalincome
    if(amountToNum > 0) {
        allTotalInCome.push(amountToNum);
        //  the sum of all income
        let incomingTotal = allTotalInCome.reduce((acc, value) => {
            return acc + value

        }, 0);

        totalIncome.value = (incomingTotal).toFixed(2);

    }else {

        allTotalOutome.push(amountToNum);
        // the sum of all outcome
        let outgoingTotal = allTotalOutome.reduce((acc, value) => {
        return acc + value;
      }, 0);

      totalOutcome.value = (Math.abs(outgoingTotal)).toFixed(2);
    };

    // to get total Balance
    totalBalance.value = eval(Number(totalIncome.value) - Number(totalOutcome.value)).toFixed(2);
}



// to delete an expense
function deleteExpense(e) {
    let targetElement = e.target;
  
    // condition to delete expense
   if(targetElement.parentElement.classList.contains('expense-link')){
        targetElement.parentElement.parentElement.remove();

        let amountElement = parseFloat(targetElement.parentElement.previousElementSibling.lastElementChild.innerText);
       


        // check the amount to delete
        let checkIndexIncome = allTotalInCome.includes(amountElement);
        let checkIndexOutcome = allTotalOutome.includes(amountElement);
        // to delete an income expense amount from expenses list
        if(checkIndexIncome = true) {
            let indexOfAmountElement = allTotalInCome.indexOf(amountElement);
            allTotalInCome.splice(indexOfAmountElement, 1);
             //  the sum of all income
            let incomingTotal = allTotalInCome.reduce((acc, value) => {
                return acc + value

            }, 0);

            totalIncome.value = (incomingTotal).toFixed(2);
        }

        // condition to delete an outcome expense amount from expenses list
        if(checkIndexOutcome = true) {
            let indexOfNegativeAmountElement = allTotalOutome.indexOf(amountElement);
            allTotalOutome.splice(indexOfNegativeAmountElement, 1);
            let outgoingTotal = allTotalOutome.reduce((acc, value) => {
                return acc + value;
              }, 0);
        
              totalOutcome.value = (Math.abs(outgoingTotal)).toFixed(2);
        }

         // to get total Balance
        // totalBalance.value = eval(Number(totalIncome.value) - Number(totalOutcome.value)).toFixed(2);

    }

}

// display alert 
function displayAlert(msg) {
    // create element div
    const div = document.createElement('div');
    // add class name
    div.className = 'alert';
    // append a text 
    div.appendChild(document.createTextNode(msg));
    // insert before header
    container.insertBefore(div, expenseHeader)
}

// clear alert
function clearAlert() {
    // get alert
    const alert = document.querySelector('.alert');
    setTimeout(() => {
        alert.remove();
    }, 2000)
};