// Import needed modules

import displayScore from "./app.js";
import {
  displayError,
  startNewgame,
  clearScore,
  validNumberInDominio,
} from "./app.js";

// ******* SELECT ITEMS *******

const mainContainer = document.getElementById("main__container");

// EXECUTION

window.addEventListener("DOMContentLoaded", () => {
  // This is just for testing
  console.log("The page has loaded");
  testing();
  handleAmountOfPlayers();
});

// ******** FUNCTIONS ****************

// Asking for amount of players
const handleAmountOfPlayers = () => {
  console.log(mainContainer);

  // Add id to listen to the button. Also, add a paragragh to show alert if it is not a correct number, and use ternary operator for that.
  // Also, I neeed to add all the classes needed

  let item = `
    <article class="modal">

      <h2 class="modal__title">A jugar Dominó</h2>

      <label class="modal__label" for="players">Agregar cantidad de jugadores: </label>
      <input class="modal__input" type="number" placeholder="2, 3 o 4">

      <button>Agregar</button>

    </article>
  `;

  mainContainer.innerHTML = item;
};

// This is just for testing
const testing = () => {
  console.log(validNumberInDominio(24));
};
