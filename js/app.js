let playingCards = document.querySelector('.deck');
console.log(playingCards);

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

playingCards.addEventListener('click', flipCard, false);
