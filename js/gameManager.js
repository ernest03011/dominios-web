import displayMessage from "./factory.js";
import { createElement, getOrdinalNumber } from "./factory.js";

export class GameManager {
  #players;
  #currentPlayer;
  #container;

  constructor() {
    this.#players = [];
  }

  setPlayers(players) {
    this.#players.push(players);
  }
  getPlayers() {
    return this.#players;
  }

  setCurrentPlayer(currentPlayer) {
    this.#currentPlayer = currentPlayer;
  }
  getCurrentPlayer() {
    return this.#currentPlayer;
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
      });
  }

  startGame() {}

  restartGame() {}

  saveToLocalStorage(allPlayers) {
    localStorage.setItem("players", JSON.stringify(allPlayers));
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("players"));
  }

  loadFromLocalStorage() {}
}
