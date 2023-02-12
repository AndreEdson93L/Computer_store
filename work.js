//Work script

//Display elements
const salaryElement = document.getElementById("salary");

//Getting values of the bank account
const balanceElementWork = document.getElementById("balance");
const loanElementWork = document.getElementById("loan");

//Buttons
const bankTransfer = document.getElementById("get-bank");
const salaryTransfer = document.getElementById("get-work");

//Variables
let salary = 0;

//Functions
const getUpdateValueBalance = () => {
  //Value in Balance
  let balanceValue = balanceElementWork.innerHTML;

  //using a regex to get the numerical values and not the emoji currency
  let balanceArrayValue = balanceValue.match(/\d+/g);

  //Final variables that will get the final value after the join()
  let balanceNumValue = 0;

  if (balanceArrayValue.length == 2) {
    balanceNumValue = parseFloat(balanceArrayValue.join("."));
    return balanceNumValue;
  } else {
    balanceNumValue = parseFloat(balanceArrayValue[0]);
    return balanceNumValue;
  }
};

const getUpdateValueLoan = () => {
  //Values in Loan:
  let loanValue = loanElementWork.innerHTML;

  //using a regex to get the numerical values and not the emoji currency
  let loanArrayValue = loanValue.match(/\d+/g);

  //Final variables that will get the final value after the join()
  let loanNumValue = 0;

  if (loanArrayValue == 2) {
    loanNumValue = parseFloat(loanArrayValue.join("."));
    return loanNumValue;
  } else {
    loanNumValue = parseFloat(loanArrayValue[0]);
    return loanNumValue;
  }
};

const handleWorkForSalary = () => {
  salary += 100;
  salaryElement.innerText = `${salary} 🔫`;
};

const handleBankTransfer = () => {
  if (salary > 0) {
    const balanceNumValue = getUpdateValueBalance();
    const loanNumValue = getUpdateValueLoan();

    if (loanNumValue === 0) {
      balanceElementWork.innerHTML = `${balanceNumValue + salary} 💰`;
      salary = 0;
      salaryElement.innerText = `${salary} 🔫`;
    } else {
      handlePayLoanPercentagePayment(salary);
      salary = 0;
      salaryElement.innerText = `${salary} 🔫`;
    }
  }
};

const handlePayLoanPercentagePayment = (salary) => {
  const percetange = ((salary / 100) * 10).toFixed(2);
  const realSalary = ((salary / 100) * 90).toFixed(2);
  balance = getUpdateValueBalance();
  loan = getUpdateValueLoan();

  if (loan - Number(percetange) >= 0) {
    loan -= Number(percetange);
    balance += Number(realSalary);

    loanElementWork.innerText = `${loan} 🦇`;
    balanceElementWork.innerHTML = `${balance} 💰`;
  } else {
    //With this else we handle the last payment of the loan
    loan = 0;
    balance += Number(realSalary);
    outstandingLoan = false;

    loanElementWork.innerText = `0 🦇`;
    balanceElementWork.innerHTML = `${balance} 💰`;
  }
};

//Injected elements (Displaying values in the html page)
salaryElement.innerText = `${salary} 🔫`;

//Even listeners, connecting ours buttons to ours functions
salaryTransfer.addEventListener("click", handleWorkForSalary);
bankTransfer.addEventListener("click", handleBankTransfer);
