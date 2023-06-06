import displayMessage from "./factory.js";
import {
  createElement,
  getOrdinalNumber,
  createPlayer,
  inputUtlt,
} from "./factory.js";
import { Player } from "./player.js";

export class GameManager {
  #players;
  #currentPlayers;
  #container;

  constructor() {
    this.#players = [];
    this.#currentPlayers = [];
  }

  setPlayers(name) {
    const player = createPlayer(name);
    this.#players.push(player);
  }
  getPlayers() {
    return this.#players;
  }

  getPlayersNameFromInput(radioBtn) {
    const numPlayer = Number(radioBtn.value);
    let text = "";

    for (let index = 0; index < numPlayer; index++) {
      const ordinalNumber = getOrdinalNumber(index + 1);

      text += `
      <p>Nombre del Jugador NO. ${index + 1}: </p>
      <input type="text" placeholder="Agregar Nombre" id="player${
        index + 1
      }" name="player-name" data-ordinalNumber="${ordinalNumber} required">
      <br/>
    `;
    }

    this.#container.querySelector("#card-players-info").innerHTML = text;
  }

  initializeGame(container) {
    this.#container = container;
    const item = `
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
    container.innerHTML = item;
    container.setAttribute("class", "modal-modern");
    container.style.display = "block";

    container.querySelectorAll("[name='players_total']").forEach((radioBtn) => {
      radioBtn.addEventListener("click", () => {
        document.getElementById("submit-players").style.display = "block";
        this.getPlayersNameFromInput(radioBtn);
      });
    });

    this.#container
      .querySelector("#submit-players")
      .addEventListener("click", (event) => {
        const allPlayersInput = this.#container.querySelectorAll(
          "[name='player-name']"
        );

        const inputUtility = inputUtlt(allPlayersInput);
        const msg = displayMessage();
        let text = "";

        if (!inputUtility.isValid) {
          event.preventDefault();
          text = "Agregar todos los nombres de los jugadores.";
          msg.display("red", text);
        } else if (!inputUtility.isAlphabetic) {
          event.preventDefault();
          text = "Agregar solo letras en los nombres";
          msg.display("red", text);
        } else {
          const allPlayers = [];

          for (let index = 0; index < allPlayersInput.length; index++) {
            let item = {};
            item.name = inputUtility.inputPropelCase[index];
            this.setPlayers(inputUtility.inputPropelCase[index]);
            item.ordinalNumber = allPlayersInput[index].dataset.ordinalNumber;
            item.score = [0];
            allPlayers.push(item);
          }

          this.saveToLocalStorage(allPlayers);
          this.startGame();
        }
      });
  }

  startGame() {
    const newArticle = `
      <article class="modal" id="container-info">
        <p id="card-message" class="card__message hidden-visible flex">No es un numero valido en Dominó!</p>

        <section id="card" class="card__content">
        </section>

        <button type="button" id="restart-game-btn" class="card__restart-game flex">Reiniciar partida</button>

      </article>
    `;

    this.#container.innerHTML = newArticle;

    let text = "";

    for (let index = 0; index < this.#currentPlayers.length; index++) {
      text += `
  
        <!-- A player -->
        <div class="card__player">
          
          <h3 class="card__player-title">${
            this.#currentPlayers[index].name
          }</h3>
  
          <ul class="card__counter" id="${
            this.#currentPlayers[index].ordinalNumber
          }-list" name="counter-list">
            <li>0</li>
          </ul>
  
          <input class="card__add-score no-arrows" type="number" min="1" max="200" id="${
            this.#currentPlayers[index].ordinalNumber
          }-player-score" name="player-score" placeholder="0" maxlength="3" >
  
          <p class="card__total-info">Total: <span id="total-info">${this.#players[
            index
          ].getScore()}</span></p>
  
  
          <button type="button" aria-controls="${
            this.#currentPlayers[index].ordinalNumber
          }-player-score" class="card__players-btn">Anotar</button>
  
          <!-- <button type="button" aria-controls="${
            this.#currentPlayers[index].ordinalNumber
          }-list" >Remover ultimo apunte</button> -->
  
          
        </div>
      `;
    }

    this.#container.querySelector("#card").innerHTML = text;
    this.#container
      .querySelector("#restart-game-btn")
      .addEventListener("click", () => {
        this.restartGame();
      });

    this.#container.querySelectorAll(".card__players-btn").forEach((button) => {
      const parentCard = button.parentNode;
      button.addEventListener("click", () => {
        this.displayScore(parentCard);
      });
    });
  }

  restartGame() {
    const divElement = createElement("div");

    const item = `
    <div class="modal-content">
      <span id="close-rstgame-modal" class="close">&times;</span>

      <h2>Favor elegir...</h2>

      <button name="reset-game-btn" data-player="same-players" class="modal__btn">Si desea mantener los mismos jugadores</button>
      <button name="reset-game-btn" data-player="new-players" class="modal__btn">O agregar jugadores nuevamente</button>

    </div>`;

    divElement.setInnetHTML(item);
    divElement.setAttribute("id", "reset-game-modal");
    divElement.setAttribute("class", "modal-modern");
    divElement.setDisplay("block");
    this.#container.appendChild(divElement.fragment);

    this.#container
      .querySelector("#close-rstgame-modal")
      .addEventListener("click", () => {
        divElement.setDisplay("none");
      });

    this.#container
      .querySelectorAll("[name='reset-game-btn']")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.dataset.player === "same-players") {
            this.resetAllScores();
            this.clearInput();
            divElement.setDisplay("none");

            document.querySelectorAll(".card__players-btn").forEach((btn) => {
              btn.classList.remove("hidden-visible");
            });
          } else if (btn.dataset.player === "new-players") {
            this.removePlayersFromStorage();
            this.#players = [];
            this.initializeGame(this.#container);
            divElement.setDisplay("none");
          }
        });
      });
  }

  displayScore(parentCard) {
    console.log("DisplayScore was clicked");

    const newScore = parentCard.querySelector("[name='player-score']").value;
    const currPlayerName = parentCard.querySelector(
      ".card__player-title"
    ).textContent;
    const scoreList = parentCard.querySelector("[name='counter-list']");
    const totalDisplay = parentCard.querySelector("#total-info");

    const item = createElement("li");
    const isAValidScore = Player.isValidScore(newScore);

    if (isAValidScore) {
      item.setText(newScore);
      scoreList.appendChild(item.fragment);
      this.handleScoreStorage(currPlayerName, newScore);
      this.handleTotalScore(currPlayerName, totalDisplay);
    } else {
      const msg = displayMessage();
      const errMsg = "Valor incorrecto. Aregar numeros del 1 al 200.";
      msg.display("red", errMsg);
    }

    this.clearInput();
  }

  saveToLocalStorage(allPlayers) {
    localStorage.setItem("players", JSON.stringify(allPlayers));
    this.#currentPlayers = allPlayers;
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("players"));
  }

  loadFromLocalStorage(container) {
    this.#container = container;
    const players = container.querySelectorAll(".card__player");

    this.#currentPlayers = this.getFromLocalStorage();
    this.#currentPlayers.forEach((player) => {
      this.setPlayers(player.name);
    });

    this.startGame();

    for (let index = 0; index < players.length; index++) {
      const currPlayerName = players[index].querySelector(
        ".card__player-title"
      );
      const currScoreList = players[index].querySelector(
        "[name='counter-list']"
      );
      const currTotalDisplay = players[index].querySelector("#total-info");

      if (currPlayerName === this.#currentPlayers[index].name) {
        this.#currentPlayers[index].score.forEach((score) => {
          if (Number(score) !== 0) {
            const item = createElement("li");
            item.setText(score);
            currScoreList.appendChild(item.fragment);
          }
        });

        this.handleTotalScore(currPlayerName, currTotalDisplay);
      }
    }
  }

  handleWinner(total) {
    let isAWinner = false;

    if (total >= 200) {
      alert(`Felicidades JUAN. Has ganado la partida`);
      this.#container
        .querySelectorAll(".card__players-btn")
        .forEach((button) => button.classList.add("hidden-visible"));

      const msg = displayMessage();
      const text = `El juego ha terminado, Felicidades JUAN. Hacer clic en reiniciar partida para seguir juando`;

      msg.display("blue", text);

      isAWinner = true;
    } else {
      isAWinner = false;
    }

    return isAWinner;
  }

  clearInput() {
    this.#container
      .querySelectorAll("[name='player-score']")
      .forEach((scoreInput) => (scoreInput.value = ""));
  }

  handleScoreStorage(playerName, score) {
    const currPlayers = this.getFromLocalStorage();

    for (let index = 0; index < currPlayers.length; index++) {
      if (currPlayers[index].name === playerName) {
        currPlayers[index].score.push(score);
        this.#players[index].addScore(score);
      }
    }

    this.saveToLocalStorage(currPlayers);
  }

  handleTotalScore(playerName, totalDisplay) {
    let total = 0;
    this.#players.forEach((player) => {
      if (player.getPlayerName() === playerName) {
        total = player.calculateTotal();
        totalDisplay.textContent = total;
        this.handleWinner(total);
      }
    });
  }

  resetAllScores() {
    let item = `<li>0</li>`;
    this.#container
      .querySelectorAll("[name='counter-list']")
      .forEach((scoreList) => {
        scoreList.innerHTML = item;
        scoreList.parentNode.querySelector("#total-info").textContent = 0;
      });

    for (let index = 0; index < this.#currentPlayers.length; index++) {
      this.#currentPlayers[index].score = [];
      this.#players[index].resetScore();
    }

    this.saveToLocalStorage(this.#currentPlayers);
  }

  removePlayersFromStorage() {
    localStorage.removeItem("players");
  }
}
