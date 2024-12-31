import { menuArray } from "./data.js";

const menuContainer = document.getElementById("menu");
const orderContainer = document.getElementById("orders");
const orderSummary = document.getElementById("order-summary");
const modalContainer = document.getElementById("modal-container");
const submitOrderBtn = document.getElementById("btn-submit");
const form = document.getElementById("form");
const totalEl = document.getElementById("total-price");

let selectedMenuItems = [];

const calcTotalPrice = function (items) {
  return items.reduce(function (acc, item) {
    return acc + item.price;
  }, 0);
};

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
  // keeping track of the buttons as it added to the array
  // I am not checking for duplicates
  // more on that later
  btnEl.setAttribute("data-remove-btn-id", selectedMenuItems.length - 1);

  orderItemDetails.append(btnEl);

  const priceEl = document.createElement("p");
  priceEl.textContent = `$${item.price}`;
  orderDetailsEl.append(priceEl);
  orderContainer.append(orderDetailsEl);

  totalEl.textContent = `$${calcTotalPrice(selectedMenuItems)}`;
};

document.addEventListener("click", function (e) {
  const { id, removeBtnId } = e.target.dataset;

  if (id) {
    orderSummary.classList.remove("hide");
    selectedMenuItems.push(menuArray[Number(id)]);
    renderOrder(menuArray[Number(id)]);
  } else if (removeBtnId) {
    e.target.parentElement.parentElement.remove();
    delete selectedMenuItems[Number(removeBtnId)];
    totalEl.textContent = `$${calcTotalPrice(selectedMenuItems)}`;

    const allElementsEmpty = selectedMenuItems.every(function (item) {
      return item === undefined;
    });

    if (allElementsEmpty) {
      orderSummary.classList.add("hide");
    }
  }
});

submitOrderBtn.addEventListener("click", function () {
  modalContainer.classList.remove("hide");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  console.log(formData.get("fullName"));
});

renderMenuItems();
