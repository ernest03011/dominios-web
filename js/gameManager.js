export class GameManager {
  #players;
  #currentPlayer;

  constructor(players) {
    this.#players = players;
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

  initializeGame() {}

  startGame() {}

  restartGame() {}

  saveToLocalStorage() {}

  loadFromLocalStorage() {}
}
