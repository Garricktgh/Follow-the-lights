//level counter
var lvlCount = 1;
//create player array
var player = [];
//create sequence array
var sequence = [];
//difficulty = 4
//normal, advance 6 panels, impossible 8 panels
var difficulty = 0;
//sequenceCount
var sequenceCount = 0;
//lightInterval for setInterval
var lightInterval;
var sequenceInterval;
//sound 
var sound = true;
//check to see if it is AI turn
var aI = true;
//check if player input is correct
var correct = true;
//enable player input
var clickEnabled = false;
//different game modes
var gameMode = 4;
var aISeq = [];

var startButton = document.getElementById("start");
var resetButton = document.getElementById("reset");
var levelDisplay = document.querySelector(".level");
var normalButton = document.getElementById("normal");
var advanceButton = document.getElementById("advance");
var masterButton = document.getElementById("master");

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
normalButton.addEventListener("click", setDifficulty);
advanceButton.addEventListener("click", setDifficulty);
masterButton.addEventListener("click", setDifficulty);

function setDifficulty(event) {
  startButton.style.visibility = "visible";
  resetButton.style.visibility = "visible";
  levelDisplay.style.visibility = "visible";
  normalButton.style.visibility = "hidden";
  advanceButton.style.visibility = "hidden";
  masterButton.style.visibility = "hidden";
  if (event.target.id === "normal") {
    difficulty = 4;
  } else if (event.target.id === "advance") {
    difficulty = 6;
  } else if (event.target.id === "master") {
    difficulty = 8;
  }
}

function startGame() {
  startButton.style.visibility = "hidden";
  levelDisplay.innerHTML = "Level : " + lvlCount;
  generatePanels();
  fillLightSequence();
  lightInterval = setInterval(gameHandler, 810);
}

//generate panels
function generatePanels () {
  var tempHolder = document.createElement("div");
  tempHolder.setAttribute("id", "tempHolder");
  for (var i = 1; i <= difficulty; i++) {
    var panel = document.createElement("div");
    panel.setAttribute("id", "pan-"+i);
    panel.classList.add("panel");
    if (gameMode === 1 || gameMode === 4) {
      panel.style.background = "darkblue";
    }
    //addEventlisteners to panels
    panel.addEventListener("click", lightUpPanel)
    tempHolder.appendChild(panel);
  }
  document.getElementById("panels").appendChild(tempHolder);
}

function resetGame() {
  startButton.style.visibility = "hidden";
  resetButton.style.visibility = "hidden";
  levelDisplay.style.visibility = "hidden";
  normalButton.style.visibility = "visible";
  advanceButton.style.visibility = "visible";
  masterButton.style.visibility = "visible";
  lvlCount = 1;
  levelDisplay.innerHTML = "-";
  aISeq = [];
  player = [];
  sequence = [];
  sequenceCount = 0;
  sound = true;
  aI = true;
  correct = true;
  clickEnabled = false;
  clearInterval(lightInterval);
  document.getElementById("panels").removeChild(document.getElementById("tempHolder"));
}

//handles starting and ending of automatic sequence
function gameHandler() {
  levelDisplay.innerHTML = "Level : " + lvlCount;
  if (sequenceCount === lvlCount) {
    clearInterval(lightInterval);
    aI = false;
    delayClickEnabled();
  }
  console.log("gameHand");
  if(aI) {
    sequenceInterval = setTimeout(runSequence, 800);
  } 
}

//run automatic sequence
function runSequence() {
  console.log("runSequence");
  lightsOff();
  if (sequence[sequenceCount] === 1) {
    one();
    aISeq.push(1);
  } else if (sequence[sequenceCount] === 2) {
    two();
    aISeq.push(2);
  } else if (sequence[sequenceCount] === 3) {
    three();
    aISeq.push(3);
  } else if (sequence[sequenceCount] === 4) {
    four();
    aISeq.push(4);
  } else if (sequence[sequenceCount] === 5) {
    five();
    aISeq.push(5);
  } else if (sequence[sequenceCount] === 6) {
    six();
    aISeq.push(6);
  } else if (sequence[sequenceCount] === 7) {
    seven();
    aISeq.push(7);
  } else if (sequence[sequenceCount] === 8) {
    eight();
    aISeq.push(8);
  }
  sequenceCount++;
}

//generate light sequence
function fillLightSequence() {
  for (var i = 1; i<= 20; i++) {
    //use math.random to generate sequence
    var lightSequence = Math.floor((Math.random() * difficulty) +1);
    sequence.push(lightSequence);
  }
  console.log(sequence);
}

//track user input
function lightUpPanel(event) {
  var panelClicked = event.target
  if (clickEnabled) {
    clickEnabled = false;
    if(panelClicked.id === "pan-1") { 
      player.push(1);
      match();
      one();
    } else if(panelClicked.id === "pan-2") { 
      player.push(2);
      match();
      two();
    } else if(panelClicked.id === "pan-3") { 
      player.push(3);
      match();
      three();
    } else if(panelClicked.id === "pan-4") { 
      player.push(4);
      match();
      four();
    } else if(panelClicked.id === "pan-5") { 
      player.push(5);
      match();
      five();
    } else if(panelClicked.id === "pan-6") { 
      player.push(6);
      match();
      six();
    } else if(panelClicked.id === "pan-7") { 
      player.push(7);
      match();
      seven();
    } else if(panelClicked.id === "pan-8") { 
      player.push(8);
      match();
      eight();
    }
  }
}

function match() {
  //if user input does not match sequence
  if (gameMode === 2 || gameMode === 4) {
    var rAIseq = aISeq.slice().reverse();
    if (player[player.length-1] !== rAIseq[player.length-1]) {
      correct = false;
      sound = false;
      matchOutcomes();
    } else if (player.length === 20 && correct) { //check for win condition
      winGame();
    } else {
      matchOutcomes();
    }
  } else {
      if (player[player.length-1] !== sequence[player.length-1]) {
      correct = false;
      sound = false;
      matchOutcomes();
    } else if (player.length === 20 && correct) { //check for win condition
      winGame();
    } else {
      matchOutcomes();
    }
  } 
}

//actions taken after matching
function matchOutcomes() {
  //if input is wrong
  if (correct === false) {
    player = [];
    aISeq = [];
    correct = true;
    setTimeout (reactivateAuto, 800);
  } else if (player.length < lvlCount) {  //if input is correct but haven't complete entering the sequence
    delayClickEnabled();
  } else if (lvlCount === player.length && correct) { //if player input sequence is correct and matches sequence
    aI = true;
    player = [];
    aISeq = [];
    correct = true;
    lvlCount ++;
    levelDisplay.innerHTML = "Level : " + lvlCount;
    sequenceCount = 0;
    lightInterval = setInterval(gameHandler, 810);
    console.log(sequenceCount);
    console.log(lvlCount);
  }
}

//re-run previous sequence
function reactivateAuto() {
  lightsAll();
  levelDisplay.innerHTML = "Wrong!";
  delayLightsOff();
  sequenceCount = 0;
  aI = true;
  sound = true;
  lightInterval = setInterval(gameHandler, 810);
}

//handles lights delay
function delayLightsOff() {
  setTimeout(lightsOff, 300);
}

//limits spam clicks
function delayClickEnabled() {
  setTimeout(enableClick, 600);
}

//enable user input
function enableClick() {
  clickEnabled = true;
}

//turn on all lights
function lightsAll() {
  if (gameMode === 1 || gameMode === 4) {
    document.getElementById("pan-1").style.background = "lightskyblue";
    document.getElementById("pan-2").style.background = "lightskyblue";
    document.getElementById("pan-3").style.background = "lightskyblue";
    document.getElementById("pan-4").style.background = "lightskyblue";
    if (difficulty === 6 || difficulty === 8) {
      document.getElementById("pan-5").style.background = "lightskyblue";
      document.getElementById("pan-6").style.background = "lightskyblue";
      if(difficulty === 8) {
        document.getElementById("pan-7").style.background = "lightskyblue";
        document.getElementById("pan-8").style.background = "lightskyblue";
      }
    }
  } else {
    document.getElementById("pan-1").style.background = "lightgreen";
    document.getElementById("pan-2").style.background = "tomato";
    document.getElementById("pan-3").style.background = "yellow";
    document.getElementById("pan-4").style.background = "lightskyblue";
    if (difficulty === 6 || difficulty === 8) {
      document.getElementById("pan-5").style.background = "aqua";
      document.getElementById("pan-6").style.background = "fuchsia";
      if(difficulty === 8) {
        document.getElementById("pan-7").style.background = "#ff8000";
        document.getElementById("pan-8").style.background = "#666699";
      }
    }
  }
}

//turn off lights
function lightsOff() {
  if (gameMode === 1 || gameMode === 4) {
    document.getElementById("pan-1").style.background = "darkblue";
    document.getElementById("pan-2").style.background = "darkblue";
    document.getElementById("pan-3").style.background = "darkblue";
    document.getElementById("pan-4").style.background = "darkblue";
    if (difficulty === 6 || difficulty === 8) {
      document.getElementById("pan-5").style.background = "darkblue";
      document.getElementById("pan-6").style.background = "darkblue";
      if (difficulty === 8) {
        document.getElementById("pan-7").style.background = "darkblue";
        document.getElementById("pan-8").style.background = "darkblue";
      }
    }
  } else {
    document.getElementById("pan-1").style.background = "darkgreen";
    document.getElementById("pan-2").style.background = "darkred";
    document.getElementById("pan-3").style.background = "goldenrod";
    document.getElementById("pan-4").style.background = "darkblue";
    if (difficulty === 6 || difficulty === 8) {
      document.getElementById("pan-5").style.background = "teal";
      document.getElementById("pan-6").style.background = "purple";
      if (difficulty === 8) {
        document.getElementById("pan-7").style.background = "#804000";
        document.getElementById("pan-8").style.background = "#33334d";
      }
    }
  }
}

//lights up panel one
function one() {
  if (gameMode === 1 || gameMode === 4) {
    document.getElementById("pan-1").style.background = "lightskyblue";
  } else { 
    document.getElementById("pan-1").style.background = "lightgreen";
  }
  if(sound) {
    var audio = document.getElementById("sound-1");
    audio.play();
  }
  delayLightsOff();
  console.log(player);
  
}

function two() {
  if (gameMode === 1 || gameMode === 4) {
    document.getElementById("pan-2").style.background = "lightskyblue";
  } else {
    document.getElementById("pan-2").style.background = "tomato";
  }
  if(sound) {
    var audio = document.getElementById("sound-2");
    audio.play();
  }
  delayLightsOff();
  console.log(player);
}

function three() {
  if (gameMode === 1 || gameMode === 4) {
    document.getElementById("pan-3").style.background = "lightskyblue";
  } else {
    document.getElementById("pan-3").style.background = "yellow";
  }
  if(sound) {
    var audio = document.getElementById("sound-3");
    audio.play();
  }
  delayLightsOff();
  console.log(player);
}

function four() {
    document.getElementById("pan-4").style.background = "lightskyblue"; 
    if(sound) {
    var audio = document.getElementById("sound-4");
    audio.play();
  }
  delayLightsOff();
  console.log(player);
}

function five() {
  if (gameMode === 1 || gameMode === 4) {
    document.getElementById("pan-5").style.background = "lightskyblue";
  } else {
    document.getElementById("pan-5").style.background = "aqua";
  }
  if(sound) {
    var audio = document.getElementById("sound-5");
    audio.play();
  }
  delayLightsOff();
  console.log(player);
 
}

function six() {
  if (gameMode === 1 || gameMode === 4) {
    document.getElementById("pan-6").style.background = "lightskyblue";
  } else {
    document.getElementById("pan-6").style.background = "fuchsia";
  }
  if(sound) {
    var audio = document.getElementById("sound-6");
    audio.play();
  }
  delayLightsOff();
  console.log(player);
}

function seven() {
  if (gameMode === 1 || gameMode === 4) {
    document.getElementById("pan-7").style.background = "lightskyblue";
  } else { 
    document.getElementById("pan-7").style.background = "#ff8000";
  }
  if(sound) {
    var audio = document.getElementById("sound-7");
    audio.play();
  }
  delayLightsOff();
  console.log(player);
}

function eight() {
  if (gameMode === 1 || gameMode === 4) {
    document.getElementById("pan-8").style.background = "lightskyblue";
  } else { 
    document.getElementById("pan-8").style.background = "#666699";
  }
  if(sound) {
    var audio = document.getElementById("sound-8");
    audio.play();
  }
  delayLightsOff();
  console.log(player);
}


function winGame() {
  levelDisplay.innerHTML = "Win!";
  clearInterval(lightInterval);
  console.log("clear all intervals");
  clearInterval(sequenceInterval);
  clickEnabled = false;
  aI = false;
  lightsAll();
}

