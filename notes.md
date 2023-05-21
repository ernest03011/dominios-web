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

- [x] Instead of using labels, I can use radio buttons to make the user select the amont of players and based on it adding multiple names, and then submit it.
- [x] Once it is submited, the game can start.

- [x] I need to recreate card error message function to use the name of the player which can be provided through display core function where it is called. I can also, create a child node as the first element so P is added and remove from HTML with the disaplay error function. And I can add the name of the player where the button was clicked.

- [x] In order to work on the total points being displayed, I can change what I used to have and use a paragraph and a spam to diplay it. Then, I can use the li elements value and add it to an array, and then using reduce, It get the total.

-[x] Later on, I will use local storaga, so I need to keep that in mind as well.

-[x] I created an array of objects that have the player name, an array with the score, and the number of the player in ordinal number

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

- [] Make sure to remove console logs at the end of the project

- [x] Add functionality to load all players score from storage, and this function needs be called when the page is loaded, if and only if, storage does exist

- [] Add functionality to remove last item from the storage, and the list as well, and update the total as well.

- [] Add a button, or checkmark icon, or like a nav, to list rules of the game, and important things to know when interacting in the website

- [ ] Add functionality to start new game, and It can either ask if the same players will be kept ( then clear all score in storage and just display same players with 0 as the score ) or if new players should be added.

- [ ] Add functionality to update the score in the list

- [ ] Add funcionality to show the winner when it gets to 200, displaying name and the final score. Also allow to close pop up (or any alert), and then disable all buttons, and funcionality, only allow to start new Game.

- [ ] Document the project ad the end of it

- [ ] Update the display error to validate instead if the number is equal or less than 0 or if the number is higher than 200 and, then let the user know it should be between 1 and 200.
