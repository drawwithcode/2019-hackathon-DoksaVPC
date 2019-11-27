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
var circleShape;
var allBassShapes = [];
var allMidShapes = [];

function preload() {
  bumper = loadSound("./assets/TG1_new.mp3");
}

function setup() {
  canv = createCanvas(windowWidth, windowHeight);
  a = width / 100;
  ellipseMode(CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);
  playButton = createButton('PLAY');
  playButton.style('display', 'none');
  playButton.position(windowWidth / 2 - 100, windowHeight / 2);
  circleShape = new Circle();
  for (i = 0; i < 3; i++){
    var bassShape = new BassShape(i * 120);
    allBassShapes.push(bassShape);
  }
  for (i = 0; i < 6; i++){
    var midShape = new MidShape(i * 60);
    allMidShapes.push(midShape);
  }
  bassShape = new BassShape();
  analyzer = new p5.Amplitude();
  analyzer.setInput(bumper);
  fft = new p5.FFT();
  fft.setInput(bumper);
}

function draw() {
  background(20);
  a = width / 100;
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);
  var spectrum = fft.analyze();
  bass = fft.getEnergy('bass');
  mid = fft.getEnergy('mid');
  treble = fft.getEnergy('treble');
  playButton.position(windowWidth / 2 - 100, windowHeight / 2);
  playButton.mousePressed(playSong);
  if (bumper.isPlaying() === true) {
    playButton.style('display', 'none');
    circleShape.display();
    for (var i = 0; i < 3; i++){
      allBassShapes[i].display();
    }
    for (var i = 0; i < 6; i++){
      allMidShapes[i].display();
    }
  } else {
    playButton.style('display', 'block');
  }
}

function Circle() {
  this.opacity = 255;

  this.display = function() {
    push();
    noFill();
    strokeWeight(1);
    stroke(255, 255, 255, this.opacity);
    ellipse(width / 2, height / 2, volume);
    pop();
    this.opacity = volume*2;
  }

}

function BassShape(_offset) {
  this.opacity = 255;
  this.rotation = _offset;

  this.display = function() {
    push();
    noFill();
    translate(width/2,height/2);
    rotate(this.rotation);
    strokeWeight(1);
    stroke(255, 255, 255, this.opacity);
    rect(bass*2, bass*2, bass/5, bass/5);
    pop();
    this.opacity = bass * 1.5;
    this.rotation += bass * 0.1;
  }

}

function MidShape(_offset) {
  this.opacity = 255;
  this.rotation = _offset;

  this.display = function() {
    push();
    noFill();
    translate(width/2,height/2);
    rotate(this.rotation);
    strokeWeight(1);
    stroke(255, 255, 255, this.opacity);
    rect(treble*2, treble*2, treble/5, treble/5);
    pop();
    this.opacity = mid * 1.5;
    this.rotation += mid * 0.1;
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
