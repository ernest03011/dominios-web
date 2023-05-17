// Import needed modules

import displayScore from "./app.js";
import {
  displayError,
  startNewgame,
  clearScore,
  validNumberInDominio,
  handleAmountOfPlayers,
  displayAllPlayers,
  saveAllPlayers,
  getAllPlayers,
} from "./app.js";

// ******* SELECT ITEMS *******

const mainContainer = document.getElementById("main__container");

// EXECUTION

window.addEventListener("DOMContentLoaded", () => {
  const currentPlayers = getAllPlayers();
  if (currentPlayers) {
    displayAllPlayers(currentPlayers, mainContainer);
  } else {
    console.log("No data was passed");
    handleAmountOfPlayers(mainContainer);
  }
});

// ******** FUNCTIONS ****************
