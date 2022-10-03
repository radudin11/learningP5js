const w = 450
const h = 900
const CELLSIZE = 15
const NOTCHECKED = -1
const FLAGGED = -2
const BOMB = -3


let matrixHeight = h / CELLSIZE
let matrixWidth = w / CELLSIZE

let matrix = new Array(matrixHeight+2)
for (var i = 0; i < matrix.length; i++) {
  matrix[i] = new Array(matrixWidth + 2).fill(-1)
}

function setup() {
  createCanvas(w, h);
  background(128);
  for (let i = 0; i < w/CELLSIZE; i++){
    for (let j = 0; j < h/CELLSIZE;j++) {
      fill(100);
      //noSmooth();
      rect(i*CELLSIZE,j*CELLSIZE,CELLSIZE, CELLSIZE);
    }
  }
  noLoop();
}

function draw() {
  for (let i = 0; i <matrixHeight; i++){
    for (let j = 0; j < matrixWidth;j++) {
      drawCell(i,j);
    }
  }
 
}


function drawCell(i, j) {
  if (matrix[i + 1][j + 1] >= 0 || matrix[i + 1][j + 1] == BOMB ) {
    fill(192, 192, 192);
    rect(j*CELLSIZE,i*CELLSIZE,CELLSIZE, CELLSIZE);
  }
  
  if (matrix[i + 1][j + 1] > 0) {
    output = `${matrix[i + 1][j + 1]}`
    let bombsNear = createElement('h6', output)
    bombsNear.style('color', colorPicker(matrix[i + 1][j + 1]))
    bombsNear.position(j*CELLSIZE + 5,i*CELLSIZE)
  }

}

function colorPicker(nr) {
  if (nr == 1)
    return "#0000FD"
  if (nr == 2)
    return "#017E00"
  if (nr == 3)
    return "#FE0000"
  if (nr == 4)
    return "#010180"
  if (nr == 5)
    return "#810101"
  if (nr == 6)
    return "#008080"
  if (nr == 7)
    return "#000000"
  if (nr == 8)
    return "#808080"


  }