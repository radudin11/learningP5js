const gray = 40
const squareSize = 10

let fr = 1

const width = 400
const height = 400
let matrixHeight = height / squareSize
let matrixWidth = width / squareSize

let matrix = new Array((matrixHeight + 2) * (matrixWidth + 2)).fill(0)

function setup() {
  createCanvas(width, height);
  background(200);

  frameRate(fr)


  fill(gray)
  for (i = 0; i < matrixHeight; i++) {
    for(j = 0; j < matrixWidth; j++) {
      if (i < matrixHeight && j < matrixWidth) 
        rect(j*squareSize, i*squareSize, squareSize, squareSize)
    }
  } 
  matrix[matrixHeight + 2] = 1;
  //frameRate(fr)
  matrix[90] = 1;
  matrix[91] = 1;
  matrix[92] = 1;
  matrix[matrixHeight + 1] = 1;
  matrix[matrixHeight * 2 + 1] = 1;
  matrix[matrixHeight * 2 + 2] = 1;
  noLoop()
}



function draw() {
  for (i = 0; i < matrixHeight; i++) {
     for(j = 0; j < matrixWidth; j++) {
         if (matrix[(i + 1) * matrixHeight + j + 1] == 1) {
           fill(255, 0 ,0 )
         } else {
           fill(gray)
         }
         rect(j*squareSize, i*squareSize, squareSize, squareSize)
     }
  }

  updateMatrix();
}

function keyPressed()  {
  if (keyCode == 32) {
    if (isLooping() == true) {
      noLoop();
      return;
    }
    loop();
  }
}

function updateMatrix() {
  let newMatrix = new Array((matrixHeight + 2) * (matrixWidth + 2)).fill(0)
  for (i = 1; i <= matrixHeight; i++) {
    for(j = 1; j <= matrixWidth; j++) {
      if (isAlive(i, j)) {
        newMatrix[i * matrixHeight + j] = 1;
      } else {
        newMatrix[i * matrixHeight + j] = 0;
      }
    }
  }
  matrix = newMatrix
}

function isAlive(i, j) {
  neighbours = nrOfNeighbours(i, j);
  if ((neighbours == 2 || neighbours == 3) && matrix[i * matrixHeight + j] == 1)
    return true
  if (neighbours == 3 && matrix[i * matrixHeight + j] == 0)
    return true
  return false
}

function nrOfNeighbours(i, j) {
  return matrix[ (i - 1) * matrixHeight + j - 1] + 
  + matrix[ i * matrixHeight + j - 1] +
  + matrix[ (i - 1) * matrixHeight + j] +
  + matrix[ (i + 1) * matrixHeight + j + 1] +
  + matrix[ (i + 1) * matrixHeight + j] +
  + matrix[ i * matrixHeight + j + 1] + 
  + matrix[ (i + 1) * matrixHeight + j - 1]
  + matrix[ (i - 1) * matrixHeight + j + 1]
}
