// Displaying score to the list

export default function displayScore(button) {
  const currentPlayer = button.parentNode;
  const newScore = currentPlayer.querySelector("[name='player-score']").value;
  const currentPlayerName = currentPlayer.querySelector(
    ".card__player-title"
  ).textContent;
  const scoreList = currentPlayer.querySelector("[name='counter-list']");

  let item = document.createElement("li");

  if (validNumberInDominio(newScore)) {
    let itemText = document.createTextNode(newScore);
    item.appendChild(itemText);
    scoreList.appendChild(item);

    clearScore();
  } else {
    displayError();
  }
}

// Display error message

export const displayError = () => {
  // cardErrorMessage used to be passed as paramenter and I removed it since I might not needed
  // This function will be redesigned

  // cardErrorMessage.classList.remove("hidden-visible");
  // setTimeout(() => {
  //   cardErrorMessage.classList.add("hidden-visible");
  // }, 3000);
  console.log("Score is not valid");
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

export const clearScore = () => {
  document
    .querySelectorAll("[name='player-score']")
    .forEach((score) => (score.value = ""));
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
      const allPlayersInput = newSection.querySelectorAll(
        "[name='player-name']"
      );
      const allPlayers = [];

      allPlayersInput.forEach((player) => {
        let item = {};
        item.name = player.value;
        item.ordinalNumber = player.dataset.ordinalnumber;
        item.score = [0];
        allPlayers.push(item);
      });

      saveAllPlayers(allPlayers);
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

  const newArticle = `

    <article class="modal" id="container-info">
      <p id="card-error-message" class="card__error-message hidden-visible flex">No es un numero valido en Dominó!</p>

      <section id="card" class="card__content">
      </section>

      <button type="button" id="restart-game-btn" class="card__restart-game flex">Reiniciar partida</button>

    </article>
  `;

  let text = "";
  let allOrdinalNumbers = [];
  let totalScore = 0;
  allPlayers.forEach((player) => {
    // I will need to run here a reduce function to take the total value for each players
    // I can create a function which will receive an array and then it will return the total

    totalScore = calculateTotal(player.score);

    text += `

      <!-- A player -->
      <div class="card__player">
        
        <h3 class="card__player-title">${player.name}</h3>

        <ul class="card__counter" id="${player.ordinalNumber}-list" name="counter-list">
          <li>0</li>
        </ul>

        <input class="card__add-score no-arrows" type="number" min="1" max="200" id="${player.ordinalNumber}-player-score" name="player-score" placeholder="0" maxlength="3" >

        <p class="card__total-info">Total: <span id="total-info">${totalScore}</span></p>


        <button type="button" aria-controls="${player.ordinalNumber}-player-score" class="card__players-btn">Anotar</button>

        <!-- <button type="button" aria-controls="${player.ordinalNumber}-list" >Remover ultimo apunte</button> -->

        
      </div>
    `;

    allOrdinalNumbers.push(player.ordinalNumber);
  });

  mainContainer.innerHTML = newArticle;
  mainContainer.querySelector("#card").innerHTML = text;

  const allScoreElements = loadAllScores();

  const allLists = mainContainer.querySelectorAll("[name='counter.list']");

  for (let index = 0; index < allScoreElements; index++) {
    allLists[index].appendChild(allScoreElements[index]);
  }

  mainContainer.querySelectorAll(".card__players-btn").forEach((button) => {
    button.addEventListener("click", () => displayScore(button));
  });
};

export const saveAllPlayers = (players) => {
  localStorage.setItem("players", JSON.stringify(players));
};

export const getAllPlayers = () => {
  return JSON.parse(localStorage.getItem("players"));
};

const calculateTotal = (arr) => {
  // const totalArray = allData;
  // console.log(totalArray);
  // console.log(allData);

  const total = arr.reduce((sum, currentScore) => sum + currentScore, 0);
  console.log(total);
  return total;
};

const getAllScore = () => {
  const players = getAllPlayers();
  const allScores = [];
  console.log(players);
  players.forEach((player) => {
    allScores.push(player.score);
  });

  return allScores;
};

const loadAllScores = () => {
  const scoreArr = getAllScore();

  let item = document.createElement("li");

  scoreArr.forEach((score) => {
    let itemText = document.createTextNode(score);
    item.appendChild(itemText);
  });

  return item;
};
