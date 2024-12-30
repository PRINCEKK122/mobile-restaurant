import { menuArray } from "./data.js";

const menuContainer = document.getElementById("menu");

const composeHTML = function (item) {
  const { name, ingredients, price } = item;

  const menuItem = document.createElement("div");
  const menuShowcase = document.createElement("div");
  const buttonEl = document.createElement("button");
  buttonEl.classList.add("add-item");
  buttonEl.textContent = "+";

  menuItem.classList.add("menu-item");
  menuShowcase.classList.add("menu-showcase");
  menuItem.append(menuShowcase);
  menuItem.append(buttonEl);

  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", `./images/${name.toLowerCase()}.png`);
  imgEl.setAttribute("alt", `${name} emoji`);
  menuShowcase.append(imgEl);

  const menuDetails = document.createElement("div");
  menuDetails.classList.add("menu-showcase-details");
  menuShowcase.append(menuDetails);

  const h2El = document.createElement("h2");
  h2El.classList.add("menu-name");
  h2El.textContent = name;
  menuDetails.append(h2El);

  const ingredientsEl = document.createElement("p");
  ingredientsEl.classList.add("menu-ingredients");
  ingredientsEl.textContent = ingredients.join(", ");
  menuDetails.append(ingredientsEl);

  const priceEl = document.createElement("p");
  priceEl.textContent = `$${price}`;
  menuDetails.append(priceEl);

  menuContainer.append(menuItem);
};

const renderMenuItems = () => {
  menuArray.forEach(function (menu) {
    composeHTML(menu);
  });
};

renderMenuItems();

