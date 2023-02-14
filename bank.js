//Bank script

//#region Display elements
const balanceElement = document.getElementById("balance");
const loanElement = document.getElementById("loan");
//#endregion

//#region Buttons
const getLoan = document.getElementById("get-loan");
const payLoan = document.getElementById("pay-loan");
//#endregion

//#region Variables
let balance = 200;
let loan = 0;
let outstandingLoan = false;
//#endregion

//#region Functions to check conditions

//1) function. checking that the user has inserted a value.
const checkValue = (value, errorMessage) => {
  if (value === null || value === "") {
    alert(errorMessage);
    return true;
  }
};

//2) function. checking that the use has inserted a number.
const checkIfNumber = (value, errorMessage) => {
  if (isNaN(value)) {
    alert(errorMessage);
    return true;
  }
};

//3) function. setting conditions to ask a loan. the function returns true only if we satisfy the *conditions.
const setMinMaxLoanRespected = (min, max, loan) => {
  if (loan < min || loan > max){
    alert(`this is the min you can ask: ${min}.\nthis is the max you can ask: ${max}.`);
    return false;
  }

  //*conditions (using the ! operator)
  if (!(loan <= balance * 2)) {
    alert("You can't get a loan that is greater than twice your current balance!");
    return false;
  } else {
    return true;
  }
};
//#endregion

//#region getLoanFunction
const handleLoan = () => {
  if (outstandingLoan) {
    alert("You already have an outstanding loan!");
    return;
  }

  loan = prompt("Please enter amount of the loan: ");

  //Checking that the prompt is not an empty value
  const isEmptyValue = checkValue(loan, "Please insert a numerical value.");
  if (isEmptyValue) return;

  //Checking that the prompt is a number
  const isntNumber = checkIfNumber(loan, "You must insert a number! 🤦 => https://en.wikipedia.org/wiki/Number");
  if(isntNumber) return;

  //Checking that the prompt is number that is not (twice + 1) then the current balance.
  //Example. if your balance is 200 you can get a loan of 400 but not of 400.0001 .. ( ͡° ͜ʖ ͡°)
  const isEligibleForALoan = setMinMaxLoanRespected(10, 10000000, loan);
  if(!isEligibleForALoan) return;

  balance = getUpdateValueBalance();
  balance += Number(loan);

  //Injected elements (Displaying values in the html page)
  balanceElement.innerText = `${balance} 💰`;
  loanElement.innerText = `${loan} 🤑`;

  //Set to true so you cannot ask another loan until you payback the previous one.
  outstandingLoan = true;
};
//#endregion

//#region payLoanFunction
const handlePayLoan = () => {
  if (!outstandingLoan) {
    alert("You don't have an outstanding loan!");
    return;
  }

  const payment = prompt("Please enter the amount you want to pay back: ");

  //Checking that the prompt is not an empty value.
  const isEmptyValue = checkValue(payment, "Please insert a numerical value.");
  if(isEmptyValue) return;

  //Checking if the prompr is a number.
  const isntNumber = checkIfNumber(payment, "You must insert a number! 🤦 => https://en.wikipedia.org/wiki/Number");
  if(isntNumber) return;

  //if you don't have enough money in your balance to pay your loan, it will trigger this condition.
  if (!(getUpdateValueBalance() >= payment)) {
    alert("You don't have enough money in your balance. Please get a job and work!");
    const url = "https://sayingimages.com/wp-content/uploads/what-are-you-doing-get-back-to-work-meme.png.webp";
    memePopup(url);
    return;
  }

  if (payment <= getUpdateValueLoan()) {

    balance = getUpdateValueBalance();
    loan = getUpdateValueLoan();

    balance -= Number(payment);
    loan -= Number(payment);
  
    //Update the UI
    balanceElement.innerText = `${balance} 💰`;
    loanElement.innerText = loan <= 0 ? `0 🦇` : `${loan} 🦇`;
  
    //Update the loan status (work as flag variable)
    //the result of the expression (loan > 0) will determine if the flag variable is false or true.
    outstandingLoan = loan > 0;
  } else {
    alert("You cannot pay back more than your loan.");
  }  
};
//#endregion

//#region Injected elements (Displaying values in the html page)
balanceElement.innerText = `${balance} 💰`;
loanElement.innerText = `${loan} 🦇`;
//#endregion

//#region Even listeners, connecting ours buttons to ours functions
getLoan.addEventListener("click", handleLoan);
payLoan.addEventListener("click", handlePayLoan);
//#endregion