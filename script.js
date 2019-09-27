//level counter
var lvlCount = 1;
//create player array
var player = [];
//create sequence array
var sequence = [];
//difficulty = 4
//normal, advance 6 panels, impossible 8 panels
var difficulty = 4;
//sequenceCount
var sequenceCount = 0;
//lightInterval for setInterval
var lightInterval;
//sound 
var sound = true;
//check to see if it is AI turn
var aI = true;
var correct = true;
var win = false;
var clickEnabled = false;

var startButton = document.getElementById("start");
var resetButton = document.getElementById("reset");

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.style.visibility = "hidden";
  generatePanels();
  fillLightSequence();
  lightInterval = setInterval(gameHandler, 1000);
}

function gameHandler() {
  console.log("seqCount" + sequenceCount);
  console.log("lvl"+ lvlCount);
  if (sequenceCount === lvlCount) {
    clearInterval(lightInterval);
    aI = false;
    delayClickEnabled();
  }
  
  if(aI === true) {
    console.log("gameHand");
    setTimeout(runSequence, 800);
  } 
}

//run automatic sequence
function runSequence() {
  console.log("runSequence");
  lightsOff();
  if (sequence[sequenceCount] === 1) {
    one();
  } else if (sequence[sequenceCount] === 2) {
    two();
  } else if (sequence[sequenceCount] === 3) {
    three();
  } else if (sequence[sequenceCount] === 4) {
    four();
  }
  sequenceCount++;
}

//generate panels
function generatePanels () {
  for (var i = 1; i <= difficulty; i++) {
    var panel = document.createElement("div");
    panel.setAttribute("id", "pan-"+i);
    //addEventlisteners to panels
    panel.addEventListener("click", lightUpPanel)
    document.getElementById("panels").appendChild(panel);
  }
}

//generate light sequence
function fillLightSequence() {
  for (var i = 1; i<= 20; i++) {
    //use math.random to generate sequences
    var lightSequence = Math.floor((Math.random() * difficulty) +1);
    sequence.push(lightSequence);
  }
  console.log(sequence);
}

//track user input
function lightUpPanel(event) {
  var panelClicked = event.target
  if (clickEnabled === true) {
    if(panelClicked.id === "pan-1") { 
      clickEnabled = false;
      player.push(1);
      match();
      one();
    } else if(panelClicked.id === "pan-2") { 
      clickEnabled = false;
      player.push(2);
      match();
      two();
    } else if(panelClicked.id === "pan-3") { 
      clickEnabled = false;
      player.push(3);
      match();
      three();
    } else if(panelClicked.id === "pan-4") { 
      clickEnabled = false;
      player.push(4);
      match();
      four();
    }
  }
}

function match() {
  //if user input does not match sequence
  if (player[player.length-1] !== sequence[player.length-1]) {
    correct = false;
    sound = false;
  }
  //if input is wrong
  if (correct === false) {
    player = [];
    correct = true;
    setTimeout (reactivateAuto, 800);
  } else if (player.length < lvlCount) {
    delayClickEnabled();
  } if (lvlCount === player.length && correct === true) {
    console.log("moving on");
    aI = true;
    player = [];
    correct = true;
    lvlCount ++;
    sequenceCount = 0;
    lightInterval = setInterval(gameHandler, 1000);
    console.log(sequenceCount);
    console.log(lvlCount);
    console.log(sequence);
  }

  // if (win === 3 && correct) {
  //   winGame();
  // }
}

function reactivateAuto() {
  lightsAll();
  delayLightsOff();
  //re-run previous sequence
  sequenceCount = 0;
  aI = true;
  sound = true;
  lightInterval = setInterval(gameHandler, 1000);
}

//handles lights delay
function delayLightsOff() {
  setTimeout(lightsOff, 300);
}

//limits spam clicks
function delayClickEnabled() {
  setTimeout(enableClick, 800);
}

//enable user input
function enableClick() {
  clickEnabled = true;
}

function lightsAll() {
  document.getElementById("pan-1").style.background = "lightgreen";
  document.getElementById("pan-2").style.background = "tomato";
  document.getElementById("pan-3").style.background = "yellow";
  document.getElementById("pan-4").style.background = "lightskyblue";
}

//turn off lights
function lightsOff() {
  document.getElementById("pan-1").style.background = "darkgreen";
  document.getElementById("pan-2").style.background = "darkred";
  document.getElementById("pan-3").style.background = "goldenrod";
  document.getElementById("pan-4").style.background = "darkblue";
}

function one() {
  document.getElementById("pan-1").style.background = "lightgreen"; 
    if(sound) {
      var audio = document.getElementById("sound-1");
      audio.play();
    }
  delayLightsOff();
  console.log(player);
}

function two() {
  document.getElementById("pan-2").style.background = "tomato"; 
  if(sound) {
    var audio = document.getElementById("sound-2");
    audio.play();
  }
  delayLightsOff();
  console.log(player);
}

function three() {
  document.getElementById("pan-3").style.background = "yellow"; 
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


