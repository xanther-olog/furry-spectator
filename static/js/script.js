function ageInDays() {
  let birthYear = prompt("What is your birth year?");
  let age_days = (2021 - parseInt(birthYear)) * 365;
  let res = document.createElement("h2");
  res.setAttribute("id", "result");
  res.innerText = age_days.toString();
  document.getElementById("flex-box-result").appendChild(res);
}

function reset() {
  let elementToRemove = document.getElementById("result");
  if (elementToRemove != undefined || elementToRemove != null) {
    elementToRemove.remove();
  }
}

function getACat() {
  fetch("https://api.thecatapi.com/v1/images/search")
    .then((response) => response.json())
    .then((data) => {
      let newImage = document.createElement("img");
      newImage.setAttribute("src", data[0].url);
      newImage.setAttribute("alt", "a random kitty cat");
      newImage.setAttribute("height", "200");
      newImage.setAttribute("width", "200");
      document.getElementById("flexbox-container-2").appendChild(newImage);
    });
}

function playSPS(event) {
  if (document.getElementById("sps-result").hasChildNodes()) {
    document
      .getElementById("sps-result")
      .removeChild(document.getElementById("sps-result").childNodes[0]);
  }
  let possibleChoices = new Array("Rock", "Paper", "Scissors");
  let computerChoice =
    possibleChoices[Math.floor(Math.random() * possibleChoices.length)];
  let resultsObject = {
    Rock: {
      Win: "Scissors",
    },
    Paper: {
      Win: "Rock",
    },
    Scissors: {
      Win: "Paper",
    },
  };
  let result;
  if (event.id.localeCompare(computerChoice) == 0) {
    result = "DRAW!!";
  } else {
    let winObjectChecker = resultsObject[event.id];
    if (winObjectChecker.Win.localeCompare(computerChoice) == 0) {
      result = "WIN!!";
    } else {
      result = "LOSE!!";
    }
  }
  let rockImage = document.getElementById(possibleChoices[0]);
  let paperImage = document.getElementById(possibleChoices[1]);
  let scissorImage = document.getElementById(possibleChoices[2]);

  let outputJson = {
    Rock: rockImage,
    Paper: paperImage,
    Scissors: scissorImage,
  };

  clearImageDiv();

  let divOfImages = document.getElementById("flex-box-sps");

  divOfImages.appendChild(outputJson[event.id]);
  divOfImages.appendChild(outputJson[computerChoice]);

  let resultDisplayForRound = document.createElement("h2");
  resultDisplayForRound.innerText = result;
  document.getElementById("sps-result").appendChild(resultDisplayForRound);
  if (result.localeCompare("WIN!!") == 0) {
    let scorePoints = parseInt(
      document.getElementById("score-num").textContent
    );
    scorePoints++;
    document.getElementById("score-num").innerHTML = scorePoints.toString();
  }
  setTimeout(function () {
    resetRPS(outputJson);
  }, 2000);
}

function clearImageDiv() {
  let divOfImages = document.getElementById("flex-box-sps");
  if (divOfImages.hasChildNodes()) {
    while (divOfImages.firstChild) {
      divOfImages.removeChild(divOfImages.firstChild);
    }
  }
}

function resetRPS(images) {
  clearImageDiv();
  let divOfImages = document.getElementById("flex-box-sps");
  divOfImages.appendChild(images["Rock"]);
  divOfImages.appendChild(images["Paper"]);
  divOfImages.appendChild(images["Scissors"]);
  document
    .getElementById("sps-result")
    .removeChild(document.getElementById("sps-result").childNodes[0]);
}
