let illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    zoom: 2,
    dragRotate: true,
});

// circle
new Zdog.Hemisphere({
addTo: illo,
diameter: 80,
translate: {z : -40},
stroke: 20,
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
    backface: '#000',
})

function animate() {
    illo.rotate.y += 0.03;
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}

animate();