let Boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#newgame");
let newmessage = document.querySelector("p");
let messageContainer = document.querySelector(".messConatiner");

let turnO = true; // PlayerX and PlayerO
let count = 0;

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];
// for reset game we have to do
let resetgame = () => {
  turnO = true;
  enableboxes();
  count = 0;
  messageContainer.style.cssText = "display:hidden";
};

Boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // alert('clicked')
    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
    } else {
      box.innerHTML = "X";
      turnO = true;
    }

    box.disabled = true;

    count++;

    let iswinner = checkWinner();
    if (count === 9 && !iswinner) {
      gamedraw();
    }
  });
});

// for gamedraw;

const gamedraw = () => {
  newmessage.innerText = `Game was a Draw.`;
  messageContainer.classList.remove("hide");
  disablebox();
};

//after winner we have to dissable the box

const disablebox = () => {
  for (let box of Boxes) {
    box.disabled = true;
  }
};

// when new game start all the box will enables
const enableboxes = () => {
  for (let box of Boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// print winner

const showwinner = (winner) => {
  newmessage.innerText = `Congratulation the winner is :--- ${winner}`;

  // newmessage.classList.remove("hide")
  disablebox();

  messageContainer.style.cssText = "display:block";
};

// here we find the winner

const checkWinner = () => {
  for (let pattern of winningPattern) {
    // console.log(pattern[0], pattern[1],pattern[2])

    let Pos1val = Boxes[pattern[0]].innerHTML;
    let Pos2val = Boxes[pattern[1]].innerHTML;
    let Pos3val = Boxes[pattern[2]].innerHTML;

    if (Pos1val != "" && Pos2val != "" && Pos3val != "") {
      if (Pos1val === Pos2val && Pos2val === Pos3val) {
        console.log("winner", Pos1val);
        showwinner(Pos1val);
      }
    }
  }
};

resetBtn.addEventListener("click", resetgame);
newgamebtn.addEventListener("click", resetgame);
