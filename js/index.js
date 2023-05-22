// Import needed modules

import {
  handleAmountOfPlayers,
  displayAllPlayers,
  getAllPlayers,
  loadAllScores,
} from "./app.js";

// ******* SELECT ITEMS *******

const mainContainer = document.getElementById("main__container");

// EXECUTION

window.addEventListener("DOMContentLoaded", () => {
  const currentPlayers = getAllPlayers();
  if (!currentPlayers) {
    console.log("No data was passed");
    handleAmountOfPlayers(mainContainer);
  } else {
    displayAllPlayers(currentPlayers, mainContainer);
    loadAllScores(currentPlayers, mainContainer);
  }
});

// ******** FUNCTIONS ****************
