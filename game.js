const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector(".reset-button");

let currentPlayer = "X";
let gameOver = false;

function makeMove(index) {
  if (!cells[index].textContent && !gameOver) {
    cells[index].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      gameOver = true;
      announceWinner(currentPlayer);
    } else if (checkDraw()) {
      gameOver = true;
      announceDraw();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]           // Diagonals
  ];
  
  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

function checkDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

function announceWinner(player) {
  alert(`Player ${player} wins!`);
}

function announceDraw() {
  alert("It's a draw!");
}

function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = "";
  });
  currentPlayer = "X";
  gameOver = false;
}

resetButton.addEventListener("click", resetBoard);
