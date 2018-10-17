//
//Blackjack
//

//Card Variables
let suits = [ 'H', 'C', 'D', 'S' ];
let values = [ 'A', 'K', 'Q', 'J', '10', '9',
              '8', '7', '6', '5', '4', '3',
              '2'];

//DOM Variables
let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

//Game Variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

//Hide additional card slots
//var img = document.getElementById("DealerCardSlot3").style.visibility = "hidden";

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [ getNextCard(), getNextCard() ];
  playerCards = [ getNextCard(), getNextCard() ];
  
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
});

hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});


function createDeck() {
    let deck = [];
    for ( let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
      for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
        let card = {
          suit: suits[suitIdx],
          value: values[valueIdx]
        };
        deck.push( card );
      }
    }
    return deck; 
}

function shuffleDeck(deck) {
  for ( let i = 0; i < deck.length; i++ ) {
    let swapIdx = Math.trunc(Math.random() * deck.length); //gets a random index
    let tmp = deck[swapIdx]; //stores the value temporarily
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getCardString(card) {
  return card.value + card.suit;
}

function getNextCard() {
  return deck.shift();
}

function getCardNumericValue(card) {
  switch(card.value) {
    case 'A':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for ( let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if ( hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame() {
  
  updateScores(); //Check to make sure score is current
  
  if ( gameOver ) {
    //let dealer take cards
    while ( dealerScore < playerScore 
          && playerScore <= 21
          && dealerScore <= 21 ) {
      dealerCards.push( getNextCard());
      updateScores();
    }
  }
  
  if ( playerScore > 21 ) {
    playerWon = false;
    gameOver = true;
  }
  else if ( dealerScore > 21 ) {
    playerWon = true;
    gameOver = true;
  }
  else if ( gameOver ) {
    
    if ( playerScore > dealerScore ) {
      playerWon = true;
    }
    else {
      playerWon = false;
    }
  }
}

//Sets up our text area. Returns welcome if the game isn't started
function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack!';
    return;
  }
  
  let dealerCardString = '';
  let dealerCardPicture = '';
  
  for ( let i = 0; i < dealerCards.length; i++ ) {
    dealerCardPicture = getCardString(dealerCards[i]);
    dealerCardString += dealerCardPicture + '\n'; 
    //code to display the card
    //var CardPicture = document.createElement('./Cards/' + dealerCardPicture + '.png');
    dealerCardPicture = ''; 
  }
  
  let playerCardString = '';
  
  for ( let i = 0; i < playerCards.length; i++ ) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();
  
  textArea.innerText = 
    'Dealer has:\n' + 
    dealerCardString + 
    '(score: ' + dealerScore + ')\n\n' +
    
    'Player has:\n' +
    playerCardString +
    '(score: ' + playerScore + ')\n\n';
    
    if ( gameOver ) {
      if (playerWon) {
        textArea.innerText += "YOU WIN!";
      }
      else {
        textArea.innerText += "DEALER WINS";
      }
      newGameButton.style.display = 'inline';
      hitButton.style.display = 'none';
      stayButton.style.display = 'none';
    }
  
  /*for (var i = 0; i < deck.length; i++) {
    textArea.innerText += '\n' + getCardString(deck[i]);
  }*/
}

//let deck = createDeck();

/*
for ( let i=0; i < deck.length; i++ ) {
  console.log( deck[i] ); 
}
*/

//let playerCards = [ getNextCard(), getNextCard() ];

/*console.log("Welcome to Blackjack!");

console.log( "You are dealt: " );
console.log( " " + getCardString(playerCards[0]) );
console.log( " " + getCardString(playerCards[1]) );
*/
/*
let card1 = "Ace of Spades",
    card2 = "Ten of Hearts";
    
console.log("Welcome to Blackjack!");

console.log("You are dealt: ");
console.log("  " + card1);
console.log("  " + card2);
*/



