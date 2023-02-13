//API: "https://hickory-quilled-actress.glitch.me/computers"
//I have also in Json file file, just in case the api wouldn't work properly. => computer.json

//Display elements
const computersElement = document.getElementById("laptops");
const specElement = document.getElementById("spec");
const laptopTitle = document.getElementById("laptop-title");
const laptopImage = document.getElementById("laptop-image");
const laptopPrice = document.getElementById("laptopt-price");
const laptopDescription = document.getElementById("laptop-description");

//Buttons 💸
const buyLaptop = document.getElementById("buy-laptop");

let computers = [];

async function getData() {
  try {
    await fetch("https://hickory-quilled-actress.glitch.me/computers")
      .then((response) => response.json())
      .then((data) => (computers = data))
      .then((computers) => addComputersToMenu(computers));
  } catch (error) {
    console.log(error);
  }
}

getData();

//Functions
const addComputersToMenu = (computers) => {
  computers.forEach((x) => addLaptopToMenu(x));
  //We are setting the first title of the API in the section where you can buy the computer.
  laptopTitle.innerText = computers[0].title;
  //With this workaroung I concatenate the first part of the url with the last part that identify the resource {image}.
  laptopImage.setAttribute(
    "src",
    "https://hickory-quilled-actress.glitch.me/" + computers[0].image
  );
  // Add an event listener to handle image loading errors and loading memes instead.
  laptopImage.onerror = function () {
    console.log("Failed to load image: ", selectedLaptop.image);
    laptopImage.setAttribute(
      "src",
      "http://images2.memedroid.com/images/UPLOADED54/524dde0e6668e.jpeg"
    );
  };
  //Setting the price of the first element that the page will display.
  //In my project I choose to use the emoji currency. If people buy nft why the shouldn't pay with emojis?
  laptopPrice.innerText = computers[0].price + " 💸";
  //Setting the description of the first element that the page will display.
  laptopDescription.innerText = computers[0].description;
  //Setting the first element specin the drop vox menu
  const lineBreak = document.createElement("br");
  specElement.innerHTML = computers[0].specs.join(lineBreak.outerHTML);
};

const getUpdateValueLaptop = () => {
  //Getting the value with the emoji.
  let laptopValueWithEmoji = laptopPrice.innerHTML;
  //Using a regex to get the numerical values and not the emoji currency.
  //With this regex if the number is a float it will return an array with length of two.
  //Otherwise it will return an array of lenght one.
  let laptopArrayValue = laptopValueWithEmoji.match(/\d+/g);
  //Final variables that will get the final value after the join().
  let laptopNumValue = 0;

  if (laptopArrayValue == 2) {
    laptopNumValue = parseFloat(laptopArrayValue.join("."));
    return laptopNumValue;
  } else {
    laptopNumValue = parseFloat(laptopArrayValue[0]);
    return laptopNumValue;
  }
};

const handleLaptopPayment = () => {
  let balance = getUpdateValueBalance();
  let price = getUpdateValueLaptop();

  if (balance >= price) {
    balanceElement.innerText = `${balance - price} 💰`;
    alert("Congratulations!!! You have now a new computer!");
  } else {
    alert("You don't have enough money!");
    let url = "https://th.bing.com/th/id/R.475f0e4fb521271c0c384f6c25cb8ddc?rik=8cC6ydVvjvD%2fAg&riu=http%3a%2f%2fwww.relatably.com%2fm%2fimg%2fno-money-memes%2fwhat-no-money.jpg&ehk=cSJmrXlEJyJKCcMYrJgNyTkCoreATqd4Qmp9G%2bCIeaA%3d&risl=&pid=ImgRaw&r=0";  
    memePopup(url);
  }
};

const memePopup = (urlMeme) => {
  let leftValue = Math.floor(Math.random() * screen.width);
  let rightValue = Math.floor(Math.random() * screen.height);
  let popup = window.open(
    urlMeme,
    "Pop-up Image",
    "width=300, height=300, left=" + leftValue + ", top=" + rightValue
  );
  // Close each window after 3 seconds
  setTimeout(function () {
    popup.close();
  }, 3000);
};

const addLaptopToMenu = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.appendChild(document.createTextNode(laptop.title));
  computersElement.appendChild(laptopElement);
  //specElement.innerText = laptop.specs.join(document.createElement("br"));
};

computersElement.addEventListener("change", (event) => {
  const selectedLaptop = computers.find(
    (laptop) => laptop.title === event.target.value
  );
  //Every time we change computer in the drop box, it will automatically update all the data {selectedLaptop}
  laptopTitle.innerText = selectedLaptop.title;
  const lineBreak = document.createElement("br");
  specElement.innerHTML = selectedLaptop.specs.join(lineBreak.outerHTML);
  laptopDescription.innerText = selectedLaptop.description;
  laptopPrice.innerText = selectedLaptop.price + " 💸";
  laptopImage.setAttribute(
    "src",
    "https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image
  );

  // Add an event listener to handle image loading errors and loading memes instead.
  laptopImage.onerror = function () {
    console.log("Failed to load image: ", selectedLaptop.image);
    laptopImage.setAttribute(
      "src",
      "http://images2.memedroid.com/images/UPLOADED54/524dde0e6668e.jpeg"
    );
  };
});

//Even listeners, connecting ours buttons to ours functions
buyLaptop.addEventListener("click", handleLaptopPayment);
