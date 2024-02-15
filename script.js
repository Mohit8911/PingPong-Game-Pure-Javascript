// let main = document.getElementsByClassName("main_div");
// main[0].style.height = innerHeight + "px";

let ball = document.getElementById("ball");
let rod1 = document.getElementById("rod1");
let rod2 = document.getElementById("rod2");

const storeName = "PPName";
const storeScore = "PPmaxScore";
const rod1Name = "Rod1";
const rod2Name = "Rod2";

let score = 0,
  gameOn = false,
  maxScore = 0,
  movement,
  ballSpeedY = 2,
  ballSpeedX = 2;


let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

(() => {
  maxScore = localStorage.getItem(storeScore);
  rod = localStorage.getItem(storeName);
  if (maxScore === null || rod === null) {
    alert("This is your first time! Let's Play :)");
    maxScore = 0;
    rod = "Rod1";
  } else {
    alert(rod + " has the maximum score of " + maxScore * 100);
  }
  resetBoard(rod);
})();

function resetBoard(rodName) {
  rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + "px";
  rod2.style.left = rod1.style.left;
  ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + "px";

  //Lossing player will get the ball
  if (rodName === rod2Name) {
    ball.style.top = rod1.offsetTop + rod1.offsetHeight + "px";
    ballspeedY = 2;
  } else if (rodName === rod1Name) {
    ball.style.top = rod2.offsetTop - ball.offsetHeight + "px";
    ballSpeedY = -2;
  }
  score = 0;
  gameOn = false;
}

function storeWin(rod, score) {
  if (score > maxScore) {
    maxScore = score;
    localStorage.setItem(storeName, rod);
    localStorage.setItem(storeScore, maxScore);
  }
  alert(
    rod +
      " wins with a score of " +
      score * 100 +
      ". Max score is " +
      maxScore * 100 +
      "."
  );
  clearInterval(movement);
  resetBoard(rod);
}

window.addEventListener("keypress", function (event) {
  let rodSpeed = 20;
  let rodRect = rod1.getBoundingClientRect();

  if (event.code === "KeyD" && rodRect.x + rodRect.width < windowWidth) {
    rod1.style.left = rodRect.x + rodSpeed + "px";
    rod2.style.left = rod1.style.left;
  } else if (event.code === "KeyA" && rodRect.x > 0) {
    rod1.style.left = rodRect.x - rodSpeed + "px";
    rod2.style.left = rod1.style.left;
  }

  if (event.code === "Enter") {
    if (!gameOn) {
      gameOn = true;
      let ballX = ball.getBoundingClientRect().x;
      let ballY = ball.getBoundingClientRect().y;
      let ballDia = ball.offsetWidth;

      rod1Width = rod1.offsetWidth;
      rod2Width = rod2.offsetWidth;
      rod1Height = rod1.offsetHeight;
      rod2Height = rod2.offsetHeight;

      movement = setInterval(function () {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        rod1X = rod1.getBoundingClientRect().x;
        rod2Y = rod2.getBoundingClientRect().y;

        if (ballX + ballDia > windowWidth || ballX < 0) {
          ballSpeedX = -ballSpeedX;
        }

        let ballPos = ballX + ballDia / 2;

        //Rod 1 Check
        if (ballY < rod1Height) {
          ballSpeedY = -ballSpeedY; //reverse direction
          score++;

          if (ballPos < rod1X || ballPos > rod1X + rod1Width) {
            storeWin(rod2Name, score);
            console.log("hlo");
          }
        }

        //Rod 2 Check
        else if (ballY + ballDia > windowHeight - rod2Height) {
          ballSpeedY = -ballSpeedY; //reverse direction
          score++;

          if (ballPos < rod1X || ballPos > rod1X + rod2Width) {
            storeWin(rod1Name, score);
          }
        }
      }, 10);
    }
  }
});
