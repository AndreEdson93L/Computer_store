//API: "https://hickory-quilled-actress.glitch.me/computers"
//I have also in Json file file, just in case the api wouldn't work properly. => computer.json

const computersElement = document.getElementById("laptops");
const specElement = document.getElementById("spec");
const laptopTitle = document.getElementById("laptop-title");
const laptopImage = document.getElementById("laptop-image");

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

const addComputersToMenu = (computers) => {
  computers.forEach((x) => addLaptopToMenu(x));
  //We are setting the first title of the API in the section where you can buy the computer.
  laptopTitle.innerText = computers[0].title;
  //With this workaroung I concatenate the first part of the url with the last part that identify the resource {image}.
  laptopImage.setAttribute(
    "src",
    "https://hickory-quilled-actress.glitch.me/" + computers[0].image
  );
};

const addLaptopToMenu = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.appendChild(document.createTextNode(laptop.title));
  computersElement.appendChild(laptopElement);
  specElement.innerText = laptop.specs;
};

computersElement.addEventListener("change", (event) => {
  const selectedLaptop = computers.find(
    (laptop) => laptop.title === event.target.value
  );
  laptopTitle.innerText = selectedLaptop.title;
  specElement.innerText = selectedLaptop.specs;

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
