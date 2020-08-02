
// Terrain with Perlin Noise vars

var cols, rows;
var scl = 20;
var width = 1800;
var height = 1200;

var flying = 0;

var grid = [];

let img;

// title vars

var title = 'BEM-VINDX';


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  textAlign(CENTER, CENTER);

  cols = width / scl;
  rows = height / scl;

  for (var x = 0; x < cols; x++) {
    grid[x] = [];
    for (var y = 0; y < rows; y++) {
      grid[x][y] = 0; //specify a default value for now
    }
  }

  loadImage('greek.png', img => {
    image(img, 0, 0);
  });

  //image(img, 10, 10);
}

function draw() {
  // Perlin Noise properties
  flying -= 0.09;
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
  fill(22, 216, 145, 100);
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
  text('p5.js', CENTER, CENTER);
  fill(0, 102, 153, 51);
}
