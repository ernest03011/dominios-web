const player1 = document.getElementById("first-list");
const player2 = document.getElementById("second-list");

const firstPlayerInput = document.getElementById("first-player-score");
const secondPlayerInput = document.getElementById("second-player-score");

// const addScoreButtons = document.querySelectorAll("button");
const addScoreButtons = document.querySelectorAll(".card__players-btn");
const newGameBtn = document.getElementById("restart-game-btn");

const cardErrorMessage = document.getElementById("card-error-message");

newGameBtn.addEventListener("click", () => startNewgame());

// Check if a given value is positive and between 0 and 200

const validNumberInDominio = (input) => {
  const re = /^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/;
  return re.test(input);
};

// Clear Score board

const clearScore = () => {
  firstPlayerInput.value = "";
  secondPlayerInput.value = "";
};

// Displaying score to the list

const displayScore = (button) => {
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
};

addScoreButtons.forEach((button) => {
  button.addEventListener("click", () => displayScore(button));
});

// Resetting the values to 0 in order to start a new Game

const startNewgame = () => {
  let item = `<li>0</li>`;

  player1.innerHTML = item;
  player2.innerHTML = item;

  clearScore();
};

//END -- Resetting the values to 0 in order to start a new Game

// Displaying error message

const displayError = () => {
  cardErrorMessage.classList.remove("hidden-visible");
  setTimeout(() => {
    cardErrorMessage.classList.add("hidden-visible");
  }, 3000);
};

// END -- Displaying error message
