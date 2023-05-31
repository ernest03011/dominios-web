import displayMessage from "./factory.js";
import { createElement } from "./factory.js";

export class GameManager {
  #players;
  #currentPlayer;

  constructor() {
    this.#players = "";
  }

  setPlayers(players) {
    this.#players = players;
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

  initializeGame(container) {
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
  }

  startGame() {}

  restartGame() {}

  saveToLocalStorage() {}

  loadFromLocalStorage() {}
}
