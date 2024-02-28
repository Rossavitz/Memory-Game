const gameContainer = document.getElementById("game");
let cardOne = null;
let cardTwo = null;
let revealedCount = 0;
let awaitingEndOfMove = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    // While there are elements in the array

    let index = Math.floor(Math.random() * counter); // Pick a random index
    counter--; // Decrease counter by 1

    let temp = array[counter]; // And swap the last element with it
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div"); //create a new div
    newDiv.classList.add(color); //give it a class attribute for the value we are looping over
    newDiv.addEventListener("click", handleCardClick); //call function handleCardClick when div is clicked on
    gameContainer.append(newDiv); // append the div to the element with an id of game
  }
}

// TODO: Implement this function!

function handleCardClick(event) {
  if (awaitingEndOfMove) return;
  if (event.target.classList.contains("flip")) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!cardOne || !cardTwo) {
    currentCard.classList.add("flip");
    cardOne = cardOne || currentCard;
    cardTwo = currentCard === cardOne ? null : currentCard;
  }

  if (cardOne && cardTwo) {
    awaitingEndOfMove = true;
    let cardColorOne = cardOne.className;
    let cardColorTwo = cardTwo.className;

    if (cardColorOne === cardColorTwo) {
      revealedCount += 2;
      cardOne.removeEventListener("click", handleCardClick);
      cardTwo.removeEventListener("click", handleCardClick);
      cardOne = null;
      cardTwo = null;
      awaitingEndOfMove = false;
    } else {
      setTimeout(function () {
        cardOne.style.backgroundColor = "";
        cardTwo.style.backgroundColor = "";
        cardOne.classList.remove("flip");
        cardTwo.classList.remove("flip");
        cardOne = null;
        cardTwo = null;
        awaitingEndOfMove = false;
      }, 1000);
    }
  }

  if (revealedCount === COLORS.length) alert("You won! Refresh to play again.");
}

createDivsForColors(shuffledColors); // when the DOM loads
