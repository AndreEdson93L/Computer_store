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

//#region settingLatopProperties [title, price, description]
const setLaptopProperties = (laptop) => {
  laptopTitle.innerText = laptop.title;
  laptopPrice.innerText = laptop.price + " 💸";
  laptopDescription.innerText = laptop.description;
};
//#endregion

//#region setImage(), setting the image for the current laptop
const setImage = (laptop) => {
  laptopImage.setAttribute("src", "https://hickory-quilled-actress.glitch.me/" + laptop.image);
  laptopImage.onerror = function () {
    console.log("Failed to load image: ", laptop.image);
    laptopImage.setAttribute("src", "http://images2.memedroid.com/images/UPLOADED54/524dde0e6668e.jpeg");
  };
};
//#endregion

//#region addingFeatureas in the html page. We create an ul > li * {nOfItems in specs (see API, json file for the details)}
const setSpecs = (laptop) => {
  const specsList = document.createElement("ul");
  specsList.style.listStyle = "none"; // Add this line to remove bullet points

  laptop.specs.map((spec) => {
    const specItem = document.createElement("li");
    specItem.innerText = spec;
    specsList.appendChild(specItem);
  });

  // Remove any existing specs list first
  specElement.innerHTML = "";
  specElement.appendChild(specsList);
};
//#endregion

//#region addComputersToMenu
const addComputersToMenu = (computers) => {
  computers.forEach((laptop) => addLaptopToMenu(laptop));
  // Set the initial laptop properties and image to the first laptop in the list (first load of the page)
  setLaptopProperties(computers[0]);
  setImage(computers[0]);
  setSpecs(computers[0]);
};

computersElement.addEventListener("change", (event) => {
  const selectedLaptop = computers.find((laptop) => laptop.title === event.target.value);
  setLaptopProperties(selectedLaptop);
  setImage(selectedLaptop);
  setSpecs(selectedLaptop);
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