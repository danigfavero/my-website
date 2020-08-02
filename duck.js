PI = Math.PI;

let illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    zoom: 3,
    dragRotate: true,
});

// circle
new Zdog.Shape({
addTo: illo,
stroke: 60,
translate: {z : -20},
fill: true,
color: '#C9C232',
});

// cone
new Zdog.Cone({
    addTo: illo,
    diameter: 20,
    length: 30,
    stroke: false,
    color: '#E69112',
    backface: '#000000',
});

// left eye
let eye = new Zdog.Ellipse({
    addTo: illo,
    diameter: 5,
    quarters: 2,
    stroke: 2,
    color: '#000000',
    translate: { x : 15, y : - 10 },
    rotate: { x : PI/6, y : -PI/7, z : PI/2},
});

// right eye
eye.copy({
    rotate: { x : PI/6, y : PI/7, z : PI/2},
    translate : { x : -15, y : - 10 },
})

// monocle
var monocle = new Zdog.Group({
    addTo: illo,
    translate: { x : 15, y : - 10, z : 5},
})

// monocle frame
new Zdog.Ellipse({
    addTo: monocle,
    diameter: 15,
    color: '#093F96',
});

// monocle string
new Zdog.Shape({
    addTo: monocle,
    path: [
        { x: 7.5, y: 0 },
        { bezier: [
        { x:  20, y: 0 },
        { x:  20, y:  60 },
        { x:  14, y:  15, z: -20 },
        ]},
    ],
    closed: false,
    color: '#404040',
})

// hat
var topHat = new Zdog.Group({
    addTo: illo,
    rotate: { x : PI/2 },
    translate: { y : -50, z : -20 },
})

// hat flap
new Zdog.Cylinder({
    addTo: topHat,
    diameter: 60,
    translate: { z : -17.5 },
    color: '#1f1f1f',
    backface: '#020202',
})

// hat body
new Zdog.Cylinder({
    addTo: topHat,
    diameter: 40,
    length: 35,
    stroke: false,
    color: '#1F1F1F',
    backface: '#020202',
})

// hat stripe
new Zdog.Cylinder({
    addTo: topHat,
    diameter: 40,
    length: 7,
    translate: { z : -13 },
    stroke: false,
    color: '#B82C2C',
    backface: '#1F1F1F'
})

function animate() {
    illo.rotate.y += 0.03;
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}

animate();
