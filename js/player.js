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
    const re = /^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/;
    return re.test(score);
  }
}
