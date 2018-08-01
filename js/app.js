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
  'fa-heart', 'fa-heart',
  'fa-star', 'fa-star',
  'fa-circle', 'fa-circle',
  'fa-square', 'fa-square',
  'fa-play', 'fa-play',
  'fa-map-marker', 'fa-map-marker',
  'fa-moon', 'fa-moon',
  'fa-cloud', 'fa-cloud'
];

// Generates the game board
function generateCard(element, cardSymbol) {
  element.insertAdjacentHTML('afterbegin', `<li class='card back'><i class='fas ${cardSymbol} fa-2x'></i></li>`);
}

function generateBoard(cardSymbols) {
  let cardDeck = document.querySelector('.deck');
  if (cardDeck.childNodes.length > 1) {
    cardDeck.innerHTML = '';
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
  if (event.target.tagName === 'LI' && !event.target.classList.contains('front') && openedCards.length < 2) {
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
              stopTimer();
              openModal();
              writeStatsToModal();
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

// Starts the timer
let gameSeconds = document.querySelector('.seconds');
let gameMinutes = document.querySelector('.minutes');

let seconds = 0;
let minutes = 0;

let timer = null;

function startTimer() {
 timer = window.setInterval(tick, 1000);
}

function tick() {
  seconds += 1;
  if (seconds >= 60) {
    seconds = 0;
    minutes += 1;
  }
  gameSeconds.textContent = seconds;
  if (seconds < 10) {
    gameSeconds.textContent = '0' + seconds;
  }
  gameMinutes.textContent = minutes;
  if (minutes < 10) {
    gameMinutes.textContent = '0' + minutes;
  }
}

// Stops the timer
function stopTimer() {
  clearInterval(timer);
}

// Calculates star rating
let starRating = document.querySelector('.stars');

function rateGame(moves) {
  if (moves > 16 && moves <= 24) {
    starRating.children[2].classList.add('lost');
  } else if (moves > 24) {
    starRating.children[1].classList.add('lost');
  } else {
    return;
  }
}

// Resets star rating
function resetRating() {
  for (let eachStar of starRating.children) {
    eachStar.classList.remove('lost');
  }
}

// Resets the stats
function resetStats() {
  resetMoves();
  resetMatches();
  resetTime();
  resetRating();
}

// Initializes the game
function initGame() {
  stopTimer();
  resetStats();
  startTimer();
  generateBoard(shuffle(cardSymbols));
  closeModal();
}

// Resets individual stats
function resetMoves() {
  moves = 0;
  gameMoves.textContent = moves;
  openedCards = [];
}

function resetMatches() {
  matches = 0;
}

function resetTime() {
  minutes = 0;
  gameMinutes.textContent = '00';
  seconds = 0;
  gameSeconds.textContent = '00';
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

// Writes stats to end of game modal
function writeStatsToModal() {
  document.querySelector('.modal .moves .move-count').textContent = moves;
  document.querySelector('.modal .rating .stars').innerHTML = document.querySelector('.stars').innerHTML;
  document.querySelector('.modal .timer .game-time').innerText = document.querySelector('.timer').innerText;
}


// Restart the game from in-game button
document.querySelector('.restart-game').addEventListener('click', function(e) {
  initGame();
});

initGame();
