let boxes = document.querySelectorAll(".boxes");
let resetBtn = document.querySelector("#resetBtn");
let mssgeContainer = document.querySelector(".mssgeContainer");
let newBtn = document.querySelector("#newBtn");
let mssge = document.querySelector("#mssge");
let xTurn = document.querySelector("#xTurn");
let oTurn = document.querySelector("#oTurn");
let turn = document.querySelector(".turn");

let turnOfX = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnOfX) {
      changeTurn();
      box.innerHTML = "X";
      turnOfX = false;
    } else {
      changeTurn();
      box.innerHTML = "O";
      turnOfX = true;
    }
    box.disabled = true;
    box.style.color = "black";
    count++;
    let win = checkWinner();
    if (count === 9 && !win) {
      gameDraw();
    }
   
  });
});

const changeTurn = () => {
  if (turnOfX == true) {
    xTurn.style.backgroundColor = "white";
    xTurn.style.opacity = 0.09;
    oTurn.style.opacity = 1;
    oTurn.style.backgroundColor = "rgb(48, 255, 79)";
  } else {
    oTurn.style.opacity = 0.09;
    oTurn.style.backgroundColor = "white";
    xTurn.style.backgroundColor = "rgb(48, 255, 79)";
    xTurn.style.opacity = 1;
  }
};

const resetGame = () => {
  for (box of boxes) {
    box.innerHTML = "";
    enableBoxes();
    turnOfX = true;
    mssgeContainer.classList.add("hide");
    turn.classList.remove("hide");
    count = 0;
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerHTML;
    let pos2Val = boxes[pattern[1]].innerHTML;
    let pos3Val = boxes[pattern[2]].innerHTML;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log(`${pos1Val} is winner`);
        showWinner(pos1Val);
      }
    }
  }
};

const enableBoxes = () => {
  for (box of boxes) {
    box.disabled = false;
  }
};
const disableBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  mssge.innerHTML = `Congratulations, ${winner} is winner.`;
  mssgeContainer.classList.remove("hide");
  turn.classList.add("hide");
  disableBoxes();
};

const gameDraw = () => {
  mssge.innerHTML = `Game is Draw`;
  mssgeContainer.classList.remove("hide");
  turn.classList.add("hide");
  disableBoxes();
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
