const computersElement = document.getElementById("laptops");
const descriptionElement = document.getElementById("description");

let computers = [];

//API: noroff-accelerate-drinks.herokuapp.com/drinks
//=> endpoint === drinks

async function getData() {
  await fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then((response) => response.json())
    .then((data) => (computers = data))
    .then((computers) => addComputersToMenu(computers));
}

getData();

const addComputersToMenu = (computers) => {
  computers.forEach((x) => addLaptopToMenu(x));
};

const addLaptopToMenu = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.appendChild(document.createTextNode(laptop.title));
  computersElement.appendChild(laptopElement);
  descriptionElement.innerText = laptop.specs;
};

computersElement.addEventListener("change", (event) => {
  const selectedLaptop = computers.find(
    (laptop) => laptop.title === event.target.value
  );
  descriptionElement.innerText = selectedLaptop.specs;
});
