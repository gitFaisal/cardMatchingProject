const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let moves = 0;
let counter = document.querySelector(".moves");
var matches = [];

var matchSound = document.getElementById("matchSound")
var failSound = document.getElementById("failSound")


// =======MODAL======
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
document.getElementById('finalMoves').innerHTML = moves;
// =======MODAL======



function moveCounter(){
    moves++;
    counter.innerHTML = moves
}

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('flip');

    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 
        //second click
        secondCard = this;
        moveCounter();
        checkForMatch();
}

function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
   
    isMatch ? playMatch(): playFail();
    isMatch ? disableCards(): unflipCards();
}   

function playMatch(){
    matchSound.playbackRate = 2.5;
    matchSound.play();
}

function playFail(){
    failSound.playbackRate = 2.5;
    failSound.play();
}

// ======MODAL=======
function modalOpen() {
    // alert('im working')
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }
// =======MODAL======

function disableCards(){
    if(matches.length < 5){
        matches.push(1);
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }
    else{
        modalOpen();
        }
}

function unflipCards(){
    lockBoard = true;
 setTimeout(() =>{
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
 }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [fistCard, secondCard] = [null, null]
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos; 
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

