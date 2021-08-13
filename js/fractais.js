/* ==================================================
    fractais.js

    Nome: Daniela Gonzalez Favero
    NUSP: 10277443

    Ao preencher esse cabeçalho com o meu nome e o meu número USP,
    declaro que todas as partes originais desse exercício programa (EP)
    foram desenvolvidas e implementadas por mim e que portanto não 
    constituem desonestidade acadêmica ou plágio.
    Declaro também que sou responsável por todas as cópias desse
    programa e que não distribui ou facilitei a sua distribuição.
    Estou ciente que os casos de plágio e desonestidade acadêmica
    serão tratados segundo os critérios divulgados na página da 
    disciplina.
    Entendo que EPs sem assinatura devem receber nota zero e, ainda
    assim, poderão ser punidos por desonestidade acadêmica.

    Abaixo descreva qualquer ajuda que você recebeu para fazer este
    EP.  Inclua qualquer ajuda recebida por pessoas (inclusive
    monitores e colegas). Com exceção de material da disciplina, caso
    você tenha utilizado alguma informação, trecho de código,...
    indique esse fato abaixo para que o seu programa não seja
    considerado plágio ou irregular.

    Exemplo:

        A minha função quicksort() foi baseada na descrição encontrada na 
        página https://www.ime.usp.br/~pf/algoritmos/aulas/quick.html.

    Descrição de ajuda ou indicação de fonte:



================================================== */

// Você pode usar essas constantes se desejar

const DEBUG = true;
const ITERATIONS = 100;
const DELTA = 4;
const SHIFT = 16;  // código ASCII da tecla

// Condições iniciais de Julia e Mandelbrot
const CX = -0.62, CY = -0.44;

const JULIA_L = -1.5;
const JULIA_B = -1.5;
const JULIA_R =  1.5;
const JULIA_T =  1.5;

const MANDEL_L = -2.2;
const MANDEL_B = -1.5;
const MANDEL_R =  0.8;
const MANDEL_T =  1.5;

// Veja uma lista de cores em: 
// https://www.w3schools.com/tags/ref_colornames.asp
const CORES = [
    'black', 'magenta', 'red',
    'orange', 'yellow', 'yellowgreen',
    'green', 'blue', 'purple'
];

const NCORES = CORES.length;

// Variáveis globais
var gCanvas, gWidth, gHeight, gCtx;

// outras variáveis se desejar
var reseted = true; // evita calcular tudo de novo quando já estiver reseted
var [xMouseDown, yMouseDown] = [0, 0]; // para o retângulo

const R = 82; // código ASCII da tecla

var mandelLeft = MANDEL_L;
var mandelBottom = MANDEL_B;
var mandelRight =  MANDEL_R;
var mandelTop =  MANDEL_T;

/*
    função main
*/
function main() {

    gCanvas = document.querySelector('#fractais_canvas');
    gWidth = gCanvas.width;
    gHeight = gCanvas.height/2;
    gCtx = gCanvas.getContext('2d');

    msg = `Canvas tem tamanho ${gWidth} x ${2*gHeight}`;
    console.log( msg );

    // RESTO DA SUA FUNÇÃO MAIN
    
    mandelbrotWindow();
    juliaFatouWindow();

    document.addEventListener('keydown', e => keyDown(e));
    gCanvas.addEventListener('mousedown', e => mouseDown(e));
    gCanvas.addEventListener('mouseup', e => mouseUp(e));
}

// outras funções

// auxiliares
function map(number, xMin, xMax, yMin, outMax) {
    return (number - xMin) * (outMax - yMin) / (xMax - xMin) + yMin;
}

function isInMandelbrotWindow(x, y) {
    return x >= 0 && x < gWidth && y >= 0 & y < gHeight;
}

// pixel-wise fractais
function juliaFatouPixel(a, b, cx=CX, cy=CY) {
    let iteration = 0;

    while (a*a + b*b < DELTA && iteration < ITERATIONS) {
        let real = a*a - b*b;
        let imaginary = 2*a*b;
        a = real + cx;
        b = imaginary + cy;

        iteration++;
    }

    if (iteration === ITERATIONS) {
        return CORES[1];
    } else {
        return CORES[0];
    }
}

function mandelbrotPixel(a, b) {
    let iteration = 0;

    let a0 = a;
    let b0 = b;

    while (a*a + b*b < DELTA && iteration < ITERATIONS) {
        let real = a*a - b*b;
        let imaginary = 2*a*b;
        a = real + a0;
        b = imaginary + b0;

        iteration++;
    }

    if (iteration === ITERATIONS) {
        iteration = 0;
    }
    return CORES[iteration % NCORES];
}

// window-wise fractais
function juliaFatouWindow(cx=CX, cy=CY) {
    if (DEBUG)
        console.log("juliaFatouWindow(", cx, cy, ")");

    for (let x = 0; x < gWidth; x++) {
        for (let y = gHeight; y < gHeight*2; y++) {
            let a = map(x, 0, gWidth, JULIA_L, JULIA_R);
            let b = map(y, gHeight, gHeight*2, JULIA_B, JULIA_T);

            gCtx.fillStyle = juliaFatouPixel(a, b, cx, cy);
            gCtx.fillRect(x, y, 1, 1);
        }
    }
}

function mandelbrotWindow() {
    if (DEBUG)
        console.log("mandelbrotWindow(): ", mandelLeft, mandelRight, mandelTop, mandelBottom);

    for (let x = 0; x < gWidth; x++) {
        for (let y = 0; y < gHeight; y++) {
            let a = map(x, 0, gWidth, mandelLeft, mandelRight);
            let b = map(y, 0, gHeight, mandelBottom, mandelTop);

            gCtx.fillStyle = mandelbrotPixel(a, b);
            gCtx.fillRect(x, y, 1, 1);
        }
    }
}

// operações definidas pela UI
function setNewCForJuliaFatou(x, y) {
    let cx = map(x, 0, gWidth, mandelLeft, mandelRight);
    let cy = map(y, 0, gHeight, mandelBottom, mandelTop);

    juliaFatouWindow(cx, cy);
}

function rectangleSelectionForMandelbrot(x0, xn, y0, yn) {
    if (x0 > xn) {
        let tmp = x0;
        x0 = xn;
        xn = tmp;
    }
    if (y0 > yn) {
        let tmp = y0;
        y0 = yn;
        yn = tmp;
    }

    let tmp = map(x0, 0, gWidth, mandelLeft, mandelRight);
    let tmp2 = map(yn, 0, gHeight, mandelBottom, mandelTop);
    mandelRight =  map(xn, 0, gWidth, mandelLeft, mandelRight);
    mandelTop =  map(y0, 0, gHeight, mandelBottom, mandelTop);

    mandelLeft = tmp;
    mandelBottom = tmp2;

    mandelbrotWindow();
}

// UI
function keyDown(e) {
    if (e.keyCode == R && !reseted) { // reset
        mandelLeft = MANDEL_L;
        mandelBottom = MANDEL_B;
        mandelRight =  MANDEL_R;
        mandelTop =  MANDEL_T;

        mandelbrotWindow();
        juliaFatouWindow();
        reseted = true;
    }
}

function mouseDown(e) {
    let [x, y] = [e.offsetX, e.offsetY];
    if (!isInMandelbrotWindow(x, y)) return;

    if (e.shiftKey) {
        if (DEBUG) console.log("down", x, y);
        [xMouseDown, yMouseDown] = [x, y];

    } else {
        if (DEBUG) console.log("ponto", x, y);
        setNewCForJuliaFatou(x, y);
        reseted = false;
    }
}

function mouseUp(e) {
    let [x, y] = [e.offsetX, e.offsetY];
    if (!isInMandelbrotWindow(x, y)) return;

    if (e.shiftKey) {
        if (DEBUG) {
            console.log("Ini", xMouseDown, yMouseDown);
            console.log("up", x, y);
        }
        rectangleSelectionForMandelbrot(xMouseDown, x, yMouseDown, y);
        reseted = false;
    }
}

/*
        FIM 
*/
main();
