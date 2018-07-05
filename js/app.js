// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Card symbols
let cardSymbols = [
  "fa-heart", "fa-heart",
  "fa-star", "fa-star",
  "fa-circle", "fa-circle",
  "fa-square", "fa-square",
  "fa-play", "fa-play",
  "fa-map-marker", "fa-map-marker",
  "fa-moon", "fa-moon",
  "fa-cloud", "fa-cloud"
];

// Generates the game board
function generateCard(element, cardSymbol) {
  element.insertAdjacentHTML('afterbegin', `<li class="card back"><i class="fas ${cardSymbol} fa-2x"></i></li>`);
}

function generateBoard(cardSymbols) {
  let cardDeck = document.querySelector('.deck')
  for (let cardSymbol of cardSymbols){
    generateCard(cardDeck, cardSymbol);
  }
}

// Adds event listener to board
function addClickListener() {
  let playingCards = document.querySelectorAll('.card')
  playingCards.forEach(function(element) {
    element.addEventListener('click', flipCard);
  });
}

// function addClickListener() {
//   let playingCards = document.querySelector('.deck');
//   playingCards.addEventListener('click', flipCard, false);
// }

// Opens cards on click, closes cards after timeout
function closeCard(e) {
  let cardSelection = e.target;
  cardSelection.classList.remove('symbol', 'view');
  cardSelection.classList.add('back');
}

function openCard(e) {
  let cardSelection = e.target;
  cardSelection.classList.add('symbol', 'view');
  cardSelection.classList.remove('back');
}

function flipCard(e) {
  openCard(e);
  let delay = setTimeout(function() {
    closeCard(e)
  }, 1000);
}

// function detectMatch(cardOne, cardTwo) {
//   let cardsMatched = 0;
//   console.log("It's a match!");
// }

// Closes modal window
function closeModalListener() {
  let modalBackground = document.querySelector('.modal-overlay');
  modalBackground.addEventListener('click', function(){
      modalBackground.classList.toggle('close');
  });
}

// Starts the timer
let gameSeconds = document.querySelector(".seconds");
let gameMinutes = document.querySelector(".minutes");

let seconds = 0;
let minutes = 0;

let timer = window.setInterval(tick, 1000);

function tick() {
  seconds += 1;
  if (seconds >= 60){
    seconds = 0;
    minutes += 1;
  }
  gameSeconds.textContent = seconds;
    if (seconds < 10) {
      gameSeconds.textContent = "0" + seconds;
    }
  gameMinutes.textContent = minutes;
    if (minutes < 10) {
      gameMinutes.textContent = "0" + minutes;
    }
}

// Resets the timer
let restartGame = document.querySelector(".restart-game").addEventListener("click", function(e) {
  minutes = 0;
  seconds = 0;
});

// TODO: stop timer, save result to a gameTime variable
// TODO: match logic
// TODO: count logic
// TODO: rating logic
// TODO: end-of-game modal logic

// Initializes the game
function initGame() {
  // TODO: reset moves counter
  // TODO: reset rating
  // TODO: reset timer
  generateBoard(shuffle(cardSymbols));
  addClickListener();
  closeModalListener();
}

initGame();
