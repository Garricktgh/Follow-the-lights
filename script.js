//make the entire code an annon function, using Immediately Invoked Function Expressions (IIFE)
(function(){
  //level counter
  var lvlCount = 1;
  //create player array
  var player = [];
  //create sequence array
  var sequence = [];
  //normal, advance 6 panels, impossible 8 panels
  var difficulty = 0;
  //sequenceCount
  var sequenceCount = 0;
  //lightInterval for setInterval
  var lightInterval;
  //sound 
  var sound = true;
  //check to see if it is AI turn
  var aI = true;
  //check if player input is correct
  var correct = true;
  //enable player input
  var clickEnabled = false;
  //different game modes
  var gameMode = 0;
  //aiSeq for reverse mode
  var aISeq = [];

  //objects for panel colors
  var colors = {
    1 : {
      "off":"darkgreen",
      "on": "lightgreen" 
    },
    2 : {
      "off":"darkred",
      "on": "tomato" 
    },
    3 : {
      "off":"goldenrod",
      "on": "yellow" 
    },
    4 : {
      "off":"darkblue",
      "on": "lightskyblue" 
    },
    5 : {
      "off":"teal",
      "on": "aqua" 
    },
    6 : {
      "off":"purple",
      "on": "fuchsia" 
    },
    7 : {
      "off":"#804000",
      "on": "#ff8000" 
    },
    8 : {
      "off":"#33334d",
      "on": "#666699" 
    }
  }

  var startButton = document.getElementById("start");
  var menuButton = document.getElementById("menu");
  var levelDisplay = document.querySelector(".level");
  var normalButton = document.getElementById("normal");
  var advanceButton = document.getElementById("advance");
  var masterButton = document.getElementById("master");
  var originalButton = document.getElementById("original");
  var colorlessButton = document.getElementById("colorless");
  var reverseButton = document.getElementById("reverse");
  var cRButton = document.getElementById("cR");
  var backButton1 = document.getElementById("back1");
  var backButton2 = document.getElementById("back2");
  var backButton3 = document.getElementById("back3");
  var backButton4 = document.getElementById("back4");

  startButton.addEventListener("click", startGame);
  menuButton.addEventListener("click", resetGame);
  normalButton.addEventListener("click", setDifficulty);
  advanceButton.addEventListener("click", setDifficulty);
  masterButton.addEventListener("click", setDifficulty);
  originalButton.addEventListener("click", pickMode);
  colorlessButton.addEventListener("click", pickMode);
  reverseButton.addEventListener("click", pickMode);
  cRButton.addEventListener("click", pickMode);
  backButton1.addEventListener("click", resetGame);
  backButton2.addEventListener("click", resetGame);
  backButton3.addEventListener("click", setDifficulty);
  backButton4.addEventListener("click", resetGame);


  function pickMode(event) {
    startButton.style.display = "none";
    menuButton.style.display = "none";
    levelDisplay.style.display = "none";
    backButton1.style.display = "none";
    originalButton.style.display = "none";
    colorlessButton.style.display = "none";
    reverseButton.style.display = "none";
    cRButton.style.display = "none";
    normalButton.style.display = "inline";
    advanceButton.style.display = "inline";
    masterButton.style.display = "inline";
    backButton2.style.display = "none";
    backButton1.style.display = "inline";
    backButton3.style.display = "none";
    backButton4.style.display = "none";

    if (event.target.id === "original") {
      gameMode = 0;
    } else if (event.target.id === "colorless") {
      gameMode = 1;
    } else if (event.target.id === "reverse") {
      gameMode = 2;
    } else if (event.target.id === "cR") {
      gameMode = 3;
    }
  }
  
  function setDifficulty(event) {
    originalButton.style.display = "none";
    colorlessButton.style.display = "none";
    reverseButton.style.display = "none";
    cRButton.style.display = "none";
    backButton1.style.display = "none";
    backButton2.style.display = "inline";
    backButton3.style.display = "none";
    backButton4.style.display = "none";
    startButton.style.display = "inline";
    menuButton.style.display = "none";
    levelDisplay.style.display = "none";
    normalButton.style.display = "none";
    advanceButton.style.display = "none";
    masterButton.style.display = "none";
   
    if (event.target.id === "normal") {
      difficulty = 4;
    } else if (event.target.id === "advance") {
      difficulty = 6;
    } else if (event.target.id === "master") {
      difficulty = 8;
    }
  }

  function startGame() {
    document.querySelector(".run").style.display = "none";
    document.querySelector(".lights").style.display = "none";
    startButton.style.display = "none";
    backButton2.style.display = "none";
    backButton4.style.display = "inline";
    menuButton.style.display = "inline";
    levelDisplay.style.display = "inline-block";
    levelDisplay.innerHTML = "Level : " + lvlCount;
    generatePanels();
    fillLightSequence();
    lightInterval = setInterval(gameHandler, 800);
  }

  //generate panels
  function generatePanels () {
    var tempHolder = document.createElement("div");
    tempHolder.setAttribute("id", "tempHolder");
    for (var i = 1; i <= difficulty; i++) {
      var panel = document.createElement("div");
      panel.setAttribute("id", "pan-"+i);
      panel.classList.add("panel");
      if (gameMode === 1 || gameMode === 3) {
        panel.style.background = "dimgray";
      }
      //addEventlisteners to panels
      panel.addEventListener("click", lightUpPanel)
      tempHolder.appendChild(panel);
    }
    document.getElementById("panels").appendChild(tempHolder);
  }

  //reset game and show different buttons based on button pressed
  function resetGame(event) {
    if (event.target.id === "back1" || event.target.id === "menu") {
      document.querySelector(".run").style.display = "flex";
      document.querySelector(".lights").style.display = "flex";
      backButton1.style.display = "none";
      startButton.style.display = "none";
      normalButton.style.display = "none";
      advanceButton.style.display = "none";
      masterButton.style.display = "none";
      originalButton.style.display = "inline";
      colorlessButton.style.display = "inline";
      reverseButton.style.display = "inline";
      cRButton.style.display = "inline";
    } else if (event.target.id === "back2") {
      backButton1.style.display = "inline";
      backButton2.style.display = "none";
      startButton.style.display = "none";
      normalButton.style.display = "inline";
      advanceButton.style.display = "inline";
      masterButton.style.display = "inline";
      originalButton.style.display = "none";
      colorlessButton.style.display = "none";
      reverseButton.style.display = "none";
      cRButton.style.display = "none";
    } else if (event.target.id === "back4") {
      backButton4.style.display = "none";
      backButton2.style.display = "inline";
      startButton.style.display = "inline";
      normalButton.style.display = "none";
      advanceButton.style.display = "none";
      masterButton.style.display = "none";
      originalButton.style.display = "none";
      colorlessButton.style.display = "none";
      reverseButton.style.display = "none";
      cRButton.style.display = "none";
    }
    document.querySelector(".run").style.display = "flex";
    document.querySelector(".lights").style.display = "flex";
    backButton3.style.display = "none";
    levelDisplay.style.display = "none";
    menuButton.style.display = "none";
    levelDisplay.style.display = "none";
    lvlCount = 1;
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
    if(aI) {
      //timeout to put delay at the start of the ai turn instead of the player's turn
      setTimeout(runSequence, 750);
    } 
  }

  //run automatic sequence
  function runSequence() {
    lightsOff();
    if (sequence[sequenceCount] === 1) {
      onePanel(1);
      aISeq.push(1);
    } else if (sequence[sequenceCount] === 2) {
      onePanel(2);
      aISeq.push(2);
    } else if (sequence[sequenceCount] === 3) {
      onePanel(3);
      aISeq.push(3);
    } else if (sequence[sequenceCount] === 4) {
      onePanel(4);
      aISeq.push(4);
    } else if (sequence[sequenceCount] === 5) {
      onePanel(5);
      aISeq.push(5);
    } else if (sequence[sequenceCount] === 6) {
      onePanel(6);
      aISeq.push(6);
    } else if (sequence[sequenceCount] === 7) {
      onePanel(7);
      aISeq.push(7);
    } else if (sequence[sequenceCount] === 8) {
      onePanel(8);
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
  }

  //track user input
  function lightUpPanel(event) {
    var panelClicked = event.target
    if (clickEnabled) {
      clickEnabled = false;
      if(panelClicked.id === "pan-1") { 
        player.push(1);
        match();
        onePanel(1);
      } else if(panelClicked.id === "pan-2") { 
        player.push(2);
        match();
        onePanel(2);
      } else if(panelClicked.id === "pan-3") { 
        player.push(3);
        match();
        onePanel(3);
      } else if(panelClicked.id === "pan-4") { 
        player.push(4);
        match();
        onePanel(4);
      } else if(panelClicked.id === "pan-5") { 
        player.push(5);
        match();
        onePanel(5);
      } else if(panelClicked.id === "pan-6") { 
        player.push(6);
        match();
        onePanel(6);
      } else if(panelClicked.id === "pan-7") { 
        player.push(7);
        match();
        onePanel(7);
      } else if(panelClicked.id === "pan-8") { 
        player.push(8);
        match();
        onePanel(8);
      }
    }
  }

  function match() {
  //if user input does not match sequence
    if (gameMode === 2 || gameMode === 3) {
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
      lightInterval = setInterval(gameHandler, 800);
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
    lightInterval = setInterval(gameHandler, 800);
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
    if (gameMode === 1 || gameMode === 3) {
      for (var i = 1; i <= difficulty; i++){
        document.getElementById("pan-"+i).style.background = "floralwhite";
      }
    } else {
      for (var i = 1; i <= difficulty; i++){
        document.getElementById("pan-"+i).style.background = colors[i].on;
      }
    }
  }

  //turn off lights
  function lightsOff() {
    if (gameMode === 1 || gameMode === 3) {
      for (var i = 1; i <= difficulty; i++){
        document.getElementById("pan-"+i).style.background = "dimgrey";
      }
    } else {
      for (var i = 1; i <= difficulty; i++){
        document.getElementById("pan-"+i).style.background = colors[i].off;
      }
    }
  }

  //lights up one panel
  function onePanel(panel) {
    if (gameMode === 1 || gameMode === 3) {
        document.getElementById("pan-"+panel).style.background = "floralwhite";
    } else {
      document.getElementById("pan-"+panel).style.background = colors[panel].on;
    }

    if (sound) {
      var audio = document.getElementById("sound-"+panel);
      audio.play();
    }
    delayLightsOff();
  }

  function winGame() {
    levelDisplay.innerHTML = "Win!";
    clearInterval(lightInterval);
    clickEnabled = false;
    aI = false;
    lightsAll();
  }

})()
