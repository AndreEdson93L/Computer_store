//API: "https://hickory-quilled-actress.glitch.me/computers"
//I have also in Json file file, just in case the api wouldn't work properly. => computer.json

//#region Display elements
const computersElement = document.getElementById("laptops");
const specElement = document.getElementById("spec");
const laptopTitle = document.getElementById("laptop-title");
const laptopImage = document.getElementById("laptop-image");
const laptopPrice = document.getElementById("laptopt-price");
const laptopDescription = document.getElementById("laptop-description");
//#endregion

//#region getButtonValue (button => BuyNow) 💸
const buyLaptop = document.getElementById("buy-laptop");
//#endregion

//#region Global variables
let computers = [];
//#endregion

//#region getDataFromApiFunction
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
//#endregion

//#region Functions Grouped in a single region

//#region addLaptopToTheMenu, laptops section in the html page. We call this function inside the addComputersToMenu function.
const addLaptopToMenu = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.appendChild(document.createTextNode(laptop.title));
  computersElement.appendChild(laptopElement);
};
//#endregion

//#region addingLaptopsToOurGlobalVariableFunction, global variable => let computers = [];
const addComputersToMenu = (computers) => {
  computers.forEach((x) => addLaptopToMenu(x));
  //We use this computers[0] to access the first value of the array and display in the page the first laptop in our API
  laptopTitle.innerText = computers[0].title;
  laptopPrice.innerText = computers[0].price + " 💸";
  laptopDescription.innerText = computers[0].description;

  const lineBreak = document.createElement("br");
  specElement.innerHTML = computers[0].specs.join(lineBreak.outerHTML);

  //With this workaroung I concatenate the first part of the url with the last part that identify the resource {image}.
  laptopImage.setAttribute("src", "https://hickory-quilled-actress.glitch.me/" + computers[0].image);
  // Add an event listener to handle image loading errors and loading memes instead.
  laptopImage.onerror = function () {
    console.log("Failed to load image: ", selectedLaptop.image);
    laptopImage.setAttribute(
      "src",
      "http://images2.memedroid.com/images/UPLOADED54/524dde0e6668e.jpeg"
    );
  };
};
//#endregion

//#region featuresFunction, Laptops section: every time we change laptop in the drop box menu, it will automatically update all the data.  
computersElement.addEventListener("change", (event) => {
  const selectedLaptop = computers.find(
    (laptop) => laptop.title === event.target.value
  ); 
  //Variable we are referring to handle the changes in the drop menu => {selectedLaptop}.
  laptopTitle.innerText = selectedLaptop.title;

  //In this ways we can visualize the features (laptops section) without the comma and one below the other
  const lineBreak = document.createElement("br");
  specElement.innerHTML = selectedLaptop.specs.join(lineBreak.outerHTML);

  laptopDescription.innerText = selectedLaptop.description;
  laptopPrice.innerText = selectedLaptop.price + " 💸";
  //Setting the image for the laptop
  laptopImage.setAttribute("src", "https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image);

  //Add an event listener to handle image loading errors and loading a meme instead.
  laptopImage.onerror = function () {
    console.log("Failed to load image: ", selectedLaptop.image);
    laptopImage.setAttribute("src", "http://images2.memedroid.com/images/UPLOADED54/524dde0e6668e.jpeg");
  };
});
//#endregion

//#region getValueWithoutEmojiToPerformMathFunction
const getValueWithoutEmoji = (value) => {
  //regex to get the numerical values and not the emoji currency.
  return value.match(/\d+/g);
}
//#endregion

//#region getLaptopValue, with this function we get the value of the current laptop that we are displaying.
const getUpdateValueLaptop = () => {
  //Getting the value with the emoji.
  let laptopValueWithEmoji = laptopPrice.innerHTML;
  let laptopArrayValue = getValueWithoutEmoji(laptopValueWithEmoji);

  //Checking if the value of the laptio is an integer or a float (if it's a float value it will join("."))
  if (laptopArrayValue == 2) {
    const laptopNumValue = parseFloat(laptopArrayValue.join("."));
    return laptopNumValue;
  } else {
    const laptopNumValue = parseFloat(laptopArrayValue[0]);
    return laptopNumValue;
  }
};
//#endregion

//#region buyLaptopFunction, triggered by the Buy Now button
const handleLaptopPayment = () => {
  const balance = getUpdateValueBalance();
  const price = getUpdateValueLaptop();

  if (balance >= price) {
    balanceElement.innerText = `${balance - price} 💰`;
    alert("Congratulations!!! You have now a new computer!");
  } else {
    alert("You don't have enough money!");
    let url = "https://th.bing.com/th/id/R.475f0e4fb521271c0c384f6c25cb8ddc?rik=8cC6ydVvjvD%2fAg&riu=http%3a%2f%2fwww.relatably.com%2fm%2fimg%2fno-money-memes%2fwhat-no-money.jpg&ehk=cSJmrXlEJyJKCcMYrJgNyTkCoreATqd4Qmp9G%2bCIeaA%3d&risl=&pid=ImgRaw&r=0";  
    memePopup(url);
  }
};
//#endregion

//#region generateMemeFunction, I am happy with this function.
const memePopup = (urlMeme) => {
  //variables that we use to set up the position of the meme randomly
  let leftValue = Math.floor(Math.random() * screen.width);
  let topValue = Math.floor(Math.random() * screen.height);
  let popup = window.open(urlMeme, "Pop-up Image", "width=300, height=300, left=" + leftValue + ", top=" + topValue);
  //function that we use to close the popup after 3 seconds
  setTimeout(function () {
    popup.close();
  }, 3000);
};
//#endregion

//#endregion

//#region Even listener, connecting the button (Buy Now) to the function handleLaptopPayment()
buyLaptop.addEventListener("click", handleLaptopPayment);
//#endregion