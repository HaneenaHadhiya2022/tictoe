const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.textContent = "Player X's turn";
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  cell.textContent = currentClass;
  cell.classList.add(currentClass.toLowerCase());

  if (checkWin(currentClass)) {
    message.textContent = `Player ${currentClass} wins! 🎉`;
    endGame();
  } else if ([...cells].every(c => c.textContent)) {
    message.textContent = "It's a draw!";
  } else {
    isXTurn = !isXTurn;
    message.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
  }
}

function checkWin(currentClass) {
  return winningCombos.some(combo => {
    return combo.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}
