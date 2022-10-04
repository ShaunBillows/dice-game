// game elements
const dice = document.querySelectorAll(".dice");
const front = document.querySelectorAll(".front");
const background = document.querySelector(".game");
const score_ = document.querySelector(".score");
const winCount_ = document.querySelector(".win-count-value");

// game stats
let score = 0;
let diceRoll = 1;
let winCount = 0;

// dice roll options
const options = {
  1: 'url("./images/dice-1.png")',
  2: 'url("./images/dice-2.png")',
  3: 'url("./images/dice-3.png")',
  4: 'url("./images/dice-4.png")',
  5: 'url("./images/dice-5.png")',
  6: 'url("./images/dice-6.png")',
};

// keep track of dice states
let diceStates = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
};

// game

for (let i = 0; i < dice.length; i++) {
  dice[i].addEventListener("click", () => {
    // game fucntions
    replayAnimation(dice[i]);
    rollDice(front[i], 200);
    updateDiceState(i);
    updateScore(800);

    if (diceRoll == 1) {
      setTimeout(() => {
        // game over functions
        replayAllAnimations();
        resetScore();
        resetDiceStates();
        flashDice(front[i], 300, 0);
      }, 1000);
    } else if (score == 21) {
      setTimeout(() => {
        // winning functions
        replayAllAnimations();
        youWinAlert();
        resetScore();
        resetDiceStates();
        updateWinCount();
      }, 1000);
    }
  });
}

// game functions

const replayAnimation = (animation) => {
  animation.style.animationName = "none";
  requestAnimationFrame(() => {
    animation.style.animationName = "";
  });
};

const rollDice = (frontFace, delay) => {
  diceRoll = Math.ceil(Math.random() * Object.keys(options).length);
  setTimeout(() => {
    frontFace.style.backgroundImage = options[diceRoll];
  }, delay);
};

const updateDiceState = (num) => {
  // note: the initial die on the homescreen is dice[0]
  diceStates[num] = diceRoll;
};

const updateScore = (delay) => {
  sum = 0;
  for (let i = 1; i < Object.keys(diceStates).length; i++) {
    sum += Number(diceStates[i]);
  }
  score = sum;

  setTimeout(() => {
    score_.innerHTML = score;
  }, delay);
};

// game over functions

const flashDice = (frontFace, flashTime, delay) => {
  // fix to stop the homescreen die flashing red
  if (firstClick) {
    return;
  }
  setTimeout(() => {
    frontFace.style.backgroundImage = 'url("./images/dice-1-red.png")';
    frontFace.style.backgroundSize = "cover";

    setTimeout(() => {
      frontFace.style.backgroundImage = options[1];
      frontFace.style.backgroundSize = "cover";
    }, flashTime);
  }, delay);
};

const replayAllAnimations = () => {
  for (let i = 0; i < Object.keys(dice).length; i++) {
    replayAnimation(dice[i]);
    front[i].style.backgroundImage = options[1];
  }
};

const resetScore = () => {
  score = 0;
  score_.innerHTML = 0;
};

const resetDiceStates = () => {
  for (let i = 1; i < Object.keys(diceStates).length; i++) {
    diceStates[i] = 0;
  }
};

// winning functions

const youWinAlert = () => {
  modal.style.display = "flex";
};

const updateWinCount = () => {
  winCount += 1;
  winCount_.innerHTML = winCount;
};

// overlay
firstClick = true;
window.addEventListener("click", () => {
  overlay.style.display = "none";
  if (firstClick) {
    resetScore();
    firstClick = false;
  }
});

// game instructions
const infoMessage = document.querySelector(".info-message");
const infoIcon = document.querySelector(".info-icon");
let infoMessageShowing = false;

infoIcon.addEventListener("click", () => {
  if (infoMessageShowing) {
    infoMessageShowing = false;
    infoMessage.style.display = "none";
  } else {
    infoMessageShowing = true;
    infoMessage.style.display = "block";
  }
});

// close modal
const modelClose = document.querySelector(".close");
const modal = document.querySelector(".modal");

modelClose.addEventListener("click", () => {
  modal.style.display = "none";
});
