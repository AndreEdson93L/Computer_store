//Work script

//#region getSalaryElement in the html page (id = "salary") => Pay: {value} in the web browser page
const salaryElement = document.getElementById("salary");
//#endregion

//#region gettingBalanceLoanValues
const balanceElementWork = document.getElementById("balance");
const loanElementWork = document.getElementById("loan");
//#endregion

//#region getButtonValues
const bankTransfer = document.getElementById("get-bank");
const salaryTransfer = document.getElementById("get-work");
//#endregion

//#region Variables
let salary = 0;
//Update UI at the first load of the page 
salaryElement.innerText = `${salary} 🔫`;
//#endregion

//#region Functions

//#region getUpdateValueInYourBalance from the html page.
const getUpdateValueBalance = () => {
  //Value in Balance
  const balanceValue = balanceElementWork.innerHTML;
  //using a function (that uses a regex) to get the numerical values and not the emoji currency
  const balanceArrayValue = getValueWithoutEmoji(balanceValue);

  //if the value is a float we will trigger the join(".") function.
  if (balanceArrayValue.length == 2) {
    const balanceNumValue = parseFloat(balanceArrayValue.join("."));
    return balanceNumValue;
  } else {
    const balanceNumValue = parseFloat(balanceArrayValue[0]);
    return balanceNumValue;
  }
};
//#endregion

//#region getCurrentValueInLoanFunction
const getUpdateValueLoan = () => {
  //Get value in Loan:
  const loanValue = loanElementWork.innerHTML;

  //using a function to get the numerical value and not the emoji currency (return an array of length == 1 0r length == 2)
  const loanArrayValue = getValueWithoutEmoji(loanValue);

  //variable that will return. If it is a float the value will be joined => join(".")
  if (loanArrayValue == 2) {
    const loanNumValue = parseFloat(loanArrayValue.join("."));
    return loanNumValue;
  } else {
    const loanNumValue = parseFloat(loanArrayValue[0]);
    return loanNumValue;
  }
};
//#endregion

//#region workForSalaryFunction, triggered by the button => Work
const handleWorkForSalary = () => {
  salary += 100;
  salaryElement.innerText = `${salary} 🔫`;
};
//#endregion

//#region transferMoneyFromYourPay to your balance, if you have an outstanding loan your salary will be deducted of the 10% (check this function => handlePayLoanPercentagePayment(salary))
const handleBankTransfer = () => {
  if (salary > 0) {
    if (getUpdateValueLoan() === 0) {
      balanceElementWork.innerHTML = `${getUpdateValueBalance() + salary} 💰`;
      salary = 0;
      salaryElement.innerText = `${salary} 🔫`;
    } else {
      handlePayLoanPercentagePayment(salary);
      salary = 0;
      salaryElement.innerText = `${salary} 🔫`;
    }
  }
};
//#endregion

//#region deduction of the 10% of your pay if you have an oustanding loan
const handlePayLoanPercentagePayment = (salary) => {
  const percetange = ((salary / 100) * 10).toFixed(2);
  const realSalary = ((salary / 100) * 90).toFixed(2);
  balance = getUpdateValueBalance();
  loan = getUpdateValueLoan();

  if (loan - Number(percetange) >= 0) {
    loan -= Number(percetange);
    balance += Number(realSalary);

    loanElementWork.innerText = `${loan} 🦇`;
    balanceElementWork.innerText = `${balance} 💰`;
  } else {
    //With this else we handle the last payment of the loan
    loan = 0;
    balance += Number(realSalary);
    outstandingLoan = false;

    loanElementWork.innerText = `0 🦇`;
    balanceElementWork.innerText = `${balance} 💰`;
  }
};
//#endregion

//#endregion

//#region Even listeners, connecting ours buttons to ours functions
salaryTransfer.addEventListener("click", handleWorkForSalary);
bankTransfer.addEventListener("click", handleBankTransfer);
//#endregion