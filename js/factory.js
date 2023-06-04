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
      }, 300);
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
