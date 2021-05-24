/**
 * @typedef {"✊" | "✋" | "✌️"} SelectionOption
 * @typedef {[number, number, number]} Score
 */

/**
 * @returns {SelectionOption}
 */
function computerPlay() {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * @type {[SelectionOption,SelectionOption, SelectionOption]}
 */
let items = ["✊", "✋", "✌️"];

/**
 * @type {Score}
 */
let emptyScore = [0, 0, 0];

/**
 *
 * @param {SelectionOption} userPick
 * @param {SelectionOption} computerPick
 * @returns {void}
 */
function updateSelections(userPick, computerPick) {
  const simRound = playRound(userPick, computerPick, emptyScore);
  const userSelectBtn = document.querySelector("#userSelectBtn");
  const computerSelectBtn = document.querySelector("#computerSelectBtn");
  if (userSelectBtn) {
    userSelectBtn.textContent = userPick;
    userSelectBtn.classList.remove("win", "loss");
    simRound[0] !== simRound[1] &&
      userSelectBtn.classList.add(simRound[0] ? "win" : "loss");
  }
  if (computerSelectBtn) {
    computerSelectBtn.textContent = computerPick;
    computerSelectBtn.classList.remove("win", "loss");
    simRound[0] !== simRound[1] &&
      computerSelectBtn.classList.add(simRound[1] ? "win" : "loss");
  }

  document
    .getElementById("favicon")
    ?.setAttribute(
      "href",
      `./assets/${
        userPick === "✊" ? "rock" : userPick === "✋" ? "paper" : "scissors"
      }.ico`
    );
}

/**
 *
 * @param {SelectionOption} userSelection
 * @param {SelectionOption} computerSelection
 * @param {Score} score
 * @returns {Score}
 */
function playRound(userSelection, computerSelection, score) {
  if (userSelection == computerSelection) {
    return [score[0], score[1], score[2] + 1];
  } else if (
    (userSelection == "✌️" && computerSelection == "✋") ||
    (userSelection == "✋" && computerSelection == "✊") ||
    (userSelection == "✊" && computerSelection == "✌️")
  ) {
    return [score[0] + 1, score[1], score[2]];
  } else {
    return [score[0], score[1] + 1, score[2]];
  }
}

/**
 *
 * @param {Score} score
 * @returns {boolean}
 */
function gameIsOver(score) {
  return score[0] === 3 || score[1] === 3;
}

function displayGameOver() {
  document.querySelector("#reset")?.classList.add("visible");
}

/**
 * @type {Score}
 */
let currentScore = emptyScore;

window.addEventListener("DOMContentLoaded", (event) => {
  const rock = document.querySelector("#rock button");
  const paper = document.querySelector("#paper button");
  const scissors = document.querySelector("#scissors button");
  rock?.addEventListener("click", () => rockPaperScissors("✊"));
  paper?.addEventListener("click", () => rockPaperScissors("✋"));
  scissors?.addEventListener("click", () => rockPaperScissors("✌️"));

  const gameOver = document.querySelector("#reset");
  gameOver?.addEventListener("click", function () {
    currentScore = emptyScore;
    displayResults(currentScore);
    gameOver.classList.remove("visible");
  });
});

/**
 *
 * @param {Score} newScore
 */
function displayResults(newScore) {
  const win = document.querySelector("#win");
  const loss = document.querySelector("#loss");
  const tied = document.querySelector("#tied");

  win && (win.textContent = `${newScore[0]}`);
  loss && (loss.textContent = `${newScore[1]}`);
  tied && (tied.textContent = `${newScore[2]}`);
}

/**
 *
 * @param {SelectionOption} userPick
 */
function rockPaperScissors(userPick) {
  if (gameIsOver(currentScore)) {
    return;
  }
  const computerPick = computerPlay();
  const newScore = playRound(userPick, computerPick, currentScore);
  currentScore = newScore;
  updateSelections(userPick, computerPick);
  displayResults(currentScore);
  gameIsOver(currentScore) && displayGameOver();
}
