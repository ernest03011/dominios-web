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

      <button id="submit-players" class="modal-btn">Comenzar Partida</button>

    </article>
  `;

  let item = newLocal;
  mainContainer.innerHTML = item;

  const selectedRadio = mainContainer.querySelectorAll(
    "[name='players_total']"
  );

  const newSection = mainContainer.querySelector("#card-players-info");

  selectedRadio.forEach((radioBtn) => {
    radioBtn.addEventListener("click", () => {
      const numPlayer = Number(radioBtn.value);
      let text = "";

      for (let index = 0; index < numPlayer; index++) {
        const ordinalNumber = getOrdinalNumber(index + 1);
        text += `
          <p>Nombre del Jugador NO. ${index + 1}: </p>
          <input type="text" placeholder="Agregar Nombre" id="player${
            index + 1
          }" name="player-name" data-ordinalNumber="${ordinalNumber}">
          <br/>
        `;
      }

      newSection.innerHTML = text;
    });
  });

  mainContainer
    .querySelector("#submit-players")
    .addEventListener("click", () => {
      const allPlayers = newSection.querySelectorAll("[name='player-name']");
      displayAllPlayers(allPlayers, mainContainer);
    });
};

export const getOrdinalNumber = (number) => {
  let ordinalNumber = "first";

  switch (number) {
    case 1:
      ordinalNumber = "first";
      break;

    case 2:
      ordinalNumber = "second";
      break;

    case 3:
      ordinalNumber = "third";
      break;

    case 4:
      ordinalNumber = "fourth";
      break;

    default:
      ordinalNumber = "first";
      break;
  }

  return ordinalNumber;
};

export const displayAllPlayers = (allPlayers, mainContainer) => {
  // console.log(allPlayers);
  // console.log(allPlayers[0].dataset.ordinalnumber);
  const newArticle = `

    <article class="modal" id="container-info">
      <p id="card-error-message" class="card__error-message hidden-visible flex">No es un numero valido en Dominó!</p>

      <section id="card" class="card__content">
      </section>

      <button type="button" id="restart-game-btn" class="card__restart-game flex">Reiniciar partida</button>

    </article>
  `;

  let text = "";
  allPlayers.forEach((player) => {
    text += `

      <!-- A player -->
      <div class="card__player">
        
        <h3 class="card__player-title">${player.value}</h3>

        <ul class="card__counter" id="${player.dataset.ordinalnumber}-list">
          <li>0</li>
        </ul>

        <input class="card__add-score no-arrows" type="number" min="1" max="200" id="${player.dataset.ordinalnumber}-player-score" name="${player.dataset.ordinalnumber}-player" placeholder="0" maxlength="3" >

        <div class="card__total flex">
          <label class="card__total-label" for="total">Total: </label>
          <input class="card__total-screen no-arrows" type="number" name="total" placeholder="0" maxlength="3" >
        </div>

        <button type="button" aria-controls="${player.dataset.ordinalnumber}-player-score" class="card__players-btn">Anotar</button>

        <!-- <button type="button" aria-controls="${player.dataset.ordinalnumber}-list" >Remover ultimo apunte</button> -->

        
      </div>
    `;
  });

  mainContainer.innerHTML = newArticle;
  mainContainer.querySelector("#card").innerHTML = text;
};
