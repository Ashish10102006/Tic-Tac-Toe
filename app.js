let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('#reset-btn');
let newGameButton = document.querySelector('#new-game-btn');
let message = document.querySelector('#message');

newGameButton.style.display = 'none';
let turnO = true;

const winpatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function showWinner(winner) {
  message.innerText = `Winner is ${winner}!`;
  newGameButton.style.display = 'inline-block';
}

function checkDraw() {
  if ([...boxes].every(box => box.innerText !== '') && !document.querySelector('.win')) {
    message.innerText = "It's a draw!";
    newGameButton.style.display = 'inline-block';
  }
}

function resetGame() {
  boxes.forEach((box) => {
    box.innerText = '';
    box.disabled = false;
    box.classList.remove('win');
  });
  turnO = true;
  message.innerText = '';
  newGameButton.style.display = 'none';
}

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    box.innerText = turnO ? 'O' : 'X';
    turnO = !turnO;
    box.classList.add('show');
    setTimeout(() => box.classList.remove('show'), 200);
    box.disabled = true;
    checkWin();
    checkDraw();
  });
});

function checkWin() {
  for (let pattern of winpatterns) {
    let [a, b, c] = pattern;
    if (boxes[a].innerText &&
        boxes[a].innerText === boxes[b].innerText &&
        boxes[a].innerText === boxes[c].innerText) {
      boxes[a].classList.add('win');
      boxes[b].classList.add('win');
      boxes[c].classList.add('win');
      showWinner(boxes[a].innerText);
      disableAllBoxes();
      return;
    }
  }
}

function disableAllBoxes() {
  boxes.forEach((box) => box.disabled = true);
}

resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);
