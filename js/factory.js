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
  const el = document.createElement(type);
  return {
    el,
    setInnetHTML(inner) {
      el.innerHTML = inner;
    },
    setColor(color) {
      el.style.color = color;
    },
    setText(text) {
      el.style.innerText = text;
    },
    setAttribute(attr, name) {
      el.setAttribute(attr, name);
    },
    removeClass(className) {
      el.classList.remove(className);
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
