// Import needed modules

import { GameManager } from "./gameManager.js";

// ******* SELECT ITEMS *******

const container = document.getElementById("card");

// EXECUTION

async function initApp() {
  const gameManager = new GameManager();
  const hasPlayers = gameManager.getFromLocalStorage();

  if (hasPlayers) {
    console.log("Load the players!");
    gameManager.loadFromLocalStorage(container);
  } else {
    gameManager.initializeGame(container);
  }
}

window.addEventListener("DOMContentLoaded", initApp);

// ******** FUNCTIONS ****************
