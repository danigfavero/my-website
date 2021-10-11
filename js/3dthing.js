
// Terrain with Perlin Noise vars

var cols, rows;
var scl = 20;
var width = 1800;
var height = 1200;

var colr = [22, 216, 145, 100];
var sliderR, sliderG, sliderB;

var flying = 0;

var grid = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  cols = width / scl;
  rows = height / scl;

  for (var x = 0; x < cols; x++) {
    grid[x] = [];
    for (var y = 0; y < rows; y++) {
      grid[x][y] = 0; //specify a default value for now
    }
  }

  // color sliders
  sliderR = select('#r-slider');
  sliderG = select('#g-slider');
  sliderB = select('#b-slider');
}

function draw() {
  // color control
  colr[0] = sliderR.elt.value;
  colr[1] = sliderG.elt.value;
  colr[2] = sliderB.elt.value;

  // Perlin Noise properties
  flying -= 0.05;
  var yoff = flying;
  
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      grid[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.3;
    }
    yoff += 0.25;
  }

  // adjusting screen
  background(0);
  translate(0, 50);
  rotateX(PI/3);
  fill(colr[0], colr[1], colr[2], colr[3]);
  translate(-width/2, -height/2);

  // creates grid (triangle strip)
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, grid[x][y]);
      vertex(x*scl, (y+1)*scl, grid[x][y+1]);
    }
    endShape();
  }
}