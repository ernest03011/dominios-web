import displayMessage from "./factory.js";
import { createElement, getOrdinalNumber, createPlayer } from "./factory.js";

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
      }" name="player-name" data-ordinalNumber="${ordinalNumber}">
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
        this.getPlayersNameFromInput(radioBtn);
      });
    });

    this.#container
      .querySelector("#submit-players")
      .addEventListener("click", () => {
        const allPlayersInput = this.#container.querySelectorAll(
          "[name='player-name']"
        );

        const allPlayers = [];

        allPlayersInput.forEach((player) => {
          let item = {};
          item.name = player.value;
          this.setPlayers(player.value);
          item.ordinalNumber = player.dataset.ordinalNumber;
          item.score = [0];
          allPlayers.push(item);
        });

        this.saveToLocalStorage(allPlayers);
        this.startGame();
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
      .addEventListener("click", this.restartGame);

    this.#container
      .querySelectorAll(".card__players-btn")
      .forEach((button) => button.addEventListener("click", this.displayScore));
  }

  restartGame() {
    console.log("Restart game was clicked!");
  }

  displayScore() {
    console.log("DisplayScore was clicked");
  }

  saveToLocalStorage(allPlayers) {
    localStorage.setItem("players", JSON.stringify(allPlayers));
    this.#currentPlayers = allPlayers;
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("players"));
  }

  loadFromLocalStorage() {}
}
