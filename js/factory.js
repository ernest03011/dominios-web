import { Player } from "./player.js";
export default function displayMessage() {
  const el = document.getElementById("card-message");

  return {
    display: function (color, msg) {
      el.style.color = color;
      el.classList.remove("hidden-visible");
      el.innerHTML = msg;

      setTimeout(() => {
        el.classList.add("hidden-visible");
      }, 2000);
    },
  };
}

export function createElement(type) {
  const fragment = document.createDocumentFragment();
  const element = document.createElement(type);
  fragment.appendChild(element);
  return {
    fragment,
    setInnetHTML(inner) {
      element.innerHTML = inner;
    },
    setColor(color) {
      element.style.color = color;
    },
    setText(text) {
      element.textContent = text;
    },
    setAttribute(attr, name) {
      element.setAttribute(attr, name);
    },
    removeClass(className) {
      element.classList.remove(className);
    },
    appendChild(child) {
      element.appendChild(child);
    },
    setDisplay(attr) {
      element.style.display = attr;
    },
  };
}

export function getOrdinalNumber(number) {
  const ordinalNumber = {
    1: "first",
    2: "second",
    3: "third",
    4: "fourth",
  };

  return ordinalNumber[number] || "first";
}

export function createPlayer(name) {
  return new Player(name);
}

export function inputUtlt(params) {
  let isValid = true;
  let isAlphabetic = true;
  let inputPropelCase = [];
  const nameRegex = /^[a-zA-Z]+$/; // Regular expression to match only alphabetic characters

  params.forEach((param) => {
    param.value = param.value.trim();
    let item = "";
    if (!param.value) {
      isValid = false;
    } else if (!nameRegex.test(param.value)) {
      isAlphabetic = false;
    } else {
      item = `${param.value[0].toUpperCase()}${param.value
        .slice(1)
        .toLowerCase()}`;
      inputPropelCase.push(item);
    }
  });

  return {
    isValid,
    isAlphabetic,
    inputPropelCase,
  };
}
