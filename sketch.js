var bumper;
var analyzer;
var volume;
var fft;
var bass;
var lowMid;
var mid;
var hiMid;
var treble;
var playButton;
var canv;
var a;
var shape;

function preload() {
  bumper = loadSound("./assets/TG1_new.mp3");
}

function setup() {
  canv = createCanvas(windowWidth, windowHeight);
  a = width / 100;
  ellipseMode(CENTER);
  rectMode(CENTER);
  playButton = createButton('PLAY');
  playButton.style('display', 'none');
  playButton.style('border-radius', '100px');
  playButton.style('background-color', 'rgb(60, 60, 60)');
  playButton.style('color', 'rgb(230, 230, 230)');
  playButton.style('padding', '12px 0px');
  playButton.style('width', '200px');
  playButton.style('border-style', 'none');
  playButton.style('font-size', '20pt');
  playButton.position(windowWidth / 2 - 100, windowHeight / 2);
  shape = new Shape();
  analyzer = new p5.Amplitude();
  analyzer.setInput(bumper);
  fft = new p5.FFT();
  fft.setInput(bumper);
}

function draw() {
  background(20);
  a = width / 100;
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height / 2);
  var spectrum = fft.analyze();
  bass = fft.getEnergy('bass');
  lowMid = fft.getEnergy('lowMid');
  mid = fft.getEnergy('mid');
  hiMid = fft.getEnergy('highMid');
  treble = fft.getEnergy('treble');
  playButton.position(windowWidth / 2 - 100, windowHeight / 2);
  playButton.mousePressed(playSong);
  if (bumper.isPlaying() === true) {
    playButton.style('display', 'none');
    shape.display();
  } else {
    playButton.style('display', 'block');
  }
}

function Shape() {
  this.opacity = 255;

  this.display = function() {
    push();
    noFill();
    strokeWeight(1);
    stroke(255, 255, 255, this.opacity);
    rect(width / 2, height / 2, volume, volume);
    pop();
    this.opacity -= 0.5;
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function playSong() {
  if (bumper.isPlaying() === false) {
    bumper.play();
  }
}
