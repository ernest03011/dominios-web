- Check if there is any player saved in storage

  - If there are any players, load a container with the plaers name, the scores, the total and the input and button to type new score and submit it.
  - If there is no player in storage, load a container with the question to select amount of players, and add their names, and then click start game

- Allow to add, edit, delete and read score using local storage

- Validate the scores to confirm it meets the criteria, number from 1 to 200

- Validate if total score is 200 to display the winner name, and once there is a winner hide buttons to add score and only allow to click on restart game button

- Whenever restart game is clicked, ask if it should be a new game with new score and same players, or if new players need to be chosen.

---

**Classes:**

1. **Player:**

   - Properties:
     - name: string
     - scores: array of numbers
   - Methods:
     - addScore(score: number): void
     - editScore(index: number, score: number): void
     - deleteScore(index: number): void
     - calculateTotal(): number
     - isValidScore(score: number): boolean

2. **GameManager:**
   - Properties:
     - players: array of Player objects
     - currentPlayer: Player object (to track the current player)
   - Methods:
     - initializeGame(): void
     - startGame(): void
     - restartGame(): void
     - saveToLocalStorage(): void
     - loadFromLocalStorage(): void

**Factory Functions:**

1. **PlayerFactory:**

   - createPlayer(name: string): Player
   - Creates a new Player instance with the given name.

2. **GameManagerFactory:**
   - createGameManager(): GameManager
   - Creates a new GameManager instance.

**Local Storage Manager:**

- **LocalStorageManager:**
  - save(key: string, data: any): void
  - load(key: string): any
  - clear(key: string): void
  - A utility class to handle saving, loading, and clearing data from the local storage.
