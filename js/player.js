export class Player {
  #name;
  #scores;

  constructor(name) {
    this.#name = name;
    this.#scores = [0];
  }

  getPlayerName() {
    return this.#name;
  }

  setPlayerName(name) {
    this.name = name;
  }

  addScore(score) {}

  editScore(index, score) {}

  deleteScore(index) {}

  getScore() {
    return this.#scores;
  }

  calculateTotal() {
    return total;
  }

  isValidScore(score) {
    return true;
  }
}
