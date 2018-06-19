let playingCards = document.querySelector('.deck');
console.log(playingCards);

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

// let cardSymbol = "fa-heart";
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

// Generates the game board
function addSymbols(element, cardSymbol) {
  element.insertAdjacentHTML('afterbegin', `<li class="card back"><i class="fas ${cardSymbol} fa-2x"></i></li>`);
}

function generateBoard(cardSymbols) {
  for (let cardSymbol of cardSymbols){
    addSymbols(playingCards, cardSymbol);
  }
}

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


// Initializes the game
function initGame() {
  // TODO: reset moves counter
  // TODO: reset rating
  // TODO: reset timer
  generateBoard(shuffle(cardSymbols));
}

initGame();
playingCards.addEventListener('click', flipCard, false);
