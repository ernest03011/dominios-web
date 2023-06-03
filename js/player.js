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

  addScore(score) {
    this.#scores.push(score);
  }

  editScore(index, score) {}

  deleteScore(index) {}

  getScore() {
    return this.#scores;
  }

  calculateTotal() {
    let total = 0;
    total = this.#scores.reduce(
      (sum, currentScore) => sum + Number(currentScore),
      0
    );
    return total;
  }

  static isValidScore(score) {
    const re = /^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/;
    return re.test(score);
  }
}
