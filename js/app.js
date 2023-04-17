// Displaying score to the list

export default function displayScore(button) {
  let item = document.createElement("li");

  const playerInput = button.getAttribute("aria-controls");

  if (playerInput === "first-player-score") {
    if (validNumberInDominio(firstPlayerInput.value)) {
      let itemText = document.createTextNode(firstPlayerInput.value);

      item.appendChild(itemText);
      player1.appendChild(item);
    } else {
      displayError();
    }
  } else if (playerInput === "second-player-score") {
    if (validNumberInDominio(secondPlayerInput.value)) {
      let itemText = document.createTextNode(secondPlayerInput.value);

      item.appendChild(itemText);
      player2.appendChild(item);
    } else {
      displayError();
    }
  }

  clearScore();
}

// Display error message

export const displayError = (cardErrorMessage) => {
  cardErrorMessage.classList.remove("hidden-visible");
  setTimeout(() => {
    cardErrorMessage.classList.add("hidden-visible");
  }, 3000);
};

// Resetting the values to 0 in order to start a new Game

export const startNewgame = (players) => {
  // Players should be an array that has all current players

  let item = `<li>0</li>`;

  player1.innerHTML = item;
  player2.innerHTML = item;

  clearScore();
};

// Clear Score board

export const clearScore = (players) => {
  // Players should be an array that has all current players

  firstPlayerInput.value = "";
  secondPlayerInput.value = "";
};

// Check if a given value is positive and between 0 and 200

export const validNumberInDominio = (input) => {
  // This function name needs to be changed to validNumberInDomino
  const re = /^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/;
  return re.test(input);
};
