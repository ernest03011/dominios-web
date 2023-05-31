// Import needed modules

import {
  handleAmountOfPlayers,
  displayAllPlayers,
  getAllPlayers,
  loadAllScores,
} from "./app.js";

import displayMessage from "./factory.js";

import { GameManager } from "./gameManager.js";

// ******* SELECT ITEMS *******

const container = document.getElementById("card");

// EXECUTION

async function initApp() {
  const gameManager = new GameManager();
  gameManager.initializeGame(container);
}

window.addEventListener("DOMContentLoaded", initApp);

// ******** FUNCTIONS ****************
