PI = Math.PI;

let illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    zoom: 6,
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

let eye = new Zdog.Ellipse({
    addTo: illo,
    diameter: 5,
    quarters: 2,
    stroke: 2,
    color: '#000000',
    translate: { x : 15, y : - 10 },
    rotate: { x : PI/6, y : -PI/7, z : PI/2},
});

eye.copy({
    rotate: { x : PI/6, y : PI/7, z : PI/2},
    translate : { x : -15, y : - 10 },
})

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

function animate() {
    //illo.rotate.y += 0.03;
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}

animate();