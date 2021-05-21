function computerPlay() {
  return items[Math.floor(Math.random() * items.length)];
}

let items = ["✊", "✋", "✌"];

let emptyScore = [0, 0, 0];

function updateSelections(userPick, computerPick) {
  const userSelect = document.querySelector("#userSelect");
  const computerSelect = document.querySelector("#computerSelect");
  userSelect.textContent = `You picked ${userPick}`;
  computerSelect.textContent = `Computer picked ${computerPick}`;
}

function playRound(playerSelection, computerSelection, score) {
  if (playerSelection == computerSelection) {
    return [score[0], score[1], score[2] + 1];
  } else if (
    (playerSelection == "✌" && computerSelection == "✋") ||
    (playerSelection == "✋" && computerSelection == "✊") ||
    (playerSelection == "✊" && computerSelection == "✌")
  ) {
    return [score[0] + 1, score[1], score[2]];
  } else {
    return [score[0], score[1] + 1, score[2]];
  }
}

function gameIsOver(score) {
  return score[0] === 3 || score[1] === 3;
}

function displayGameOver() {
  document.querySelector("#reset").classList.add("visible");
}

let currentScore = emptyScore;

window.addEventListener("DOMContentLoaded", (event) => {
  function playRock() {
    if (gameIsOver(currentScore)) {
      return;
    }
    const computerPick = computerPlay();
    const newScore = playRound("✊", computerPick, currentScore);
    currentScore = newScore;
    updateSelections("✊", computerPick);
    displayResults(currentScore);
    gameIsOver(currentScore) && displayGameOver();
  }

  function playPaper() {
    if (gameIsOver(currentScore)) {
      return;
    }
    const computerPick = computerPlay();
    let newScore = playRound("✋", computerPlay(), currentScore);
    currentScore = newScore;
    updateSelections("✋", computerPick);
    displayResults(currentScore);
    gameIsOver(currentScore) && displayGameOver();
  }

  function playScissors() {
    if (gameIsOver(currentScore)) {
      return;
    }
    const computerPick = computerPlay();
    let newScore = playRound("✌", computerPlay(), currentScore);
    currentScore = newScore;
    updateSelections("✌", computerPick);
    displayResults(currentScore);
    gameIsOver(currentScore) && displayGameOver();
  }

  const rock = document.querySelector("#rock button");
  const paper = document.querySelector("#paper button");
  const scissors = document.querySelector("#scissors button");
  rock.addEventListener("click", playRock);
  paper.addEventListener("click", playPaper);
  scissors.addEventListener("click", playScissors);

  const gameOver = document.querySelector("#reset");
  gameOver.addEventListener("click", function (e) {
    currentScore = emptyScore;
    displayResults(currentScore);
    gameOver.classList.remove("visible");
  });

  function displayResults(newScore) {
    const win = document.querySelector("#win");
    const loss = document.querySelector("#loss");
    const tied = document.querySelector("#tied");

    win.textContent = newScore[0];
    loss.textContent = newScore[1];
    tied.textContent = newScore[2];
  }
});
