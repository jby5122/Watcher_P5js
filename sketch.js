/*
Welcome to make any fun interactive creative coding with Watcher.
You can connect Watcher to your code with http to your PC
then trigger your creative coding.

----- Fireworks Tutorial by Patt Vira ----- 
Name: Fireworks
Video Tutorial: https://youtu.be/YPKidHmretc
----------------------------------------
*/
let socket;

let gravity; 
let startHeight;
let fireworks = [];
let colors = [];

let font;

let fsButton;
let bgImage;

function preload() {
  font = loadFont('Montserrat-Medium.otf'); // Load your desired font
  bgImage = loadImage('backgroundImage/night6.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create a button to toggle full screen
  fsButton = createButton('Fullscreen');
  fsButton.position(10, 10);
  fsButton.mousePressed(toggleFullScreen);

  gravity = createVector(0, 0.15);
  colors = ["#ff99c8","#fcf6bd","#d0f4de","#a9def9","#e4c1f9", "#FFDACC"];

  // create WebSocket connection
  socket = new WebSocket('ws://127.0.0.1:3000');

}

function draw() {
  background(bgImage);

  // monitoring server message from watcher
  socket.onmessage = (event) => {
    let data = JSON.parse(event.data);
    // console.log('message from server:', data);
    // console.log(data.content.events.text);

    //here, if the alert message from watchere is play fireworks,
    //then perform certain animation
    if (data && data.content.events.text == "play fireworks") {
      // console.log("fireworks~")
      triggerFireworks();
    }
  };

  for (let i=fireworks.length-1; i>=0; i--) {
    fireworks[i].update();
    fireworks[i].display();
    
    if (fireworks[i].done) {
      fireworks.splice(i, 1);
    }
  }
}

function triggerFireworks() {
  let words = ["Hello", "Watcher", "Seeed Studio", "SenseCAP"];
  let word = random(words);
  console.log(word);
  startHeight = random(windowHeight*5/6, windowHeight);
  for(i = 0; i < 1; i++){
    fireworks.push(new TextFirework(random(windowWidth/3-50, windowWidth/3+50), startHeight, word));
    // startHeight +=200;
  }

  let backgroundFireworks = random(2,4)
  for(i = 0; i < backgroundFireworks; i++){
    fireworks.push(new Firework(random(windowWidth/6, windowWidth/3), startHeight));
  }

  for(i = 0; i < backgroundFireworks; i++){
    fireworks.push(new Firework(random(windowWidth*5/6, windowWidth*2/3), startHeight));
  }
  
  for (let i=fireworks.length-1; i>=0; i--) {
    fireworks[i].update();
    fireworks[i].display();
    
    if (fireworks[i].done) {
      fireworks.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function toggleFullScreen() {
  let fs = fullscreen();
  fullscreen(!fs); // Toggle full-screen mode
}