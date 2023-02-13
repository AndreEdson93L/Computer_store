//Bank script

//Display elements
const balanceElement = document.getElementById("balance");
const loanElement = document.getElementById("loan");

//Buttons
const getLoan = document.getElementById("get-loan");
const payLoan = document.getElementById("pay-loan");

//Variables
let balance = 200;
let loan = 0;
let outstandingLoan = false;

//Functions
const handleLoan = () => {
  if (outstandingLoan) {
    alert("You already have an outstanding loan!");
    return;
  }

  loan = prompt("Please enter amount of the loan: ");

  if (loan === null || loan === "") {
    alert("Please insert a value.");
    return;
  }

  if (!isNaN(loan)) {
    balance = getUpdateValueBalance();
    if (loan <= balance * 2) {
      balance += Number(loan);

      //Injected elements (Displaying values in the html page)
      balanceElement.innerText = `${balance} 💰`;
      loanElement.innerText = `${loan} 🤑`;

      //Set to false when you satisfy the conditions in the function handlePayLoan
      outstandingLoan = true;
    } else {
      alert(
        "You can't get a loan that is greater than twice your current balance!"
      );
    }
  } else {
    alert(
      "You must insert a number! 🤦 => https://en.wikipedia.org/wiki/Number"
    );
  }
};

const handlePayLoan = () => {
  if (!outstandingLoan) {
    alert("You don't have an outstanding loan!");
    return;
  }

  const payment = prompt("Please enter the amount you want to pay back: ");

  if (payment === null || payment === "") {
    alert("Please insert a value.");
    return;
  }

  if (!isNaN(payment)) {
    balance = getUpdateValueBalance();
    loan = getUpdateValueLoan();

    //if you don't have enough money in your balance to pay your loan, it will trigger this condition.
    if (!(balance >= payment)) {
      alert(
        "You don't have enough money in your balance. Please get a job and work!"
      );
      let url = "https://sayingimages.com/wp-content/uploads/what-are-you-doing-get-back-to-work-meme.png.webp";
      memePopup(url);
      return;
    }

    if (payment <= loan) {
      balance -= Number(payment);
      loan -= Number(payment);

      //Injected elements (Displaying values in the html page)
      balanceElement.innerText = `${balance} 💰`;
      if (loan <= 0) {
        loanElement.innerText = `0 🦇`;
      } else {
        loanElement.innerText = `${loan} 🦇`;
      }

      if (loan <= 0) {
        outstandingLoan = false;
      }
    } else {
      alert("You cannot payback more then your loan.");
    }
  } else {
    alert(
      "You must insert a number! 🤦 => https://en.wikipedia.org/wiki/Number"
    );
  }
};

//Injected elements (Displaying values in the html page)
balanceElement.innerText = `${balance} 💰`;
loanElement.innerText = `${loan} 🦇`;

//Even listeners, connecting ours buttons to ours functions
getLoan.addEventListener("click", handleLoan);
payLoan.addEventListener("click", handlePayLoan);
