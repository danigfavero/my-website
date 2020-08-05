let time = 0;
let wave = []; // circle -> wave function

let slider;

function setup() {
    createCanvas(600, 400);
    slider = createSlider(1, 10, 1);
}

function draw() {
    background(123);
    translate(150, 200); // 200px up, 200px down

    let x = 0;
    let y = 0;

    for (let i = 0; i < slider.value(); i++) {
        let prevx = x;
        let prevy = y;
        let n = i * 2 + 1;
        let radius = 70 * (4 / (n * PI));
        // cartesian -> polar coordinates
        x += radius *  cos(n * time);
        y += radius * sin(n * time);

        // circles:
        stroke(255, 100);
        noFill();
        ellipse(prevx, prevy, radius * 2); // ellipse(focus1, focus2, diameter)

        // lines:
        //fill(255);
        stroke(255);
        line(prevx, prevy, x, y);
        //ellipse(x, y, 8);

    }
    wave.unshift(y); // pushs in the end of array
    translate(200, 0);
    line(x - 200, y, 0, wave[0]);

    // the wave:
    beginShape();
    noFill();
    for (let i = 0; i < wave.length; i++) {
        vertex(i, wave[i]);
    }
    endShape();

    time += 0.05;

    if (wave.length > 250) { // delete the points we can't see
        wave.pop();
    }
}
