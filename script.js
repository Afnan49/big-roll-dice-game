'use strict';
// =============< GOLPAL SELECTING ELEMENTS >=========
const playerSection0 = document.querySelector('.player--0');
const playerSection1 = document.querySelector('.player--1');
const scoreElement0 = document.getElementById('score--0');
const scoreElement1 = document.getElementById('score--1');
const currentScoreElement0 = document.getElementById('current--0');
const currentScoreElement1 = document.getElementById('current--1');
const imageOfDice = document.querySelector('.dice');
const rollButn = document.querySelector('.btn--roll');
const rollHold = document.querySelector('.btn--hold');
const rollNew = document.querySelector('.btn--new');
console.log(rollNew);
let score;
let currentScore;
let activePlayer;
let playing;

//=========< GENERIC FUNCTIONS >====================
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  currentScoreElement1.textContent = 0;
  currentScoreElement0.textContent = 0;
  scoreElement1.textContent = 0;
  scoreElement0.textContent = 0;

  imageOfDice.classList.add('hidden');
  playerSection0.classList.remove('player--winner');
  playerSection1.classList.remove('player--winner');
  playerSection0.classList.add('player--active');
  playerSection1.classList.remove('player--active');
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerSection0.classList.toggle('player--active');
  playerSection1.classList.toggle('player--active');
};

//======< START GAME FUNCTIONALITY >================
init();

// ======< ROLLIN DICE FUNCTIONALITY >==============
rollButn.addEventListener('click', () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    imageOfDice.classList.remove('hidden');
    imageOfDice.src = `images/dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
// ==========< HOLD FUNCTIONALITY >================
rollHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 10) {
      playing = false;
      imageOfDice.classList.add('hidden');
      const winer = document.querySelector(`.player--${activePlayer}`);
      winer.classList.add('player--winner');
      winer.classList.add('player--active');
    } else {
      switchPlayer();
    }
  }
});
// ============< RESET THE GAME >===================
rollNew.addEventListener('click', init);
