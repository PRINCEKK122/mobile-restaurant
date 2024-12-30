import { menuArray } from "./data.js";

const menuContainer = document.getElementById("menu");
const orderContainer = document.getElementById("orders");
const totalEl = document.getElementById("total-price");
const selectedItems = [];

const composeHTML = function (item) {
  const { name, ingredients, price, id } = item;

  const menuItem = document.createElement("div");
  const menuShowcase = document.createElement("div");
  const buttonEl = document.createElement("button");
  buttonEl.classList.add("add-item");
  buttonEl.textContent = "+";
  buttonEl.setAttribute("data-id", id);

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

const renderOrder = (item) => {
  const orderDetailsEl = document.createElement("div");
  const orderItemDetails = document.createElement("div");

  orderDetailsEl.classList.add("order-details");
  orderItemDetails.classList.add("order-details-item");
  orderDetailsEl.append(orderItemDetails);

  const pEl = document.createElement("p");
  pEl.classList.add("menu-name");
  pEl.textContent = item.name;
  orderItemDetails.append(pEl);

  const btnEl = document.createElement("button");
  btnEl.textContent = "remove";
  btnEl.setAttribute("class", "btn remove-btn");
  orderItemDetails.append(btnEl);

  const priceEl = document.createElement("p");
  priceEl.textContent = `$${item.price}`;
  orderDetailsEl.append(priceEl);
  orderContainer.append(orderDetailsEl);

  const totalPrice = selectedItems.reduce(function (total, item) {
    console.log(item);
    return item.price + total;
  }, 0);

  totalEl.textContent = `$${totalPrice}`;
};

document.addEventListener("click", function (e) {
  const orders = [];
  const id = e.target.dataset.id;

  if (id) {
    document.getElementById("order-summary").classList.remove("hide");
    selectedItems.push(menuArray[id]);
    renderOrder(menuArray[id]);
  }
});

renderMenuItems();
