//create basic game functions
//level counter
var lvlCounter;
//create player array
var player = []
//create sequence array
var sequence = []
//difficulty = 4
//normal, advance 6 panels, impossible 8 panels
var difficulty = 4
//sequenceCount
var sequenceCount = 0;
//lightInterval for setInterval
var lightInterval;
//sound 
var sound = true;
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
    var lightSequence = Math.floor((Math.random() * 4) +1);
    sequence.push(lightSequence);
  }
  console.log(sequence);
}

function lightUpPanel(event) {
  var panelClicked = event.target
  if (clickEnabled === true) {
    if(panelClicked.id === "pan-1") { 
      clickEnabled = false;
      one();
    } else if(panelClicked.id === "pan-2") { 
      clickEnabled = false;
      two();
    } else if(panelClicked.id === "pan-3") { 
      clickEnabled = false;
      three();
    } else if(panelClicked.id === "pan-4") { 
      clickEnabled = false;
      four();;
    }
  }
}

//handles delay
function delayDuration() {
  setTimeout(lightsOff, 300);
  setTimeout(enableClick, 800);
}

//enable user input
function enableClick() {
  clickEnabled = true;
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
      var audio = document.getElementById("sound-5");
      audio.play();
    }
  delayDuration();
  player.push(1);
  console.log(player);
}

function two() {
  document.getElementById("pan-2").style.background = "tomato"; 
  if(sound) {
    var audio = document.getElementById("sound-6");
    audio.play();
  }
  delayDuration();
  player.push(2);
  console.log(player);
}

function three() {
  document.getElementById("pan-3").style.background = "yellow"; 
  if(sound) {
    var audio = document.getElementById("sound-7");
    audio.play();
  }
  delayDuration();
  player.push(3);
  console.log(player);
}

function four() {
  document.getElementById("pan-4").style.background = "lightskyblue"; 
  if(sound) {
    var audio = document.getElementById("sound-8");
    audio.play();
  }
  delayDuration();
  player.push(4);
  console.log(player);
}



//create variable difficulty key to access objects library for 3 different difficulty 
//use math.random to generate sequences