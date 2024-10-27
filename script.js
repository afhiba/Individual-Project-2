let moveCount = 0;
let timeElapsed = 0;
let timer;


function initBoard() {
  const board = document.getElementById("puzzle-board");
  board.innerHTML = ""; 

  let tileNumbers = Array.from({ length: 15 }, (_, i) => i + 1).concat(["tile16"]);
  tileNumbers = shuffleArray(tileNumbers); 

  let cellNumber = 1;
  for (let row = 1; row <= 4; row++) {
    const rowElement = document.createElement("tr");
    for (let col = 1; col <= 4; col++) {
      const cell = document.createElement("td");
      cell.id = "cell" + row + col;
      cell.className = tileNumbers[cellNumber - 1];
      cell.textContent = tileNumbers[cellNumber - 1] === "tile16" ? "" : tileNumbers[cellNumber - 1];
      cell.onclick = () => clickTile(row, col);
      rowElement.appendChild(cell);
      cellNumber++;
    }
    board.appendChild(rowElement);
  }

  resetGame();
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function swapTiles(cell1, cell2) {
  const temp = document.getElementById(cell1).className;
  document.getElementById(cell1).className = document.getElementById(cell2).className;
  document.getElementById(cell2).className = temp;

  document.getElementById(cell1).textContent = document.getElementById(cell1).className === "tile16" ? "" : document.getElementById(cell1).className;
  document.getElementById(cell2).textContent = document.getElementById(cell2).className === "tile16" ? "" : document.getElementById(cell2).className;
}


function checkWin() {
  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 4; j++) {
      const cell = document.getElementById("cell" + i + j);
      const expectedTile = (i - 1) * 4 + j;
      if (cell.className !== "tile16" && cell.className !== `tile${expectedTile}`) return false;
    }
  }

  stopTimer();
  alert(`Congratulations! You won!\nTime: ${timeElapsed}s\nMoves: ${moveCount}`);
  newGame();
  return true;
}


function startTimer() {
  timer = setInterval(() => {
    timeElapsed++;
    document.getElementById("time").textContent = `Time spent in the current game: ${timeElapsed} seconds.`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetGame() {
  moveCount = 0;
  timeElapsed = 0;
  document.getElementById("moves").textContent = "Number of Moves thus far: 0";
  document.getElementById("time").textContent = "Time spent in the current game: 0 seconds.";
  clearInterval(timer);
}


function tileMoved() {
  if (moveCount === 0) startTimer();
  moveCount++;
  document.getElementById("moves").textContent = `Number of Moves thus far: ${moveCount}`;
}


function clickTile(row, column) {
  const cell = document.getElementById(`cell${row}${column}`);
  if (cell.className !== "tile16") {
    if (column < 4 && document.getElementById(`cell${row}${column + 1}`).className === "tile16") {
      swapTiles(`cell${row}${column}`, `cell${row}${column + 1}`);
    } else if (column > 1 && document.getElementById(`cell${row}${column - 1}`).className === "tile16") {
      swapTiles(`cell${row}${column}`, `cell${row}${column - 1}`);
    } else if (row < 4 && document.getElementById(`cell${row + 1}${column}`).className === "tile16") {
      swapTiles(`cell${row}${column}`, `cell${row + 1}${column}`);
    } else if (row > 1 && document.getElementById(`cell${row - 1}${column}`).className === "tile16") {
      swapTiles(`cell${row}${column}`, `cell${row - 1}${column}`);
    }
    tileMoved();
    checkWin();
  }
}


function newGame() {
  initBoard();
}


function simpleGame() {
  initBoard();
  swapTiles("cell44", "cell43"); 
}


window.onload = newGame;

