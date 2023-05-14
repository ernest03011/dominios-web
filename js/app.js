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

// Asking for amount of players
export const handleAmountOfPlayers = (mainContainer) => {
  const newLocal = `

    <article class="modal" id="container-info">

      <section class="card-information">

        <h2 class="modal__title">A jugar Dominó</h2>

        <p class="modal__label" for="players">Selecionar cantidad de jugadores: </p>

         <input type="radio" id="twoPlayers" name="players_total" value="2">
         <label for="twoPlayers">2 jugadores</label><br>
         <input type="radio" id="threePlayers" name="players_total" value="3">
         <label for="threePlayers">3 jugadores</label><br>
         <input type="radio" id="fourPlayers" name="players_total" value="4">
         <label for="fourPlayers">4 jugadores</label>

      </section>

      <section class="card-players-info" id="card-players-info">

      </section>

      <button id="submit" class="modal-btn">Comenzar Partida</button>

    </article>
  `;

  // Add id to listen to the button. Also, add a paragragh to show alert if it is not a correct number, and use ternary operator for that.
  // Also, I neeed to add all the classes needed

  // Adding an on change event which will add or delete input to add the names.

  let item = newLocal;
  mainContainer.innerHTML = item;

  const selectedRadio = document.querySelectorAll("[name='players_total']");
  const newSection = document.getElementById("card-players-info");
  console.log(newSection);
  console.log(mainContainer);

  selectedRadio.forEach((radioBtn) => {
    radioBtn.addEventListener("click", () => {
      const numPlayer = Number(radioBtn.value);
      let text = "";

      for (let index = 0; index < numPlayer; index++) {
        text += `

          <p>Nombre del Jugador NO. ${index + 1}: </p>
          <input type="text" placeholder="Ramon">
          <br/>
        `;
      }

      newSection.innerHTML = text;
    });
  });
};
