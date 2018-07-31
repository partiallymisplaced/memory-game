// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

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
  let cardDeck = document.querySelector('.deck');
  if (cardDeck.childNodes.length > 1) {
    cardDeck.innerHTML = "";
  }
  for (let cardSymbol of cardSymbols) {
    generateCard(cardDeck, cardSymbol);
  }
}

// Adds event listener

document.querySelector('.deck').addEventListener('click', handleClick);
let openedCards = [];

let moves = 0;
let gameMoves = document.querySelector('.move-count');

let matches = 0;

function handleClick(event) {
  if (event.target.tagName === "LI" && !event.target.classList.contains('front')) {
    event.target.classList.remove('back');
    event.target.classList.add('front');
    openedCards.push(event.target);
    if (openedCards.length === 2) {
      moves += 1;
      rateGame(moves);
      gameMoves.textContent = moves;
      if (openedCards[0].childNodes[0].classList[1] === openedCards[1].childNodes[0].classList[1]) {
        openedCards.forEach(function(element) {
          element.classList.add('match');
          matches += 1; {
            if (matches === cardSymbols.length) {
              console.log("You win!");
              stopTimer();
              openModal();
              document.querySelector('.modal .moves .move-count').textContent = moves;
              document.querySelector('.modal .rating .stars').innerHTML = document.querySelector('.stars').innerHTML;
              document.querySelector('.modal .timer .game-time').innerText = document.querySelector('.timer').innerText;
            } else {
              return;
            }
          }
        });
        openedCards = [];
      } else {
        setTimeout(function() {
          openedCards.forEach(function(element) {
            element.classList.remove('front');
            element.classList.add('back');
            openedCards = [];
          });
        }, 1000);
      }
    } else {
      return;
    }
  }
}

// Timer

let gameSeconds = document.querySelector(".seconds");
let gameMinutes = document.querySelector(".minutes");

let seconds = 0;
let minutes = 0;

let timer = null;

function startTimer() {
 timer = window.setInterval(tick, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function tick() {
  seconds += 1;
  if (seconds >= 60) {
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

// Calculates star rating

function rateGame(moves) {
  let starRating = document.querySelector('.stars');
  if (moves > 16 && moves <= 24) {
    starRating.children[2].classList.add('lost');
  } else if (moves > 24) {
    starRating.children[1].classList.add('lost');
  } else {
    return;
  }
}

// Closes end of game modal

function closeModal() {
  let modalBackground = document.querySelector('.modal-overlay');
  modalBackground.classList.add('close');
  modalBackground.addEventListener('click', function() {
    initGame();
  });
}

// Opens end of game modal

function openModal() {
  let modalBackground = document.querySelector('.modal-overlay');
  setTimeout(function() {
    modalBackground.classList.remove('close');
  }, 1000);
}

function clearMoves() {
  moves = 0;
  gameMoves.textContent = moves;
}

// Resets the variables

function startGame() {
  clearMoves();
  minutes = 0;
  gameMinutes.textContent = "00"
  seconds = 0;
  gameSeconds.textContent = "00"
  matches = 0;
}

// Initializes the game
function initGame() {
  startGame();
  startTimer();
  generateBoard(shuffle(cardSymbols));
  closeModal();
}

// Restart the game
document.querySelector(".restart-game").addEventListener("click", function(e) {
  stopTimer();
  initGame();
});

initGame();
