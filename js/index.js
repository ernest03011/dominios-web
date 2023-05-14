// Import needed modules

import displayScore from "./app.js";
import {
  displayError,
  startNewgame,
  clearScore,
  validNumberInDominio,
  handleAmountOfPlayers,
} from "./app.js";

// ******* SELECT ITEMS *******

const mainContainer = document.getElementById("main__container");

// EXECUTION

window.addEventListener("DOMContentLoaded", () => {
  // This is just for testing
  console.log("The page has loaded");
  testing();
  handleAmountOfPlayers(mainContainer);
});

// ******** FUNCTIONS ****************

// This is just for testing
const testing = () => {
  console.log(validNumberInDominio(24));
};
