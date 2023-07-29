let humanState = null;

const options = document.querySelectorAll("#options button");
const rock = document.getElementById("option1");
const paper = document.getElementById("option2");
const scissor = document.getElementById("option3");
const actionGo = document.querySelector(".actionGo");
const actionWrap = document.querySelector(".actionWarp");

const outputRobot = document.querySelector(".outputRobot");
const outputHuman = document.querySelector(".outputHuman");
const robotTag = document.createElement("img");
const humanTag = document.createElement("img");
const playAgainTag = document.createElement("button");
const isiPlayAgain = document.createTextNode("Play Again");
playAgainTag.appendChild(isiPlayAgain);

robotTag.setAttribute("class", "imageSize");
robotTag.setAttribute("src", "./assets/monster.jpg");
humanTag.setAttribute("class", "imageSize");
humanTag.setAttribute("src", "./assets/monster.jpg");
playAgainTag.setAttribute("class", "actionPlayAgain");

const useHumanState = (setState) => {
  humanState = setState;

  if (humanState == 0) {
    humanTag.setAttribute("src", "./assets/rock.jpg");
    rock.classList.add("clicked");
    paper.classList.remove("clicked");
    scissor.classList.remove("clicked");
  } else if (humanState == 1) {
    humanTag.setAttribute("src", "./assets/paper.jpg");
    rock.classList.remove("clicked");
    paper.classList.add("clicked");
    scissor.classList.remove("clicked");
  } else if (humanState == 2) {
    humanTag.setAttribute("src", "./assets/scissor.png");
    rock.classList.remove("clicked");
    paper.classList.remove("clicked");
    scissor.classList.add("clicked");
  } else {
    return;
  }
};

rock.addEventListener("click", () => {
  humanState !== 4 ? useHumanState(0) : "";
});
paper.addEventListener("click", () => {
  humanState !== 4 ? useHumanState(1) : "";
});
scissor.addEventListener("click", () => {
  humanState !== 4 ? useHumanState(2) : "";
});

let humanSkor = 0;
let robotSkor = 0;

actionGo.addEventListener("click", () => {
  let comp = Math.random();
  const option = ["rock", "paper", "scissor"];

  if (humanState !== null) {
    let i = 0;
    const start = new Date().getTime();
    setInterval(() => {
      if (new Date().getTime() - start > 1000) {
        clearInterval;
        return;
      }
      robotTag.setAttribute("src", "./assets/" + option[i++] + ".jpg");
      if (i == option.length) i = 0;
    }, 100);

    let result = document.querySelector(".result");
    setTimeout(() => {
      let hasil = "";
      let robotState = null;

      if (comp < 0.34) {
        robotState = 0;
        robotTag.setAttribute("src", "./assets/rock.jpg");
      } else if (comp >= 0.34 && comp < 0.67) {
        robotState = 1;
        robotTag.setAttribute("src", "./assets/paper.jpg");
      } else {
        robotState = 2;
        robotTag.setAttribute("src", "./assets/scissor.png");
      }

      if (humanState == robotState) {
        hasil = "DRAW";
      } else if (humanState == 0) {
        hasil = robotState == 1 ? "LOSE" : "WIN";
      } else if (humanState == 1) {
        hasil = robotState == 0 ? "WIN" : "LOSE";
      } else if (humanState == 2) {
        hasil = robotState == 0 ? "LOSE" : "WIN";
      }
      result.innerHTML = hasil;
      useHumanState(4);

      const humanOutput = document.querySelector(".humanSkor");
      const robotOutput = document.querySelector(".robotSkor");

      if (hasil == "WIN") {
        humanSkor += 1;
        humanOutput.innerHTML = humanSkor;
      } else if (hasil == "LOSE") {
        robotSkor += 1;
        robotOutput.innerHTML = robotSkor;
      }
    }, 1000);

    actionWrap.removeChild(actionGo);
    actionWrap.appendChild(playAgainTag);
  } else {
    alert("choose your move");
  }
});

actionWrap.addEventListener("click", (event) => {
  let result = document.querySelector(".result");
  if (event.target.classList.contains("actionPlayAgain")) {
    useHumanState(null);
    paper.classList.remove("clicked");
    scissor.classList.remove("clicked");
    rock.classList.remove("clicked");
    robotTag.setAttribute("src", "./assets/monster.jpg");
    humanTag.setAttribute("src", "./assets/monster.jpg");
    actionWrap.removeChild(playAgainTag);
    actionWrap.appendChild(actionGo);
    result.innerHTML = "";
  }
});

outputHuman.appendChild(humanTag);
outputRobot.appendChild(robotTag);