import displayMessage from "./factory.js";
import {
  createElement,
  getOrdinalNumber,
  createPlayer,
  inputUtlt,
  debounce,
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
      <p clas="">Nombre del Jugador NO. ${index + 1}: </p>
      <input class="border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0" type="text" placeholder="Agregar Nombre" id="player${
        index + 1
      }" name="player-name" data-ordinalnumber="${ordinalNumber}">
      <br/>
    `;
    }

    this.#container.querySelector("#card-players-info").innerHTML = text;
  }

  initializeGame(container) {
    this.#container = container;
    const item = `
      <article class="modal bg-white border-solid border-red-400 text-blue-900 rounded-lg border-2 w-full shadow-lg shadow-slate-500 p-2 flex flex-col justify-center" id="container-info">

        <section class="card-information">

          <h2 class="modal__title text-blue-900 mb-3 text-center">A jugar Dominó</h2>

          <p class="modal__label" for="players">Selecionar cantidad de jugadores: </p>

          <div class="mb-4">
            <input type="radio" id="twoPlayers" name="players_total" value="2">
            <label for="twoPlayers">2 jugadores</label><br>
            <input type="radio" id="threePlayers" name="players_total" value="3">
            <label for="threePlayers">3 jugadores</label><br>
            <input type="radio" id="fourPlayers" name="players_total" value="4">
            <label for="fourPlayers">4 jugadores</label>
          </div>

        </section>

        <section class="card-players-info mb-5" id="card-players-info">

        </section>

        <button id="submit-players" class="modal-btn rounded-md px-3 py-2 text-center text-sm font-semibold text-white bg-blue-800 shadow-sm focus-visible:outline shrink-0">Comenzar Partida</button>

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
            item.ordinalNumber = allPlayersInput[index].dataset.ordinalnumber;
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
      <div class="bg-white border-solid border-red-400 text-blue-900 rounded-lg border-2 w-full shadow-lg shadow-slate-500 p-2 flex flex-col justify-center">

        <article class="modal flex justify-center flex-col" id="container-info">
          <section id="card" class="card__content flex flex-wrap gap-2 justify-center">
          </section>

          <button type="button" id="restart-game-btn" class="card__restart-game rounded-md px-3 py-2 justify-center text-sm font-semibold text-white bg-blue-800 shadow-sm focus-visible:outline">Reiniciar partida</button>

        </article>

        <div id="reset-game-modal" class="modal-modern invisible">
          <div class="modal-content">
            <span id="close-rstgame-modal" class="close">&times;</span>

            <h2>Favor elegir...</h2>

            <button name="reset-game-btn" data-player="same-players" class="modal__btn">Si desea mantener los mismos jugadores</button>
            <button name="reset-game-btn" data-player="new-players" class="modal__btn">O agregar jugadores nuevamente</button>

          </div>
        </div>
      </div>
    `;

    this.#container.innerHTML = newArticle;
    let text = "";

    for (let index = 0; index < this.#currentPlayers.length; index++) {
      text += `
  
        <!-- A player -->
        <div class="card__player mb-4 bg-gray-400" name="card__player">
          
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

    this.handleEditDeleteScore();
  }

  restartGame() {
    const resetGameModal = document.getElementById("reset-game-modal");
    resetGameModal.style.display = "block";

    resetGameModal.addEventListener(
      "click",
      function (e) {
        const target = e.target;
        if (target.id === "close-rstgame-modal") {
          resetGameModal.style.display = "none";
        } else if (target.dataset.player === "same-players") {
          this.resetAllScores();
          this.clearInput();
          resetGameModal.style.display = "none";
          this.handleEditDeleteScore();

          document.querySelectorAll(".card__players-btn").forEach((btn) => {
            btn.classList.remove("hidden-visible");
          });
        } else if (target.dataset.player === "new-players") {
          this.removePlayersFromStorage();
          this.#players = [];
          this.initializeGame(this.#container);
          resetGameModal.style.display = "none";
        }
      }.bind(this)
    );
  }

  displayScore(parentCard) {
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
    this.#currentPlayers = this.getFromLocalStorage();
    this.#currentPlayers.forEach((player) => {
      this.setPlayers(player.name);
    });

    this.startGame();
    const players = document.querySelectorAll(".card__player");

    for (let index = 0; index < players.length; index++) {
      const currPlayerName = players[index].querySelector(
        ".card__player-title"
      ).textContent;
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
            this.#players[index].addScore(score);
          }
        });

        this.handleTotalScore(currPlayerName, currTotalDisplay);
      }
    }
  }

  handleWinner(total, name) {
    let isAWinner = false;

    if (total >= 200) {
      alert(`Felicidades ${name}. Has ganado la partida`);
      this.#container
        .querySelectorAll(".card__players-btn")
        .forEach((button) => button.classList.add("hidden-visible"));

      const msg = displayMessage();
      const text = `El juego ha terminado, Felicidades ${name}. Haz clic en reiniciar partida para seguir juando`;

      msg.display("blue", text);

      this.#container
        .querySelectorAll("ul[name='counter-list']")
        .forEach((list) => {
          // remove all event listeners
          list.replaceWith(list.cloneNode(true));
        });

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
        this.handleWinner(total, player.getPlayerName());
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

  handleEditDeleteScore() {
    this.#container
      .querySelectorAll("ul[name='counter-list']")
      .forEach((list) => {
        list.addEventListener("dblclick", this.handleScoreDblclick.bind(this));
      });
  }

  handleScoreDblclick(event) {
    const target = event.target;
    if (target.classList.contains("score-point-clicked")) {
      return;
    }

    const scorePoint = target.textContent;

    if (target.tagName === "LI" && scorePoint !== "0") {
      const parentList = target.parentNode;
      const cardPlayerElm = parentList.parentNode;
      const index = Array.from(parentList.children).indexOf(target);
      const action = prompt("Que deseas hacer? (Editar/Eliminar)");

      if (action) {
        const selectedOption = action.toLocaleLowerCase();
        if (selectedOption === "editar" || selectedOption === "eliminar") {
          if (selectedOption === "editar") {
            this.editScore(target, cardPlayerElm, index);
          } else if (selectedOption === "eliminar") {
            this.deleteScore(target, cardPlayerElm, index);
          }
        } else {
          alert("Intenta nuevamente, favor elegir editar o eliminar!");
        }
      }
    }
  }

  editScore(target, cardPlayerElm, index) {
    const newScorePoint = prompt("Agregar la nueva anotacion!");
    if (newScorePoint) {
      const isAValidScore = Player.isValidScore(newScorePoint);
      if (isAValidScore) {
        const currPlayers = this.getFromLocalStorage();
        const currPlayerName = cardPlayerElm.querySelector(
          ".card__player-title"
        ).textContent;
        const totalInput = cardPlayerElm.querySelector("#total-info");
        let total = 0;

        currPlayers.forEach((player, i) => {
          if (player.name === currPlayerName) {
            player.score[index] = newScorePoint;
            this.#players[i].editScore(index, newScorePoint);
            target.textContent = newScorePoint;
            total = this.#players[i].calculateTotal();
            totalInput.textContent = total;
          }
        });

        this.saveToLocalStorage(currPlayers);
        target.classList.add("score-point-clicked");
      } else {
        alert("Valor incorrecto. Aregar numeros del 1 al 200.");
      }
    }
  }

  deleteScore(target, cardPlayerElm, index) {
    const confirmDelete = confirm("Segur@ que deseas eliminar esta anotacion?");

    if (confirmDelete) {
      const currPlayers = this.getFromLocalStorage();
      const currPlayerName = cardPlayerElm.querySelector(
        ".card__player-title"
      ).textContent;
      const totalInput = cardPlayerElm.querySelector("#total-info");
      let total = 0;

      currPlayers.forEach((player, i) => {
        if (player.name === currPlayerName) {
          player.score.splice(index, 1);
          this.#players[i].deleteScore(index);
          target.parentNode.removeChild(target);
          total = this.#players[i].calculateTotal();
          totalInput.textContent = total;
        }
      });

      this.saveToLocalStorage(currPlayers);
    }
  }
}
