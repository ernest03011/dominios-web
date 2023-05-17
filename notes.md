# Things to note

## Things that I might add/delete/remove later one

### Functionalities

1. Add a section to display the total. A sum of the score
2. Limit the score 200 and display a message letting know X user has won.
3. Showing specific alert letting know that input value can not be empty or that it does not accept text
4. Based on what was added, I could display an alert that shows "XY is not a valid input in Dominio"

### Design stuff that I might edit/add/remove

1. New game button looks too big on Desktop sizes.
2. Making the paragraph in the footer more legible. It is difficult to read when the background is black at times depending on the sizes.

---

## Feedback

- Empty for now.

## Possible ToDos

- Set a reponsive width to main card, it could be using percentage, like 80, and then center it. As well as adding a max width
- Refactor both CSS and js code
- Add a total display
- Enabling to delete that item, only if, the sum is more than 0
- Adding another page where the user can add the amount of players and their names
- Having a button to reset all values, and a button to start a new game.
- Readjusting the sizes for the heading and card after 1200px width. The button gets too big as well.

## This is V2

### More notes

- Instead of using labels, I can use radio buttons to make the user select the amont of players and based on it adding multiple names, and then submit it.
- Once it is submited, the game can start.

- I need to recreate card error message function to use the name of the player which can be provided through display core function where it is called. I can also, create a child node as the first element so P is added and remove from HTML with the disaplay error function.

- In order to work on the total points being displayed, I can change what I used to have and use a paragraph and a spam to diplay it. Then, I can use the li elements value and add it to an array, and then using reduce, It get the total.

- Later on, I will use local storaga, so I need to keep that in mind as well.

- I can create an object with multiple objects where I can stored the name an points in an array.

- Mock data

```js
const calc = {
  player1: {
    name: "Carlos",
    points: [23],
  },

  player2: {
    name: "Maria",
    points: [23],
  },
};
```
